const URL = `${window.location.hostname}`;
let socket = io(URL, { path: '/real-time' });
let screens = 4;
let score = 0;

//Characters
let donuts = [];
let player;
let trash = [];


//Screen images
let startImage, instructionsImage, winnerImage, thanksImage, joystick, dunkinPattern, qrCode;
//Game images
let donut1, donut2, badDonut1, badDonut2, playerBox;
//Font
let gameFont;

//Sounds
const coin = new Audio('./assets/coinSound.mp3');
const wrongCoin = new Audio('./assets/denySound.wav');
const initialMusic = new Audio('./assets/initialMusic.mp3');
const gameMusic = new Audio('./assets/gameMusic.mp3');


//Canvas
let windowWidth = 426;
let windowHeight = 621;

//counter
let counter = 60;

function preload(){
    //Images
    startImage = loadImage('./assets/Initial.webp');
    instructionsImage = loadImage('./assets/Instructions.webp');
    winnerImage = loadImage('./assets/Game.webp');
    thanksImage = loadImage('./assets/Gracias.webp');
    donut1 = loadImage('./assets/donut1.webp');
    donut2 = loadImage('./assets/donut2.webp'); 
    badDonut1 = loadImage('./assets/badDonut1.webp');
    badDonut2 = loadImage('./assets/badDonut2.webp');
    playerBox = loadImage('./assets/playerBox.webp');
    dunkinPattern = loadImage('./assets/DunkinPattern.webp');
    qrCode = loadImage('./assets/qrCode.png');
    gameFont = loadFont('./assets/FredokaOne-Regular.ttf');
}



function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    player = new Player(windowWidth/2, windowHeight - 100)
    textFont(gameFont);
}

function draw() {
    switch (screens) {
        case 0:
            initialMusic.play();
            background(startImage);
            break;

        case 1:
            initialMusic.pause();
            image(instructionsImage, 0, 0, windowWidth, windowHeight);
            break;

        case 2:
            let donutsImage = [donut1, donut2];
            let randomDonut = random(donutsImage);

            let badDonuts = [badDonut1, badDonut2];
            let randomBadDonut = random(badDonuts);

            //contador
            gameMusic.play();
            if (frameCount % 60 === 0) {
                counter--;
            } else if(counter === 0){
                counter = 0;
                screens++;
                gameMusic.pause();
            }
            
            background(dunkinPattern);
            
            //creacion del personaje
            player.show();
            player.move();
            fill(225, 19, 131);
            textSize(18);
            text(`Puntaje: ${score}`, 20, 40);
            text(`Tiempo restante: ${counter}`, 20, 65);

            // creacion de las donas

            if (frameCount % 90 === 0) {
                donuts.push(new Donut(randomDonut));
            }
        
            for (let i = donuts.length - 1; i >= 0; i--) {
                donuts[i].move();
                donuts[i].show(random(donutsImage));

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
                trash.push(new Trash(randomBadDonut));
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
            gameMusic.pause();
            image(winnerImage, 0, 0, windowWidth, windowHeight);
            textSize(25);
            textAlign(CENTER , CENTER)
            fill('white');
            text(score, 230, 205);
            getFinalScore();
            imageMode(CENTER);
            image(qrCode, windowWidth/2 + 5 , windowHeight/2 + 140, 120, 120)
            imageMode(CORNER);
            break;

        case 4:
            image(thanksImage, 0, 0, windowWidth, windowHeight);
            break;

        default:
            break;
    }

}


/*___________________________________________

1) Include the socket method to listen to events and change the character position.
_____________________________________________ */

socket.on('controlStatus', message => {
    //Listen to arduino button and change screens
    let boton = message.button;
        if (boton == '1' && screens < 2) {
            screens++;
        } 
})

socket.on('screen-change', msn =>{
    //Listen to mobile instructions and change screens
    screens = msn.screen;
    console.log(msn);
})

/*___________________________________________

2) Include the fetch method to post each time the user recollects a donut
_____________________________________________ */

//Post user score to /score endpoint on server
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

//Get final score of user store on server to print it on mupi
const getFinalScore = async () =>{
    const response = await fetch(`${URL}/final-score`);
    const data = await response.json();
    return score = data.content;
}

