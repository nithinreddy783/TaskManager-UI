const API_URL = "http://localhost:8080/api/tasks"; // Update with your backend URL

export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions?: any[];
}

// Fetch all tasks
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);
  return response.json();
}

// Create a new task
export async function createTask(task: Task): Promise<Task> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}
//Delete Task
export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
