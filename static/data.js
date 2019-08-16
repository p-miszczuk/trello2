const initialData = {
    tasks: {
        'task1' : {id: 'task1', content: 'Task 1'},
        'task2' : {id: 'task2', content: 'Task 2'},  
        'task3' : {id: 'task3', content: 'Task 3'},
        'task4' : {id: 'task4', content: 'Task 4'} 
        },
    columns: {
        column1: {
            id: 'column1',
            title: 'List Tasks 1',
            tasksIds: ['task1','task2','task3','task4'],
        },
        column2: {
            id: 'column2',
            title: 'List Tasks 2',
            tasksIds: []
        },
        column3: {
            id: 'column3',
            title: 'List Tasks 3',
            tasksIds: []
        }
    },
    columnOrder: ['column1','column2','column3'],
}

export default initialData;