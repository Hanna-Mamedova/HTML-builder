const path = require('path');
const fs = require('fs');
const { readFile } = require('fs/promises');


const distDir = path.join(__dirname, 'project-dist');

const assetsDir = path.join(__dirname, 'assets');
const assetsDirCopy = path.join(distDir, 'assets');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'style.css');

const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const indexHTMLPath = path.join(distDir, 'index.html');


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

function createStylesBundle() {
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
}

async function getComponentContent(componentName) {
  const componentPath = path.join(componentsPath, `${componentName}.html`);
  return readFile(componentPath, { encoding: 'utf8' });
}

function copyTemplateToIndex() {
  fs.copyFile(templatePath, indexHTMLPath, () => {
    console.log('Template copied');
  });
}


function insertComponentToHTML () {

  //create read streams to index.html
  const readStreamIndexHTML = fs.createReadStream(templatePath, 'utf8');

  // get index content
  let indexContent = '';
  readStreamIndexHTML.on('data', chunk => indexContent += chunk);

  
  // when content received
  readStreamIndexHTML.on('end', () => {
      
    // read components folder
    fs.readdir(componentsPath, {withFileTypes: true}, async (err, files) => { 
      if (err) throw err;

      for (const file of files) {

        // get components names
        const fileExt = path.extname(file.name.toString());
        const fileName = file.name.replace(fileExt, '');
        
        // for each name of .html replace tag in co
        if(file.isFile() && fileExt == '.html') {
          let componentContent = await getComponentContent(fileName);
          indexContent = indexContent.replace(`{{${fileName}}}`, componentContent);
        }
      }

      // write changed content to index
      const writeStreamIndexHTML = fs.createWriteStream(indexHTMLPath, 'utf8');
      writeStreamIndexHTML.write(indexContent);
    });
  });

  readStreamIndexHTML.on('error', error => console.log('Error', error.message)); 
}

createAssetsCopy();
createStylesBundle();
copyTemplateToIndex();
insertComponentToHTML();

