const fs = require('fs');
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
const componentName = getComponentNameFromDirName(dirName);

const compFileBoilerplate =
  `import * as React from 'react';

import * as styles from './${dirName}.less';


export class ${componentName} extends React.Component<any> {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div></div>
    );
  }
};`;

const testFileBoilerplate = 
`import * as React from 'react;'
 
import { Enzyme } from '';

import { ${componentName} } from './${dirName}'


describe('${componentName}', () => {
  let comp;
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<${componentName} />);
    comp = wrapper.instance();
  });
});

it('should render', () => {
  expect(wrapper).toBeDefined();
  expect(comp).toBeInstanceOf(${componentName});
});`;

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
  }
];


/******** Make folder and files, write contents ********/
console.log('Creating files ...');
shell.mkdir(`./${dirName}`);
shell.cd(dirName);

fileConfig.forEach(config => {
  shell.touch(`${dirName}.${config.extension}`);
  console.log(`${componentName}.${config.extension}`);

  if (config.contents) {
    fs.writeFile(`${dirName}.${config.extension}`, config.contents, (err) => {
      if (err) {
        console.log('Something went wrong: ', err);
      }
    });
  }
});
console.log('Done');

