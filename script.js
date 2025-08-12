// Theme
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

// Clock
function updateClock() {
  const now = new Date();
  const use24h = localStorage.getItem('clock24h') === 'true';
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  });
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Project Modal
const modal = document.getElementById('projectModal');
document.getElementById('addProjectBtn').onclick = () => {
  modal.style.display = 'flex';
};
document.getElementById('cancelProject').onclick = () => {
  modal.style.display = 'none';
};

document.getElementById('createProject').onclick = () => {
  const name = document.getElementById('projectName').value.trim();
  const desc = document.getElementById('projectDesc').value.trim();
  if (!name) return alert('Name required');
  addProjectTile(name, desc);
  modal.style.display = 'none';
  saveProject(name, desc);
};

// Dashboard + Recent Projects
const dashboard = document.getElementById('dashboard');
const recentProjects = document.getElementById('recentProjects');

function addProjectTile(name, desc) {
  const div = document.createElement('div');
  div.className = 'tile';
  div.textContent = name;
  div.title = desc;
  div.onclick = () => {
    updateRecent(name);
    alert(`Opening project: ${name}`);
  };
  dashboard.appendChild(div);
}

function updateRecent(name) {
  recentProjects.innerHTML = '';
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.textContent = name;
  recentProjects.appendChild(tile);
}

// Persistent Projects
function saveProject(name, desc) {
  const stored = JSON.parse(localStorage.getItem('projects') || '[]');
  stored.push({ name, desc });
  localStorage.setItem('projects', JSON.stringify(stored));
}

function loadProjects() {
  const stored = JSON.parse(localStorage.getItem('projects') || '[]');
  stored.forEach(({ name, desc }) => addProjectTile(name, desc));
}
loadProjects();
