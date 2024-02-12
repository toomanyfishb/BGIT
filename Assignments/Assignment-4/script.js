// Task Manager homework

// Define the Task class
class Task {
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}

// Define Task Manager class
class TaskManager {
  constructor() {
    this.tasks = []; // Array to store the tasks
  }
  // Method to add a new task to the task manager
  addTask(description) {
    // Generate a unique ID for the task using the current time stamp
    setTimeout(() => {
      const id = Date.now();
      // Create a new task object
      const task = new Task(id, description, false);
      // Add the new task to the tasks array
      this.tasks.push(task)
      console.log('Task added:', task);
    }, 1000);
  }

  // Method to complete task
  completeTasks(id) {
    // Find the task in the task manager
    setTimeout(() => {
      const task = this.tasks.find(task => task.id === id);
        if (task) {
          task.completed = true;
          console.log('Task Completed', task);
        } else {
          console.log('Task not found');
        }
      }, 1000);
    }

  // Method to get completed tasks
  getCompletedTasks() {
    // Filter the tasks array to get the completed tasks
    setTimeout(() => {
      const completedTasks = this.tasks.filter(task => task.completed);
      console.log('Completed tasks:', completedTasks);
    }, 1000);
  }
}

// Create a new instance of the Task Manager class
const taskManager = new TaskManager();

// Add a new task
taskManager.addTask('Buy Groceries');

// Complete a task
taskManager.completeTasks(123);

// Get completed tasks
taskManager.getCompletedTasks();