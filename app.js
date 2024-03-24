function compress() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('YOUR_CLOUD_FUNCTION_URL', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        const imgElement = document.getElementById('compressedImage');
        imgElement.src = 'data:image/jpeg;base64,' + data;
        imgElement.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}