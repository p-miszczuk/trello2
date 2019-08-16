import React from "react"
import ColumnList from '../components/ColumnList'
import { DragDropContext } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'

class Index  extends React.Component {
    
    state = {
        tasksList: [
            {
                taskTitle: 'Tasks list 1',
                tasks: [     
                    {id: 1, task: 'Task 1'},
                    {id: 2, task: 'Task 2'},
                    {id: 3, task: 'Task 3'}
                ]
            }
        ]
    }

    onDragEnd = result=> {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
                return
            }

        const column = this.state.tasksList.filter(column => column.taskTitle === source.droppableId);
        let newTasksList = column[0].tasks
        const task = column[0].tasks.filter(item => item.id === draggableId)
        newTasksList.splice(source.index, 1);
        newTasksList.splice(destination.index, 0, task[0])

        const newTaskCol = {
            taskTitle: column[0].taskTitle,
            tasks: newTasksList
        }

        this.setState({
            tasksList: [{...newTaskCol}]
        })        
    }

    render() {
        console.log(this.state.tasksList)
        resetServerContext()
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <div className="container">
                    {
                        this.state.tasksList.map((column) => <ColumnList key={column.taskTitle} tasks={column.tasks} taskListTitle={column.taskTitle}/>)
                    }
            
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
        </DragDropContext>
        )
    }
    
    
}

export default Index;