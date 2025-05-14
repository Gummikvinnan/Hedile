function startHedile() {
  const filename = prompt("Enter a name for your new file:");

  if (filename) {
    const content = "";
    localStorage.setItem(filename, content);
    alert(`File "${filename}" has been created and saved in your browser.`);
    displayFiles();
  } else {
    alert("No file name provided.");
  }
}

function displayFiles() {
  const fileListDiv = document.getElementById("fileList");
  fileListDiv.innerHTML = "<h3>Your Files:</h3>";

  if (localStorage.length === 0) {
    fileListDiv.innerHTML += "<p>No files yet.</p>";
    return;
  }

  const ul = document.createElement("ul");

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";

    const filenameSpan = document.createElement("span");
    filenameSpan.textContent = key;
    filenameSpan.style.color = "#6c4dd8";
    filenameSpan.style.cursor = "pointer";
    filenameSpan.onclick = function () {
      openFile(key);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = function () {
      if (confirm(`Are you sure you want to delete "${key}"?`)) {
        localStorage.removeItem(key);
        displayFiles();
        document.getElementById("editor").innerHTML = "";
      }
    };

    li.appendChild(filenameSpan);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  }

  fileListDiv.appendChild(ul);
}

function openFile(filename) {
  const content = localStorage.getItem(filename);
  const editorDiv = document.getElementById("editor");

  editorDiv.innerHTML = `
    <h3>Editing: ${filename}</h3>
    <textarea id="editArea" rows="10" style="width:100%; font-family:monospace;">${content}</textarea>
    <button onclick="saveFile('${filename}')">Save</button>
    <button onclick="downloadFile('${filename}')">Download</button>
  `;
}

function saveFile(filename) {
  const newContent = document.getElementById("editArea").value;
  localStorage.setItem(filename, newContent);
  alert(`Changes saved to "${filename}".`);
}

function downloadFile(filename) {
  const content = document.getElementById("editArea").value;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

window.onload = displayFiles;