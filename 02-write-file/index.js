const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const textFilePath = path.join(__dirname, 'destination.txt');

// Создание потока записи в текстовый файл
const output = fs.createWriteStream(textFilePath);

// Вывод в консоль приветственного сообщения
console.log('Enter your text');

// Получение введенных данных и запись текста в файл
stdin.on('data', (data) => {

  let dataStrignified = data.toString().trim();

  // Проверка на exit
  if(dataStrignified === 'exit') {
    // console.log('Process ended!');
    process.exit();
  }

  output.write(data);
  console.log('Enter one more text');
});

//Проверка на ctrl+c
process.on('SIGINT', () => { process.exit(); });

// Реализация прощального сообщения при остановке процесса
process.on('exit', () => stdout.write('Process ended!'));




