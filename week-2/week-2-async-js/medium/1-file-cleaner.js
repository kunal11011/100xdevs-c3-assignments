/* ## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
``` */

const fs = require("fs");

function cleanFile() {
  fs.readFile("./test-file.md", "utf-8", (err, data) => {
    if (err) {
      console.log("Error while reading a file.");
    }
    const newContent = `Old Content ==> 
    ${data}
    --------------------------------------
    New Content ==> 
    ${data.replace(/\s+/g, " ")}`;
    fs.writeFile("./test-file.md", newContent, "utf-8", (err) => {
      if (err) {
        console.log("Error while writing file.");
      }
      console.log("Replaced content: \n", newContent);
    });
  });
}

cleanFile();
