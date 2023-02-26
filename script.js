
//setup form values
const inputContainer = document.getElementById('custom-form-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown-in-progress');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('reset-button');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate='';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//set date input min with today Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

//populate countdown/ Compete UI
function updateDOM(){
    countdownActive = setInterval( ()=>{
    const distance = countdownValue - new Date();
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const secs = Math.floor((distance % minute)/second);
    
    //populate countdown
    //hide inpute
    inputContainer.hidden = true;
    if(distance < 0){
        //hide countdown
        clearInterval(countdownActive);
        countdownEl.hidden =true;
        completeElInfo.textContent = `${countdownTitle} completed on ${countdownDate}`;
        //show complete
        completeEl.hidden = false;

    } else{
        
        countdownElTitle.textContent = `${countdownTitle}`;
        flipAllCard(days,hours,minutes,secs);
    
        //show countdown
        countdownEl.hidden = false;
    }

    }, second);
    
}

//take values from form:
function updateCountdown(e){
    //prevent page from refreshed
    e.preventDefault();
    countdownTitle= e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));

    //check if input valid
    if(countdownDate === ''){
        alert('please put valid date! ')
    } else{
        //get number version of current Date, updateDom
        countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
    
}

//reset ui
function reset(){
    //show input hide countdown
    inputContainer.hidden = false;
    countdownEl.hidden = true;
    completeEl.hidden = true;
    //stop the countdown
    clearInterval(countdownActive);
    //reset values
    countdownTitle='';
    countdownDate='';
}
//restore previous countdown
function restorePreviousCountdown(){
    //get countdown from local storage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();


    }
}

//event listenser
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
//onload, check storage
restorePreviousCountdown();

//flip card animation functions
const flipCardDay = document.getElementById('flip-card-day');
const flipCardHour = document.getElementById('flip-card-hour');
const flipCardMin = document.getElementById('flip-card-min');
const flipCardSec = document.getElementById('flip-card-sec');

function flipAllCard(days, hours, mins, secs){
    flip(flipCardDay,days);
    flip(flipCardHour,hours);
    flip(flipCardMin,mins);
    flip(flipCardSec,secs);
    
}

function flip(flipCard, newNumber){
    const classOfElement = flipCard.classList[1];
    const topHalf = document.querySelector(`.${classOfElement} .top span`);
    const bottomHalf = document.querySelector(`.${classOfElement} .bottom span`);
    newNumber = formatNumber(newNumber);
    let startNumber = parseInt(topHalf.textContent);
    startNumber = formatNumber(startNumber);
    //check if the old number match with the new number
    if(startNumber === newNumber){
        return;
    }
    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    
    //create two div for animation
    const topFlip = document.createElement("div");
    topFlip.classList.add('top-flip');
    const spanTop = document.createElement("span");
    spanTop.textContent = startNumber;
    topFlip.appendChild(spanTop);
    
    
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add('bottom-flip');
    const spanBottom = document.createElement("span");
    spanBottom.textContent = newNumber;
    bottomFlip.appendChild(spanBottom);
    topFlip.addEventListener('animationstart', ()=>{
        topHalf.textContent = newNumber;
    })
    topFlip.addEventListener('animationend',()=>{
        topFlip.remove();
    })
    
    bottomFlip.addEventListener('animationend',()=>{
        bottomHalf.textContent = newNumber;
        bottomFlip.remove();
    })
    flipCard.append(topFlip,bottomFlip);

}
function formatNumber(num){
    if(num < 10){
        return `0${num}`;
    }
    return num;
}

