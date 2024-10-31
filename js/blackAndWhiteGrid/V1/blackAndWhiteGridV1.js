import { Square } from "./Square.js"

export function getLargestSquare(canvas){
    const blackPixels = canvas.getBlackPixels()

    let validSquareList = []
    let square

    const pError = document.getElementById('black-and-white-v2-error')

    if (blackPixels.length === 0) {
        square = new Square(0, 0, canvas.rows, canvas.cols, canvas)
    } else {
        blackPixels.forEach(pixel => {
            pixel.updateSquares()
            pixel.getAllSquares().forEach(square => {
                validSquareList.push(square)
            });
        });
    
        square = validSquareList.reduce((largest, current) => {
            return (current.getLenght() > largest.getLenght()) ? current : largest
        })
    }

    canvas.paintArea(square.x1, square.y1, square.x2, square.y2, 'red')
}