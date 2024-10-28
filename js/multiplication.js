export function createMultiplicationTable(first, second) {
    let html=""; // conteneur du HTML
    let m=1; // Conteur de First
    let n=1; // Conteur de Second
    let z; // Variable qu'on affiche dans la variable html

    if (isNaN(first) || isNaN(second) || first === 0 || second === 0){
        console.log('ici')
        return "<p>Insérez deux nombres supérieur à 0</p>"
    } else {
        html="<table border='1' cellspacing='5' cellpadding='8'><caption>Tables de multiplication de "+first+" par "+second+".</caption>";

        for(let i = 0 ; i < first ; i++){
            html+="<tr>";
            
            for(let y = 0 ; y < second ; y++){
                html += "<td>";
                z = m * n
                html += z + "</td>";
                n++;
            }

            html += "</tr>";
            n = 1;
            m++;
        }

        return html+"</table>";
    }
}