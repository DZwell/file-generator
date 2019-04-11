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

  afterEach(() => {
  });

  describe('Rendering', () => {
    test('Renders', () => {
      expect(wrapper).toBeDefined();
      expect(comp).toBeDefined();
    });
  });

  describe('Lifecycle.', () => {
  });

  describe('Handlers.', () => {
  });

  describe('Helpers.', () => {
  });`
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

  afterEach(() => {
  });

  describe('Rendering', () => {
    test('Renders', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Handlers.', () => {
  });

  describe('Helpers.', () => {
  });`
}

const indexContents = dir => `export * from './${dir}';\n`;

module.exports = {
  compFileBoilerplate,
  indexContents,
  sfcBoilerplate,
  sfcTestFileBoilerplate,
  testFileBoilerplate
};
