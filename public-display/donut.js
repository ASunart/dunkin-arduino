//------------------------------ Donas a recoger

class Donut {
    constructor(){
        this.posX = random(windowWidth);
        this.posY = 0;
        this.radius = 20;
        this.speed = floor(random(2, 5));
        this.collected = false;
    }

    show(){
        if (!this.collected) {
            fill('yellow');
            circle(this.posX, this.posY, this.radius);
        }
    }

    move(){
        this.posY += this.speed;
    }

    hitsPlayer(){
        if (this.posY + this.radius >= player.posY && 
            this.posY < player.posY + 5 &&
            this.posX > player.posX && 
            this.posX < player.posX + player.width) {
        return true;
        } else {
        return false;
        }
    }

    offScreen(){
        if (this.posY > windowHeight + this.radius) {
            return true;
        } else {
            return false;
        }
    }
}

//----------------------------- Canasta de donas del Jugador

let movement;

socket.on('controlStatus', message => {
    movement = message.x;
})

class Player {
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.speed = 10;
        this.width = 80;
        this.height = 20;
    }

    show(){
        fill('blue');
        rect(this.posX, this.posY, this.width, this.height);
    }

    move(){
        if (movement < 500) {
            this.posX -= this.speed;
        }
        if (movement > 520) {
            this.posX += this.speed;
        }
        if (this.posX < 0) {
            this.posX = 0;
        } else if (this.posX + this.width > windowWidth) {
            this.posX = windowWidth - this.width;
        }
    }
}

//---------------------------- Bolita maligna

class Trash {
    constructor(){
        this.posX = random(windowWidth);
        this.posY = 0;
        this.radius = 20;
        this.speed = floor(random(2, 5));
        this.collected = false;
    }

    show(){
        if (!this.collected) {
            fill('red');
            circle(this.posX, this.posY, this.radius);
        }
    }

    move(){
        this.posY += this.speed;
    }

    hitsPlayer(){
        if (this.posY + this.radius > player.posY && 
            this.posY < player.posY + 5 &&
            this.posX > player.posX && 
            this.posX < player.posX + player.width) {
          return true;
        } else {
          return false;
        }
    }

    offScreen(){
        if (this.posY > windowHeight + this.radius) {
            return true;
        } else {
            return false;
        }
    }
}