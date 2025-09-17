const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "../img/rennkalender");
  let files = [];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => f.match(/\.(jpg|jpeg|png|gif)$/i))
      .map((f) => {
        // Try to read a title and description from a .txt file with the same name
        let base = path.parse(f).name;
        const txtPath = path.join(dir, base + ".txt");
        let title = base;
        let desc = "";
        if (fs.existsSync(txtPath)) {
          const txtContent = fs.readFileSync(txtPath, "utf-8").trim();
          // If the txt file has multiple lines, use the first as title, the rest as description
          const lines = txtContent.split(/\r?\n/);
          title = lines[0];
          desc = lines.slice(1).join("\n");
        }
        return {
          img: `/img/rennkalender/${f}`,
          title,
          desc,
          date: fs.statSync(path.join(dir, f)).mtime,
        };
      })
      .sort((a, b) => a.date - b.date);
  } catch (e) {}
  return files;
};
