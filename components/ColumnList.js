import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'

const ColumnList = props => {
    const { id, tasks, title, onDragStart, onDragEnter } = props
    return (    
        <div className='trello__wrapper'
             draggable='true'
             onDragStart={onDragStart(id)}
             onDragEnter={onDragEnter(id)}
        >
            <div className='trello'>
                <HeaderTaskList title={title} />
                <div className="trello__list-tasks" /*onDragEnter={dragEmptyListEnter(id)}*/>
                    { 
                        // tasks.map((task) => <Task 
                        // key={task.id} 
                        // task={task} 
                        // dragTaskStart={(idColumn,idTask) => props.dragTaskStart(idColumn,idTask)}
                        // dragTaskEnter={(idColumn,idTask) => props.dragTaskEnter(idColumn,idTask)}
                        // dragTaskEnd={() => dragTaskEnd()}
                        // idColumn={column.id}
                        // />)
                    } 
                </div>
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
                    padding: 0 8px;
                }
            `}</style>
        </div>
    )
}

export default ColumnList