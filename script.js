const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

async function todolist() {
  const response = await fetch('https://tinkr.tech/sdb/minu_todolist');
  const data = await response.json();

  list.innerHTML = "";

  data.forEach(todo => {
    createTodo(todo.text);
})};

async function deleteTodo(id) {
  await fetch(`https://tinkr.tech/sdb/minu_todolist/${id}`, {
    method: "DELETE"
  });
}

function createTodo(text) {
    const li = document.createElement('li');
    li.textContent = text;

    li.onclick = () => li.classList.toggle('completed');

    const del = document.createElement('button');
    del.textContent = "Delete";
    del.onclick = async (e) => {
        e.stopPropagation();
        await deleteTodo(id);
        li.remove(); 
    };

    li.appendChild(del);
    list.appendChild(li);
}

addBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    createTodo(text);
    todolist(text);   

    input.value = "";
};


todolist();
