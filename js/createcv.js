document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const locationInput = document.getElementById("locationInput");
    const phoneNumberInput = document.getElementById("phoneNumber");

    const locations = [
        "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beersheba", 
        "Holon", "Bnei Brak", "Ramat Gan", "Ashkelon", "Rehovot", "Bat Yam", "Kfar Saba", "Herzliya", 
        "Hadera", "Modiin", "Nazareth", "Ra'anana", "Ramat Hasharon", "Raanana", "Lod", "Ramla", "Nahariya", 
        "Kiryat Ata", "Eilat", "Acre", "Rosh HaAyin", "Givatayim", "Kiryat Gat", "Kiryat Motzkin", "Nesher", 
        "Kiryat Yam", "Or Yehuda", "Yavne", "Tiberias", "Tirat Carmel", "Afula", "Migdal HaEmek", "Karmiel", 
        "Dimona", "Sderot", "Maale Adumim", "Yehud"
    ];

    initializeLocations(locations, "#locations");

    phoneNumberInput.addEventListener("input", validatePhoneNumber);
});

function initializeLocations(locations, datalistSelector) {
    const datalist = document.querySelector(datalistSelector);
    locations.forEach(location => {
        const option = document.createElement("option");
        option.value = location;
        datalist.appendChild(option);
    });
}

function validatePhoneNumber() {
    const phoneNumberInput = document.getElementById("phoneNumber");
    const phoneError = document.getElementById("phoneError");
    const phoneNumber = phoneNumberInput.value.trim();
    
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(phoneNumber)) {
        phoneError.textContent = "Please enter a valid phone number (10 digits).";
        phoneError.style.color = "red";
    } else {
        phoneError.textContent = "";
    }
}

function openPhotoInput() {
    const photoInput = document.getElementById("photoInput");
    photoInput.click();
}

function displaySelectedPhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoPlaceholder = document.getElementById("photoPlaceholder");

            while (photoPlaceholder.firstChild) {
                photoPlaceholder.removeChild(photoPlaceholder.firstChild);
            }

            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "Selected Photo";
            img.width = 192;
            img.height = 150;
            photoPlaceholder.appendChild(img);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function validateForm() {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const location = document.getElementById("locationInput").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    
    if (name === "" || email === "" || location === "" || phoneNumber === "") {
        alert("Please fill in all fields.");
        return false;
    }
    
    window.location.href = "CreateCVNextpage.html";
    return true;
}