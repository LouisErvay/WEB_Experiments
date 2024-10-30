import { TopSquare, RightSquare, BottomSquare, LeftSquare } from './Square.js'

export class BlackPixel{
    constructor(x, y, canvas){
        this.x = x
        this.y = y
        this.canvas = canvas
        this.topSquare = new TopSquare(x, y-1, x, y-1, canvas)
        this.rightSquare = new RightSquare(x+1, y, x+1, y, canvas)
        this.bottomSquare = new BottomSquare(x, y+1, x, y+1, canvas)
        this.leftSquare = new LeftSquare(x-1, y, x-1, y, canvas)
    }

    updateSquares(){
        this.topSquare.extendToLargestSquare()
        this.rightSquare.extendToLargestSquare()
        this.bottomSquare.extendToLargestSquare()
        this.leftSquare.extendToLargestSquare()
    }

    getAllSquares(){
        return [this.topSquare, this.rightSquare, this.bottomSquare, this.leftSquare]
    }
}