const express = require('express')
const app = express()

app.listen(1234)

// : 뒤에 변수를 붙혀 값을 가져올 수 있다.
// 해당 값은 req.params에 있다.

// 값을 전달할 땐 객체형식으로 전달해야한다. 주로 json을 사용
// app.get('/test/:n', function (req, res) {
//     res.json({
//         num: req.params.n
//     })
// })

app.get('/watch', function (req, res) {
    const q = req.query;

    // 객체의 비구조화
    const {v, t} = q;
    console.log(v,t)
    res.json(q);
})

// api를 get 할 때, Map을 사용할 수 있다.
// method로 get, has, set 등이 있다. 알고리즘 풀이 때 많이 사용하던 것이니 이상 없을 듯 하다.
