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
const alertEl = document.querySelector("#alert");
const clearEl = document.querySelector("#clearBtn");
const removeBtnEl = document.querySelector("#removeBtn");

function renderTodos(filteredTodos = state.todos) {
  // empty list so we don't get it twice
  list.innerHTML = "";
  // render initial state: show list of lis with checkboxes
  filteredTodos.forEach((todo) => {
    // create li for each todo
    const todoListElement = document.createElement("li");
    // add li to list
    list.appendChild(todoListElement);

    // create input element checkbox for each li
    const todoCheckbox = document.createElement("input");
    // give input element type checkbox
    todoCheckbox.type = "checkbox";
    // add id to checkbox (semantic coding)
    todoCheckbox.id = "todo-" + todo.id;
    // link state checked to todo state done
    todoCheckbox.checked = todo.done;
    // save done state to local storage
    todoCheckbox.addEventListener("change", () => {
      todo.done = !todo.done;
      saveTodosToLocalStorage();
    });

    // create label for checkbox
    const todoDescription = document.createElement("label");
    // label for attribute is always equal to id of its input element
    todoDescription.HTMLfor = todoCheckbox.id;
    // link description variable to description in state
    todoDescription.innerText = todo.description;

    // add checkbox and description text to li
    todoListElement.append(todoCheckbox, todoDescription);
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
const addNewTodos = () => {
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
    alertEl.textContent = "This to do already exists in your list!";
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
  addNewTodos();
});

const filterWrapper = document.querySelector("#filter-form");

filterWrapper.addEventListener("change", filterToDos);

function filterToDos(event) {
  const fiTodos = event.target;
  const currentFilterOption = fiTodos.id;
  if (currentFilterOption === "filterDone") {
    let filteredTodosDone = state.todos.filter((todo) => todo.done);
    renderTodos(filteredTodosDone);
  } else if (currentFilterOption === "filterOpen") {
    let filteredTodosOpen = state.todos.filter((todo) => !todo.done);
    renderTodos(filteredTodosOpen);
  } else {
    renderTodos();
  }
}

renderTodos();

// add Clear list button that empties local storage, list and input field
clearEl.addEventListener("click", () => {
  localStorage.removeItem("currentTodos");
  // Empty state.todos
  state.todos = [];
  // empty input field
  inputTodoEl.value = "";
  // Render empty list
  renderTodos();
});

// add Remove done to dos button
removeBtnEl.addEventListener("click", () => {
  // filter the to dos that aren't done
  state.todos = state.todos.filter((todo) => !todo.done);

  // store the open todos in localStorage
  saveTodosToLocalStorage();

  // render updated to dos
  renderTodos();
});
