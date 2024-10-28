import { calculateFactorial } from './factorial.js';
import { createMultiplicationTable } from './multiplication.js';
import { createBlackAndWhiteGrid, test } from './blackAndWhiteGrid/blackAndWhiteGrid.js';
import { BlackAndWhiteCanvas } from './blackAndWhiteGrid/Canvas.js';

// Tableau à 2 dimentions 
let blackAndWhiteArray

// Ajouter des écouteurs d'événements aux boutons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-convert-in-factorial').addEventListener('click', () => {
        const inputValue = parseInt(document.querySelector('.nb-to-convert-in-factorial').value, 10);
        
        const result = calculateFactorial(inputValue);
        
        document.querySelector('.factorial-result').textContent = `La factorielle de ${inputValue} est ${result}`;
    });

    document.getElementById('btn-create-multiplication-table').addEventListener('click', () => {
        const firstValue = parseInt(document.getElementById('multiplication-table-size-first').value, 10);
        const secondValue = parseInt(document.getElementById('multiplication-table-size-second').value, 10);
        
        const multiplicationTableHTML = createMultiplicationTable(firstValue, secondValue);
        
        document.querySelector('.multiplication-result').innerHTML = multiplicationTableHTML;
    });

    document.getElementById('btn-create-black-and-white-grid').addEventListener('click', () => {

        const firstValue = parseInt(document.getElementById('black-and-white-grid-size-first').value, 10);
        const secondValue = parseInt(document.getElementById('black-and-white-grid-size-second').value, 10);

        const gridContainer = document.getElementById('black-and-white-grid-container')

        
        blackAndWhiteArray = createBlackAndWhiteGrid(firstValue, secondValue, gridContainer)

    })

    document.getElementById('btn-essai').addEventListener('click', () => {
        test(blackAndWhiteArray)
    })
});
