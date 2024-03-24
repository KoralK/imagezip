document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var imageInput = document.getElementById('imageInput');
    var file = imageInput.files[0];
    
    var formData = new FormData();
    formData.append('image', file);

    // Display original file info
    document.getElementById('originalName').textContent = file.name;
    document.getElementById('originalSize').textContent = (file.size / 1024).toFixed(2); // Size in KB

    fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/compress_image', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(imageBase64) {
        var compressedImageElement = document.getElementById('compressedImage');
        compressedImageElement.src = 'data:image/jpeg;base64,' + imageBase64;
        compressedImageElement.style.display = 'block';

        // Calculate compressed size
        var compressedSize = Math.round((imageBase64.length * 3) / 4 / 1024); // Base64 to binary: size * 3/4; KB conversion: /1024
        document.getElementById('compressedSize').textContent = compressedSize;

        // Update download link
        var downloadLink = document.getElementById('downloadLink');
        downloadLink.href = compressedImageElement.src;
        downloadLink.style.display = 'inline';
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
