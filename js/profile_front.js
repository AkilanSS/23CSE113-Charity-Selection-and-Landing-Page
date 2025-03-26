import { AccountSettings, SavedCharities, Dashboard, DonationHistory, EmptyPage } from "./profileComponents.js";

document.addEventListener("DOMContentLoaded", function () {
    const menuOptions = document.getElementsByClassName("menu-item");
    const mainCtn = document.getElementById("main-ctn");
    mainCtn.innerHTML = Dashboard();

    document.getElementById("menu-item7").addEventListener("click", async function(event) {
        event.preventDefault();
        
        const userData = {
            firstName: "Test1",
            lastName: "Test2",
            email: "test@example.com",
            password: "securepassword",
            cityState: "Peak",
            postalCode: "669666",
            industry: "PeakPeak",
            profession: "PePeak",
            "user-data": {
                favourite: [2, 4],
                receipts: [
                    {
                        id: 1,
                        desc: "Donation to Children's Fund",
                        "donation-id": "DN2024001",
                        date: new Date(),
                        "contr-money": 100.50
                    },
                    {
                        id: 2,
                        desc: "Charity Marathon Contribution",
                        "donation-id": "DN2024002",
                        date: new Date("2024-03-15"),
                        "contr-money": 250.75
                    }
                ]
            }
        };
    
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            const result = await response.json();
            console.log("User created:", result);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    });

    Array.from(menuOptions).forEach(menu => {
        menu.addEventListener("click", async function (event) {
            event.preventDefault();
            switch (event.target.id) {
                case "menu-item1":
                    mainCtn.innerHTML = Dashboard();
                    break;
                case "menu-item2":
                    mainCtn.innerHTML = DonationHistory();
                    break;
                case "menu-item3":
                    mainCtn.innerHTML = SavedCharities();
                    break;
                case "menu-item6":
                    mainCtn.innerHTML = AccountSettings();
                    break;
                default:
                    fetchAllUsers()
                    mainCtn.innerHTML = EmptyPage();
                    break;
            }
        });
    });
});


async function fetchAllUsers() {
    try {
        const response = await fetch("http://localhost:5000/users"); // GET request
        const users = await response.json();
        console.log("Users from DB:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}