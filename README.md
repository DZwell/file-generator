# file-generator

A simple program that generates the necesarry files for a new React component:
`tsx`,
`test.tsx`,
`less`

It also writes some boilerplate code to each file.

Run steps:
1. `git clone https://github.com/DZwell/file-generator.git`
2. `cd file-generator`
3. `npm install`
4. `node fileGenerator.js [NAME OF YOUR COMPONENT]`
  - Options:
    - `-parent` -- Writes to the parent level `index.js`
    - `-sfc` -- Creates a stateless functional component