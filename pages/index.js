import React from "react"
import ColumnList from '../components/ColumnList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'
import inicialData from '../static/data'

class Index  extends React.Component {
    
    state = inicialData;

    onDragEnd = result=> {
        const { destination, source, draggableId, type } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
                return
            }

        if (type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            }
           
            this.setState(newState)
            return
        }
        

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        
        if (start === finish) {
            let newTaskIds = Array.from(start.tasksIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId)
          
            const newColumn = {
            ...start, 
            tasksIds: newTaskIds
            }

            const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
            }

            this.setState(newState);
            return
        }

        const startTaskIds = Array.from(start.tasksIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          tasksIds: startTaskIds,
        };
    
        const finishTaskIds = Array.from(finish.tasksIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          tasksIds: finishTaskIds,
        };
    
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
        this.setState(newState);
    }

    handleClickNewTask = (e, idCol) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(Math.random()<0.4)

        const ids = Object.entries(this.state.tasks)
        const lastTask = ids[ids.length-1][0]
        const idNumber = Number(lastTask.substr(4,lastTask.length))
        
        let setNewTaskId = `task${idNumber+1}`
        const newTask = {[setNewTaskId]: {id: setNewTaskId, content: setNewTaskId, checkList: "1/2", date:  Math.random()<0.5 ? "12 sier" : false, label1: Math.random()<0.5 ? true : false, label2: Math.random()<0.4 ? true : false, desc: Math.random()<0.4 ? true : false}}
       
        const columns = this.state.columns[idCol]
           
        this.setState({
            tasks: {...this.state.tasks, ...newTask},
            columns: {
                ...this.state.columns,
                ...columns.tasksIds.push(setNewTaskId)
            }
        })
    }

    render() {
        const data = this.state.columnOrder.map((colId, index) => {
            const column = this.state.columns[colId];
            const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);
            return <ColumnList key={column.id} column={column} tasks={tasks} index={index} newTask={(e,idCol) => this.handleClickNewTask(e,idCol)} />
        })
        resetServerContext()
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable 
                    droppableId="all-columns" 
                    direction="horizontal" 
                    type="column"
                >
                    {(provided) => (
                        <div className="container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                        {data}
                        {provided.placeholder}
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
                    )}
            </Droppable>
        </DragDropContext>
        )
    }
    
    
}

export default Index;