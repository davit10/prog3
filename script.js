function matrixGenerator(m, n) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            let rnd = random(0, 100);
            if (rnd <= 30) {
                matrix[i][j] = 1;
            }
            else if (rnd > 30 && rnd <= 45) {
                matrix[i][j] = 2;
            }
            else if (rnd > 45 && rnd <= 55) {
                matrix[i][j] = 3;
            }
            else if (rnd > 60 && rnd <= 62) {
                matrix[i][j] = 4;
            }
            else if (rnd > 80 && rnd <= 82) {
                matrix[i][j] = 5;
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}

let matrix;
let side = 30;


let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let hunterArr = [];
let criminalArr = [];

function setup() {
    matrix = matrixGenerator(20, 20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    frameRate(5);
    background("gray");
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                let gre = new GrassEater(x, y, 2);
                grassEaterArr.push(gre);
            }
            else if(matrix[y][x] == 3){
                let pre = new Predator(x, y, 3);
                predatorArr.push(pre);
            }
            else if(matrix[y][x] == 4){
                let hn = new Hunter(x, y, 4);
                hunterArr.push(hn);
            }
            else if(matrix[y][x] == 5){
                let cr = new Criminal(x, y, 5);
                criminalArr.push(cr);
            }
        }
    }

}
function draw() {

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let x = j * side;
            let y = i * side;
            if (matrix[i][j] == 0) {
                fill("gray");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 1) {
                fill("green");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill("red");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("blue");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("brown");
                rect(x, y, side, side);
            }

        }
    }
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr){
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr){
        predatorArr[i].eat();
    }
    for (let i in hunterArr){
        hunterArr[i].eat();
    }
    for (let i in criminalArr){
        criminalArr[i].eat();
    }
}

