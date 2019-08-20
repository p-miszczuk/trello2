import React from 'react'

const Task = props => {
    const { idColumn, task, dragTaskEnd, dragTaskEnter, dragTaskStart } = props
    return (
        <div 
            className='trello__task-wrapper'
            draggable='true'
            onDragStart={dragTaskStart(idColumn,task.id)}
            onDragEnter={dragTaskEnter(idColumn,task.id)}
            onDragEnd={dragTaskEnd}
        >
            <a href="" className="trello__task">
            {
                (task.label1 || task.label2) && <div className="trello__card-labels">
                    {task.label1 && <span className="trello__card-label trello__card-label--orange"></span>}
                    {task.label2 && <span className="trello__card-label trello__card-label--violet"></span>}
                </div>
            }
            <span>{task.content}</span>
            <img src="../static/images/pencil.png" className='trello__pencil' />
            <div className="trello__badges">
                {
                    task.checkList && <div className="trello__badge-checklist" title="Elementy listy zadań">
                        <img src='../static/images/check.png' className="trello__icon-check" />
                        <span className="trello__info-check"> {task.checkList} </span>
                    </div>
                }
                {
                    task.date && <div className="trello__badge-date" title="">
                        <img src="../static/images/clock.png" className="trello__icon-clock" />
                        <span className="trello__info-date">{task.date}</span>
                    </div>
                }
                {
                    task.desc && <div className="trello__badge-description" title="Ta karta ma opis.">
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                }
                </div>
            </a>
            <style jsx>{`
                .trello__task-wrapper {
                    width: 100%;
                    max-width: 300px;
                    min-height: 20px;
                    margin-bottom: 8px;
                    z-index: 999;
                }
                .trello__task {
                    background-color: #fff;
                    box-shadow: 0 1px 0 rgba(9,30,66,.25);
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    text-decoration: none;
                    border-radius: 4px;
                    overflow: hidden;
                    padding: 6px 8px 2px;
                    color: black;
                    z-index: 0;
                    pointer-events: none;
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
                .trello__card-labels:hover span:after {
                    background: rgba(0, 0, 0, 0.2);
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
                }
                .trello__card-label:after {
                    content: "";                                  
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 40px;
                    height: 8px;
                    border-radius: 6px;
                }
                .trello__card-label--orange {
                    background: #ff9f1a;
                }
                .trello__card-label--violet {
                    background: #c377e0;
                }
                .trello__badge-description {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    height: 13px;
                    margin: 0px 3px;
                }
                .trello__badge-description span {
                    display: block;
                    width: 15px;
                    height: 1px;
                    background-color: #000;
                    overflow: hidden;
                }
                `}</style>
        </div>
    )
}

export default Task