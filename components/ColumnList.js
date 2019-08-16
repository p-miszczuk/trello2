import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'

const ColumnList = props=> {
    console.log(props)
    return (
        <div className='trello__wrapper'>
            
            <div className='trello'>
                <HeaderTaskList title={props.taskListTitle}/>
                <div className="trello__list-tasks">
                    <Task task="Task 1"/>
                    <Task task="Task 2"/>
                    <Task task="Task 3"/>
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
            `}</style>
        </div>
    )
}

export default ColumnList