document.addEventListener("DOMContentLoaded", async function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("User not found in local storage");
    return;
  }

  console.log("User data from local storage:", user);

  try {
    const response = await fetch(
      `${CONFIG.API_URL}/auth/profile-picture?email=${user.email}`
    );
    const result = await response.json();

    console.log("API response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch profile picture");
    }

    const profilePictureElement = document.getElementById("profile-picture");
    const sidebarProfilePictureElement = document.getElementById(
      "sidebar-profile-picture"
    );
    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");
    const welcomeMessageElement = document.getElementById("welcome-message");

    if (profilePictureElement) {
      profilePictureElement.src = result.profilePictureUrl
        ? `${CONFIG.API_URL}/uploads/${result.profilePictureUrl}`
        : "images/default-profile.png";
    } else {
      console.error("Profile picture element not found");
    }

    if (sidebarProfilePictureElement) {
      sidebarProfilePictureElement.src = result.profilePictureUrl
        ? `${CONFIG.API_URL}/uploads/${result.profilePictureUrl}`
        : "images/default-profile.png";
    } else {
      console.error("Sidebar profile picture element not found");
    }

    if (profileNameElement) {
      profileNameElement.textContent = user.username;
    } else {
      console.error("Profile name element not found");
    }

    if (profileEmailElement) {
      profileEmailElement.textContent = user.email;
    } else {
      console.error("Profile email element not found");
    }

    if (welcomeMessageElement) {
      welcomeMessageElement.textContent = `Good Day ${user.username}!`;
    } else {
      console.error("Welcome message element not found");
    }

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error fetching profile picture:", error);
  }
});
