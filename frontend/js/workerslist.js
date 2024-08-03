document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded");
  fetchWorkers();
});

function fetchWorkers() {
  console.log("Fetching workers...");
  fetch(`${CONFIG.API_URL}/jobSeekers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((workers) => {
      console.log("Workers fetched:", workers);
      const allWorkersList = document.querySelector(
        "#all-workers .workers-list"
      );
      const suitableWorkersList = document.querySelector(
        "#suitable-workers .workers-list"
      );

      allWorkersList.innerHTML = "";
      suitableWorkersList.innerHTML = "";

      workers.forEach((worker) => {
        const workerItem = document.createElement("div");
        workerItem.className = "worker-item";

        const profilePictureUrl = worker.profile_picture
          ? `${CONFIG.API_URL}/uploads/${worker.profile_picture}`
          : "images/default-profile.png";

        workerItem.innerHTML = `
            <img src="${profilePictureUrl}" alt="Profile Picture">
            <div class="worker-details">
              <h3>${worker.username}</h3>
              <p>Email: ${worker.email}</p>
              <p>Skills: ${worker.skills || "Not provided"}</p>
            </div>
          `;

        allWorkersList.appendChild(workerItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching workers:", error);
    });
}
