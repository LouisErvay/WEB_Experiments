export class BlackAndWhiteCanvas{
    constructor(rows, cols, htmlContainer){
        this.rows = rows - 1
        this.cols = cols - 1
        this.htmlContainer = htmlContainer

        this.canvas = document.createElement('canvas');
        this.canvas.id = "black-and-white-canvas"
        this.canvas.width = cols * 3; // Ajuste la taille du canvas en fonction des colonnes et de la taille des cellules
        this.canvas.height = rows * 3; // Ajuste la taille du canvas en fonction des lignes et de la taille des cellules
        this.context = this.canvas.getContext('2d');

        this.colorArray = Array.from({ length: rows }, () => Array(cols).fill(''));
        this.blackPixels = []

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isBlack = Math.random() > 0.999;
                const color = isBlack ? 'black' : 'white'
                isBlack ? this.blackPixels.push({x: col, y: row}) : null
                this.context.fillStyle = isBlack ? 'black' : 'white';
                this.context.fillRect(col * 3, row * 3, 3, 3); // Dessine un carré de 3x3 pixels

                this.colorArray[row][col] = color
            }
        }

        this.htmlContainer.innerHTML = ''; // Efface le contenu précédent du conteneur
        this.htmlContainer.appendChild(this.canvas); // Ajoute le canvas au conteneur

    }

    getColorArray(){
        return this.colorArray
    }

    getBlackPixels(){
        return this.blackPixels
    }

    getXLenght(){
        return this.rows
    }

    getYLenght(){
        return this.cols
    }

    getCanvas(){
        return this.canvas
    }

    paintPixel(x, y, color){
        const a = x * 3;
        const b = y * 3;

        this.context.fillStyle = color
        this.context.fillRect(a, b, 3, 3)
    }

    paintArea(x1, y1, x2, y2, color){
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                this.paintPixel(x, y, color);
            }
        }
    }

    isBlackPixelInArea(x1, y1, x2, y2){
        // Boucle sur tous les pixels noirs, return True si un pixel noir est dans la zone donnée
        // console.log("TEST DU CARRE : " + x1, y1, x2, y2)
        for (let i in this.blackPixels){
            const { x, y } = this.blackPixels[i];
            // console.log("test, pixel noir : " + x, y + " -- return : " + (x >= x1 && x <= x2 && y >= y1 && y <= y2))
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return true
        }
        return false; // Aucun pixel noir trouvé dans la zone
    }
}