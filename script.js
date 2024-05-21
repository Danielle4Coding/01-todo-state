// const filterOptions = ["all", "done", "open"];

const state = {
  // create state variable containing an array of to dos
  // which are objects with keys id, description, done
  todos: [
    // { id: 1, description: "Learn SQL", done: false },
  ],
};

const inputTodoEl = document.querySelector("#new-todo");
const addButtonEl = document.querySelector("#add-todo");
const list = document.querySelector("#list");
const clearEl = document.querySelector("#clearBtn");

function renderTodos() {
  // empty list so we don't get it twice
  list.innerHTML = "";
  // render initial state: show list of lis with checkboxes
  state.todos.forEach((todo) => {
    // create li for each todo
    const todoListElement = document.createElement("li");
    // add li to list
    list.appendChild(todoListElement);

    // create input element checkbox for each li
    const todoCheckbox = document.createElement("input");
    // give input element type checkbox
    todoCheckbox.type = "checkbox";
    // link state checked to todo state done
    todoCheckbox.checked = todo.done;
    // save done state to local storage
    todoCheckbox.addEventListener("change", () => {
      todo.done = todoCheckbox.checked;
      saveTodosToLocalStorage();
    });
    // add checkbox to li
    todoListElement.appendChild(todoCheckbox);

    // create text node with description to li
    const todoDescription = document.createTextNode(todo.description);
    // add description text to li
    todoListElement.appendChild(todoDescription);
  });
}
// define function that saves the current to dos in local storage
function saveTodosToLocalStorage() {
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
}

function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}

// initial execution of function load to dos
loadTodosFromLocalStorage();
renderTodos();
const renderNewTodos = () => {
  // store trimmed description in variable
  const trimmedDescription = inputTodoEl.value.trim();
  // check for duplicates
  let isDuplicate = false;
  state.todos.forEach((todo) => {
    // if new input is already in todos array update isDuplicate
    if (trimmedDescription.toLowerCase() === todo.description.toLowerCase()) {
      isDuplicate = true;
    }
  });
  // if variable turns true terminate function
  if (isDuplicate) {
    return;
  }
  // create new item for todos array
  if (trimmedDescription) {
    const newTodo = {
      id: state.todos.length + 1,
      description: trimmedDescription,
      done: false,
    };
    // add new todo to array and save in local storage
    state.todos.push(newTodo);
    saveTodosToLocalStorage();
    // render state
    renderTodos();
    // empty input field
    inputTodoEl.value = "";
  }
};
// if button Add To Do is clicked, create list of new state
addButtonEl.addEventListener("click", () => {
  renderNewTodos();
});
// if Enter or space keys are pressed, create list of new state
const KeyPressed = (evt) => {
  if (evt.keyCode == "13" || evt.keyCode == "32") {
    renderNewTodos();
  }
};
inputTodoEl.addEventListener("keydown", KeyPressed);

// add Clear list button
clearEl.addEventListener("click", () => {
  localStorage.removeItem("currentTodos");
  // Empty state.todos
  state.todos = [];
  // Render empty list
  renderTodos();
});
