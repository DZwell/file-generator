const fs = require('fs');
var lineReader = require('line-reader');
const shell = require('shelljs');

const {
  compFileBoilerplate,
  indexContents,
  testFileBoilerplate
} = require('./fileContents');

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

const dirName = process.argv[2];
const shouldWriteToParentIndex = process.argv[3];
const componentName = getComponentNameFromDirName(dirName);


const fileConfig = [
  {
    extension: 'less',
  },
  {
    extension: 'tsx',
    contents: compFileBoilerplate(componentName, dirName),
  },
  {
    extension: 'test.tsx',
    contents: testFileBoilerplate(componentName, dirName),
  },
  {
    extension: 'js',
    contents: indexContents(dirName),
  }
];


/******** Make folder and files, write contents ********/
console.log('Creating files ...');
shell.mkdir(`./${dirName}`);
shell.cd(dirName);

fileConfig.forEach(config => {
  const fileName = config.extension === 'js' ? 'index.js' : `${dirName}.${config.extension}`;
  shell.touch(fileName);
  console.log(fileName);

  if (config.contents) {
    fs.writeFile(fileName, config.contents, (err) => {
      if (err) {
        console.log('Something went wrong: ', err);
      }
    });
  }
});

function writeToParent() {
  let exportFilesString = '';
  const exportedFiles = [dirName];

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

if (shouldWriteToParentIndex) {
  writeToParent();
}

console.log('Done');
