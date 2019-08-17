import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const ColumnList = props=> {

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
           {(provided, snapshot) => (
                <div className='trello__wrapper'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                <div className='trello' 
                    {...provided.dragHandleProps}
                >
                    <HeaderTaskList title={props.column.title}/>
                    <Droppable droppableId={props.column.id} type="task">
                        {(provided) => (
                            <div className="trello__list-tasks"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                            {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <NewTaskCreator newTask={(e,idCol) => props.newTask(e,idCol)} idCol={props.column.id} />
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
                        cursor: pointer;
                        overflow-y: hidden;
                        ${snapshot.isDragging && 'transform: rotate(5deg);'};
                    }
                    .trello__list-tasks {
                        display: block;
                        flex: 1 1 auto;
                        overflow: hidden;
                        word-wrap: break-word;
                        min-height: 10px;
                        padding: 0 8px;
                    }
                `}</style>
            </div>
           )}
        </Draggable>
    )
}

export default ColumnList