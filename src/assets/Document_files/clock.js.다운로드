const clockContainer = document.querySelector(".js-clock")
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
//초단위가 10보다 작으면 앞에 0을 붙이고, 아니면 그냥 seconds 출력. (삼항연산자) 
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();