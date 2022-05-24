const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'files');
const fileCopyPath = path.join(__dirname, 'files-copy');

function copyDir () {

  // delete directory
  fs.rm(fileCopyPath, { recursive: true }, () => {
    fs.mkdir(fileCopyPath, {recursive: true, force: true}, (err) => {
      if(err) throw err;
    } );

    fs.readdir(filePath, (err, files) => {
        
      if(err) throw err;
    
      for (const file of files) {
    
        // copy each file to files-copy
        fs.copyFile((path.join(filePath, file)), (path.join(fileCopyPath, file)), () => {
          console.log(`file ${file} copied`);
        });
      }
    });
  });
}

copyDir();