const button = document.getElementById('user_btn');
const video = document.getElementById('video');
const face_cam = document.getElementById('user_cam');

let isCameraOn = false;

button.addEventListener("click", () => {
  if (!isCameraOn) {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        video.srcObject = stream;
        face_cam.style.display = "block";
      
        isCameraOn = true;
      })
      .catch(err => {
        alert("Camera access denied or not available.");
        console.error("Camera error:", err);
      });
  } else {
    
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    video.srcObject = null;
    face_cam.style.display = "none";
    isCameraOn = false;
  }
});
