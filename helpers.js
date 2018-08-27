const lineReader = require('line-reader');

/**
 * @param {String} name 
 * 
 * Transfrom my-comp -> MyComp
 * or my-comp.dialog -> MyCompDialog
 */
const getComponentNameFromDirName = name => {
  if (name.includes('-') || name.includes('.')) {
    const stringArr = name.split(/-|\./)
    return stringArr.map(part => `${part.charAt(0).toUpperCase()}${part.substr(1)}`).join('');
  }
  return `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
}

function writeToParent(dir) {
  let exportFilesString = '';
  const exportedFiles = [dir];

  lineReader.eachLine('../index.js', (line, last) => {
    const dir = line.split('./')[1];
    const formattedDir = dir.replace("';", '');
    exportedFiles.push(formattedDir);

    if (last) {
      exportedFiles.sort();

      exportedFiles.forEach(item => {
        exportFilesString += `export * from './${item}';\n`;
      });
      fs.writeFile('../index.js', exportFilesString, (err) => {
        if (err) { throw err }
      });
    }
  });
}

module.exports = {
  getComponentNameFromDirName,
  writeToParent
};