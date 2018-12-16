/*
    Dette script er baseret på værdierne i input-felterne med ID
    'nyDataInput-Uid' og 'nyDataInput-Fuldenavn' under 'redigerData.html'
*/

// Blanding af Vanilla JS og jQuery
$(document).ready(function() {
    // ID
    $('#nyDataInput-Uid').change(function() {
        let inputData = document.getElementById("nyDataInput-Uid").value;
        document.getElementById("nyDataTekst-Uid").innerHTML = inputData;
    });
    // Fulde navn
    $('#nyDataInput-Fuldenavn').change(function() {
        let inputData = document.getElementById("nyDataInput-Fuldenavn").value;
        document.getElementById("nyDataTekst-Fuldenavn").innerHTML = inputData;
    });
    // Nulstil data i form
    $('#nulstilData').click(function() {
        document.getElementById("redigerDataForm").reset();
        document.getElementById("nyDataTekst-Uid").innerHTML = "Intet angivet";
        document.getElementById("nyDataTekst-Fuldenavn").innerHTML = "Intet angivet";
    });
});