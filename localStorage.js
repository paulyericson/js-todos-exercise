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

        const todoForm = document.getElementById("todo-form");
        todoForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            addTodo();
        });

        loadTodos();



