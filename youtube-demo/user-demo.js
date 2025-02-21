const express = require('express')
const app = express()
app.listen(7777)

let db = new Map();
var id = 1;

app.use(express.json()) // json 모듈을 사용할게

// login
app.post('/login', function(req,res) {
    const { userId, password } = req.body
    let loginUser;
    db.forEach(function(user, id) {
        if (user.userId === userId) {
            loginUser = user
        }
        if (!isEmpty(loginUser)) {
            console.log('find it')
            if (user.password === password) {
                console.log('정보 일치')
            } else {
                console.log('패스워드 틀림')
            }
        } else {
            console.log('없는 아이디')
        }
    })
})

function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false
    }
}

// 회원가입
app.post('/join', function(req, res) {
    if (req.body) {
        db.set(id++, req.body)
        res.status(201).json({
            message: `${db.get(id-1)}님 회원가입을 환영합니다.`
        })
    } else {
        res.status(400).json({
            message: '입력값을 다시 확인해주세요.'
        })
    }
})

// 주소가 같을 땐 router().get().delete() 형태로도 구성 가능하다.

// 회원 조회
app.get('/users/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    const user = db.get(id);
    if (user == undefined) {
        res.status(404).json({
            message: '존재하지 않는 회원입니다.'
        })
    } else {
        res.status(200).json({
            userId: user.userId,
            name: user.name,
        })
    }
})

app.delete('/users/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    const user = db.get(id);
    if (user == undefined) {
        res.status(404).json({
            message: '존재하지 않는 회원입니다.'
        })
    } else {
        db.delete(id);
        res.status(200).json({
            message: '회원탈퇴가 완료되었습니다.'
        })
    }
})
