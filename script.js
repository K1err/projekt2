const url = 'https://tinkr.tech/sdb/keir_todo/keir_todo/';

async function showTodos() {
  const res = await fetch(url);
  const data = await res.json();
  const list = document.querySelector('#todo-list');
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.onclick = () => li.classList.toggle('completed');

    const del = document.createElement('button');
    del.textContent = "Delete";
    del.onclick = async (e) => {
      e.stopPropagation();
      await fetch(url + todo.id, { method: "DELETE" });
      li.remove();
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

document.querySelector('#add-btn').onclick = async () => {
  const input = document.querySelector('#todo-input');
  if (input.value == "") return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  showTodos();
};

showTodos();