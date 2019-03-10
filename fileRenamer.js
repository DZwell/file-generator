const fs = require('fs');
const shell = require('shelljs');

const { getComponentNameFromDirName } = require('./helpers');

const fileExtentions = ['tsx', 'less', 'test.tsx', 'less.d.ts'];

const originalDir = process.argv[2];
const renamedDir = process.argv[3];

shell.mv(originalDir, renamedDir);

shell.cd(renamedDir);

fileExtentions.forEach(ext => {
  if (fs.existsSync(`${originalDir}.${ext}`)) {
    shell.mv(`${originalDir}.${ext}`, `${renamedDir}.${ext}`);
  }
});



