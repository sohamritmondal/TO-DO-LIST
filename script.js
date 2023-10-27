document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const taskList = document.getElementById("tasks");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to refresh the task list
    function refreshTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `<span class="${task.completed ? "completed" : ""}">${task.text}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>`;
            taskList.appendChild(taskItem);

            // Add event listeners for editing and deleting tasks
            const editButton = taskItem.querySelector(".edit-button");
            const deleteButton = taskItem.querySelector(".delete-button");

            editButton.addEventListener("click", () => {
                const updatedText = prompt("Edit task:", task.text);
                if (updatedText) {
                    tasks[index].text = updatedText;
                    saveTasks();
                }
            });

            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
            });

            taskItem.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
            });
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        refreshTasks();
    }

    // Add a new task
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value;
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            taskInput.value = "";
        }
    });

    // Initialize the task list
    refreshTasks();
});
