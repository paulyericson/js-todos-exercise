// Function to add a new todo
function addTodo() {
    const todoText = document.getElementById("todo-input").value;
    if (todoText.trim() === "") return; // Prevent adding empty todos

    const todoList = document.getElementById("todo-list");
    const listItem = document.createElement("li");
    listItem.textContent = todoText;

    // Add a click event to mark the todo as completed
    listItem.addEventListener("click", function() {
        listItem.classList.toggle("completed");
    });

    // Add a button to remove the todo
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
        listItem.remove();
    });

    listItem.appendChild(removeButton);
    todoList.appendChild(listItem);

    // Clear the input field
    document.getElementById("todo-input").value = "";
}


function saveTodos() {
    const todoListItems = document.querySelectorAll("#todo-list li");
    const todos = [];
    todoListItems.forEach(function(item) {
        const todo = {
            text: item.textContent,
            completed: item.classList.contains("completed")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from localStorage
function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach(function(todo) {
            const listItem = document.createElement("li");
            listItem.textContent = todo.text;
            if (todo.completed) {
                listItem.classList.add("completed");
            }

            listItem.addEventListener("click", function() {
                listItem.classList.toggle("completed");
                saveTodos();
            });

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function() {
                listItem.remove();
                saveTodos();
            });

            listItem.appendChild(removeButton);
            document.getElementById("todo-list").appendChild(listItem);
        });
    }
}


// Handle form submission
const todoForm = document.getElementById("todo-form");
todoForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    addTodo();
});