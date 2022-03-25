let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);



let matrix = matrixGenerator(20, 20);
function matrixGenerator(m, n) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            let rnd = Math.random(100);
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

//io.sockets.emit('send matrix', matrix);




let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let hunterArr = [];
let criminalArr = [];


let Grass = require('./grass');
let GrassEater = require('./GrassEater');
let Predator = require('./Predator');
let Hunter = require('./Hunter');
let Criminal = require('./Criminal')


function createObject(matrix) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y, 2);
                grassEaterArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
                let pre = new Predator(x, y, 3);
                predatorArr.push(pre);
            }
            else if (matrix[y][x] == 4) {
                let hn = new Hunter(x, y, 4);
                hunterArr.push(hn);
            }
            else if (matrix[y][x] == 5) {
                let cr = new Criminal(x, y, 5);
                criminalArr.push(cr);
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}



socket.on('senddraw', game);
function game() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }
    for (let i in hunterArr) {
        hunterArr[i].eat();
    }
    for (let i in criminalArr) {
        criminalArr[i].eat();
    }

    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)
io.on('connection', createObject(matrix));
