var timeElement = document.getElementById("time-label")
var sessionElement = document.getElementById("session-time")
var breakElement = document.getElementById("break-time")
var sesionHead = document.getElementById("session-header")
var startButton = document.getElementById("start-btn")
var decSecBtn = document.getElementById("dec-ses")
var incSecBtn = document.getElementById("inc-ses")
var decBrBtn = document.getElementById("dec-br")
var incBrBtn = document.getElementById("inc-br")

var sessiontime=20, breaktime=5, seconds=0, timerin, elapsedtime = 0, i=0, sesscount = 1

// sessionTime
decSecBtn.addEventListener("click",() =>{
    if(sessiontime>1){
        sessiontime--;
        sessionElement.innerHTML = `${sessiontime} min`
        timeElement.innerHTML = `${sessiontime} : 00`
    }
})
incSecBtn.addEventListener("click",() =>{
    sessiontime++;
    sessionElement.innerHTML = `${sessiontime} min`
    timeElement.innerHTML = `${sessiontime} : 00`
})
// breakTime
decBrBtn.addEventListener("click",() =>{
    if(breaktime>1){
        breaktime--;
        breakElement.innerHTML = `${breaktime} min`
    }
})
incBrBtn.addEventListener("click",() =>{
    breaktime++;
    breakElement.innerHTML = `${breaktime} min`
})

startButton.addEventListener("click",runClock)
async function runClock(){
    decBrBtn.setAttribute("disabled","")
    incBrBtn.setAttribute("disabled","")
    decSecBtn.setAttribute("disabled","")
    incSecBtn.setAttribute("disabled","")
    resetButton.setAttribute("disabled","")

    startButton.classList.add("d-none")
    pauseButton.classList.remove("d-none")
    var time

    while(1){

        if(i%2 == 0){
            timeElement.classList.remove("red-color")
            timeElement.classList.add("blue-color")
            time = sessiontime*60 - elapsedtime
            const sessionend = await callCountdown(time);
        }else{
            timeElement.classList.remove("blue-color")
            timeElement.classList.add("red-color")
            time = breaktime*60 - elapsedtime
            const breakend = await callCountdown(time);
        }
        i++;
        if(i%2 == 0){
            sesscount++;
            sesionHead.innerHTML = `Session ${sesscount}` }
        else{
            sesionHead.innerHTML = `Break`
        }
    }
}
function callCountdown(time){
    return new Promise((resolve, reject) => {
        seconds = 1
        timerin = setInterval(function(){
        mm = String("0" +parseInt((time - seconds)/60)).slice(-2)
        ss = String("0" +parseInt((time - seconds)%60)).slice(-2)
        
        if(time == seconds){
            clearInterval(timerin)
            elapsedtime = -1
            resolve(1)
        }
        timeElement.innerHTML = `${mm} : ${ss}`
        elapsedtime++
        seconds++
        },1000)
    })
}

var pauseButton = document.getElementById("pause-btn")
pauseButton.addEventListener("click",function pauseTime(){
    resetButton.removeAttribute("disabled")
    startButton.classList.remove("d-none")
    pauseButton.classList.add("d-none")
    clearInterval(timerin)
}) 

var resetButton = document.getElementById("reset-btn")
resetButton.addEventListener("click",function(){
    decBrBtn.removeAttribute("disabled")
    incBrBtn.removeAttribute("disabled")
    decSecBtn.removeAttribute("disabled")
    incSecBtn.removeAttribute("disabled")

    sessiontime=20
    breaktime=5
    seconds=0
    elapsedtime = 0 
    i=0
    sesscount = 1

    sessionElement.innerHTML = `${sessiontime} min`
    breakElement.innerHTML = `${breaktime} min`
    sesionHead.innerHTML = `Session ${sesscount}`
    timeElement.innerHTML = '00:00'
    timeElement.classList.add("blue-color")
    timeElement.classList.remove("red-color")
})
