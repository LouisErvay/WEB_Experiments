import { calculateFactorial } from './factorial.js';
import { createMultiplicationTable } from './multiplication.js';
import { createBlackAndWhiteGrid, test } from './blackAndWhiteGrid/blackAndWhiteGridV1.js';
import { getLargestSquare } from './blackAndWhiteGrid/blackAndWhiteGridV2.js';
import { BlackAndWhiteCanvas } from './blackAndWhiteGrid/Canvas.js';

// Tableau à 2 dimentions pour la grille noire et blanche V1
let blackAndWhiteArray

// Instance de ma class Canvas pour la grille noire et blanche V2
let canvasV2

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
    document.getElementById('btn-create-black-and-white-grid').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('black-and-white-grid-size-first').value, 10);
        const secondValue = parseInt(document.getElementById('black-and-white-grid-size-second').value, 10);

        const gridContainer = document.getElementById('black-and-white-grid-container')


        blackAndWhiteArray = createBlackAndWhiteGrid(firstValue, secondValue, gridContainer)

    })

    document.getElementById('btn-essai').addEventListener('click', () => {
        test(blackAndWhiteArray)
    })


    // ------------------------- GRILLE V2 ----------------
    const bwSlider = document.getElementById('black-and-white-grid-slider')
    const bwSliderInput = document.getElementById('black-and-white-grid-slider-input')

    bwSlider.addEventListener('input', () => {
        bwSliderInput.value = bwSlider.value;
    });

    bwSliderInput.addEventListener('input', () => {
        if (bwSliderInput.value >= 0 && bwSliderInput.value <= 100) {
            bwSlider.value = bwSliderInput.value;
        }
    });


    document.getElementById('btn-create-black-and-white-grid-v2').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('black-and-white-grid-size-first-v2').value, 10);
        const secondValue = parseInt(document.getElementById('black-and-white-grid-size-second-v2').value, 10);

        const gridContainer = document.getElementById('black-and-white-grid-container-v2')
        const pError = document.getElementById('black-and-white-v2-error')
        
        canvasV2 = new BlackAndWhiteCanvas(firstValue, secondValue, gridContainer, Math.min(bwSliderInput.value / 100, 0.99999))

        let x = canvasV2.getBlackPixels().length
        if (x > 1000){
            pError.innerHTML = "ATTENTION : Votre tableau comporte plus de " + x + " pixels noirs. À ce nombre, vous risquez des ralentissements voir un crash de la page web.<br> Je vous conseille de revoir vos paramètres pour réduire ce nombre."
        }

    })

    document.getElementById('btn-essai-v2').addEventListener('click', () => {
        getLargestSquare(canvasV2)
    })

    document.getElementById('btn-del-canvas-v2').addEventListener('click', () => {
        const gridContainer = document.getElementById('black-and-white-grid-container-v2')
        const pError = document.getElementById('black-and-white-v2-error')

        gridContainer.innerHTML = ''
        pError.innerHTML = ''
    })
});
