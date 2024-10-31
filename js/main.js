import { calculateFactorial } from './factorial.js';
import { createMultiplicationTable } from './multiplication.js';
import { getLargestSquare } from './blackAndWhiteGrid/V1/blackAndWhiteGridV1.js';
import { BlackAndWhiteCanvas } from './blackAndWhiteGrid/Canvas.js';

// Tableau à 2 dimentions pour la grille noire et blanche V1
let blackAndWhiteArray

// Instance de ma class Canvas pour la grille noire et blanche V2
let bwCanvasV1

// Ajouter des écouteurs d'événements aux boutons
document.addEventListener('DOMContentLoaded', () => {
    // ------------------------- FACTORIELLE ----------------
    document.getElementById('btn-convert-in-factorial').addEventListener('click', () => {
        const inputValue = parseInt(document.querySelector('.nb-to-convert-in-factorial').value, 10);
        
        const result = calculateFactorial(inputValue);
        
        document.querySelector('.factorial-result').textContent = `La factorielle de ${inputValue} est ${result}`;
    });

    // ------------------------- TABLES DE MULTIPLICATION ----------------
    document.getElementById('btn-create-multiplication-table').addEventListener('click', () => {
        const firstValue = parseInt(document.getElementById('multiplication-table-size-first').value, 10);
        const secondValue = parseInt(document.getElementById('multiplication-table-size-second').value, 10);
        
        const multiplicationTableHTML = createMultiplicationTable(firstValue, secondValue);
        
        document.querySelector('.multiplication-result').innerHTML = multiplicationTableHTML;
    });

    // ------------------------- GRILLE V1 ----------------
    const bwSlider = document.getElementById('bw-ratio-slider-v1')
    const bwSliderInput = document.getElementById('bw-ratio-slider-input-v1')

    bwSlider.addEventListener('input', () => {
        bwSliderInput.value = bwSlider.value;
    });

    bwSliderInput.addEventListener('input', () => {
        if (bwSliderInput.value >= 0 && bwSliderInput.value <= 100) {
            bwSlider.value = bwSliderInput.value;
        }
    });

    document.getElementById('bw-btn-create-grid-v1').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('bw-grid-rows-v1').value, 10);
        const secondValue = parseInt(document.getElementById('bw-grid-cols-v1').value, 10);

        const gridContainer = document.getElementById('bw-grid-container-v1')
        const pError = document.getElementById('bw-error-v1')
        
        bwCanvasV1 = new BlackAndWhiteCanvas(firstValue, secondValue, gridContainer, Math.min(bwSliderInput.value / 100, 0.99999))

        let x = bwCanvasV1.getBlackPixels().length
        if (x > 1000){
            pError.innerHTML = "ATTENTION : Votre tableau comporte plus de " + x + " pixels noirs. À ce nombre, vous risquez des ralentissements voir un crash de la page web.<br> Je vous conseille de revoir vos paramètres pour réduire ce nombre."
        } else {
            pError.innerHTML = ""
        }

    })

    document.getElementById('bw-btn-find-square-v1').addEventListener('click', () => {
        getLargestSquare(bwCanvasV1)
    })

    document.getElementById('bw-btn-clear-canvas-v1').addEventListener('click', () => {
        const gridContainer = document.getElementById('bw-grid-container-v1')
        const pError = document.getElementById('bw-error-v1')

        gridContainer.innerHTML = ''
        pError.innerHTML = ''
    })
});
