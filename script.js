

document.addEventListener('DOMContentLoaded', function() {
    const webcam = document.getElementById('webcam');
    const captureButton = document.getElementById('capture');
    const detectButton = document.getElementById('detect');
    const emotionDisplay = document.getElementById('emotion');

    function setupWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                webcam.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing the webcam: ", err);
                alert('Cannot access your webcam, please check your webcam settings.');
            });
    }

    captureButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        canvas.getContext('2d').drawImage(webcam, 0, 0, canvas.width, canvas.height);
        detectButton.style.display = 'block';
        detectButton.addEventListener('click', () => detectEmotion(canvas));
    });

    function detectEmotion(canvas) {
        canvas.toBlob(function(blob) {
            const formData = new FormData();
            formData.append('file', blob, 'emotion.jpg');

            fetch('http://localhost:8000/detect-emotion/', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                emotionDisplay.textContent = "Detected Emotion: " + data.detected_emotion;
                // backend 2
            })
            .catch(err => {
                console.error("Error sending image to the server: ", err);
                emotionDisplay.textContent = "Failed to detect emotion";
            });
        }, 'image/jpeg');
    }

    setupWebcam();
});
