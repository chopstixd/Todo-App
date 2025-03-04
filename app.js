const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") return; // Prevent adding empty todos

  const todoObject = {
    text: todoText,
    completed: false,
  };

  allTodos.push(todoObject);
  updateTodoList();
  saveTodos();
  todoInput.value = "";
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.appendChild(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  todoLI.innerHTML = ` 
    <input type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}"></label>
    <label for="${todoId}" class="todo-text">
      ${todo.text}
    </label>
    <button class="delete-button">
      <img
        src="./material-symbols-light_delete-outline-sharp.png"
        alt="delete-icon"
      />
    </button>
  `;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoLI.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;

  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
