import * as shell from "shelljs";

// Copy views folder
shell.cp("-R", "src/views", "build/");
// Copy public folder
shell.cp("-R", "src/public", "build/");