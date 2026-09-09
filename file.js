import fs from 'fs';

/*
fs.readFileSync('file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File data:', data);
});
console.log('This will be printed before the file data is ready:');
*/

const data = fs.readFileSync('file.txt', 'utf-8');
console.log('File data:', data);
console.log('This will be printed after the file data is ready:');