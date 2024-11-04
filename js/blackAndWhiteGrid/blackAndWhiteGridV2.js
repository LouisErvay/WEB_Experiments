import { Square } from "./Square.js"

export function getLargestSquareV2(canvas){
    const blackPixels = canvas.getBlackPixels()

    let validSquareList = []
    let lineList = []
    let square

    const pError = document.getElementById('black-and-white-v2-error')

    if (blackPixels.length === 0) {
        square = new Square(0, 0, canvas.rows, canvas.cols, canvas)
    } else {
        blackPixels.forEach(pixel => {
            
        });
    }

    // canvas.paintArea(square.x1, square.y1, square.x2, square.y2, 'red')
}