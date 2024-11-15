/* Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks. */

const fs = require("fs");

async function writeToFile() {
  await fs.writeFile("./4-write-to-file.md", "Hello", "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("File writing Done");
}

writeToFile();
