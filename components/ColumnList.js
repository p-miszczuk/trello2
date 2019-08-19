import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'

const ColumnList = props => {
    return (    
        <div className='trello__wrapper'
             draggable='true'
             onDragStart={(e) => props.onDragStart(e,props.column.id)}
             onDragEnter={(e) => props.onDragEnter(e,props.column.id)}
             onDragEnd={props.dragEnd}
        >
            <div className='trello'>
                <HeaderTaskList title={props.column.title} />
                <div className="trello__list-tasks">
                    {props.tasks.map((task, index) => <Task 
                        key={task.id} 
                        task={task} 
                        dragTaskStart={() => props.dragTaskStart()} 
                        dragTaskEnter={() => props.dragTaskEnter()}
                        dragTaskEnd={() => props.dragTaskEnd()}
                    />)}
                </div>
                <NewTaskCreator idCol={props.column.id} newTask={(e,idCol) => props.newTask(e, idCol)} />
            </div>
            <style jsx>{`
                .trello__wrapper {
                    width: 272px;
                    margin: 0 4px;
                    height: 100%;
                    box-sizing: border-box;
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
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
                }
                .trello__list-tasks {
                    display: block;
                    flex: 1 1 auto;
                    overflow: hidden;
                    word-wrap: break-word;
                    min-height: 1px;
                    padding: 0 8px;
                }
            `}</style>
        </div>
    )
}

export default ColumnList