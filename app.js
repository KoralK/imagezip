document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var imageInput = document.getElementById('imageInput');
    var file = imageInput.files[0];
    
    // Display original file info
    document.getElementById('originalName').textContent = file.name;
    document.getElementById('originalSize').textContent = (file.size / 1024).toFixed(2); // Size in KB

    var formData = new FormData();
    formData.append('image', file);

    fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/compress_image', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(imageBase64) {
        // Ensure the base64 string is not empty
        if (imageBase64) {
            var compressedImageElement = document.getElementById('compressedImage');
            compressedImageElement.src = 'data:image/jpeg;base64,' + imageBase64;
            compressedImageElement.style.display = 'block';

            // Calculate compressed size in KB (approximation)
            var compressedSize = Math.round((imageBase64.length * 3) / 4 / 1024);
            document.getElementById('compressedSize').textContent = compressedSize;

            // Create a Blob from the base64 string
            var byteCharacters = atob(imageBase64);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += 512) {
                var slice = byteCharacters.slice(offset, offset + 512);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            
            var blob = new Blob(byteArrays, {type: 'image/jpeg'});

            // Update download link for the blob
            var downloadLink = document.getElementById('downloadLink');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.style.display = 'inline';
            downloadLink.textContent = 'Download Compressed Image'; // Add text content to the link
        } else {
            console.error('No image data received.');
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
