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
                <div className="trello__card-labels">
                    <span className="trello__card-label"></span>
                    <span className="trello__card-label"></span>
                </div>
                <span>{props.task.content}</span>
                <img src="../static/images/pencil.png" className='trello__pencil' />
                <span className="icon-pencil"></span>
                <div className="trello__badges">
                    <div className="trello__badge-checklist" title="Elementy listy zadań">
                        <img src='../static/images/check.png' className="trello__icon-check" />
                        <span className="trello__info-check"> 1/1 </span>
                    </div>
                    <div className="trello__badge-date" title="">
                        <img src="../static/images/clock.png" className="trello__icon-clock" />
                        <span className="trello__info-date">14 cze</span>
                    </div>
                    <div className="trello__badge-description" title="Ta karta ma opis.">
                        <span />
                        <span />
                        <span />
                        <span />
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
                        align-items: center;
                    }
                    .trello__badge-checklist {
                        padding: 2px 4px 3px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-radius: 4px;
                        background-color: #61bd4f;
                        color: fff;
                        margin-right: 3px; 
                    }
                    .trello__icon-check {
                        width: 17px;
                        height: 17px;
                    }     
                    .trello__info-check {
                        font-size: 12px;
                        font-weight: 400;
                        vertical-align: center;
                        white-space: nowrap;
                        overflow: hidden;
                        margin-top: 2px;
                        color: #fff;
                    }
                    .trello__badge-date {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #eb5a46;
                        padding: 2px 4px 3px;
                        border-radius: 4px;
                        color: #fff;
                        margin-right: 3px;
                    }
                    .trello__icon-clock {
                        width: 13px;
                        height: 13px
                    }
                    .trello__info-date {
                        font-size: 12px;
                        font-weight: 400;
                        vertical-align: center;
                        white-space: nowrap;
                        margin: 2px 0 0 3px;
                    }
                    .trello__card-labels {
                        display: flex;
                        flex-direction: row;
                        overflow: auto;
                    }
                    .trello__card-label {
                        display: block;
                        height: 8px;
                        margin: 0 4px 4px 0;
                        width: 40px;
                        padding: 0;
                        border-radius: 8px;
                        position: relative;
                        z-index: 0;
                        background-color: yellow;
                    }
                    .trello__badge-description {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        height: 13px;
                    }
                    .trello__badge-description span {
                        display: block;
                        width: 15px;
                        height: 1px;
                        background-color: #000;
                        overflow: hidden;
                    }
                `}</style>
            </a>
            )}
        </Draggable>
    )
}

export default Task