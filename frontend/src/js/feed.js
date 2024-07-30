fetch('http://localhost:3000/api/tasks')
  .then((response) => response.json())
  .then((tasks) => console.log(tasks));
