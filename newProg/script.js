let socket = io();
let side = 20;
socket.on('send matrix', drawMatrix);


function drawMatrix(matrix) {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("gray");
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
    socket.emit('senddraw', drawMatrix);
}
