const URL = `${window.location.hostname}`;
let socket = io(URL, { path: '/real-time' });

const mobileBtn = document.querySelector('.form-btn');

mobileBtn.addEventListener('click', ()=>{
    socket.emit('mobile-form', {screen: 4});
})