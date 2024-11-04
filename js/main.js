import { calculateFactorial } from './factorial.js';
import { createMultiplicationTable } from './multiplication.js';
import { getLargestSquareV1 } from './blackAndWhiteGrid/blackAndWhiteGridV1.js';
import { getLargestSquareV2 } from './blackAndWhiteGrid/blackAndWhiteGridV2.js';
import { BlackAndWhiteCanvas } from './blackAndWhiteGrid/Canvas.js';
import { BlackPixelV1, BlackPixelV2 } from './blackAndWhiteGrid/BlackPixel.js';


// Instance de ma class Canvas pour la grille noire et blanche V1
let bwCanvasV1

// Instance de ma class Canvas pour la grille noire et blanche V1
let bwCanvasV2

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
    const bwSliderV1 = document.getElementById('bw-ratio-slider-v1')
    const bwSliderInputV1 = document.getElementById('bw-ratio-slider-input-v1')

    bwSliderV1.addEventListener('input', () => {
        bwSliderInputV1.value = bwSliderV1.value;
    });

    bwSliderInputV1.addEventListener('input', () => {
        if (bwSliderInputV1.value >= 0 && bwSliderInputV1.value <= 100) {
            bwSliderV1.value = bwSliderInputV1.value;
        }
    });

    document.getElementById('bw-btn-create-grid-v1').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('bw-grid-rows-v1').value, 10);
        const secondValue = parseInt(document.getElementById('bw-grid-cols-v1').value, 10);

        const gridContainer = document.getElementById('bw-grid-container-v1')
        const pError = document.getElementById('bw-error-v1')
        
        bwCanvasV1 = new BlackAndWhiteCanvas(firstValue, secondValue, gridContainer, Math.min(bwSliderInputV1.value / 100, 0.99999), BlackPixelV1)

        let x = bwCanvasV1.getBlackPixels().length
        if (x > 1000){
            pError.innerHTML = "ATTENTION : Votre tableau comporte plus de " + x + " pixels noirs. À ce nombre, vous risquez des ralentissements voir un crash de la page web.<br> Je vous conseille de revoir vos paramètres pour réduire ce nombre."
        } else {
            pError.innerHTML = ""
        }

    })

    document.getElementById('bw-btn-find-square-v1').addEventListener('click', () => {
        getLargestSquareV1(bwCanvasV1)
    })

    document.getElementById('bw-btn-clear-canvas-v1').addEventListener('click', () => {
        const gridContainer = document.getElementById('bw-grid-container-v1')
        const pError = document.getElementById('bw-error-v1')

        gridContainer.innerHTML = ''
        pError.innerHTML = ''
    })

    // ------------------------- GRILLE V2 ----------------
    const bwSliderV2 = document.getElementById('bw-ratio-slider-v2')
    const bwSliderInputV2 = document.getElementById('bw-ratio-slider-input-v2')

    bwSliderV2.addEventListener('input', () => {
        bwSliderInputV2.value = bwSliderV2.value;
    });

    bwSliderInputV2.addEventListener('input', () => {
        if (bwSliderInputV2.value >= 0 && bwSliderInputV2.value <= 100) {
            bwSliderV2.value = bwSliderInputV2.value;
        }
    });

    document.getElementById('bw-btn-create-grid-v2').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('bw-grid-rows-v2').value, 10);
        const secondValue = parseInt(document.getElementById('bw-grid-cols-v2').value, 10);

        const gridContainer = document.getElementById('bw-grid-container-v2')
        const pError = document.getElementById('bw-error-v2')
        
        bwCanvasV2 = new BlackAndWhiteCanvas(firstValue, secondValue, gridContainer, Math.min(bwSliderInputV2.value / 100, 0.99999), BlackPixelV2)

        let x = bwCanvasV2.getBlackPixels().length
        if (x > 1000){
            pError.innerHTML = "ATTENTION : Votre tableau comporte plus de " + x + " pixels noirs. À ce nombre, vous risquez des ralentissements voir un crash de la page web.<br> Je vous conseille de revoir vos paramètres pour réduire ce nombre."
        } else {
            pError.innerHTML = ""
        }

    })

    document.getElementById('bw-btn-find-square-v2').addEventListener('click', () => {
        getLargestSquareV2(bwCanvasV2)
    })

    document.getElementById('bw-btn-clear-canvas-v2').addEventListener('click', () => {
        const gridContainer = document.getElementById('bw-grid-container-v2')
        const pError = document.getElementById('bw-error-v2')

        gridContainer.innerHTML = ''
        pError.innerHTML = ''
    })
});
