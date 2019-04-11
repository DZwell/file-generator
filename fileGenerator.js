const fs = require('fs');
const shell = require('shelljs');

const {
  compFileBoilerplate,
  indexContents,
  sfcBoilerplate,
  sfcTestFileBoilerplate,
  testFileBoilerplate
} = require('./fileContents');

const {
getComponentNameFromDirName,
writeToParent
} = require('./helpers');

const dirName = process.argv[2];
const shouldWriteToParentIndex = process.argv.includes('--parent');
const isSFC = process.argv.includes('--sfc');
const hasNoContentFlag = process.argv.includes('--no-content')
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
    contents: isSFC ? sfcTestFileBoilerplate(componentName, dirName) : testFileBoilerplate(componentName, dirName),
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

  if (!hasNoContentFlag) {
    if (config.contents) {
      fs.writeFile(fileName, config.contents, (err) => {
        if (err) {
          console.log('Something went wrong: ', err);
        }
      });
    }
  } else {
    fs.writeFile('index.js', indexContents(dirName), (err) => {
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
