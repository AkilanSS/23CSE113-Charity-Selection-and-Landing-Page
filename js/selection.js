var cardList = [];

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("#m_area").forEach((element, index) => {
        var card = new Charity(index, false, '', false)
        if (!cardList.includes(card)){
            cardList.push(card)
        }

        element.addEventListener("focusout", function(event) {
            var money = event.target.value;
            card.moneyEntered = money
            if (addCommaToNum(money) === "0") {
                event.target.value = ''
                card.isFormatted = false
            } else if (card.isFormatted === false){
                event.target.value = addCommaToNum(money);
                card.isFormatted = true
            }
        });

        element.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                var money = event.target.value;
                console.log(cardList)
                if (addCommaToNum(money) === "0") {
                    event.target.value = ''
                    card.isFormatted = false
                } else if(card.isFormatted === false) {
                    event.target.value = addCommaToNum(money);
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
                    this.style.backgroundColor = "aqua";
                    console.log("Toggled");
                } else {
                    this.style.backgroundColor = "";
                    console.log("Untoggled");
                }
            });
        }
    });
});

function addCommaToNum(number){
    const formatter = new Intl.NumberFormat('en-US');
    const formattedNumber = formatter.format(number);
    return formattedNumber
}


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
