const fs = require('fs');
const shell = require('shelljs');

const {
  compFileBoilerplate,
  indexContents,
  sfcBoilerplate,
  testFileBoilerplate
} = require('./fileContents');

const {
getComponentNameFromDirName,
writeToParent
} = require('./helpers');

const dirName = process.argv[2];
const shouldWriteToParentIndex = process.argv.includes('-p');
const isSFC = process.argv.includes('-sfc');
const componentName = getComponentNameFromDirName(dirName);


const fileConfig = [
  {
    extension: 'less',
  },
  {
    extension: 'tsx',
    contents: isSFC ? sfcBoilerplate(componentName, dirName) : compFileBoilerplate(componentName, dirName),
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

if (shouldWriteToParentIndex) {
  writeToParent(dirName);
}

console.log('Done');
