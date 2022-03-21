var io = io()
io.sockets.on('send matrix1',


    function set() {
        createCanvas(matrix[0].length * side, matrix.length * side);
        frameRate(5);
        background("gray");
    }
);
function drawMatrix() {
    io.sockets.on('send matrix', function () {

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
    })
}
io.sockets.emit('send', drawMatrix);
