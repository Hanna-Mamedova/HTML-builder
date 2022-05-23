const path = require('path');
const fs = require('fs');

const secretFolderPath = path.join(__dirname, 'secret-folder');

// прочесть содержимое папки
fs.readdir(secretFolderPath, {withFileTypes: true}, (err, files) => {
  if(err) throw err;

  for (const file of files) {

    if(file.isFile()) {
        
      // имя файла
      const fileName = file.name;

      // расширение файла
      const fileExt = path.extname(file.name.toString());

      // размер файла
      const filePath = path.join(secretFolderPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        const fileSize = (stats.size / 1024);
        console.log(`${fileName.replace(fileExt, '')}-${fileExt.slice(1)}-${fileSize}kb`);
      });
    } 
  }
} );

