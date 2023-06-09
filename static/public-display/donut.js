//------------------------------ Donas a recoger


class Donut {
    constructor(image){
        this.posX = random(windowWidth);
        this.posY = 0;
        this.size = 40;
        this.speed = floor(random(2, 5));
        this.collected = false;
        this.image = image;
        this.rotation = 0; // Agrega la propiedad de rotación
    }

    show(){
        if (!this.collected) {
            push();
            translate(this.posX + this.size / 2, this.posY + this.size / 2);
            rotate(this.rotation); // Aplica la rotación
            image(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
            pop();
        }
    }

    move(){
        this.posY += this.speed;
        this.rotation += 0.05; // Incrementa la rotación gradualmente
    }

    hitsPlayer(){
        if (this.posY + this.size >= player.posY && 
            this.posY < player.posY + 5 &&
            this.posX > player.posX && 
            this.posX < player.posX + player.width) {
            return true;
        } else {
            return false;
        }
    }

    offScreen(){
        if (this.posY > windowHeight + this.width) {
            return true;
        } else {
            return false;
        }
    }
}

//----------------------------- Canasta de donas del Jugador

let movement;

socket.on('controlStatus', message => {
    movement = message.y;
})

class Player {
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.speed = 10;
        this.width = 150;
        this.height = 66;
    }

    show(){
        image(playerBox, this.posX, this.posY, this.width, this.height);
    }

    move(){
        if (movement > 500) {
            this.posX -= this.speed;
        }
        if (movement < 520) {
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
    constructor(image){
        this.posX = random(windowWidth);
        this.posY = 0;
        this.radius = 40;
        this.speed = floor(random(2, 5));
        this.collected = false;
        this.image = image;
        this.rotation = 0; // Agrega la propiedad de rotación
    }

    show(){
        if (!this.collected) {
            push();
            translate(this.posX + this.radius / 2, this.posY + this.radius / 2);
            rotate(this.rotation); // Aplica la rotación
            image(this.image, -this.radius / 2, -this.radius / 2, this.radius, this.radius);
            pop();
        }
    }

    move(){
        this.posY += this.speed;
        this.rotation += 0.05; // Incrementa la rotación gradualmente
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
