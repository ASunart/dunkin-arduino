const URL = `${window.location.hostname}`;
let socket = io(URL, { path: '/real-time' });

const mobileBtn = document.querySelector('.form-btn');

//Listen to click on button form to change screens
mobileBtn.addEventListener('click', ()=>{
    socket.emit('mobile-form', {screen: 4});
})