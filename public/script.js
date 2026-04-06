const form = document.getElementById("projectForm");

let editId = null; // ✅ for edit feature

// ================= ADD / UPDATE =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const project = {
    title: document.getElementById("title").value,
    tech: document.getElementById("tech").value,
    image: document.getElementById("image").value
  };

  // ✅ VALIDATION
  if (!project.title || !project.tech || !project.image) {
    alert("Please fill all fields!");
    return;
  }

  let url = "/api/projects";
  let method = "POST";

  // ✅ EDIT MODE
  if (editId) {
    url = "/api/projects/" + editId;
    method = "PUT";
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  });

  const msg = await res.text();
  document.getElementById("msg").innerText = msg;

  form.reset();
  editId = null;
  loadProjects();
});

// ================= LOAD PROJECTS =================
async function loadProjects() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block"; // ✅ show loading

  const res = await fetch("/api/projects");
  const data = await res.json();

  if (loading) loading.style.display = "none"; // ✅ hide loading

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("project-card");

    div.innerHTML = `
      <img src="${p.image}" alt="project image" />
      <h3>${p.title}</h3>
      <p>${p.tech}</p>

      <button onclick="editProject('${p._id}', '${p.title}', '${p.tech}', '${p.image}')">Edit</button>
      <button onclick="deleteProject('${p._id}')">Delete</button>
    `;

    list.appendChild(div);
  });
}

// ================= EDIT =================
function editProject(id, title, tech, image) {
  document.getElementById("title").value = title;
  document.getElementById("tech").value = tech;
  document.getElementById("image").value = image;

  editId = id;
}

// ================= DELETE =================
async function deleteProject(id) {
  if (confirm("Are you sure you want to delete?")) {
    await fetch("/api/projects/" + id, {
      method: "DELETE"
    });

    loadProjects();
  }
}

// ================= SEARCH =================
async function searchProjects() {
  const input = document.getElementById("search").value.toLowerCase();

  const res = await fetch("/api/projects");
  const data = await res.json();

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  const filtered = data.filter(p =>
    p.title.toLowerCase().includes(input) ||
    p.tech.toLowerCase().includes(input)
  );

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("project-card");

    div.innerHTML = `
      <img src="${p.image}" />
      <h3>${p.title}</h3>
      <p>${p.tech}</p>

      <button onclick="editProject('${p._id}', '${p.title}', '${p.tech}', '${p.image}')">Edit</button>
      <button onclick="deleteProject('${p._id}')">Delete</button>
    `;

    list.appendChild(div);
  });
}

// ================= DARK MODE =================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ================= AUTO LOAD =================
loadProjects();
