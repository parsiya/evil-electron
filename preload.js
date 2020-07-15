// Detect the operating system.
import { platform } from "process";

// Commands
const win32Command = "start cmd.exe";
const darwinCommand = "'/System/Applications/Terminal.app/Contents/MacOS/Terminal',function(){}";
const linuxCommand = "/bin/bash";

var command = "";

switch (platform) {
    case "win32":
        command = win32Command;
        break;
    case "darwin":
        command = darwinCommand;
        break;
    case "linux":
        command = linuxCommand;
        break;
}

if (command === "") {
    console.log(`Operating system '${platform}' is not supported.`);
} else {
    // Spawn a command prompt.
    require('child_process').exec(command);
}






