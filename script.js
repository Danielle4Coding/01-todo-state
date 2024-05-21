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

// initial use of function load to dos
loadTodosFromLocalStorage();
renderTodos();
// if button Add To Do is clicked, empty list and create list of new state
addButtonEl.addEventListener("click", () => {
  // store trimmed description in variable
  const trimmedDescription = inputTodoEl.value.trim();
  // check for duplicates
  let isDuplicate = false;
  state.todos.forEach((todo) => {
    // if new input is already in todos array update isDuplicate
    if (trimmedDescription === todo.description) {
      isDuplicate = true;
    }
  });
  // if variable turns true terminate function
  if (isDuplicate) {
    return;
  }
  // if
  if (trimmedDescription) {
    const newTodo = {
      id: state.todos.length + 1,
      description: trimmedDescription,
      done: false,
    };
    state.todos.push(newTodo);
    saveTodosToLocalStorage();
    renderTodos();
    inputTodoEl.value = "";
  }
});

clearEl.addEventListener("click", () => {
  localStorage.removeItem("currentTodos");
  // Empty state.todos
  state.todos = [];
  // Render empty list
  renderTodos();
});
/*
// create function that renders a list element for each to do with checkbox and description
// and an event handler that updates the done status in the state
function renderTodos() {
  // create variable containing the list reference
  const list = document.querySelector("#list");
  // set list to an empty string/ empty list
  list.innerHTML = "";

  // create list item for each item of todos array
  state.todos.forEach((todo) => {
    const todoLi = document.createElement("li");

    // create checkbox for each item of todos array
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // if checkbox is checked, give item property done: true
    checkbox.checked = todo.done;

    // add Eventhandler to checkbox if checkbox is changed
    checkbox.addEventListener("change", (e) => {
      // create variable that stores state of checkbox
      const newTodoDoneState = e.target.checked;
      todo.done = newTodoDoneState;
    });

    // after creating a new element it needs to be appended to the li node
    todoLi.appendChild(checkbox);

    // create variable creating a text node containing the input (to do description)
    const todoText = document.createTextNode(todo.description);
    // append text to li
    todoLi.appendChild(todoText);
    // append li to list
    list.appendChild(todoLi);
  });
}

renderTodos();

function updateTodoStatus(todoId, newStatus) {
  const todoToUpdate = state.todos.find((todo) => todo.id === todoId);
  console.log(todoToUpdate);
  if (todoToUpdate) {
    todoToUpdate.done = newStatus;
    renderTodos(); // Update the UI after changing the state
  }
}

function handleCheckboxChange(todoId) {
  return function (e) {
    updateTodoStatus(todoId, e.target.checked);
  };
}

function renderTodos() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  state.todos.forEach((todo) => {
    const todoLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", handleCheckboxChange(todo.id));

    todoLi.appendChild(checkbox);
    const todoText = document.createTextNode(todo.description);
    todoLi.appendChild(todoText);
    list.appendChild(todoLi);
  });
}
*/
