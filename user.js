const currentUser = {
    firstName: "Kuanysh",
    lastName: "Aitzhanov",
    iin: "22222222222222",
    gender: "Male",
    residence: "Pushkin st. 12",
    hospital: "Mediker",
    dob: "22.12.2005",
    email: "kuka@gmail.com",
    phone: "+7 (777) 789 7890"
};


function populateUserData() {
    const users = getUsers();
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const currentUser = users.find(user => user.email === currentUserEmail);

    if (currentUser) {
        document.getElementById("userWelcome").textContent = `Welcome, ${currentUser.firstName}`;
        document.getElementById("userName").textContent = currentUser.firstName;
        document.getElementById("userSurname").textContent = currentUser.lastName;
        document.getElementById("userIIN").textContent = currentUser.iin || "Not provided";
        document.getElementById("userGender").textContent = currentUser.gender || "Not provided";
        document.getElementById("userResidence").textContent = currentUser.residence || "Not provided";
        document.getElementById("userHospital").textContent = currentUser.hospital || "Not provided";
        document.getElementById("userDOB").textContent = currentUser.dob;
        document.getElementById("userEmail").textContent = currentUser.email;
        document.getElementById("userPhone").textContent = currentUser.phone || "Not provided";
    }
}

window.onload = populateUserData;


