
// Accessing webcam
const video = document.getElementById('webcam');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing webcam:', error);
    });

// Capture button click event
document.getElementById('capture').addEventListener('click', function() {
    console.log(this.innerHTML)
    if(this.innerHTML=="Capture"){
        document.getElementById("check").style.display="block";
        var video = document.getElementById('webcam');
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        var imgData = canvas.toDataURL('image/png');
        
        // Create image element
        var img = new Image();
        img.src = imgData;
        img.style.width = '100%'; // Ensure image fits container width
        img.style.height = '100%'; // Ensure image fits container height
        
        // Remove video element
        video.remove();
        
        // Append image to webcam container
        var webcamContainer = document.getElementById('webcam-container');
        webcamContainer.appendChild(img);
        
        // Change capture button text to "Capture Again"
        this.innerHTML = "Capture Again";
    }
    else{
        window.location.href="/"
        
    }
    
  });