import {exec} from "child_process";

exec('echo 3', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Echoed: '+stdout);
})