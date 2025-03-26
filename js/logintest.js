document.addEventListener("DOMContentLoaded", function() {
    var emailInp = document.getElementById("email");
    var passInp = document.getElementById("pass");
    var btn = document.getElementById("sub");

    if (!emailInp || !passInp || !btn) {
        console.warn("Some input elements are missing in the DOM.");
    }

    // Call fetchAllUsers after ensuring DOM is fully loaded
    setTimeout(fetchAllUsers, 0);
});

async function fetchAllUsers() {
    try {
        const response = await fetch("http://localhost:5000/users"); // GET request
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();
        console.log("Users from DB:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}