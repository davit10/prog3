class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.multiply = 0;

    }
    

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 15;
        this.multiply = 0;
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
        this.multiply++;
        this.energy++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
    eat() {
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }
}

class Predator extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 9;
        this.multiply = 0;
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
        this.multiply++;
        this.energy++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            grassArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    die() {
        for (var i in predatorArr) {
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    matrix[this.y][this.x]=0;
                    break;
                }
            }
        }
    }
    eat() {
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }
}

class Hunter extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 7;
        this.multiply = 0;
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
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.getNewCoordinates();
        this.multiply++;
        this.energy++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newHunter = new Hunter(newCell[0], newCell[1], this.index);
            hunterArr.push(newHunter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    die() {
        for (var i in hunterArr) {
            for (var i in hunterArr) {
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
        var newCell = random(this.chooseCell(3));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }
}