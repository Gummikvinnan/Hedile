function startHedile() {
  const filename = prompt("Enter a name for your new file:");
  if (!filename) return;

  let files = JSON.parse(localStorage.getItem("hedileFiles") || "[]");
  if (!files.includes(filename)) {
    files.push(filename);
    localStorage.setItem("hedileFiles", JSON.stringify(files));
    localStorage.setItem(filename, "");
  }

  renderFileList();
  editFile(filename);
}

function renderFileList() {
  const fileList = document.getElementById("fileList");
  const files = JSON.parse(localStorage.getItem("hedileFiles") || "[]");
  fileList.innerHTML = "<h3>Your Files:</h3>";
  files.forEach((file) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = file;
    link.onclick = () => editFile(file);
    fileList.appendChild(document.createElement("li")).appendChild(link);
  });
}

function editFile(filename) {
  const editor = document.getElementById("editor");
  editor.innerHTML = `
    <h3>Editing: ${filename}</h3>
    <textarea id="codeArea" style="width: 100%; height: 150px;">${localStorage.getItem(filename)}</textarea>
    <br>
    <button onclick="saveFile('${filename}')">Save</button>
  `;
}

function saveFile(filename) {
  const content = document.getElementById("codeArea").value;
  localStorage.setItem(filename, content);
  alert("Saved!");
}

// Load files when page loads
window.onload = renderFileList;
