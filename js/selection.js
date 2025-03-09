class Charity {
    index;
    name;
    desc;
    goal;
    moneyEntered;
    isFormatted;
    buttonState;

    constructor(index, buttonState = false, moneyEntered = '', isFormatted = false) {
        this.index = index;
        this.buttonState = buttonState;
        this.moneyEntered = moneyEntered;
        this.isFormatted = isFormatted;
    }
    
    equals(otherItem) {
        return this.index === otherItem.index;
    }
}

let data;
let charData;
let cardList = new Map();
let totalMoney = 0;

async function grabData() {
    const response = await fetch("../data/charity.json");
    return await response.json();
}

function addCtnToGrid(category) {
    const charGrid = document.getElementById("char-grid");
    charGrid.innerHTML = '';
    
    category.forEach(charity => {
        const charityIdx = charity.idx;
        if (!cardList.has(charityIdx)) {
            cardList.set(charityIdx, new Charity(charityIdx));
        }
        
        const card = cardList.get(charityIdx);
        const moneyValue = card.isFormatted && card.moneyEntered ? 
            (card.isFormatted ? (card.moneyEntered.toString().startsWith('₹') ? card.moneyEntered : '₹' + addCommaToNum(card.moneyEntered)) : card.moneyEntered) : '';
        const inputDisabled = card.buttonState ? 'disabled' : '';
        const inputBgColor = card.buttonState ? '#C9E4CA' : '#EDF2F4';
        const buttonBgColor = card.buttonState ? '#55828B' : '';
        const buttonBorderColor = card.buttonState ? '#364958' : '';
        const pathStroke = card.buttonState ? '#C9E4CA' : '#55828B';
        const pathD = card.buttonState ? 
            'M4.66667 7.33334V4.66668C4.66667 3.78262 5.01786 2.93478 5.64298 2.30965C6.2681 1.68453 7.11595 1.33334 8 1.33334C8.88406 1.33334 9.7319 1.68453 10.357 2.30965C10.9821 2.93478 11.3333 3.78262 11.3333 4.66668V7.33334M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z' : 
            'M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z';
        
        let charCtn = `
        <div class="char-ctn" id="${charity.id}">
            <div class="img-desc">
                <img src="${charity.image}" alt="">
                <p>${charity.description}</p>
            </div>
            <div class="progress-ctn">
                <div class="text-1">
                    Funding Goals this Month
                </div>
                <div class="text-2">
                    ${charity.funding.current}/${charity.funding.goal}
                </div>
                <div class="prog">
                    <div class="progress-bar" style="width: ${charity.funding.percentage}%;"></div>
                </div>
            </div>
            <div class="contr-ctn">
                <div id="text1">Contribute</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap:20px;">
                    <div class="contr-text">
                        <input id="m_area" data-index="${charityIdx}" type="text" placeholder="₹" value="${moneyValue}" ${inputDisabled} style="background-color: ${inputBgColor}">
                        <button id="lock" data-index="${charityIdx}" style="background-color: ${buttonBgColor}; border-color: ${buttonBorderColor}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="${pathD}" stroke="${pathStroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg></button>
                    </div>
                    <div class="char-icons">
                        <img src="../assets/icons/link.svg" alt="">
                        <img src="../assets/icons/mail.svg" alt="">
                        <img src="../assets/icons/heart.svg" alt="">
                    </div>
                </div>
            </div>
        </div>`;

        charGrid.innerHTML += charCtn;
    });

    eventHandler();
    updateTotalMoney();
    console.log(cardList)
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        data = await grabData();
        const catLinks = document.querySelectorAll('.cat-lnk');

        catLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const cat = event.target.id;
                addCtnToGrid(eval(`data.charities.${cat}`));
            });
        });

       
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

function eventHandler() {
    document.querySelectorAll("#m_area").forEach(element => {
        const charityIndex = parseInt(element.dataset.index);
        
        if (!cardList.has(charityIndex)) {
            cardList.set(charityIndex, new Charity(charityIndex));
        }
        
        const card = cardList.get(charityIndex);
        
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        element = newElement;
        
        if (card.moneyEntered && card.isFormatted) {
            element.value = card.moneyEntered.toString().startsWith('₹') ? 
                card.moneyEntered : 
                '₹' + addCommaToNum(card.moneyEntered);
        }

        element.addEventListener("focusout", function(event) {
            const money = event.target.value;
            if (money !== card.moneyEntered) {
                card.moneyEntered = money;
            }
            
            if (addCommaToNum(money) === "0") {
                event.target.value = '';
                card.isFormatted = false;
            } else if (card.isFormatted === false) {
                event.target.value = addCommaToNum(money);
                card.isFormatted = true;
            }
        });

        element.addEventListener("focus", function() {
            const moneyValue = element.value;
            if (moneyValue.startsWith('₹')) {
                element.value = moneyValue.substring(1);
            }
            card.isFormatted = false;
        });

        element.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const money = remCommaFromNum(event.target.value);
                card.moneyEntered = money;
                
                if (addCommaToNum(money) === "0") {
                    event.target.value = '';
                    card.isFormatted = false;
                } else if (card.isFormatted === false) {
                    event.target.value = '₹' + addCommaToNum(money);
                    card.isFormatted = true;
                }
                
                const moneyInputBtn = event.target.nextElementSibling;
                if (moneyInputBtn) {
                    moneyInputBtn.click();
                }
            }
        });
        
        const moneyInputBtn = element.nextElementSibling;
        if (moneyInputBtn) {
            const newBtn = moneyInputBtn.cloneNode(true);
            moneyInputBtn.parentNode.replaceChild(newBtn, moneyInputBtn);
            
            if (card.buttonState) {
                newBtn.style.backgroundColor = "#55828B";
                newBtn.style.borderColor = "#364958";
                newBtn.querySelector('svg path').setAttribute('stroke', "#C9E4CA");
                newBtn.querySelector('svg path').setAttribute('d', 'M4.66667 7.33334V4.66668C4.66667 3.78262 5.01786 2.93478 5.64298 2.30965C6.2681 1.68453 7.11595 1.33334 8 1.33334C8.88406 1.33334 9.7319 1.68453 10.357 2.30965C10.9821 2.93478 11.3333 3.78262 11.3333 4.66668V7.33334M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z');
                element.setAttribute('disabled', '');
                element.style.backgroundColor = '#C9E4CA';
            }
            
            newBtn.addEventListener('click', function() {
                card.buttonState = !card.buttonState;
                
                if (card.buttonState) {
                    this.style.backgroundColor = "#55828B";
                    this.style.borderColor = "#364958";
                    this.querySelector('svg path').setAttribute('stroke', "#C9E4CA");
                    this.querySelector('svg path').setAttribute('d', 'M4.66667 7.33334V4.66668C4.66667 3.78262 5.01786 2.93478 5.64298 2.30965C6.2681 1.68453 7.11595 1.33334 8 1.33334C8.88406 1.33334 9.7319 1.68453 10.357 2.30965C10.9821 2.93478 11.3333 3.78262 11.3333 4.66668V7.33334M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z');
                    element.setAttribute('disabled', '');
                    element.style.backgroundColor = '#C9E4CA';
                } else {
                    this.style.backgroundColor = "";
                    this.style.borderColor = "";
                    this.querySelector('svg path').setAttribute('stroke', "#55828B");
                    this.querySelector('svg path').setAttribute('d', "M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z");
                    element.removeAttribute('disabled');
                    element.style.backgroundColor = '#EDF2F4';
                }

                updateTotalMoney();
            });
        }
    });
}

function updateTotalMoney() {
    totalMoney = 0;
    
    cardList.forEach(card => {
        const value = remCommaFromNum(card.moneyEntered);
        totalMoney += isNaN(value) ? 0 : value;
    });

    if (totalMoney > 0) {
        const container = document.getElementById('tmoney-ctn');
        container.innerHTML = `<div id='tmoney-label'>Total Donations: ₹${addCommaToNum(totalMoney)}</div>
                              <button id='pro-pay'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                      <path d="M4.79175 11.5001H18.2084M18.2084 11.5001L11.5001 4.79175M18.2084 11.5001L11.5001 18.2084" 
                                            stroke="#364958" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                              </button>`;
    }
}

function addCommaToNum(number) {
    const formatter = new Intl.NumberFormat('en-IN');
    const formattedNumber = formatter.format(number);
    return formattedNumber;
}

function remCommaFromNum(number) {
    return parseFloat(number?.replace(/[^\d.]/g, '') || 0);
}