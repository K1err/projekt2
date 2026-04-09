const url = 'https://tinkr.tech/sdb/keir_todo/keir_todo/';
const input = document.getElementById('input');
const addButton = document.getElementById('add');
const todoList = document.getElementById('todo-list');

async function showTodos() {
    const res = await fetch(url);
    const todos = await res.json();

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Kustuta';
        deleteBtn.onclick = () => deleteItem(todo.id);

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

async function deleteItem(id) {
    await fetch(url + id, { method: 'DELETE' });
    showTodos();
}

async function addItem() {
    if (input.value === '') return;

    const newTodo = {
        text: input.value,
        id: Date.now().toString()
    };

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
    });

    input.value = "";
    showTodos();
}

addButton.onclick = addItem;

input.onkeydown = (enter) => {
    if (enter.key === 'Enter') addItem();
};

showTodos();