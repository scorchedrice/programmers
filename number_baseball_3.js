// 숫자야구 페어프로그래밍 , 김희영, 최희수, 한지웅
// 조건
// 1. 삼항연산자를 사용금지
// 2. for 문 사용 금지
// 3. 함수를 작성할 때 20줄 이상 넘는 것 금지
// 목적
// 1. 숫자야구를 플레이한다.
// 2. 1단계의 숫자야구이므로 입력 시도 횟수는 무한이다.

let answer = [];
makeAnswer();

const hisMap = new Map();
const hisDetailMap = new Map();

// 최대횟수
const INF = 987654321
let maxTries = -1;
let minTries = INF;

let sumCnt = 0;

// history
let histories = [];
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let index = 1;
let gameCnt = 1;
let startDate = ""
let prevSelect = "";
console.log("1을 입력하면 게임을 시작, 2를 입력하면 기록, 3을 입력하면 최대/최소/평균 기록, 9를 입력하면 종료합니다.")
let controller;
rl.on("line", function (line) {
    if (prevSelect == "2") {
        if (hisDetailMap.has(parseInt(line))) {
            console.log(hisDetailMap.get(parseInt(line)))
            console.log('확인할 게임 번호를 입력하세요. (종료하려면 0 입력)')
            console.log(hisMap)
        } else if (line == "0") {
            prevSelect = "";
            console.log('기록보기를 종료합니다.')
            console.log("1을 입력하면 게임을 시작, 2를 입력하면 기록, 3을 입력하면 최대/최소/평균 기록, 9를 입력하면 종료합니다.")
        } else {
            console.log('확인할 게임 번호가 존재하는지 다시 확인해주세요.')
            console.log(hisMap)
        }
    } else if(line == "9") {
        console.log("게임이 종료되었습니다.")
        rl.close();
    } else if(line == "1"){
        controller = line;
        console.log("게임을 시작합니다.")
        if (startDate == "") startDate = getDate();
    } else if(line == "2") {
        prevSelect = "2"
        console.log('확인할 게임 번호를 입력하세요. (종료하려면 0 입력)')
        console.log(hisMap)
    } else if(line == "3") {
        console.log(`최대시도 : ${maxTries}, 최소시도 : ${minTries}, 평균시도 : ${sumCnt / (gameCnt-1)}`)
        console.log("1을 입력하면 게임을 시작, 2를 입력하면 기록, 3을 입력하면 최대/최소/평균 기록, 9를 입력하면 종료합니다.")
    } else if(controller == "1" && line.length == 3){
        // 이곳에 로직을 작성합니다.
        // 1. 사용자가 터미널에 입력하는 숫자(띄어쓰기 없이)를 배열로 변환한다.
        if (line === 'history') {
            record();
        } else if (!/^[1-9]{3}$/.test(line)) {
            console.log(':경고: 세자리의 숫자만, 띄어쓰기 없이 입력해주세요.');
        } else {
            const input = line.split("");
            const ballCount = judgment(input);
            // histories에 기록을 남기기.
            // Object.entries(ballCount).forEach((value, key) => { `${key} : ${value}` })
            histories.push([ballCount, index, line]);
            index++;
            if(input.length >= 3){
                const ballCount = judgment(input);
                if (ballCount.strike == 3) {
                    console.log("성공했습니다");
                    const stringData = `${startDate} / ${getDate()} / ${histories.length}`
                    hisMap.set(gameCnt, stringData);
                    hisDetailMap.set(gameCnt, histories)
                    // 성공한 이후 인덱스 초기화
                    index = 1;
                    gameCnt++;
                    sumCnt += histories.length
                    console.log(hisMap)
                    // rl.close();
                    controller = "";
                    console.log("1을 입력하면 게임을 시작, 2를 입력하면 기록, 3을 입력하면 최대/최소/평균 기록, 9를 입력하면 종료합니다.")
                    makeAnswer();
                    updateTries();

                    histories = [];
                } else {
                    console.log(ballCount);
                }
            }
        }
    }
}).on("close", function () {});
// [[history, index, input], [], []]
function record() {
    // 사용자가 CLI로 기록 요청을 한 경우
    // 출력형태 : n번째, 입력값: 123, 결과: {strike: ball: out:}
    histories.forEach((history) => {
        const [a,b,c] = history
        // a: [Object object]
        console.log(`${b}번째, 입력값: ${c}, 결과:`, a)
    })
}
function judgment(input) {
    let score = { strike: 0, ball: 0, out: 0 };
    //   console.log(answer);
    input.forEach((element) => {
        const checkBall = answer.includes(parseInt(element));
        if (checkBall) {
            if (answer.indexOf(parseInt(element)) == input.indexOf(element)) {
                score.strike += 1;
            } else {
                score.ball += 1;
            }
        } else {
            score.out += 1;
        }
    });
    return score;
}
function getDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}.${currentDate.getMonth()}.${currentDate.getDay()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function makeAnswer() {
    answer = [];
    while (answer.length < 3) {
        const numb = Math.floor(Math.random() * 9) + 1;
        if (!answer.includes(numb)) {
            answer.push(numb);
        }
    }
    console.log(answer);
}

function updateTries() {
    if (maxTries < histories.length) {
        maxTries = histories.length;
    }
    if (minTries > histories.length) {
        minTries = histories.length;
    }
}