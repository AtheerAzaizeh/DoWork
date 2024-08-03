document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("User not found in local storage");
    return;
  }

  const profilePictureElement = document.getElementById("profile-picture");
  const sidebarProfilePictureElement = document.getElementById(
    "sidebar-profile-picture"
  );
  const profileNameElement = document.getElementById("profile-name");
  const profileEmailElement = document.getElementById("profile-email");
  const welcomeMessageElement = document.getElementById("welcome-message");

  // Fetch and set profile picture by email
  fetchProfilePicture(user.email)
    .then((profilePictureUrl) => {
      console.log("Fetched profile picture URL:", profilePictureUrl);
      profilePictureElement.src = profilePictureUrl
        ? `${CONFIG.API_URL}/uploads/${profilePictureUrl}`
        : "images/default-profile.png";
      sidebarProfilePictureElement.src = profilePictureUrl
        ? `${CONFIG.API_URL}/uploads/${profilePictureUrl}`
        : "images/default-profile.png";
    })
    .catch((error) => {
      console.error("Error fetching profile picture:", error);
      profilePictureElement.src = "images/default-profile.png";
      sidebarProfilePictureElement.src = "images/default-profile.png";
    });

  profileNameElement.textContent = user.username;
  profileEmailElement.textContent = user.email;

  if (welcomeMessageElement) {
    welcomeMessageElement.textContent = `Welcome back, ${user.username}!`;
  }
});

function fetchProfilePicture(email) {
  return fetch(`${CONFIG.API_URL}/profile-picture?email=${email}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.profilePictureUrl) {
        throw new Error("Profile picture URL not found");
      }
      return data.profilePictureUrl;
    });
}
