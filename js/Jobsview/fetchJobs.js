export async function fetchJobs() {
    try {
        const response = await fetch('https://onlybackend-wgcr.onrender.com/api/all-jobs');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
