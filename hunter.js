let LivingCreature = require('./livingCreature.js');
let random = require('./random');

module.exports = class Hunter extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 40;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        this.getNewCoordinates();
        let hnCells = random(super.chooseCell(3));

        if (hnCells) {
            let newX = hnCells[0];
            let newY = hnCells[1];
            let hn = new Hunter(newX, newY, this.index);
            hunterArr.push(hn);
            let hn1 = new Hunter(newX + 1, newY + 1, this.index);
            hunterArr.push(hn1);
            let hn2 = new Hunter(newX - 1, newY - 1, this.index);
            hunterArr.push(hn2);

            matrix[newY][newX] = this.index;

            this.energy = 40;
        }

    }
    move() {
        this.getNewCoordinates();
        let emptyCells = random(super.chooseCell(0));
        let grCells = random(super.chooseCell(1));
        if (emptyCells) {
            let newX = emptyCells[0];
            let newY = emptyCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy--;
            if(this.energy <= 0){
                this.die();
            }
        }
        else if(grCells) {
            let newX = grCells[0];
            let newY = grCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.x = newX;
            this.y = newY;

            this.energy--;
            if(this.energy <= 0){
                this.die();
            } 
        }
        
    }
    die() {
        if (this.energy <= 0) {
            for (let i in hunterArr) {
                if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                    hunterArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }


    eat() {
        this.getNewCoordinates();
        let newCell = random(super.chooseCell(3));
        if (newCell) {
            this.energy++;
            if(this.energy >= 50){
                this.mul();
            }
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (let i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else{
            this.move();
        }
    }
}