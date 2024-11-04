export class Line {
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
}

export class HorizontalLine extends Line{
    constructor(x, y1, y2, canvas){
        super(x, y1, x, y2, canvas)
    }

    extendLeft(){
        let canExtend = true
        while (canExtend){
            if (!this.canvas.isBlackPixelInArea(this.x1, this.y1--, this.x2, this.y2)) this.y1 --
        }
    }

    extendRight(){
        let canExtend = true
        while (canExtend){
            if (!this.canvas.isBlackPixelInArea(this.x1, this.y1, this.x2, this.y2++)) this.y2 ++
        }
    }
}

export class VerticalLine extends Line{
    constructor(y, x1, x2, canvas){
        super(x1, y, x2, y, canvas)
    }

    extendTop(){
        let canExtend = true
        while (canExtend){
            if (!this.canvas.isBlackPixelInArea(this.x1--, this.y1, this.x2, this.y2)) this.x1 --
        }
    }

    extendBot(){
        let canExtend = true
        while (canExtend){
            if (!this.canvas.isBlackPixelInArea(this.x1, this.y1, this.x2++, this.y2)) this.x2 ++
        }
    }
}