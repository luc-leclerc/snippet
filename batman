
var inputs = readline().split(' ');
var width = parseInt(inputs[0]); // width of the building.
var height = parseInt(inputs[1]); // height of the building.
var turn = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
var X0 = parseInt(inputs[0]);
var Y0 = parseInt(inputs[1]);
// x0, y0 is top left.
// x is left to right
// y is up and down

var firstMove = true;
leftX = 0
rightX = width-1
upY = 0
downY = height-1
// game loop
while (true) {
    var bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    printErr('bombDir: ' + bombDir);
    var isUp = (bombDir.indexOf("U") != -1);
    var isDown = (bombDir.indexOf("D") != -1);
    var isRight = (bombDir.indexOf("R") != -1);
    var isLeft = (bombDir.indexOf("L") != -1);
    
    // Reduce scope
    if (isLeft) {
        rightX = X0;
        X0 = X0 - Math.max(Math.ceil((rightX - leftX) / 2), 1)
    } else if(isRight) {
        leftX = X0;
        X0 = X0 + Math.max(Math.ceil((rightX - leftX) / 2), 1)
    }
    
    if (isUp) {
        downY = Y0;
        Y0 = Y0 - Math.max(Math.ceil((downY - upY) / 2) , 1)
    } else if (isDown) {
        upY = Y0;
        Y0 = Y0 + Math.max(Math.ceil((downY - upY) / 2) , 1)
    }
    
    
    print(X0 +' '+ Y0);
}
