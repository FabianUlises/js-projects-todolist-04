// Selectors
const listsContainer = document.querySelector('.task-list');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');

// Variables
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KET = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KET);
// Function to create a todo

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
const renderLists = () => {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;
        if(list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    })
}
const renderTaskCount = () => {
    // const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
    console.log('task count');
};
// Function to render todos
const render = () => {
    clearElement(listsContainer);
    renderLists();
    const selectedList = lists.find(list => list.id === selectedListId)
    console.log(selectedListId)
    if(selectedListId === null) {
        // listDisplayContainer.style.display = 'none';
        console.log('wejlsakjdas')
    } else {
        // listDisplayContainer.style.display = '';
        // listTitleElement.innerText = selectedList.name;
        console.log(selectedListId)
        renderTaskCount();
    }
};

const createList = (name) => {
    return { id: Date.now().toString(), name: name, tasks: [] }
};
const saveAndRender = () => {
    save();
    render();
};
// Running functions

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
render();
