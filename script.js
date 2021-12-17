let todos = [];


function saveTodosInLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
    const stringifyTodos = localStorage.getItem("todos");


    if (stringifyTodos) {
        todos = JSON.parse(stringifyTodos);
        renderMyTodoList();
    }
}

function createListItem(listItemText) {
    const newListItem = document.createElement("li");
    newListItem.innerText = listItemText;
    return newListItem;
}

function createListItemDeleteButton(todoId) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.onclick = function() {
        const filteredArr = todos.filter(function(arrElement) {
            return todoId !== arrElement.id;
        });
        todos = filteredArr;
        renderMyTodoList();
    };

    return deleteButton;
}

function createListItemUpdateButton(todoId, todoText) {
    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.onclick = function() {
        const inputElement = document.getElementById("todoInput");
        const submitButton = document.getElementById("todoSubmitButton");
        const todoUpdateButton = document.getElementById("updateButton");

        todoUpdateButton.onclick = function() {
            const updatedArr = todos.map(function(todo) {
                debugger;
                if (todo.id === todoId) {
                    debugger;
                    return {
                        text: inputElement.value,
                        id: todo.id
                    };
                } else {
                    debugger;
                    return todo;
                }
            });
            console.log("updatedArr: ", updatedArr);
            debugger;
            todos = updatedArr;
            renderMyTodoList();
        };

        inputElement.value = todoText;
        submitButton.style.display = "none";
        todoUpdateButton.style.display = "inline";
    };
    return updateButton;
}

function resetInputValue() {
    document.getElementById("todoInput").value = "";
}

document
    .getElementById("todoForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const todoInput = document.getElementById("todoInput").value;
        const todosList = document.getElementById("todos");

        const todo = {
            text: todoInput,
            id: uuid.v1(),
        };

        todos.push(todo);

        resetInputValue();

        const newListItem = createListItem(todo.text);
        const deleteButton = createListItemDeleteButton(todo.id);
        const updateButton = createListItemUpdateButton(todo.id, todo.text);

        todosList.appendChild(newListItem);
        todosList.appendChild(deleteButton);
        todosList.appendChild(updateButton);
    });

function renderMyTodoList() {
    const todosList = document.getElementById("todos");

    const inputElement = document.getElementById("todoInput");
    const submitButton = document.getElementById("todoSubmitButton");
    const todoUpdateButton = document.getElementById("updateButton");

    inputElement.value = "";
    submitButton.style.display = "inline";
    todoUpdateButton.style.display = "none";

    todosList.innerHTML = "";

    for (let index = 0; index < todos.length; index++) {
        const todo = todos[index];
        const newListItem = createListItem(todo.text);
        const deleteButton = createListItemDeleteButton(todo.id);
        const updateButton = createListItemUpdateButton(todo.id, todo.text);

        todosList.appendChild(newListItem);
        todosList.appendChild(deleteButton);
        todosList.appendChild(updateButton);
    }
}