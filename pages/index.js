import React from "react"
import ColumnList from "../components/ColumnList"
import inicialData from "../static/data"

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      idOfCol: null,
      idOfTask: null,
      oldCol: null,
      typ: null,
      ...inicialData,
    }
  }

  onDragStart = (col, idTask) => e => {
    if (e.target.className.includes("trello__wrapper")) {
      this.setState({
        idOfCol: col,
        type: "column",
      })
    } else if (
      e.target.className.includes("trello__task") &&
      idTask !== undefined
    ) {
      this.setState({
        idOfTask: idTask,
        idOfCol: col,
        type: "task",
      })
    }
  }

  onDragEnter = (col, idTask) => e => {
    if (e.preventDefault) {
      e.preventDefault()
    }

    const { idOfCol, idOfTask, oldCol, columns, type } = this.state

    if (type === "column") {
      this.changeColumnOrder(columns, idOfCol, col)
    } else if (type === "task" && idTask !== undefined) {
      if (idOfCol === col && idTask !== -1) {
        if (idOfTask !== idTask && oldCol !== col) {
          this.changeTasksOrderInColumn(columns, idOfCol, idOfTask, idTask)
        }
      } else if (idOfCol !== col && idTask !== -1) {
        this.addTaskToNewColumn(columns, idOfCol, idOfTask, idTask, col)
      } else {
        this.addTaskToEmptyColumn(columns, idOfCol, idOfTask, col)
      }
    }

    return false
  }

  onDragEnd = () => {
    this.setState({
      oldCol: null,
      idOfCol: null,
    })
  }

  changeColumnOrder = (columns, idOfCol, col) => {
    let _columns = columns
    const moveTask = _columns.find(item => item.id === idOfCol)
    const oldPlace = _columns.findIndex(item => item.id === idOfCol)
    const newPlace = _columns.findIndex(item => item.id === col)

    if (oldPlace !== newPlace) {
      _columns.splice(oldPlace, 1)
      _columns.splice(newPlace, 0, moveTask)

      this.setState({
        columns: _columns,
      })
    }

    return
  }

  changeTasksOrderInColumn = (columns, idOfCol, idOfTask, idTask) => {
    const _columnTask = columns.find(column => column.id === idOfCol)
    const _task = _columnTask.tasksIds.find(task => task.id === idOfTask)

    const oldPlace = _columnTask.tasksIds.findIndex(
      item => item.id === idOfTask
    )
    const newPlace = _columnTask.tasksIds.findIndex(item => item.id === idTask)

    _columnTask.tasksIds.splice(oldPlace, 1)
    _columnTask.tasksIds.splice(newPlace, 0, _task)

    const newTaskList = {
      id: _columnTask.id,
      title: _columnTask.title,
      tasksIds: _columnTask.tasksIds,
    }

    this.setState({
      columns: columns.map(item => (item.id === idOfCol ? newTaskList : item)),
    })
  }

  addTaskToNewColumn = (columns, idOfCol, idOfTask, idTask, col) => {
    let column = columns.find(item => item.id === col)
    const isTask = column.tasksIds.some(item => item === idOfTask)

    if (!isTask) {
      let oldColumn = columns.find(item => item.id === idOfCol)
      const _task = oldColumn.tasksIds.find(task => task.id === idOfTask)
      const oldTask = oldColumn.tasksIds.findIndex(item => item.id === idOfTask)

      const newTask = column.tasksIds.findIndex(item => item.id === idTask)
      column.tasksIds.splice(newTask, 0, _task)

      oldColumn.tasksIds.splice(oldTask, 1)

      const newTaskList = {
        id: column.id,
        title: column.title,
        tasksIds: column.tasksIds,
      }

      const oldTaskList = {
        id: oldColumn.id,
        title: oldColumn.title,
        tasksIds: oldColumn.tasksIds,
      }

      this.setNewSate(
        column,
        oldColumn,
        columns,
        newTaskList,
        oldTaskList,
        idOfCol,
        col
      )
      return
    }
  }

  addTaskToEmptyColumn = (columns, idOfCol, idOfTask, col) => {
    const column = columns.find(item => item.id === col)
    const isTaskList = column.tasksIds.length

    if (isTaskList === 0) {
      let oldColumn = columns.find(item => item.id === idOfCol)
      const _task = oldColumn.tasksIds.find(task => task.id === idOfTask)
      const task = oldColumn.tasksIds.findIndex(item => item.id === idOfTask)
      oldColumn.tasksIds.splice(task, 1)

      const oldTaskList = {
        id: oldColumn.id,
        title: oldColumn.title,
        tasksIds: oldColumn.tasksIds,
      }

      const newTaskList = {
        id: column.id,
        title: column.title,
        tasksIds: [_task],
      }

      this.setNewSate(
        column,
        oldColumn,
        columns,
        newTaskList,
        oldTaskList,
        idOfCol,
        col
      )
    }
  }

  setNewSate = (
    column,
    oldColumn,
    columns,
    newTaskList,
    oldTaskList,
    idOfCol,
    col
  ) => {
    this.setState({
      columns: columns.map(item => {
        if (item.id === column.id) return newTaskList
        else if (item.id === oldColumn.id) return oldTaskList
        return item
      }),
      oldCol: idOfCol,
      idOfCol: col,
    })
  }

  render() {
    const { columns } = this.state
    return (
      <div className="container">
        {columns.map(column => (
          <ColumnList
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasksIds}
            onDragStart={this.onDragStart}
            onDragEnter={this.onDragEnter}
            onDragEnd={this.onDragEnd}
          />
        ))}

        <style global jsx>{`
          * {
            padding: 0px;
            margin: 0px;
            box-sizing: border-box;
          }
          body {
            background-color: #0079bf;
            font-size: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            font-family: $baseFontFamily;
            width: 100%;
          }
        `}</style>
        <style jsx>{`
          .container {
            user-select: none;
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 30px 8px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Index
