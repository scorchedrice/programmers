const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map();
var id = 1;

// app.get('/channels') // 채널 조회
//
// app.post('/channels') // 채널 생성

app.route('/channels')
    .get((req, res) => {res.send('전체조회')})
    .post((req, res) => {res.send('개별생성로직')})

// app.get('/channels/:id') // 채널 개별 조회
//
// app.put('/channels/:id') // 채널 수정
//
// app.delete('/channels/:id')

app.route('/channels/:id')
    .get((req, res) => {res.send('개별조회')})
    .post((req, res) => {res.send('개별생성')})
    .delete((req, res) => {res.send('개별삭제')})

