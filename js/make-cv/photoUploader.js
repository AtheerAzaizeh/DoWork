export function openPhotoInput() {
    const photoInput = document.getElementById("photoInput");
    photoInput.click();
  }
  
  export function displaySelectedPhoto(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
  
        new Compressor(file, {
            quality: 0.6,
            maxWidth: 800,
            maxHeight: 800,
            success(result) {
                const photoPlaceholder = document.getElementById("profile_image_url");
  
                while (photoPlaceholder.firstChild) {
                    photoPlaceholder.removeChild(photoPlaceholder.firstChild);
                }
  
                const img = document.createElement("img");
                img.src = URL.createObjectURL(result);
                img.alt = "Selected Photo";
                img.width = 192;
                img.height = 150;
                photoPlaceholder.appendChild(img);
                
                const reader = new FileReader();
                reader.onloadend = function() {
                    sessionStorage.setItem("photo", reader.result);
                };
                reader.readAsDataURL(result);  
            },
            error(err) {
                console.error('Error compressing image:', err.message);
            }
        });
    }
  }
  