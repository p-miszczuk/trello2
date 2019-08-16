import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = props => {
    const style = {
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
        position: 'static',

    }
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <a href="" className="trello__task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                <span>{props.task.content}</span>
                <img src="../static/images/pencil.png" className='trello__pencil' />
                <span className="icon-pencil"></span>
                <div className="trello__badges">
                    <div className="trello__badge-checklist" title="Elementy listy zadań">
                        <span className="trello__icon-check"></span>
                        <span className="trello__info-check"> 1/1 </span>
                    </div>
                </div>
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
                        color: black;
                    }
                    .trello__task:focus {
                        color: black;
                    }
                    .trello__task:hover > .trello__pencil {
                        opacity: 0.7;
                    }
                    .trello__pencil {
                        width: 22px;
                        height: 22px;
                        position: absolute;
                        border-radius: 4px;
                        padding: 5px;
                        top: 4px;
                        right: 4px;
                        display: block;
                        line-height: 10px;
                        z-index: 9;
                        opacity: 0;
                        color: #42526e;
                        transition: opacity 0.2s;
                    }
                    .trello__pencil:hover {
                        opacity: 0.7;
                    }
                    .trello__badges {
                        margin: 3px 3px 6px 0;
                        display: flex;
                        flex-direction: row;
                    }
                    .trello__badge-checklist {
                        padding: 2px 4px 3px;
                        display: inline;
                        border-radius: 4px;
                        background-color: #61bd4f;
                        color: fff; 
                    }     
                    .trello__info-check {
                        font-size: 12px;
                        display: inline;
                        font-weight: 400;
                        vertical-align: center;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .badge-date {
                        padding: 2px 4px 3px;
                        display: inline;
                        border-radius: 4px;
                        background-color: #eb5a46;
                        color: #fff;
                    }
                    .info-date {
                        font-size: 12px;
                        font-weight: 400;
                        vertical-align: center;
                        white-space: nowrap;
                    }
                `}</style>
            </a>
            )}
        </Draggable>
    )
}

export default Task