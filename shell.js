const fs = require('fs');
var lineReader = require('line-reader');
const shell = require('shelljs');

/******** Set up component name and file contents ********/

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
const writeToParentIndex = process.argv[3];
const componentName = getComponentNameFromDirName(dirName);
const writeToParentIndexJs = process.argv[3];

const compFileBoilerplate =
  `import * as React from 'react';

import * as styles from './${dirName}.less';


export class ${componentName} extends React.Component<any> {
  
  render() {
    return (
      <div></div>
    );
  }
};`;

const testFileBoilerplate =
  `import * as React from 'react';
 
import { Enzyme } from '';

import { ${componentName} } from './${dirName}';


describe('${componentName}', () => {
  let comp;
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<${componentName} />);
    comp = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
    expect(comp).toBeInstanceOf(${componentName});
  });
});`;

const indexContents = `export * from './${dirName}';\n`;

const fileConfig = [
  {
    extension: 'less',
  },
  {
    extension: 'tsx',
    contents: compFileBoilerplate,
  },
  {
    extension: 'test.tsx',
    contents: testFileBoilerplate,
  },
  {
    extension: 'js',
    contents: indexContents,
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
    fs.writeFileSync(fileName, config.contents, (err) => {
      if (err) {
        console.log('Something went wrong: ', err);
      }
    });
  }
});

let hasWritten = false;
const exportedFiles = [dirName];

lineReader.eachLine('../index.js', (line) => {
  const dir = line.split('./')[1];
  const formattedDir = dir.replace("';", '');
  exportedFiles.push(formattedDir);
});

exportedFiles.sort();
console.log(exportedFiles.length);

// fs.readFile('../index.js', { encoding: 'utf8' }, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });


console.log('Done');
