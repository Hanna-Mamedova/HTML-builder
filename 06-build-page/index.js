const path = require('path');
const fs = require('fs');


const distDir = path.join(__dirname, 'project-dist');

const assetsDir = path.join(__dirname, 'assets');
const assetsDirCopy = path.join(distDir, 'assets');


function copyFolder(folderPath, folderPathCopy) {
  fs.rm(folderPathCopy, { recursive: true }, () => {
        
    fs.mkdir(folderPathCopy, {recursive: true, force: true}, (err) => {
      if(err) throw err;
    } );

    fs.readdir(folderPath, {withFileTypes: true}, (err, contents) => {
          
      if(err) throw err;
            
      for (const content of contents) {
      
        const contentPath = path.join(folderPath, content.name);
        const contentPathCopy = path.join(folderPathCopy, content.name);
            
        if(content.isDirectory()) {
          copyFolder(contentPath, contentPathCopy);
        }
        
        if(content.isFile()) {
          copyFile(contentPath, contentPathCopy, content.name);
        }
      }
    });
  });   
}

function copyFile(from, to, file) {
  fs.copyFile(from, to, () => {
    console.log(`file ${file} copied`);
  });
}

function createAssetsCopy () {
  copyFolder(assetsDir, assetsDirCopy);
}
  
createAssetsCopy();

