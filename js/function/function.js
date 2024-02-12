//déclencher le clic sur l'input de type file
function triggerFileInput() {
    document.getElementById('inputFile').click();
}

document.getElementById('inputFile').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    //traiter le fichier sélectionné
    var selectedFile = event.target.files[0];
    console.log('Fichier sélectionné:', selectedFile.name);
}