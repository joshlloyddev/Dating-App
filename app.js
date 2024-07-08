document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter button');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskId = e.target.parentElement.dataset.id;
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }

        if (e.target.classList.contains('toggle')) {
            const taskId = e.target.parentElement.dataset.id;
            const task = tasks.find(task => task.id === parseInt(taskId));
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            renderTasks(tasks, filter);
        });
    });

    function renderTasks(tasks, filter = 'all') {
        taskList.innerHTML = '';
        tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        }).forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="toggle">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
});