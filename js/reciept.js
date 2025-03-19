let data;
let choiceData;

async function grabData() {
    try {
        const response = await fetch("../data/charity.json"); // Adjust path as needed
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async function (event) {
    try {
        console.log("DOM loaded, fetching data...");
        data = await grabData();
        choiceData = window.sessionStorage.getItem("DonationChoice");
        displayItem(choiceData, data)

        const dateTxt = document.getElementById("date")
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        dateTxt.innerText = today

    } catch (error) {
        console.error("Error in DOMContentLoaded handler:", error);
    }
});

let tmoney = 0

function displayItem(cD, data){
    const choiceCtn = document.getElementById("choice-ctn")
    cD = new Map(JSON.parse(cD))
    cD.forEach(char => {
        if (!char.moneyEntered == ""){
            let money = remCommaFromNum(char.moneyEntered)
            tmoney += money

            Object.keys(data.charities).forEach(cat => {
                specCat = eval(`data.charities.${cat}`)
                specCat.forEach(cha => {
                    if(cha.idx == char.index ){
                        choiceCtn.innerHTML += `
                        <div class="item-ctn">
                            <div class="char-detctn">
                                <img src="${cha.image}" alt="">
                                <div class="title">
                                    <span class="char-title dark">${cha.name}</span>
                                    <input type="text" name="" class="comments" placeholder="Want to send any messages?">
                                </div>
                            </div>
                            <div class="donated-money">
                                <span class="contr-text light">Your Contribution</span>
                                <span class="char-money dark">₹${addCommaToNum(money)}</span>
                            </div>
                        </div>`
                    }
                })
            })

            console.log(char)
                
        }
    });

    let comm = 5000

    const tmoneyCtn = document.querySelector("#total")
    const commCtn = document.querySelector("#comm")
    const gtmoneyCtn = document.querySelector("#gtotal")
    tmoneyCtn.innerText = "₹ "+addCommaToNum(tmoney)
    commCtn.innerText = "₹ "+addCommaToNum(comm)
    gtmoneyCtn.innerText = "₹"+addCommaToNum(comm + tmoney)
    
}

function addCommaToNum(number) {
    const formatter = new Intl.NumberFormat('en-IN')
    const formattedNumber = formatter.format(number)
    return formattedNumber
}

function remCommaFromNum(number) {
    return parseFloat(number?.replace(/[^\d.]/g, '') || 0)
}