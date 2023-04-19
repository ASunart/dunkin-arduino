
const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });
let screens = 0;
let score = 0;

//Characters
let donuts = [];
let player;
let trash = [];

//Images
let startImage, instructionsImage, winnerImage, thanksImage, joystick;

//Sounds
const coin = new Audio('./assets/coinSound.mp3');
const wrongCoin = new Audio('./assets/denySound.wav');
const initialMusic = new Audio('./assets/initialMusic.mp3');


//Canvas
let windowWidth = 426;
let windowHeight = 621;

//counter
let counter = 60;

function preload(){
    //Images
    startImage = loadImage('./assets/Initial.png');
    instructionsImage = loadImage('./assets/Instructions.png');
    winnerImage = loadImage('./assets/Winner.png');
    thanksImage = loadImage('./assets/Gracias.png');
    joystick = loadImage('./assets/Joystick.png'); 
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    player = new Player(windowWidth/2, windowHeight - 100)
}

function draw() {
    switch (screens) {
        case 0:
            initialMusic.play();
            background(startImage);
            if (frameCount % 120 === 0) {
                tint(255, 0);
                setTimeout(() => {
                noTint();
                }, 1000);
            }

            imageMode(CENTER)
            image(joystick, windowWidth/2, windowHeight/2 + 100, 80, 80);
            imageMode(CORNER)
            break;

        case 1:
            image(instructionsImage, 0, 0, windowWidth, windowHeight);
            initialMusic.stop();
            break;

        case 2:
            //contador
            if (frameCount % 60 === 0) {
                counter--;
            } else if(counter === 0){
                counter = 0;
                screens++;
            }
            background(255);
            //creacion del personaje
            player.show();
            player.move();
            textSize(23);
            text(`Puntaje: ${score}`, 25, 30);
            text(`Tiempo restante: ${counter}`, 25, 60);

            // creacion de las donas

            if (frameCount % 90 === 0) {
                donuts.push(new Donut());
            }
        
            for (let i = donuts.length - 1; i >= 0; i--) {
                donuts[i].move();
                donuts[i].show();

                if(donuts[i].hitsPlayer()){
                    donuts[i].collected = true;
                    donuts.splice(i, 1);
                    score++;
                    postScore(score);
                    socket.emit('point', 'A');
                    coin.play();
                }

                if(donuts[i].offScreen()){
                    donuts.splice(i, 1);
                }
            }

            // creacion de las bolitas malignas
            let trashToRemove = [];

            if (frameCount % 230 === 0) {
                trash.push(new Trash());
            }
        
            for (let i = trash.length - 1; i >= 0; i--) {
                trash[i].move();
                trash[i].show();

                if(trash[i].hitsPlayer()){
                    trash[i].collected = true;
                    trashToRemove.push(i);
                    score--;
                    postScore(score);
                    wrongCoin.play();
                }

                if(trash[i].offScreen()){
                    trashToRemove.push(i);
                }

                for (let i = trashToRemove.length - 1; i >= 0; i--) {
                    trash.splice(trashToRemove[i], 1);
                }
            }

            
            break;

        case 3:
            image(winnerImage, 0, 0, windowWidth, windowHeight);
            textSize(20);
            textAlign(CENTER , CENTER)
            fill(04, 56, 23);
            text(`Tu puntaje final: ${score}`, windowWidth/2, windowHeight/2);
            getFinalScore();
            break;

        case 4:
            image(thanksImage, 0, 0, windowWidth, windowHeight);
            break;

        case 5:
            
            break;

        case 6:
            
            break;

        case 7:
            
            break;

    
        default:
            break;
    }

}

// function mousePressed(){
//     screens++;
// }

socket.on('controlStatus', message => {
    let boton = message.button;

    if (boton == '1') {
        screens++;
    }
})


/*___________________________________________

1) Include the socket method to listen to events and change the character position.
You may want to use a Switch structure to listen for up, down, right and left cases.
_____________________________________________ */

socket.on('arduinoMessage', (arduinoMessage) => {

})

/*___________________________________________

2) Include the fetch method to post each time the user recollects a donut
_____________________________________________ */
const postScore = async (points) =>{
    let message = {content: points};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(message)
    }

    await fetch(`${URL}/score`, options)
}

const getFinalScore = async () =>{
    const response = await fetch(`${URL}/final-score`);
    const data = await response.json();
    return score = data.content;
}

