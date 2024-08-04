document.addEventListener('DOMContentLoaded', function() {
    // Initialize flatpickr for date fields
    flatpickr('.flatpickr');

    const photoInput = document.getElementById('photoInput');
    const profileImageUrl = document.getElementById('profile_image_url');
    const cvError = document.getElementById('cv-error');

    profileImageUrl.addEventListener('click', () => {
        photoInput.click();
    });

    photoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            resizeImage(file, 800, 600, function(blob) {
                const formData = new FormData();
                formData.append('photo', blob, file.name);
                // Now you can use the formData to upload the resized image or include it in the CV form
                displayResizedImage(blob);
            });
        }
    });

    document.getElementById('cv-form').addEventListener('submit', function(event) {
        event.preventDefault();
        submitCV();
    });

    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                let canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(callback, 'image/jpeg');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function displayResizedImage(blob) {
        const url = URL.createObjectURL(blob);
        profileImageUrl.innerHTML = `<img src="${url}" alt="Profile Picture" />`;
    }

    function submitCV() {
        const formData = new FormData(document.getElementById('cv-form'));
        const photoFile = photoInput.files[0];

        if (photoFile) {
            resizeImage(photoFile, 800, 600, function(blob) {
                formData.set('photo', blob, photoFile.name);
                uploadFormData(formData);
            });
        } else {
            uploadFormData(formData);
        }
    }

    function uploadFormData(formData) {
        fetch(`${CONFIG.API_URL}/cv`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessModal();
            } else {
                cvError.textContent = 'Error submitting CV: ' + data.message;
            }
        })
        .catch(error => {
            console.error('Error submitting CV:', error);
            cvError.textContent = 'Error submitting CV: ' + error.message;
        });
    }

    function showSuccessModal() {
        const modal = document.getElementById('notificationModal');
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
});
