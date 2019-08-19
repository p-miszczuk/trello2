import React from "react"
import ColumnList from '../components/ColumnList'
import inicialData from '../static/data'

class Index  extends React.Component {
    
    state = inicialData;

    idOfCol = null;
    idOfTask = null;
    clone = null;
   
    handleClickNewTask = (e, idCol) => {
        e.preventDefault();
        e.stopPropagation();

        const ids = Object.entries(this.state.tasks)
        const lastTask = ids[ids.length-1][0]
        const idNumber = Number(lastTask.substr(4,lastTask.length))
        
        let setNewTaskId = `task${idNumber+1}`
        const newTask = {[setNewTaskId]: {id: setNewTaskId, content: setNewTaskId, checkList: "1/2", date:  Math.random()<0.5 ? "12 sier" : false, label1: Math.random()<0.5 ? true : false, label2: Math.random()<0.4 ? true : false, desc: Math.random()<0.4 ? true : false}}
       
        const columns = this.state.columns[idCol]
        
        this.setState({
            tasks: {...this.state.tasks, ...newTask},
            columns: {
                ...this.state.columns,
                ...columns.tasksIds.push(setNewTaskId)
            }
        })
    }

    onDragStart = (e,col) => {
        
       
            if (e.target.className.includes("trello__wrapper")) {
            e.target.style.opacity = '1'
            this.idOfCol = col;
            // this.clone = document.getElementById('clone')
            // this.clone.innerHTML = e.currentTarget.innerHTML;
            // this.clone.style.height = e.target.firstChild.offsetHeight + "px";
            // this.clone.style.top = e.target.offsetTop+'px'
            // this.clone.style.left = e.target.offsetLeft+'px'
            // const a = e.target
            // console.log({a})
            console.log("drag column")
            // e.dataTransfer.setData("text/plain", e.target.innerText);
        }
    } 

    onDragEnter = (e, col) => {
        if (e.preventDefault) {
            e.preventDefault()
        }

        if (this.idOfCol !== col && (e.target.className.includes('header') || e.target.className.includes('trello__wrapper'))) {
            let cloneColumnsOrder = this.state.columnOrder
            const dragCol = cloneColumnsOrder.findIndex(item => item === this.idOfCol);
            const newPlace = cloneColumnsOrder.findIndex(item => item === col);
           
            cloneColumnsOrder.splice(dragCol,1)
            cloneColumnsOrder.splice(newPlace, 0, this.idOfCol)
            
            this.setState({
                columnOrder: cloneColumnsOrder
            })
        }

        return false;
    }

    dragEnd = e => {
        e.target.style.opacity = '1'
    }

    dragTaskStart = (ev,idCol,idTask) => {
        if (ev.target.className.includes('trello__task')) {
            this.idOfTask = idTask;
            this.idOfCol = idCol;
            ev.dataTransfer.setData("text/plain", ev.target.innerText);
        } 
    }

    dragTaskEnter = (ev,idCol,idTask) => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }

        if (this.idOfCol === idCol) {
            if (this.idOfTask !== idTask) {
                console.log("różne")
            }
        } 

        return false
    }

    dragTaskEnd = (ev) => {
        // console.log(ev);
    }

    render() {
        const data = this.state.columnOrder.map((colId, index) => {
            const column = this.state.columns[colId];
            const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);
            return <ColumnList 
                    key={column.id} 
                    column={column} 
                    tasks={tasks} 
                    index={index}
                    onDragStart={(e,col) => this.onDragStart(e,col)}
                    onDragEnter={(e,col) => this.onDragEnter(e,col)}
                    dragEnd={this.dragEnd}
                    dragTaskStart={(e,idColumn,idTask) => this.dragTaskStart(e,idColumn,idTask)} 
                    dragTaskEnter={(e,idColumn,idTask) => this.dragTaskEnter(e,idColumn,idTask)}
                    dragTaskEnd={() => this.dragTaskEnd()}
                    newTask={(e,idCol) => this.handleClickNewTask(e,idCol)} />
        })
    
        return (
            <div className="container">
                {data}
                
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
                    #clone{
                        position: fixed;
                        left: 0px;
                        top: 0px;
                        width: 272px;
                        background-color: red;
                        height: 100px;
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
                {/* <div id='clone'>ad</div> */}
            </div>
        )
    }
    
    
}

export default Index;