import { AccountSettings, SavedCharities, Dashboard, DonationHistory, EmptyPage } from "./profileComponents.js";

document.addEventListener("DOMContentLoaded", async function () {
    try{
        const response = await fetch("../data/testuser1.json")
        const data = await response.json()

        loadLogic(JSON.stringify(data))
    }catch(e){
        console.log(e)
    }
    
});

function loadLogic(userData){
    const menuOptions = document.getElementsByClassName("menu-item");
    const mainCtn = document.getElementById("main-ctn");
    mainCtn.innerHTML = Dashboard();

    Array.from(menuOptions).forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            switch (event.target.id) {
                case "menu-item1":
                    mainCtn.innerHTML = Dashboard(userData);
                    break;
                case "menu-item2":
                    mainCtn.innerHTML = DonationHistory(userData);
                    break;
                case "menu-item3":
                    mainCtn.innerHTML = SavedCharities(userData);
                    break;
                case "menu-item6":
                    mainCtn.innerHTML = AccountSettings(userData);
                    logicAccountSettings()
                    break;
                default:
                    mainCtn.innerHTML = EmptyPage();
                    break;
            }
        });
    });
}

function logicAccountSettings(){
    const inpCtns = document.getElementsByClassName("inp-ctn")
    const editCtn = document.getElementById("changes-ctn")
    const cancelBtn = editCtn.children[0]
    const confirmBtn = editCtn.children[1]

    const editProfileCtn = document.getElementById("profpic-ctn")
    const editBtn = editProfileCtn.children[0]
    const descArea = editProfileCtn.children[3]

    var prevUserData = new Array()
    var prevUserDesc = new String()

    Array.from(inpCtns).forEach(ctn => {
        let inp = ctn.children[1]
        prevUserData.push(inp.value)
        inp.addEventListener("change", function(event){
            cancelBtn.disabled = false
            confirmBtn.disabled = false
        })
    })

    cancelBtn.addEventListener("click", function(event){
        for (let i = 0; i < Array.from(inpCtns).length; i++) {
            Array.from(inpCtns)[i].children[1].value = prevUserData[i]; 
        }
        descArea.value = prevUserDesc
        descArea.disabled = true
        cancelBtn.disabled  = true
        confirmBtn.disabled = true
    })

    confirmBtn.addEventListener("click", function(event){
        for (let i = 0; i < Array.from(inpCtns).length; i++) {
            prevUserData[i] = Array.from(inpCtns)[i].children[1].value;
        }
        descArea.disabled = true
        cancelBtn.disabled  = true
        confirmBtn.disabled = true
        prevUserDesc = descArea.value
    })

    editBtn.addEventListener("click", function(event){
        descArea.disabled = false
        cancelBtn.disabled = false
        confirmBtn.disabled = false

        prevUserDesc = descArea.value
    })
}



// async function fetchAllUsers() {
//     try {
//         const response = await fetch("http://localhost:5000/users"); // GET request
//         const users = await response.json();
//         console.log("Users from DB:", users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//     }
// }

// document.getElementById("menu-item7").addEventListener("click", async function(event) {
    //     event.preventDefault();
        
    //     const userData = {
    //         firstName: "Test1",
    //         lastName: "Test2",
    //         email: "test@example.com",
    //         password: "securepassword",
    //         cityState: "Peak",
    //         postalCode: "669666",
    //         industry: "PeakPeak",
    //         profession: "PePeak",
    //         "user-data": {
    //             favourite: [2, 4],
    //             receipts: [
    //                 {
    //                     id: 1,
    //                     desc: "Donation to Children's Fund",
    //                     "donation-id": "DN2024001",
    //                     date: new Date(),
    //                     "contr-money": 100.50
    //                 },
    //                 {
    //                     id: 2,
    //                     desc: "Charity Marathon Contribution",
    //                     "donation-id": "DN2024002",
    //                     date: new Date("2024-03-15"),
    //                     "contr-money": 250.75
    //                 }
    //             ]
    //         }
    //     };
    
    //     try {
    //         const response = await fetch("http://localhost:5000/users", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(userData)
    //         });
    
    //         const result = await response.json();
    //         console.log("User created:", result);
    //     } catch (error) {
    //         console.error("Error creating user:", error);
    //     }
    // });
