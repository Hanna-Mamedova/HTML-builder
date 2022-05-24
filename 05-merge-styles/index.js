const path = require('path');
const fs = require('fs');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylePath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;

  
  for (const file of files) {

    const fileExt = path.extname(file.name.toString());
    const filePath = path.join(stylePath, file.name);

    if(file.isFile() && fileExt == '.css') {

      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
                
        fs.appendFile(bundlePath, data.toString(), (err) => {
          if(err) throw err;
          console.log(`${file.name} added to bundle file`);
        });
      });
    
    }
  }
});





