const fs = require("fs");
const path = require("path");
const reversionPath = path.join(__dirname, "reversion.json");
const revisions = JSON.parse(fs.readFileSync(reversionPath).toString());
for (const revision of revisions) {
  const data = fs.readFileSync(revision.filePath);
  let _data = data.toString();
  for (const edit of revision.edits) {
    _data = _data.replace(new RegExp(edit.insertedLine, "g"), edit.removedLine);
  }
  fs.writeFileSync(revision.filePath, _data);
}

fs.unlinkSync(reversionPath);
console.log("files reverted");
