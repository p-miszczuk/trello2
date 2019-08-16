import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = props => {
    
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <a href="#" className="trello__task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                {props.task.content}
                {console.log(provided.draggableProps.style)}
                <style jsx>{`
                    .trello__task {
                        background-color: #fff;
                        border-radius: 4px;
                        box-shadow: 0 1px 0 rgba(9,30,66,.25);
                        display: block;
                        margin-bottom: 8px;
                        max-width: 300px;
                        min-height: 20px;
                        position: relative;
                        text-decoration: none;
                        z-index: 1;
                        overflow: hidden;
                        padding: 6px 8px 2px;
                    }
                `}</style>
            </a>
            )}
        </Draggable>
    )
}

export default Task