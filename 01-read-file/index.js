const fs = require('fs');
const path = require('path');


const textFilePath = path.join(__dirname, 'text.txt');

//Create new ReadStream from text.txt.
const readableStream = fs.createReadStream(textFilePath, 'utf-8');

// Collect all chunks from the file
let data = '';
readableStream.on('data', chunk => data += chunk);

// Console.log received data when file data ends
readableStream.on('end', () => console.log(data));

// If error
readableStream.on('error', error => console.log('Error', error.message));