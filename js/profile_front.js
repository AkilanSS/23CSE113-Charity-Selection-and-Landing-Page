import { AccountSettings, SavedCharities, Dashboard, DonationHistory, EmptyPage } from "./profileComponents.js";

document.addEventListener("DOMContentLoaded", async function () {
    const userData = window.localStorage.getItem("user");
    const mainCtn = document.getElementById("main-ctn");
    const backBtn = document.getElementById("back")
    const logOutBtn = document.getElementById("log-out")
    backLogic(backBtn)
    logoutLogic(logOutBtn)
    
    try {
        const response = await fetch("http://localhost:5000/profileRetrieve", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: userData
        });
        
        const charData = await fetch("../data/charity.json")

        if (response.ok) {
            const data = await response.json();
            const cData = await charData.json();
            loadLogic(JSON.stringify(data), cData)
            return data;
        } else {
            console.log("Server returned an error:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Fetch error:", error);
    }
});

function backLogic(btn){
    btn.addEventListener("click", function(event){
        event.preventDefault()
        window.location = "../pages/selection.html"
    })
}

function logoutLogic(btn){
    btn.addEventListener("click", function(event){
        event.preventDefault()
        window.alert("Logged Out Successfully")
        window.location = "../pages/login.html"
        window.localStorage.removeItem("user")
        
    })
}

function loadLogic(userData, cData){
    const menuOptions = document.getElementsByClassName("menu-item");
    const mainCtn = document.getElementById("main-ctn");
    mainCtn.innerHTML = Dashboard(userData, cData)
    Array.from(menuOptions).forEach(menu => {
        menu.addEventListener("click", async function (event) {
            event.preventDefault();
            switch (event.target.id) {
                case "menu-item1":
                    mainCtn.innerHTML = Dashboard(userData, cData);
                    break;
                case "menu-item2":
                    mainCtn.innerHTML = DonationHistory(userData, cData);
                    break;
                case "menu-item3":
                    try{
                        var favListArray;
                        const favList = await fetch(`http://localhost:5000/getFav`,{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: window.localStorage.getItem("user")
                        })
                        var favListArray = new Array()
                        if (favList.ok){
                            favListArray = await favList.json()
                        }
                    }catch(error){
                        console.log(error)
                    }
                    mainCtn.innerHTML = SavedCharities(userData, cData, favListArray);
                    break;
                case "menu-item6":
                    mainCtn.innerHTML = AccountSettings(userData);
                    logicAccountSettings(userData, mainCtn)
                    break;
                default:
                    mainCtn.innerHTML = EmptyPage();
                    break;
            }
        });
    });
}

async function logicAccountSettings(userData, ctn){
    try {
        const response = await fetch("http://localhost:5000/profileRetrieve", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: userData
        });

        if (response.ok) {
            const data = await response.json();
            beginLogicAccountSettings(data, ctn)
            return data;
        } else {
            console.log("Server returned an error:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Fetch error:", error);
    }

}

async function beginLogicAccountSettings(userData, ctn){
    
    const inpCtns = document.getElementsByClassName("inp-ctn")
    const editCtn = document.getElementById("changes-ctn")
    const cancelBtn = editCtn.children[0]
    const confirmBtn = editCtn.children[1]

    const editProfileCtn = document.getElementById("profpic-ctn")
    const editBtn = editProfileCtn.children[0]
    const nameInp = editProfileCtn.children[2]
    const descArea = editProfileCtn.children[3]

    var prevUserData = new Array()
    var prevUserDesc = new String()
    var prevUserName = new String()

    Array.from(inpCtns).forEach(ctn => {
        let inp = ctn.children[1]
        prevUserData.push(inp.value)
        inp.addEventListener("keyup", function(event){
            cancelBtn.disabled = false
            confirmBtn.disabled = false
        })
    })

    cancelBtn.addEventListener("click", function(event){
        for (let i = 0; i < Array.from(inpCtns).length; i++) {
            Array.from(inpCtns)[i].children[1].value = prevUserData[i]; 
        }
        descArea.value = prevUserDesc
        nameInp.value = prevUserName 
        descArea.disabled = true
        cancelBtn.disabled  = true
        confirmBtn.disabled = true
        nameInp.disabled = true
    })

    confirmBtn.addEventListener("click", async function(event){
        for (let i = 0; i < Array.from(inpCtns).length; i++) {
            prevUserData[i] = Array.from(inpCtns)[i].children[1].value;
        }
        descArea.disabled = true
        nameInp.disabled = true
        cancelBtn.disabled  = true
        confirmBtn.disabled = true
        prevUserDesc = descArea.value
        prevUserName = nameInp.value

        console.log(userData._id)

        var newUserData = {
            id : userData._id,
            firstName : prevUserData[0], 
            lastName : prevUserData[1],
            email: prevUserData[2],
            contactNo : prevUserData[3],
            country : prevUserData[4],
            cityState: prevUserData[5],
            postalCode: prevUserData[6],
            organization : prevUserData[7],
            industry: prevUserData[8],
            profession: prevUserData[9],
            userdata :{
                profile :  {
                    displayname : prevUserName,
                    desc: prevUserDesc
                }
            }
        }

        const response = await fetch("http://localhost:5000/changeInfo",
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData)
            }
        )

        if (response.ok){
            var msg = await response.json()
            console.log(msg.msg)
        }

        console.log(prevUserData)
        console.log(prevUserDesc)
        console.log(prevUserName)

        window.location.reload()
    })

    editBtn.addEventListener("click", function(event){
        descArea.disabled = false
        nameInp.disabled = false
        cancelBtn.disabled = false
        confirmBtn.disabled = false

        prevUserDesc = descArea.value
        prevUserName = nameInp.value
    })
}