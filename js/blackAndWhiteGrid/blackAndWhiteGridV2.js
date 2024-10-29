import { TopSquare, RightSquare, BottomSquare, LeftSquare } from './Square.js'

export function getLargestSquare(canvas){
    const blackPixels = canvas.getBlackPixels()

    let validSquareList = []
    let square
    let x1, y1, x2, y2


    blackPixels.forEach(pixel => {
        x1 = x2 = pixel.x
        y1 = y2 = pixel.y - 1
        if (!(canvas.isBlackPixelInArea(x1, y1, x2, y2) || y1 < 0)) {
            square = new TopSquare(x1, y1, x2, y2, canvas)
            square.extendToLargestSquare()
            validSquareList.push(square)
        }

        x1 = x2 = pixel.x + 1
        y1 = y2 = pixel.y
        if (!(canvas.isBlackPixelInArea(x1, y1, x2, y2 ) || x1 > canvas.getXLenght())) {
            square = new RightSquare(x1, y1, x2, y2, canvas)
            square.extendToLargestSquare()
            validSquareList.push(square)
        }

        x1 = x2 = pixel.x
        y1 = y2 = pixel.y + 1
        if (!(canvas.isBlackPixelInArea(x1, y1, x2, y2) || x1 < 0)) {
            square = new BottomSquare(x1, y1, x2, y2, canvas)
            square.extendToLargestSquare()
            validSquareList.push(square)
        }

        x1 = x2 = pixel.x - 1
        y1 = y2 = pixel.y
        if (!(canvas.isBlackPixelInArea(x1, y1, x2, y2) || y1 > canvas.getYLenght())) {
            square = new LeftSquare(x1, y1, x2, y2, canvas)
            square.extendToLargestSquare()
            validSquareList.push(square)
        }
    });

    console.log(validSquareList)

    square = validSquareList.reduce((largest, current) => {
        return (current.getLenght() > largest.getLenght()) ? current : largest
    })

    canvas.paintArea(square.x1, square.y1, square.x2, square.y2, 'red')
}