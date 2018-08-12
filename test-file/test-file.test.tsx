import * as React from 'react;'
 
import { Enzyme } from '';

import { TestFile } from './test-file'


describe('TestFile', () => {
  let comp;
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<TestFile />);
    comp = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
    expect(comp).toBeInstanceOf(TestFile);
  });
});