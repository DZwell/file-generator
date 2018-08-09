const fs = require('fs');
const shell = require('shelljs');

const dirName = process.argv[2];
const fileExtensions = [
  'less',
  'tsx',
  'test.tsx',
];

const generatedCompName = name => {
  if (name.includes('-')) {
    const stringArr = name.split(/-|\./) 
    for (let i = 0; i < stringArr.length; i++) {
       stringArr[i] = `${stringArr[i].charAt(0).toUpperCase()}${stringArr[i].substr(1)}`;
    }
    return stringArr.join('');
  }
}

const compFileBoilerplate =
  "import * as React from 'react';\n\n" +
  `import * as styles from ./${dirName}.less\n\n\n` +
  `export class ${generatedCompName(dirName)} extends React.Component <any> {\n\n
    render() {\r\t\t\treturn ()\r\t\t}
  }`
  ;

shell.mkdir(`./${dirName}`);
shell.cd(dirName);

fileExtensions.forEach(ext => {
  shell.touch(`${dirName}.${ext}`);
});

fs.writeFile(`${dirName}.tsx`, compFileBoilerplate, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Done');
  }
});
