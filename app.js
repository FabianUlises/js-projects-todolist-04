{/* <li class="list-name">Work</li> */}
const listsContainer = document.querySelector('.task-list');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');
// Variables
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KET = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KET);
// Function to create a todo
// const createTodo = () => {
    
// }
// Function to clear container
const clearElement = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
};
// Save list to localstorage
const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KET, selectedListId);
}
// Function to render todos
const render = () => {
    clearElement(listsContainer);
    lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if(list.id === selectedListId) {
        listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
    });
};
const createList = (name) => {
    return { id: Date.now().toString(), name: name, tasks: [] }
};
const saveAndRender = () => {
    save();
    render();
};
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
    saveAndRender();
});
listsContainer.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
});
deleteListBtn.addEventListener('click', (e) => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null;
    saveAndRender();
});