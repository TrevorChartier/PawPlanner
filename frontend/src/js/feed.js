fetch('http://localhost:3000/api/tasks')
    .then(response => response.json())
    .then(tasks => {
        const tasksContainer = document.getElementById('tasks-container');
        
        // Fetch pet name of task
        function fetchPetName(petId) {
            return fetch(`http://localhost:3000/api/pets/${petId}`)
                .then(response => response.json())
                .then(pet => pet.name)
                .catch(() => 'No Pet Name');
        }

        // Create an array of promises for each task
        const taskPromises = tasks.map(task => {
            return fetchPetName(task.pet_id)
                .then(petName => {
                    const taskHTML = `
                        <div class="task-box">
                            <input type="checkbox" class="check-box" value="${task.id}">
                            <div class="task-content">
                                <div class="task-details">
                                    <div class="task-name">
                                        <p>${task.title || 'No Title'}</p>
                                    </div>
                                    <p class="pet-name">: ${petName}</p>
                                </div>
                                <time datetime="${task.title}">${task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Invalid Date'}</time>
                            </div>
                            <button class="edit-task-button">
                                <img src="assets/edit_icon.png" alt="Edit">
                            </button>
                            <button class="delete-task-button">
                                <img src="assets/delete_icon.png" alt="Delete">
                            </button>
                        </div>
                    `;
                    return taskHTML;
                });
        });

        // Wait for all task promises to resolve and update the DOM
        Promise.all(taskPromises)
            .then(taskHTMLArray => {
                tasksContainer.innerHTML = taskHTMLArray.join('');
            })
            .catch(error => console.error('Error fetching tasks or pets:', error));
    })
    .catch(error => console.error('Error fetching tasks:', error));