const compFileBoilerplate = (comp, dir) => {
  return `import * as React from 'react';

import * as styles from './${dir}.less';


export class ${comp} extends React.Component<any> {
  
  render() {
    return (
      <div></div>
    );
  }
};`;
}

const testFileBoilerplate = (comp, dir) => {
  return `import * as React from 'react';
 
import { Enzyme } from '';

import { ${comp} } from './${dir}';


describe('${comp}', () => {
  let comp;
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<${comp} />);
    comp = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
    expect(comp).toBeInstanceOf(${comp});
  });
});`;
}

const indexContents = dir => `export * from './${dir}';\n`;

module.exports = {
  compFileBoilerplate,
  indexContents,
  testFileBoilerplate
};