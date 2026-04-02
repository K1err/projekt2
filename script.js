const url = 'https://tinkr.tech/sdb/keir_todo/keir_todo/';
const input = document.getElementById('input');
const addButton = document.getElementById('add');
const todoList = document.getElementById('todo-list');


function addItem() {
    if (input.value === "") return;

    const newTodo = {
        text: input.value,
        id: Date.now().toString()
    };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo)
    }).then(() => {
        input.value = "";
        showTodos();
    });
}

addButton.onclick = addItem;

input.onkeydown = (enter) => {
    if (enter.key === "Enter") {
        addItem();
    }
};

showTodos();