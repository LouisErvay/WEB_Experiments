export function getLargestSquare(canvas){
    const blackPixels = canvas.getBlackPixels()

    let validSquareList = []
    let square

    const pError = document.getElementById('black-and-white-v2-error')

    console.log(blackPixels)

    blackPixels.forEach(pixel => {
        pixel.updateSquares()
        pixel.getAllSquares().forEach(square => {
            validSquareList.push(square)
        });
    });

    console.log(validSquareList)


    square = validSquareList.reduce((largest, current) => {
        return (current.getLenght() > largest.getLenght()) ? current : largest
    })

    canvas.paintArea(square.x1, square.y1, square.x2, square.y2, 'red')
}