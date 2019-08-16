import React from "react"
import ColumnList from '../components/ColumnList'

class Index  extends React.Component {
    
    state = {
        taskList: [
            {
                taskTitle: 'Tasks list 1',
                tasks: [     
                    {id: 1, task: 'Task 1'},
                    {id: 2, task: 'Task 2'},
                    {id: 3, task: 'Task 3'}
                ]
            },
            {
                taskTitle: 'Tasks list 2',
                tasks: [     
                    {id: 1, task: 'Task 1'},
                    {id: 2, task: 'Task 2'},
                    {id: 3, task: 'Task 3'}
                ]
            }
        ]
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.taskList.map((column) => <ColumnList key={column.taskTitle} tasks={column.tasks} taskListTitle={column.taskTitle}/>)
                }
        
            <style global jsx>{`
                * {
                    padding: 0px;
                    margin: 0px;
                    box-sizing: border-box;
                }
                body{
                    background-color: #0079bf;
                    font-size: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;                    ;
                    font-family: $baseFontFamily;
                    width: 100%;
                }
            `}</style>
            <style jsx>{`
                .container {
                    display: inline-block;
                    user-select: none;
                    overflow-x: auto;
                    overflow-y: hidden;
                    padding: 30px 8px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
            `}</style>
        </div>
        )
    }
    
    
}

export default Index;