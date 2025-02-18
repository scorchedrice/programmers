const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello Express')
})

// API

app.get('/test', function (req, res) {
    // res.send({
    //     say: '안녕하세요'
    // })
    res.json({
        say: '안녕하세요',
        price: '3000',
        title: 'test',
    })
     // json이란 함수 있음. (좀 더 명확한 표현)
})

app.listen(3000)