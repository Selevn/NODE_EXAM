const webdav = require('webdav-server').v2;
const server = new webdav.WebDAVServer({requireAuthentification: false, port: 3000});
const express = require('express');
const app = require('express')();
const fs = require('fs');
const {createClient} = require('webdav');
//http://localhost:3001/return-url#access_token=AQAAAABganr3AAfZoPIewuzCwkfgoZiykbwFwoM&token_type=bearer&expires_in=31536000
const client = createClient('http://localhost:3000/');//, {username: 'laba.ponode', password: 'lxbogvjhegsmynmv'});
const multer = require('multer');

app.use(express.static('publ'));
app.use(multer().single("file"));

server.setFileSystem('/', new webdav.PhysicalFileSystem('./server'), success => {
    server.start(() => console.log('READY'));
});


app.post('/md/:folderName', async function (req, res) {
    req.params.folderName = req.params.folderName.replace('+', '/');
    const folderExists = await client.exists(req.params.folderName);

    if (folderExists) {
        res.status(408).send('Такой директорий уже существует');
        return;
    }
    client.createDirectory(req.params.folderName);
    res.send('Директорий создан успешно');
});


app.post('/rd/:folderName', async function (req, res) {
    req.params.folderName = req.params.folderName.replace('+', '/');
    const folderExists = await client.exists(req.params.folderName);

    if (!folderExists) {
        res.status(404).send('Такой директории не существует');
        return;
    }
    client.deleteFile(req.params.folderName);
    res.end('Директория удалена успешно');
});


app.post('/up/:fileName', async function (req, res) {
    req.params.fileName = req.params.fileName.replace('+', '/');
    const fileExists = await client.exists(req.params.fileName);

    if (fileExists) {
        res.status(404).send('Такой файл уже существует');
        return;
    }
    try {
        fs.createReadStream('./files/' + req.params.fileName).pipe(client.createWriteStream(req.params.fileName));
        res.end('Файл успешно выгружен');
    } catch (err) {
        console.log(err);
        res.status(408).send('Ошибка записи');
    }
});


app.post('/down/:fileName', async function (req, res) {
    req.params.fileName = req.params.fileName.replace('+', '/');
    const fileExists = await client.exists(req.params.fileName);

    if (!fileExists) {
        res.status(404).send('Такой файл не существует');
        return;
    }
    client.createReadStream(req.params.fileName).pipe(fs.createWriteStream('./down/' + req.params.fileName));
    res.end('Файл успешно скачан');
});


app.post('/del/:fileName', async function (req, res) {
    req.params.fileName = req.params.fileName.replace('+', '/');
    const fileExists = await client.exists(req.params.fileName);

    if (!fileExists) {
        res.status(404).send('Такой файл уже существует');
        return;
    }
    client.deleteFile(req.params.fileName);
    res.end('Файл удален успешно'); 
});


app.post('/copy/:source/:destination', async function (req, res) {
    req.params.source = req.params.source.replace('+', '/');
    req.params.destination = req.params.destination.replace('+', '/');
    const fileExists = await client.exists(req.params.source);
    if (!fileExists) {
        res.status(404).send('Такой файл уже существует');
        return;
    }
    client.copyFile(req.params.source, req.params.destination);
    res.end('Файл скопирован успешно');
});


app.post('/move/:source/:destination', async function (req, res) {
    req.params.source = req.params.source.replace('+', '/');
    req.params.destination = req.params.destination.replace('+', '/');
    const fileExists = await client.exists(req.params.source);
    if (!fileExists) {
        res.status(404).send('Такой файл уже существует');
        return;
    }
    client.moveFile(req.params.source, req.params.destination);
    res.end('Файл перемещен успешно');
});

app.listen(3001);