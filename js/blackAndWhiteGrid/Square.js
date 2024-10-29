class Square{
    constructor(x1, y1, x2, y2, canvas){
        // Top Left
        this.x1 = x1
        this.y1 = y1

        // Bottom Right
        this.x2 = x2
        this.y2 = y2

        this.length = x2-x1
        this.canvas = canvas
    }

    updateLenght(){
        this.length = this.x2 - this.x1
    }

    getLenght(){
        return this.length
    }

    canExtendTop(){
        if (this.y1 - 1 < 0) return false
        return (!this.canvas.isBlackPixelInArea(this.x1, this.y1 -1, this.x2, this.y1 -1))
    }

    canExtendRight(){
        if (this.x2 + 1 > this.canvas.getXLenght()) return false
        return (!this.canvas.isBlackPixelInArea(this.x2 +1, this.y1, this.x2 +1, this.y2))
    }

    canExtendDown(){
        if (this.y2 + 1 > this.canvas.getYLenght()) return false
        return (!this.canvas.isBlackPixelInArea(this.x1, this.y2 +1, this.x2, this.y2 +1))
    }

    canExtendLeft(){
        if (this.x1 -1 < 0) return false
        return (!this.canvas.isBlackPixelInArea(this.x1 -1, this.y1, this.x1 -1, this.y2))
    }
}

export class TopSquare extends Square{
    constructor(x1, y1, x2, y2, canvas){
        super(x1, y1, x2, y2, canvas)
    }

    extendToLargestSquare(){
        let x1 = this.x1
        let y1 = this.y1
        let x2 = this.x2


        let nextDirection = 'right'
        let [xPlusBloque, xMoinsBloque, yMoinsBloque] = [false, false, false]


        while ((!xPlusBloque && !yMoinsBloque) || (!xMoinsBloque && !yMoinsBloque)) {
            switch (nextDirection) {
                case 'right':
                    if (!this.canExtendRight()){
                        nextDirection = 'left'
                        xPlusBloque = true
                        continue
                    }

                    this.x2 += 1
                    x2 += 1

                    if (!this.canExtendTop()){
                        this.x2 -= 1
                        x2 -= 1
                        nextDirection = 'left'
                        yMoinsBloque = true
                        continue
                    }

                    this.y1 -= 1
                    y1 -= 1

                    nextDirection = 'left'
                    
                    break;

                case 'left':
                    if (!this.canExtendLeft()){
                        nextDirection = 'right'
                        xMoinsBloque = true
                        continue
                    }

                    this.x1 -= 1
                    x1 -= 1
                    
                    if (!this.canExtendTop()){
                        this.x1 += 1
                        x1 += 1
                        nextDirection = 'right'
                        yMoinsBloque = true
                        continue
                    }

                    this.y1 -= 1
                    y1 -= 1
                    
                    nextDirection = 'right'

                    break;
            }
        }
        this.updateLenght()
    }
}

export class RightSquare extends Square{
    constructor(x1, y1, x2, y2, canvas){
        super(x1, y1, x2, y2, canvas)
    }

    extendToLargestSquare(){

        let x2 = this.x2;
        let y1 = this.y1;
        let y2 = this.y2;

        let nextDirection = 'down';
        let [yPlusBloque, yMoinsBloque, xPlusBloque] = [false, false, false];

        while ((!yPlusBloque && !xPlusBloque) || (!yMoinsBloque && !xPlusBloque)) {
            switch (nextDirection) {
                case 'down':
                    if (!this.canExtendDown()) {
                        nextDirection = 'up';
                        yPlusBloque = true;
                        continue;
                    }


                    this.y2 += 1;
                    y2 += 1;

                    if (!this.canExtendRight()) {
                        this.y2 -= 1;
                        y2 -= 1;
                        nextDirection = 'up';
                        xPlusBloque = true;
                        continue;
                    }


                    this.x2 += 1;
                    x2 += 1;

                    nextDirection = 'up';
                    break;

                case 'up':
                    if (!this.canExtendTop()) {
                        nextDirection = 'down';
                        yMoinsBloque = true;
                        continue;
                    }

                    this.y1 -= 1;
                    y1 -= 1;

                    if (!this.canExtendRight()) {
                        this.y1 += 1;
                        y1 += 1;
                        nextDirection = 'down';
                        xPlusBloque = true;
                        continue;
                    }

                    this.x2 += 1;
                    x2 += 1;

                    nextDirection = 'down';
                    break;
            }
        }
        this.updateLenght()
    }
}

export class BottomSquare extends Square{
    constructor(x1, y1, x2, y2, canvas){
        super(x1, y1, x2, y2, canvas)
    }

    extendToLargestSquare() {
        let x1 = this.x1;
        let x2 = this.x2;
        let y2 = this.y2;

        let nextDirection = 'right';
        let [xPlusBloque, xMoinsBloque, yPlusBloque] = [false, false, false];

        while ((!xPlusBloque && !yPlusBloque) || (!xMoinsBloque && !yPlusBloque)) {
            switch (nextDirection) {
                case 'right':
                    if (!this.canExtendRight()) {
                        nextDirection = 'left';
                        xPlusBloque = true;
                        continue;
                    }

                    this.x2 += 1;
                    x2 += 1;

                    if (!this.canExtendDown()) {
                        this.x2 -= 1;
                        x2 -= 1;
                        nextDirection = 'left';
                        yPlusBloque = true;
                        continue;
                    }

                    this.y2 += 1;
                    y2 += 1;

                    nextDirection = 'left';
                    break;

                case 'left':
                    if (!this.canExtendLeft()) {
                        nextDirection = 'right';
                        xMoinsBloque = true;
                        continue;
                    }

                    this.x1 -= 1;
                    x1 -= 1;

                    if (!this.canExtendDown()) {
                        this.x1 += 1;
                        x1 += 1;
                        nextDirection = 'right';
                        yPlusBloque = true;
                        continue;
                    }

                    this.y2 += 1;
                    y2 += 1;

                    nextDirection = 'right';
                    break;
            }
        }
        this.updateLenght()
    }
}

export class LeftSquare extends Square{
    constructor(x1, y1, x2, y2, canvas){
        super(x1, y1, x2, y2, canvas)
    }

    extendToLargestSquare() {
        let x1 = this.x1;
        let y1 = this.y1;
        let y2 = this.y2;

        let nextDirection = 'down';
        let [yPlusBloque, yMoinsBloque, xMoinsBloque] = [false, false, false];

        while ((!yPlusBloque && !xMoinsBloque) || (!yMoinsBloque && !xMoinsBloque)) {
            switch (nextDirection) {
                case 'down':
                    if (!this.canExtendDown()) {
                        nextDirection = 'up';
                        yPlusBloque = true;
                        continue;
                    }

                    this.y2 += 1;
                    y2 += 1;

                    if (!this.canExtendLeft()) {
                        this.y2 -= 1;
                        y2 -= 1;
                        nextDirection = 'up';
                        xMoinsBloque = true;
                        continue;
                    }

                    this.x1 -= 1;
                    x1 -= 1;

                    nextDirection = 'up';
                    break;

                case 'up':
                    if (!this.canExtendTop()) {
                        nextDirection = 'down';
                        yMoinsBloque = true;
                        continue;
                    }

                    this.y1 -= 1;
                    y1 -= 1;

                    if (!this.canExtendLeft()) {
                        this.y1 += 1;
                        y1 += 1;
                        nextDirection = 'down';
                        xMoinsBloque = true;
                        continue;
                    }

                    this.x1 -= 1;
                    x1 -= 1;

                    nextDirection = 'down';
                    break;
            }
        }
        this.updateLenght()
    }
}