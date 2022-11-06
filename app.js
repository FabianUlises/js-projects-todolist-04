{/* <li class="list-name">Work</li> */}
const listsContainer = document.querySelector('.task-list');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
// Function to create a todo
// const createTodo = () => {
    
// }
// sample data
let lists = [
    {
        id: 0,
        name: 't'
    },
    {
        id: 1,
        name: 'nae'
    },
    {
        id: 2,
        name: 'tdo'
    }
];
// Function to clear container
const clearElement = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
};
// Function to render todos
const render = () => {
    clearElement(listsContainer);
    lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    listsContainer.appendChild(listElement);
    });
};
const createList = (name) => {
    return { id: Date.now().toString(), name: name, tasks: [] }
}
render();
// Function to get toods from local storage
// const getLocalTodos = () => {
//     let todos;
//     if(localStorage.getItem('to-do') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('to-do'));
//     }
//     todos.forEach()
// }
newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = newListInput.value;
    if(listName == null || listName === '') return
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    render();
});