var matrix = [
    [0, 0, 1, 3, 3, 0, 1, 0, 0, 0],
    [1, 0, 2, 0, 0, 0, 0, 3, 0, 0],
    [0, 1, 0, 3, 0, 4, 0, 3, 0, 1],
    [0, 4, 1, 0, 0, 0, 0, 0, 0, 0],
    [3, 1, 2, 2, 3, 2, 2, 4, 3, 2],
    [0, 0, 1, 0, 3, 0, 2, 0, 4, 0],
    [1, 0, 2, 3, 0, 0, 0, 2, 0, 0],
    [0, 1, 0, 3, 0, 3, 4, 0, 1, 0],
    [0, 0, 1, 4, 3, 0, 0, 0, 0, 0],
    [1, 1, 0, 2, 0, 4, 1, 0, 3, 0]
];
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var hunterArr = [];


var side = 30;

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var hn = new Hunter(x, y, 4);
                hunterArr.push(hn);
        
            }
        }
    }
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in hunterArr) {
        hunterArr[i].eat();
    }

}