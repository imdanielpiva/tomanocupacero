const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const execPromise = promisify(exec);

const mainPath = path.dirname(fs.realpathSync(__filename));
const windowsScript = path.join(mainPath, './forWindows.jscript');
const soundPath = path.join(mainPath, './audios/tomanocupacero');

const tomaNoCuParcero = () => {
  const commandsForEachPlatform = {
    linux: `paplay ${soundPath}.ogg`,
    darwin: `afplay ${soundPath}.mp3`,
    win32: `cscript /E:JScript /nologo "${windowsScript}" "${soundPath}.mp3"`,
  };

  const platform = process.platform;
  const codeToExecute = commandsForEachPlatform[platform];

  return execPromise(codeToExecute);
};

module.exports = tomaNoCuParcero;