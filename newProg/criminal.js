let LivingCreature = require('./livingCreature.js');

module.exports = class Criminal extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
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
        }
        else if (grCells) {
            let newX = grCells[0];
            let newY = grCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.x = newX;
            this.y = newY;

        }

    }

    eat() {
        this.getNewCoordinates();
        let rnd = Math.round(random(2, 4));
        let newCell = random(super.chooseCell(rnd));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            if (rnd == 3) {
                for (let i in predatorArr) {
                    if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (rnd == 2) {
                for (let i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (rnd == 4) {
                for (let i in hunterArr) {
                    if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                        hunterArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        else {
            this.move();
        }
    }
}