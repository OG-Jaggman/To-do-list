document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Load existing todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    // Add a new todo
    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const newTodo = {
                text: todoText,
                id: Date.now(),
            };
            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));
            todoInput.value = '';
            renderTodos();
        }
    });

    // Delete a todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTodo(todo.id));
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
});