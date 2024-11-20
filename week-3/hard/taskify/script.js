let draggedCard = null;

document.addEventListener("DOMContentLoaded", () => {
  const tasks = getTasks();
  localStorage.setItem("allTodos", JSON.stringify(tasks));
  setDragDrop();
  loadTodos(tasks);
});

function loadTodos(tasks) {
  for (let category in tasks) {
    for (let task of tasks[category]) {
      const element = createTask(task, category);
      addToList(category, element);
    }
  }
}

function saveTasks(task, categoryName) {
  const allTasks = getTasks(categoryName);
  allTasks[categoryName].push(task);
  setTasksToLocalStorage(allTasks);
}

function setTasksToLocalStorage(allTasks) {
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

function getTasks() {
  const localStorageData = localStorage.getItem("allTasks");
  const allTasks = localStorageData
    ? JSON.parse(localStorageData)
    : {
        todo: [],
        inprg: [],
        undrw: [],
        finish: [],
      };
  return allTasks;
}

function createTask(task, categoryName) {
  const element = document.createElement("div");
  const taskTitle = document.createElement("div");
  const taskName = document.createElement("div");
  const deleteBtn = document.createElement("span");
  const taskDescription = document.createElement("div");

  element.className = "task";
  taskTitle.className = "task-title";
  taskDescription.className = "task-description";
  deleteBtn.className = "delete-btn";

  taskName.innerText = task.title;
  deleteBtn.innerHTML = "&times;";
  taskDescription.innerText = task.description;

  element.draggable = true;
  element.dataset.taskId = task.id;

  element.addEventListener("dragstart", (e) => {
    draggedCard = e.target;
  });

  element.addEventListener("dragend", (e) => {
    draggedCard = null;
  });

  deleteBtn.addEventListener("click", () => {
    deleteTask(categoryName, task.id);
  });

  taskTitle.appendChild(taskName);
  taskTitle.appendChild(deleteBtn);

  element.appendChild(taskTitle);
  element.appendChild(taskDescription);

  return element;
}

function addToList(categoryName, element) {
  const categoryElement = document.getElementById(`${categoryName}`);
  const lastChild = categoryElement.lastElementChild;
  categoryElement.insertBefore(element, lastChild);
}

function deleteTask(categoryName, id) {
  const allTasks = getTasks();
  const elementIndex = allTasks[categoryName].findIndex(
    (task) => task.id === id
  );
  allTasks[categoryName].splice(elementIndex, 1);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));

  const categoryElement = document.getElementById(`${categoryName}`);
  categoryElement.children[elementIndex + 1].remove();
}

function addTask(categoryName) {
  const element = document.createElement("div");
  const titleInput = document.createElement("input");
  const descInput = document.createElement("textarea");
  const btnContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

  element.className = "task";
  titleInput.className = "text-input";
  descInput.className = "text-input";
  btnContainer.className = "btn-container";
  cancelBtn.className = "btn";
  saveBtn.className = "btn";

  titleInput.placeholder = "Enter Title";
  descInput.placeholder = "Enter Description";
  cancelBtn.innerText = "Cancel";
  saveBtn.innerText = "Save";

  cancelBtn.addEventListener("click", () => {
    element.remove();
  });

  saveBtn.addEventListener("click", () => {
    if (!titleInput.value || !descInput.value) return;
    const taskObj = {
      id: Date.now().toString(),
      title: titleInput.value,
      description: descInput.value,
    };
    const newElement = createTask(taskObj, categoryName);
    addToList(categoryName, newElement);
    element.remove();
    saveTasks(taskObj, categoryName);
  });

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(saveBtn);
  element.appendChild(titleInput);
  element.appendChild(descInput);
  element.append(btnContainer);

  addToList(categoryName, element);
}

function setDragDrop() {
  const categoryList = document.querySelectorAll(".category");

  categoryList.forEach((category) => {
    category.addEventListener("dragover", (e) => {
      e.preventDefault();
      category.classList.add("hovered");
    });

    category.addEventListener("dragleave", (e) => {
      e.preventDefault();
      category.classList.remove("hovered");
    });

    category.addEventListener("drop", (e) => {
      e.preventDefault();
      let taskIndex = null;
      let sourceCategory = null;
      let taskObj = null;

      const allTasks = getTasks();
      for (const category in allTasks) {
        taskIndex = allTasks[category].findIndex(
          (task) => task.id === draggedCard.dataset.taskId
        );
        if (taskIndex !== -1) {
          sourceCategory = category;
          taskObj = allTasks[category][taskIndex];
          break;
        }
      }

      const taskElement = createTask(taskObj, category.id);
      addToList(category.id, taskElement);
      deleteTask(sourceCategory, taskObj.id);
      allTasks[sourceCategory].splice(taskIndex, 1);
      allTasks[category.id].push(taskObj);
      setTasksToLocalStorage(allTasks); 
      category.classList.remove("hovered");
    });
  });
}
