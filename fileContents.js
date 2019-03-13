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

const sfcBoilerplate = (comp, dir) => {
  return `import * as React from 'react';

import * as styles from './${dir}.less';

interface ${comp}Props {

}

export const ${comp}: React.SFC<${comp}Props> = (props) => {
  return <div></div>;
}`
};

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

const sfcTestFileBoilerplate = (comp, dir) => {
  return `import * as React from 'react';

import { Enzyme } from '';

import { ${comp} } from './${dir}';

describe('${comp}', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<${comp} />);
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
  });
});`;
}

const indexContents = dir => `export * from './${dir}';\n`;

module.exports = {
  compFileBoilerplate,
  indexContents,
  sfcBoilerplate,
  sfcTestFileBoilerplate,
  testFileBoilerplate
};