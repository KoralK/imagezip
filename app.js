document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append('image', document.getElementById('imageInput').files[0]);

    fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/compress_image', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(imageBase64) {
        document.getElementById('compressedImage').src = 'data:image/jpeg;base64,' + imageBase64;
        document.getElementById('compressedImage').style.display = 'block';
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
