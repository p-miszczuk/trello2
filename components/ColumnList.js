import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'

const ColumnList = props => {
    return (    
        <div className='trello__wrapper'
             draggable='true'
             onDragStart={props.onDragStart(props.column.id)}
             onDragEnter={props.onDragEnter(props.column.id)}
             onDragEnd={props.dragEnd}
        >
            <div className='trello'>
                <HeaderTaskList title={props.column.title} />
                <div className="trello__list-tasks" onDragEnter={props.dragEmptyListEnter(props.column.id)}>
                    { 
                        props.tasks.map((task) => <Task 
                        key={task.id} 
                        task={task} 
                        dragTaskStart={(idColumn,idTask) => props.dragTaskStart(idColumn,idTask)}
                        dragTaskEnter={(idColumn,idTask) => props.dragTaskEnter(idColumn,idTask)}
                        dragTaskEnd={() => props.dragTaskEnd()}
                        idColumn={props.column.id}
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
                    min-height: 10px;
                    border: 1px solid red;
                    padding: 0 8px;
                }
            `}</style>
        </div>
    )
}

export default ColumnList