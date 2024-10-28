export class BlackAndWhiteCanvas{
    constructor(rows, cols, htmlContainer){
        self.rows = rows
        self.cols = cols
        self.htmlContainer = htmlContainer

        self.canvas = document.createElement('canvas');
        self.canvas.id = "black-and-white-canvas"
        self.canvas.width = cols * 3; // Ajuste la taille du canvas en fonction des colonnes et de la taille des cellules
        self.canvas.height = rows * 3; // Ajuste la taille du canvas en fonction des lignes et de la taille des cellules
        self.context = canvas.getContext('2d');

        self.colorArray = Array.from({ length: rows }, () => Array(cols).fill(''));
        self.blackPixels = []

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isBlack = Math.random() > 0.998;
                const color = isBlack ? 'black' : 'white'
                isBlack ? self.blackPixels.push({x: row, y: col}) : null
                self.context.fillStyle = isBlack ? 'black' : 'white';
                self.context.fillRect(col * 3, row * 3, 3, 3); // Dessine un carré de 3x3 pixels

                self.colorArray[row][col] = color
            }
        }

        self.htmlContainer.innerHTML = ''; // Efface le contenu précédent du conteneur
        self.htmlContainer.appendChild(canvas); // Ajoute le canvas au conteneur

    }

    getColorArray(){
        return self.colorArray
    }

    getBlackPixels(){
        return self.blackPixels
    }

    getXLenght(){
        return self.rows -1
    }

    getYLenght(){
        return self.cols -1
    }

    getCanvas(){
        return self.canvas
    }
}