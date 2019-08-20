import React from "react"
import ColumnList from '../components/ColumnList'
import inicialData from '../static/data'

class Index  extends React.Component {
    
    state = {
        idOfCol: null,
        idOfTask: null,
        oldCol: null,
        typ: null,
        ...inicialData
    };
   
    onDragStart = col => e => {
        console.log("here")            
        if (e.target.className.includes("trello__wrapper")) {
            this.setState({
                idOfCol: col,
                type: 'column'
            })
        } else if (ev.target.className.includes('trello__task')) {
            this.setState({
                idOfTask: idTask,
                idOfCol: idCol,
                type: 'task'
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

    onDragEnd = () => {

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
        const { columns } = this.state
        
        return (
            <div className="container">
                {columns.map(column => <ColumnList 
                                        key={column.id}
                                        id={column.id}
                                        title={column.title}
                                        tasks={column.tasksIds}
                                        onDragStart={(id) => this.onDragStart(id)}
                                        onDragEnter={(id) => this.onDragEnter(id)}
                                        onDragEnd={this.onDragEnd}
                                        />)}
                
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

export default Index;