import React from 'react'
import Task from './Task'
import NewTaskCreator from './NewTaskCreator'
import HeaderTaskList from './HeaderTaskList'
import { Droppable } from 'react-beautiful-dnd'

const ColumnList = props=> {
    console.log(props)
    return (
        <div className='trello__wrapper'>
            
            <div className='trello'>
                <HeaderTaskList title={props.taskListTitle}/>
                <Droppable droppableId={props.taskListTitle} >
                    {(provided) => (
                        <div className="trello__list-tasks"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                        {
                            props.tasks.map((task, index) => <Task key={task.id} index={index} id={task.id} taskItem={task.task} />)
                        }
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
            `}</style>
        </div>
    )
}

export default ColumnList