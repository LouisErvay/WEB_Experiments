export function calculateFactorial(num) {
    if (num < 0) return null; // Pas de factorielle pour les nombres négatifs
    if (num === 0) return 1; // 0! = 1
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    return factorial;
}