export async function fetchJobs() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/jobs`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
