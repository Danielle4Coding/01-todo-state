const state = {
  todos: [
    // { id: 1, description: "Learn SQL", done: false },
  ],
};

const inputTodoEl = document.querySelector("#new-todo");
const list = document.querySelector("#list");

//render function needs filtered Todos as parameter so filter function will work
function renderTodos(filteredTodos = state.todos) {
  list.innerHTML = "";
  // render initial state: show list of lis with checkboxes
  filteredTodos.forEach((todo) => {
    // create li for each todo and append to list
    const todoListElement = document.createElement("li");
    list.appendChild(todoListElement);

    // create input element of type checkbox for each li and add id (semantics)
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.id = "todo-" + todo.id;

    // link state checked to todo state done
    todoCheckbox.checked = todo.done;
    // toggle done state with checkbox and save done state to local storage
    todoCheckbox.addEventListener("change", () => {
      todo.done = !todo.done;
      todoDescription.classList.toggle("description--strikeThrough");
      saveTodosToLocalStorage();
    });

    // create label (=description) for checkbox and link to checkbox id
    const todoDescription = document.createElement("label");
    todoDescription.htmlFor = todoCheckbox.id;
    // link description input to description in state
    todoDescription.innerText = todo.description;
    // add checkbox and description text to list
    todoListElement.append(todoCheckbox, todoDescription);
  });
}

function saveTodosToLocalStorage() {
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
}
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}

const addButtonEl = document.querySelector("#add-todo");
const alertEl = document.querySelector("#alert");
// if add button is clicked, update state
addButtonEl.addEventListener("click", () => {
  addNewTodos();
});

const addNewTodos = () => {
  // trim input description and store in variable
  const trimmedDescription = inputTodoEl.value.trim();
  // check for duplicates
  let isDuplicate = false;
  state.todos.forEach((todo) => {
    // if new input is already in todos array (case sensitive) update isDuplicate
    if (trimmedDescription.toLowerCase() === todo.description.toLowerCase()) {
      isDuplicate = true;
    }
  });
  // if variable turns true terminate function
  if (isDuplicate) {
    alertEl.textContent = "This to do already exists in your list!";
    return;
  }

  // create new item for todos array, add to state and store in local storage
  if (trimmedDescription) {
    const newTodo = {
      id: Math.random() * Date.now(),
      description: trimmedDescription,
      done: false,
    };
    state.todos.push(newTodo);
    saveTodosToLocalStorage();

    renderTodos();
    // empty input field
    inputTodoEl.value = "";
  }
};

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

loadTodosFromLocalStorage();
renderTodos();

const removeBtnEl = document.querySelector("#removeBtn");
// add Remove done to dos button, filter open todos and store them in local storage
removeBtnEl.addEventListener("click", () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveTodosToLocalStorage();

  renderTodos();
});

const clearEl = document.querySelector("#clearBtn");
// add Clear list button that empties local storage, list and input field
clearEl.addEventListener("click", () => {
  localStorage.removeItem("currentTodos");
  state.todos = [];
  inputTodoEl.value = "";

  renderTodos();
});

/*
const sortWrapper = document.querySelector("#sort-form");

sortWrapper.addEventListener("change", sortToDos);

function sortToDos(event) {
  const sortedTodos = event.target;
  let sortedToDosDone = state.todos.filter((todo) => todo.done);
  let sortedToDosOpen = state.todos.filter((todo) => !todo.done);
  const currentSortOption = sortedTodos.id;
  if (currentSortOption === "SortDoneFirst") {
    const mergedDoneToDosFirst = sortedToDosDone.concat(sortedToDosOpen);
    console.log(mergedDoneToDosFirst);
    renderTodos(mergedDoneToDosFirst);
  } else if (currentSortOption === "SortOpenFirst") {
    const mergedOpenToDosFirst = sortedToDosOpen.concat(sortedToDosDone);
    console.log(mergedOpenToDosFirst);
    renderTodos(mergedOpenToDosFirst);
  } else {
    renderTodos();
  }
  console.log(sortedTodos);
}
*/
