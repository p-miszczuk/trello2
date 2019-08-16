import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const ColumnList = props=> {

   const getItemStyle = (style) => {
       console.log(style)
   }
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
           {(provided) => (
                <div className='trello__wrapper'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                <div className='trello' 
                    {...provided.dragHandleProps}
                >
                    <HeaderTaskList title={props.column.title}/>
                    <Droppable droppableId={props.column.id} type="task">
                        {(provided, snapshot) => (
                            <div className="trello__list-tasks"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                               
                            >
                            {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} placeholder={provided.placeholder}/>)}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <NewTaskCreator />
                </div>
    
                <style jsx>{`
                    .trello__wrapper {
                        width: 272px;
                        margin: 0 4px;
                        height: 100%;
                        box-sizing: border-box;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .trello {
                        background-color: #dfe1e6;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        max-height: 100%;
                        position: relative;
                        padding: 0px 8px;
                        cursor: pointer;
                    }
                    .trello__list-tasks {
                        display: block;
                        flex: 1 1 auto;
                        overflow-y: auto;
                        overflow-x: hidden;
                        word-wrap: break-word;
                        min-height: 7px;
                    }
                `}</style>
            </div>
           )}
        </Draggable>
    )
}

export default ColumnList