const form = document.getElementById("projectForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const tech = document.getElementById("tech").value;
  const image = document.getElementById("image").value;

  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, tech, image })
  });

  const data = await res.text();
  document.getElementById("msg").innerText = data;

  loadProjects();
});

// ✅ Load Projects
async function loadProjects() {
  const res = await fetch("/api/projects");
  const data = await res.json();

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  data.forEach(project => {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${project.image}" width="100%" style="border-radius:10px;">
      <h3>${project.title}</h3>
      <p>${project.tech}</p>
      <button onclick="deleteProject('${project._id}')">Delete</button>
      <button onclick="editProject('${project._id}', '${project.title}', '${project.tech}')">Edit</button>
    `;
    list.appendChild(div);
  });
}

window.onload = loadProjects;
async function deleteProject(id) {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE"
  });

  const data = await res.text();
  alert(data);

  loadProjects(); // refresh list
}

async function editProject(id, oldTitle, oldTech) {
  const newTitle = prompt("Enter new title:", oldTitle);
  const newTech = prompt("Enter new tech:", oldTech);

  if (!newTitle || !newTech) return;

  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: newTitle, tech: newTech })
  });

  const data = await res.text();
  alert(data);

  loadProjects(); // refresh
}
const image = document.getElementById("image").value;
