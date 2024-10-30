let blackPixels

export function createBlackAndWhiteGrid(rows, cols, gridContainer) {
    const canvas = document.createElement('canvas');
    canvas.id = "black-and-white-canvas"
    canvas.width = cols * 3; // Ajuste la taille du canvas en fonction des colonnes et de la taille des cellules
    canvas.height = rows * 3; // Ajuste la taille du canvas en fonction des lignes et de la taille des cellules
    const context = canvas.getContext('2d');

    const colorArray = Array.from({ length: rows }, () => Array(cols).fill(''));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isBlack = Math.random() > 0.998;
            const color = isBlack ? 'black' : 'white'
            context.fillStyle = isBlack ? 'black' : 'white';
            context.fillRect(col * 3, row * 3, 3, 3); // Dessine un carré de 3x3 pixels

            colorArray[row][col] = color
        }
    }

    gridContainer.innerHTML = ''; // Efface le contenu précédent du conteneur
    gridContainer.appendChild(canvas); // Ajoute le canvas au conteneur

    return colorArray
}

function paintPixel(canvas, x, y, color){
    const context = canvas.getContext('2d');

    const a = x * 3; // 3px est la taille de chaque pixel
    const b = y * 3; // 3px est la taille de chaque pixel

    context.fillStyle = color
    context.fillRect(a, b, 3, 3); // Dessine un carré de 3x3 pixels
}

function paintArea(canvas, topLeft, bottomRight, color) {
    const { x: x1, y: y1 } = topLeft;
    const { x: x2, y: y2 } = bottomRight;

    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            paintPixel(canvas, x, y, color);
        }
    }
}

function getBlackPixels(colorArray) {
    const blackPixels = [];

    for (let y = 0; y < colorArray.length; y++) {
        for (let x = 0; x < colorArray[y].length; x++) {
            // Si la couleur est 'black', on ajoute les coordonnées
            if (colorArray[y][x] === 'black') {
                blackPixels.push({ x, y });
            }
        }
    }
    return blackPixels; 
}

function createSquare(x1, y1, x2, y2){
    return {
        topLeftAngle: {x:x1, y:y1},
        bottomRightAngle: {x:x2, y:y2},
        lenght: x2-x1
    }
}

function isBlackPixelInArea(x1, y1, x2, y2) {

    for (let pixel of blackPixels) {
        const { x, y } = pixel;
        // Vérifie si le pixel est dans la zone délimitée par les coins
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
            return true; // Si un pixel noir est trouvé dans la zone, retourne true
        }
    }

    return false; // Aucun pixel noir trouvé dans la zone
}

function canMoveUp(x1, x2, y){
    y --
    if (y < 0) return false
    return !isBlackPixelInArea(x1, y, x2, y)
}

function canMoveRight(y1, y2, x, maxLenghtX){
    x ++
    if (x > maxLenghtX) return false
    return !isBlackPixelInArea(x, y1, x, y2)
}

function canMoveDown(x1, x2, y, maxLenghtY){
    y ++
    if (y > maxLenghtY) return false
    return !isBlackPixelInArea(x1, y, x2, y)
}

function canMoveLeft(y1, y2, x){
    x --
    if (x < 0) return false
    return !isBlackPixelInArea(x, y1, x, y2)
}

function createTopSquare(blackPixel, maxLenghtX){
    let r1, r2, t1, t2, x1, x2, y1, y2
    r1 = r2 = x1 = x2 = blackPixel.x
    t1 = t2 = y1 = y2 = blackPixel.y - 1

    let nextDirection = 'right'
    let [xPlusBloque, xMoinsBloque, yPlusBloque] = [false, false, false]

    if (isBlackPixelInArea(x1, y1, x2, y2) || y1 < 0) return false

    function moveRight() {
        if (!canMoveRight(y1, y2, x2, maxLenghtX)){
            xPlusBloque = true;
            nextDirection = 'left';
            return;
        }

        x2 ++

        if (!canMoveUp(x1, x2, y1)){
            yPlusBloque = true;
            return
        } else {
            y1 --
            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'left';
        }        
    }
    
    function moveLeft() {
        if (!canMoveLeft(y1, y2, x1)){
            xMoinsBloque = true;
            nextDirection = 'right';
            return;
        }

        x1 --

        if (!canMoveUp(x1, x2, y1)){
            yPlusBloque = true;
            return
        } else {
            y1 --
            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'right';
        }
    }
    
    while ((!xPlusBloque && !yPlusBloque) || (!xMoinsBloque && !yPlusBloque)) {
        switch (nextDirection) {
            case 'right':
                moveRight();
                break;
            case 'left':
                moveLeft();
                break;
        }
    }
    
    return createSquare(r1,t1,r2,t2)
}

function createRightSquare(blackPixel, maxLenghtX, maxLenghtY) {
    let r1, r2, t1, t2, x1, x2, y1, y2;
    r1 = r2 = x1 = x2 = blackPixel.x + 1;
    t1 = t2 = y1 = y2 = blackPixel.y;

    let nextDirection = 'up';
    let [yPlusBloque, yMoinsBloque, xPlusBloque] = [false, false, false];

    if (isBlackPixelInArea(x1, y1, x2, y2 ) || x1 > maxLenghtX) return false;

    function moveUp() {
        if (!canMoveUp(x1, x2, y1)) {
            yMoinsBloque = true;
            nextDirection = 'down';
            return;
        }

        y1--;

        if (!canMoveRight(y1, y2, x2, maxLenghtX)) {
            xPlusBloque = true;
            return;
        } else {
            x2++;
            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'down';
        }
    }

    function moveDown() {
        if (!canMoveDown(x1, x2, y2, maxLenghtY)) {
            yPlusBloque = true;
            nextDirection = 'up';
            return;
        }

        y2++;

        if (!canMoveRight(y1, y2, x2, maxLenghtX)) {
            xPlusBloque = true;
            return;
        } else {
            x2++;

            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'up';
        }
    }

    while ((!yMoinsBloque && !xPlusBloque) || (!yPlusBloque && !xPlusBloque)) {
        switch (nextDirection) {
            case 'up':
                moveUp();
                break;
            case 'down':
                moveDown();
                break;
        }
    }

    return createSquare(r1, t1, r2, t2);
}

function createLeftSquare(blackPixel, maxLenghtY) {
    let r1, r2, t1, t2, x1, x2, y1, y2;
    r1 = r2 = x1 = x2 = blackPixel.x - 1;
    t1 = t2 = y1 = y2 = blackPixel.y;

    let nextDirection = 'up';
    let [yPlusBloque, yMoinsBloque, xMoinsBloque] = [false, false, false];

    if (isBlackPixelInArea(x1, y1, x2, y2) || x1 < 0) return false;

    function moveUp() {
        if (!canMoveUp(x1, x2, y1)) {
            yMoinsBloque = true;
            nextDirection = 'down';
            return;
        }

        y1--;

        if (!canMoveLeft(y1, y2, x1)) {
            xMoinsBloque = true;
            return;
        } else {
            x1--;

            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'down';
        }
    }

    function moveDown() {
        if (!canMoveDown(x1, x2, y2, maxLenghtY)) {
            yPlusBloque = true;
            nextDirection = 'up';
            return;
        }

        y2++;

        if (!canMoveLeft(y1, y2, x1)) {
            xMoinsBloque = true;
            return;
        } else {
            x1--;

            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'up';
        }
    }

    while ((!yMoinsBloque && !xMoinsBloque) || (!yPlusBloque && !xMoinsBloque)) {
        switch (nextDirection) {
            case 'up':
                moveUp();
                break;
            case 'down':
                moveDown();
                break;
        }
    }

    return createSquare(r1, t1, r2, t2);
}

function createBottomSquare(blackPixel, maxLenghtX, maxLenghtY) {
    let r1, r2, t1, t2, x1, x2, y1, y2;
    r1 = r2 = x1 = x2 = blackPixel.x;
    t1 = t2 = y1 = y2 = blackPixel.y + 1;

    let nextDirection = 'right';
    let [xPlusBloque, xMoinsBloque, yPlusBloque] = [false, false, false];

    if (isBlackPixelInArea(x1, y1, x2, y2) || y1 > maxLenghtY) return false;

    function moveRight() {
        if (!canMoveRight(y1, y2, x2, maxLenghtX)) {
            xPlusBloque = true;
            nextDirection = 'left';
            return;
        }

        x2++;

        if (!canMoveDown(x1, x2, y2, maxLenghtY)) {
            yPlusBloque = true;
            return;
        } else {
            y2++;

            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'left';
        }
    }

    function moveLeft() {
        if (!canMoveLeft(y1, y2, x1)) {
            xMoinsBloque = true;
            nextDirection = 'right';
            return;
        }

        x1--;

        if (!canMoveDown(x1, x2, y2, maxLenghtY)) {
            yPlusBloque = true;
            return;
        } else {
            y2++;

            [r1, t1, r2, t2] = [x1, y1, x2, y2];
            nextDirection = 'right';
        }
    }

    while ((!xPlusBloque && !yPlusBloque) || (!xMoinsBloque && !yPlusBloque)) {
        switch (nextDirection) {
            case 'right':
                moveRight();
                break;
            case 'left':
                moveLeft();
                break;
        }
    }

    return createSquare(r1, t1, r2, t2);
}

function findLargestSquare(squares) {
    return squares.reduce((largest, current) => {
        return (current.lenght > largest.lenght) ? current : largest;
    });
}


export function test(colorArray){
    const canvas = document.getElementById('black-and-white-canvas')

    blackPixels = getBlackPixels(colorArray)

    const maxLenghtX = colorArray.length-1
    const maxLenghtY = colorArray[0].length-1

    let validSquareList = []
    let result

    blackPixels.forEach(blackpixel => {
        result = createTopSquare(blackpixel, maxLenghtX)
        if (result) {validSquareList.push(result)}

        result = createRightSquare(blackpixel, maxLenghtX, maxLenghtY)
        if (result) {validSquareList.push(result)}

        result = createLeftSquare(blackpixel, maxLenghtY)
        if (result) {validSquareList.push(result)}
        
        result = createBottomSquare(blackpixel, maxLenghtX, maxLenghtY)
        if (result) {validSquareList.push(result)}
    });
   
    let final = findLargestSquare(validSquareList)
    paintArea(canvas, final.topLeftAngle, final.bottomRightAngle, "red")

}
