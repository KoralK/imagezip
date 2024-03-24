document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append('image', document.querySelector('input[type="file"]').files[0]);

    fetch('https://us-central1-your-project.cloudfunctions.net/compress_image', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(imageBase64) {
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + imageBase64;
        document.body.appendChild(img);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
