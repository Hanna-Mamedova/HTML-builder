const path = require('path');
const fs = require('fs');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

// Чтение содержимого папки styles
fs.readdir(stylePath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;

  
  for (const file of files) {

    const fileExt = path.extname(file.name.toString());
    const filePath = path.join(stylePath, file.name);

    // Проверка является ли объект файлом и имеет ли файл нужное расширение
    if(file.isFile() && fileExt == '.css') {

      // Чтение файла стилей
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;

        // Запись прочитанных данных в массив
        const content = [];
        content.push(data);

        // Запись массива стилей в файл bundle.css
        fs.writeFile(bundlePath, content.toString(), (err) => {
          if(err) throw err;
          console.log('Bundle created');
        });
      });
    
    }
  }
});

// ЗАДАНИЕ В ПРОЦЕССЕ.   
// CM ДОБАВЛЕНИЕ DATA В МАССИВ! КОРЯВО СОБИРАЕТСЯ BUNDLE




