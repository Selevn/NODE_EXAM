const { fork } = require("child_process");

console.log("Running main.js");
console.log("Forking a new subprocess....");

const child = fork("child.js");

setTimeout(() => {
    child.send(29);
}, 2000);

child.on("close", function (code) {
    console.log("child process exited with code " + code);
});