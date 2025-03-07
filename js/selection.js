class Charity{
    index;
    name;
    desc;
    goal;
    moneyEntered;
    isFormatted;
    buttonState;

    constructor(index, buttonState, moneyEntered, isFormatted) {
        this.index = index;
        this.buttonState = buttonState;
        this.moneyEntered = moneyEntered;
        this.isFormatted = isFormatted
    }
}
var cardList = [];
var totalMoney = 0

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("#m_area").forEach((element, index) => {
        var card = new Charity(index, false, '', false)
        if (!cardList.includes(card)){
            cardList.push(card)
        }

        element.addEventListener("focusout", function(event) {
            var money = event.target.value;
            if (money !== card.moneyEntered){
                card.moneyEntered = money
            }
            if (addCommaToNum(money) === "0") {
                event.target.value = ''
                card.isFormatted = false
            } else if (card.isFormatted === false){
                event.target.value = addCommaToNum(money);
                card.isFormatted = true
            }
        });

        element.addEventListener("focus", function(){
            card.isFormatted = false
        })

        element.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                var money = remCommaFromNum(event.target.value);
                if (money !== card.moneyEntered){
                    card.moneyEntered = money
                }
                console.log(cardList)
                if (addCommaToNum(money) === "0") {
                    event.target.value = ''
                    card.isFormatted = false
                } else if(card.isFormatted === false) {
                    event.target.value = '₹'+addCommaToNum(money);
                    card.isFormatted = true
                }
                
                const moneyInputBtn = event.target.nextElementSibling;
                if (moneyInputBtn) {
                    moneyInputBtn.click();
                }
            }
        });
        
        const moneyInputBtn = element.nextElementSibling;
        if (moneyInputBtn) {
            moneyInputBtn.addEventListener('click', function() {
                card.buttonState = !card.buttonState;
                
                if (card.buttonState) {
                    this.style.backgroundColor = "#55828B";
                    this.style.borderColor = "#364958"/
                    this.childNodes[0].childNodes[1].setAttribute('stroke', "#C9E4CA")
                    this.childNodes[0].childNodes[1].setAttribute('d','M4.66667 7.33334V4.66668C4.66667 3.78262 5.01786 2.93478 5.64298 2.30965C6.2681 1.68453 7.11595 1.33334 8 1.33334C8.88406 1.33334 9.7319 1.68453 10.357 2.30965C10.9821 2.93478 11.3333 3.78262 11.3333 4.66668V7.33334M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z')
                    console.log("Toggled");
                    element.setAttribute('disabled','')
                    element.style.backgroundColor = '#C9E4CA'
                } else {
                    this.style.backgroundColor = "";
                    this.style.borderColor = ""
                    this.childNodes[0].childNodes[1].setAttribute('stroke', "#55828B")
                    this.childNodes[0].childNodes[1].setAttribute('d',"M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z")
                    element.removeAttribute('disabled')
                    console.log("Untoggled");
                }

                totalMoney = 0

                cardList.forEach(element => {
                    if (Number.isNaN(remCommaFromNum(element.moneyEntered))){
                        totalMoney += 0
                    }else{
                        totalMoney += remCommaFromNum(element.moneyEntered)
                    }
                });

                if (totalMoney > 0) {
                    const container = document.getElementById('tmoney-ctn');
                    container.innerHTML = `<div id='tmoney-label'>Total Donations:  ₹${addCommaToNum(totalMoney)}</div>
                                           <button id='pro-pay'>
                                               <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                                   <path d="M4.79175 11.5001H18.2084M18.2084 11.5001L11.5001 4.79175M18.2084 11.5001L11.5001 18.2084" 
                                                         stroke="#364958" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                               </svg>
                                           </button>`;
                }
            });
        }
    });
});



function addCommaToNum(number){
    const formatter = new Intl.NumberFormat('en-IN');
    const formattedNumber = formatter.format(number);
    return formattedNumber
}

function remCommaFromNum(number){
    return parseFloat(number.replace(/[^\d.]/g, ''))
}


