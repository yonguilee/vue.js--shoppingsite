const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currnetUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault(); //form의 기본 이벤트 동작은 입력값이 생기고, enter를 누르면 그 값이 상위 root 어디론가 전달되기 위해 input박스에서 내용이 사라짐. 그걸 막으려함.
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue); //paintGreeting에 인자 전달.
    saveName(currentValue); //이름 저장
}

function askForName() { //이름입력창 보이도록 하기.
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); //입력창 숨기기.
    greeting.classList.add(SHOWING_CN); //greeting멘트 보이기
    greeting.innerText = `Hello ${text};`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS); //currentUser값 받아오기.
    if (currentUser === null) {
        //user is not defined
        askForName();
    } else {
        //user is.. 
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();