// const filterOptions = ["all", "done", "open"];

const todoAppState = {
  /* filter: "all", */
  todos: [
    { description: "Learn SQL", done: false },
    { description: "Learn HTML", done: true },
    { description: "Learn CSS", done: true },
  ],
};

function renderTodos() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  todoAppState.todos.forEach((todo) => {
    const todoLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", (e) => {
      const newTodoDoneState = e.target.checked;
      todo.done = newTodoDoneState;
    });

    todoLi.append(checkbox);

    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    list.append(todoLi);
  });
}

renderTodos();
