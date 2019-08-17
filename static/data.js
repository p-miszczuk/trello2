const initialData = {
    tasks: {
        'task1' : {id: 'task1', content: 'Task 1', checkList: "1/1", date: '14 cze', label1: true, label2: false, desc: false},
        'task2' : {id: 'task2', content: 'Task 2', checkList: "", date: '12 maj', label1: false, label2: false, desc: false},  
        'task3' : {id: 'task3', content: 'Task 3', checkList: "", date: "", label1: true, label2: true, desc: false},
        'task4' : {id: 'task4', content: 'Task 4', checkList: "", date: "", label1: false, label2: false, desc: true},
        'task5' : {id: 'task5', content: 'Task 5', checkList: "1/2", date: "", label1: false, label2: true, desc: true}
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
            tasksIds: ['task5']
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