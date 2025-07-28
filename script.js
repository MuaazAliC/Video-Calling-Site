const button = document.getElementById('user_btn');
const video = document.getElementById('video');
const face_cam = document.getElementById('user_cam');

const sendBtn = document.getElementById('Chat_btn');
const input = document.getElementById('chat_input');
const display = document.getElementById('chat_display');

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

    
    display.innerHTML = '';
  }
});

sendBtn.addEventListener('click', () => {
  const message = input.value.trim();
  if (message !== '') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat_message');
    msgDiv.innerText = message;
    display.appendChild(msgDiv);
    input.value = '';
    display.scrollTop = display.scrollHeight;
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});
