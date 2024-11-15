// Counter without setInterval

let count = 1;
function counter() {
  console.log("Count is", count);
  count++;
  setTimeout(counter, 1000);
}
counter();
