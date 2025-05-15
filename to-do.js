let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function updateUI() {
  const list = document.getElementById("taskList");
  const completedCount = document.getElementById("completedCount");
  const notRequiredCount = document.getElementById("notRequiredCount");

  list.innerHTML = "";
  let completed = 0, notRequired = 0;

  tasks.forEach((task, index) => {
    if (task.filterOut) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-desc">${task.description}</div>
      <div class="timestamp">Created: ${new Date(task.created).toLocaleString()}</div>
    `;

    const btns = document.createElement("div");
    btns.className = "buttons";

    if (!task.status) {
      const completeBtn = document.createElement("button");
      completeBtn.className = "complete";
      completeBtn.innerText = "✅";
      completeBtn.onclick = () => {
        tasks[index].status = "completed";
        tasks[index].filterOut = false;
        saveTasks();
      };

      const removeBtn = document.createElement("button");
      removeBtn.className = "not-needed";
      removeBtn.innerText = "❌";
      removeBtn.onclick = () => {
        tasks[index].status = "notRequired";
        tasks[index].filterOut = false;
        saveTasks();
      };

      btns.appendChild(completeBtn);
      btns.appendChild(removeBtn);
    }

    li.appendChild(btns);
    list.appendChild(li);

    if (task.status === "completed") completed++;
    if (task.status === "notRequired") notRequired++;
  });

  completedCount.innerText = completed;
  notRequiredCount.innerText = notRequired;
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();

  if (title === "") {
    alert("Please enter a task title.");
    return;
  }

  tasks.push({
    title,
    description: desc || "(No description)",
    created: Date.now(),
    status: null,
    filterOut: false
  });

  saveTasks();
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

function filterTasks(type) {
  tasks.forEach(task => {
    if (type === "all") task.filterOut = false;
    else if (type === "completed") task.filterOut = task.status !== "completed";
    else if (type === "notRequired") task.filterOut = task.status !== "notRequired";
  });
  updateUI();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateUI();
}

updateUI();
