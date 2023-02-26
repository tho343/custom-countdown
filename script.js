
const countToDate = new Date().setHours(new Date().getHours() + 24);
console.log(countToDate);
console.log(new Date().getHours());
const flipCard = document.getElementById('flip-card-hour');


function flip(flipCard, newNumber){
    const classOfElement = flipCard.classList[1];
    const topHalf = document.querySelector(`.${classOfElement} .top span`);
    const bottomHalf = document.querySelector(`.${classOfElement} .bottom span`);
    
    const startNumber = parseInt(topHalf.textContent);
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
    

    console.log(bottomHalf.textContent);
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
flip(flipCard,15);