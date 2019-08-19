import React from "react"
import ColumnList from '../components/ColumnList'
import inicialData from '../static/data'

class Index  extends React.Component {
    
    state = inicialData;
   
    handleClickNewTask = (e, idCol) => {
        e.preventDefault();
        e.stopPropagation();

        // const ids = Object.entries(this.state.tasks)
        // const lastTask = ids[ids.length-1][0]
        // const idNumber = Number(lastTask.substr(4,lastTask.length))
        
        // let setNewTaskId = `task${idNumber+1}`
        // const newTask = {[setNewTaskId]: {id: setNewTaskId, content: setNewTaskId, checkList: "1/2", date:  Math.random()<0.5 ? "12 sier" : false, label1: Math.random()<0.5 ? true : false, label2: Math.random()<0.4 ? true : false, desc: Math.random()<0.4 ? true : false}}
       
        // const columns = this.state.columns[idCol]
        
        // this.setState({
        //     tasks: {...this.state.tasks, ...newTask},
        //     columns: {
        //         ...this.state.columns,
        //         ...columns.tasksIds.push(setNewTaskId)
        //     }
        // })
    }

    onDragStart = col => e => {
            
            if (e.target.className.includes("trello__wrapper")) {
            e.target.style.opacity = '1'
            this.setState({
                idOfCol: col,
                type: 'column'
            })
        }
    } 

    onDragEnter = col => e => {
        if (e.preventDefault) {
            e.preventDefault()
        }

        const { idOfCol, columnOrder, type } = this.state

        if (type === 'column') {
            let cloneColumnsOrder = columnOrder

            const oldPlace = cloneColumnsOrder.findIndex(item => item === idOfCol);
            const newPlace = cloneColumnsOrder.findIndex(item => item === col);
           
            cloneColumnsOrder.splice(oldPlace,1)
            cloneColumnsOrder.splice(newPlace, 0, idOfCol)
            
            this.setState({
                columnOrder: cloneColumnsOrder
            })  
        }
    }

    dragEnd = e => {
        e.target.style.opacity = '1'
    }

    dragTaskStart = (idCol,idTask) => ev => {
       
        if (ev.target.className.includes('trello__task')) {
            this.setState({
                idOfTask: idTask,
                idOfCol: idCol,
                type: 'task'
            })
            ev.dataTransfer.setData("text/plain", ev.target.innerText);
        } 
    }

    dragTaskEnter = (idCol,idTask) => ev => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
    
        const { idOfCol, idOfTask, oldCol, type } = this.state

        if (type === 'task') {
          
            if (idOfCol === idCol) {
      
                if (idOfTask !== idTask && oldCol !== idCol) {
                    
                    const column = this.state.columns.find(col => col.id === idCol)
    
                    const oldPlace = column.tasksIds.findIndex(item => item === idOfTask)
                    const newPlace = column.tasksIds.findIndex(item => item === idTask)
                    
                    column.tasksIds.splice(oldPlace, 1)
                    column.tasksIds.splice(newPlace, 0, idOfTask)
        
                    const newTaskList = {
                        id: column.id,
                        title: column.title,
                        tasksIds: column.tasksIds
                    }
        
                    this.setState({
                        columns: this.state.columns.map(item => item.id === column.id ? newTaskList : item)
                    })
                    
                    return
    
                }
            } else if (idOfCol !== idCol) {
                   
                    let column = this.state.columns.find(item => item.id === idCol);
                    const taskItem = column.tasksIds.some(item => item === idOfTask);
                    
                    if (!taskItem) {
                        
                        const newTask = column.tasksIds.findIndex(item => item === idTask)
                        column.tasksIds.splice(newTask, 0, idOfTask)
                        
                        let oldColumn = this.state.columns.find(item => item.id === idOfCol)
                        const oldTask = oldColumn.tasksIds.findIndex(item => item === idOfTask)
                       
                        oldColumn.tasksIds.splice(oldTask,1)
    
                        const newTaskList = {
                            id: column.id,
                            title: column.title,
                            tasksIds: column.tasksIds
                        }
    
                        const oldTaskList = {
                            id: oldColumn.id,
                            title: oldColumn.title,
                            tasksIds: oldColumn.tasksIds
                        } 
    
                        this.setState({
                            columns: this.state.columns.map(item => {
                                if (item.id === column.id) return newTaskList
                                else if (item.id === oldColumn.id) return oldTaskList
                                return item
                            }),
                            oldCol: idOfCol,
                            idOfCol: idCol
                        })
                    }
            }
        }

        return false
    }

    dragTaskEnd = (ev) => {
        this.setState({
            oldCol: null
        })
    }

    dragEmptyListEnter = idCol => e => {
        if (this.state.type === 'task') {
            const column = this.state.columns.find(item => item.id === idCol)
            const isTaskList = column.tasksIds.length;
            
            if (isTaskList === 0) {
                
                let oldColumn = this.state.columns.find(item => item.id === this.state.idOfCol)
                const task = oldColumn.tasksIds.findIndex(item => item === this.state.idOfTask)
                oldColumn.tasksIds.splice(task,1)
                
                const newTaskList = {
                   id: column.id,
                   title: column.title,
                   tasksIds: [this.state.idOfTask]
                } 
                
                this.setState({
                   columns: this.state.columns.map(item => {
                       if (item.id === column.id) return newTaskList
                       return item
                   }),
                   oldCol: this.state.idOfCol,
                   idOfCol: idCol
                })
            }
        }
    }

    render() {
        const data = this.state.columnOrder.map((colId, index) => {
   
            let taskArr = [];
            const column = this.state.columns.find(item => item.id === colId);
            const tasks = this.state.tasks;
            column.tasksIds.forEach((item) => {  
                tasks.forEach((id) => {
                    if (item === id.id) {
                       taskArr.push(id)
                    }
                })
            })
         
            return <ColumnList 
                    key={index} 
                    column={column} 
                    tasks={taskArr} 
                    index={index}
                    onDragStart={(col) => this.onDragStart(col)}
                    onDragEnter={(col) => this.onDragEnter(col)}
                    dragEmptyListEnter={(idCol) => this.dragEmptyListEnter(idCol)}
                    dragEnd={this.dragEnd}
                    dragTaskStart={(idColumn,idTask) => this.dragTaskStart(idColumn,idTask)} 
                    dragTaskEnter={(idColumn,idTask) => this.dragTaskEnter(idColumn,idTask)}
                    dragTaskEnd={() => this.dragTaskEnd()}
                    newTask={(e,idCol) => this.handleClickNewTask(e,idCol)} />
        })
        return (
            <div className="container">
                {data}
                
                <style global jsx>{`
                    * {
                        padding: 0px;
                        margin: 0px;
                        box-sizing: border-box;
                    }
                    body{
                        background-color: #0079bf;
                        font-size: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;                    ;
                        font-family: $baseFontFamily;
                        width: 100%;
                    }
                    #clone{
                        position: fixed;
                        left: 0px;
                        top: 0px;
                        width: 272px;
                        background-color: red;
                        height: 100px;
                    }
                `}</style>
                <style jsx>{`
                    .container {
                        display: inline-block;
                        user-select: none;
                        overflow-x: auto;
                        overflow-y: hidden;
                        padding: 30px 8px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                    }
                `}</style>
               
            </div>
        )
    }
    
    
}

export default Index;