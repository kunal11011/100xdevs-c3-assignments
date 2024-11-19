const allTodos = {
    todo : [],
    inprg : [],
    undrw : [],
    finish : [],
}
//       {
//     id: 1,
//     title: "task 1",
//     description: "task 1 details",
//     category: "todo",
//   },
//   {
//     id: 2,
//     title: "task 2",
//     description: "task 2 details",
//     category: "inprg",
//   },
//   {
//     id: 3,
//     title: "task 3",
//     description: "task 3 details",
//     category: "undrw",
//   },
//   {
//     id: 4,
//     title: "task 4",
//     description: "task 4 details",
//     category: "fnsh",
//   },
// ];

function createTodo(todo) {
    const element = document.createElement("div");
    const cardTitle = document.createElement("div");
    const cardDescription = document.createElement("div");]


    element.className = "card";
    cardTitle.className = "card-title";
    cardDescription.className = "card-description";

    cardTitle.innerText = todo.title;
    cardDescription.innerText = todo.description;

    element.appendChild(cardTitle);
    element.appendChild(cardDescription);

    return element;
}

function deleteTodo() {
    console.log("Delete Todo called");
    
}