let data;
let choiceData;

async function grabData() {
    const userData = window.localStorage.getItem("user");
    try {
        const response = await fetch("../data/charity.json"); // Adjust path as needed
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("DOM loaded, fetching data...");
        data = await grabData();
        choiceData = window.sessionStorage.getItem("DonationChoice");
        displayItem(choiceData, data)

        const dateTxt = document.getElementById("date")
        const donationID = document.getElementById("did")
        const name = document.getElementById("name")
        const contact = document.getElementById("contact")

        const userSaveDetail = JSON.parse(window.localStorage.getItem("user"))[0]

        donationID.innerText = generateDonationID(userSaveDetail)
        name.innerText = userSaveDetail.name
        contact.innerText = userSaveDetail.email

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        dateTxt.innerText = today

    } catch (error) {
        console.error("Error in DOMContentLoaded handler:", error);
    }

    const proceedBtn = document.getElementById("comp").children[1]
    console.log(proceedBtn)
    proceedLogic(proceedBtn)



});

let tmoney = 0

function displayItem(cD, data) {
    const choiceCtn = document.getElementById("choice-ctn")
    cD = new Map(JSON.parse(cD))
    cD.forEach(char => {
        if (!char.moneyEntered == "") {
            let money = remCommaFromNum(char.moneyEntered)
            tmoney += money

            Object.keys(data.charities).forEach(cat => {
                specCat = eval(`data.charities.${cat}`)
                specCat.forEach(cha => {
                    if (cha.idx == char.index) {
                        choiceCtn.innerHTML += `
                        <div class="item-ctn" attr1=${cha.idx}>
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
    tmoneyCtn.innerText = "₹ " + addCommaToNum(tmoney)
    commCtn.innerText = "₹ " + addCommaToNum(comm)
    gtmoneyCtn.innerText = "₹" + addCommaToNum(comm + tmoney)

}

function proceedLogic(proceedBtn) {
    proceedBtn.addEventListener("click", async function (event) {
        event.preventDefault()

        const itemCtn = document.getElementsByClassName("item-ctn")
        const did = document.getElementById("did")
        var rList = new Array();

        Array.from(itemCtn).forEach(item => {
            let id = Number(item.attributes[1].value)
            let desc = item.children[0].children[1].children[1].value
            console.log(desc)
            let donationID = did.innerText
            let date = new Date()
            let contrMoney = remCommaFromNum(item.children[1].children[1].innerHTML)

            var itemBill = {
                id: id,
                desc: desc,
                'donation-id': donationID,
                date: date,
                'contr-money': contrMoney
            }

            rList.push(itemBill)
        })

        var userDetail = JSON.parse(localStorage.getItem("user"))[0]._id

        recieptList = { userDetail, rList }

        console.log(recieptList)
        try {
            const response = await fetch("http://localhost:5000/addcart", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recieptList)
            })
            if (response.ok) {
                window.location = "profile.html"
            }

        } catch (error) {
            console.log(error)
        } finally {

        }



    })


}

function addCommaToNum(number) {
    const formatter = new Intl.NumberFormat('en-IN')
    const formattedNumber = formatter.format(number)
    return formattedNumber
}

function remCommaFromNum(number) {
    return parseFloat(number?.replace(/[^\d.]/g, '') || 0)
}

JavaScript

function generateDonationID(data) {
    const name = new String(data.name)
    const email = data.email
    const date = new Date()

    var donationID = date.getHours().toString() + name.slice(0,2).toUpperCase() + date.getSeconds().toString() + date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString()

    return donationID;
}