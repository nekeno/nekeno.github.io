function check_digicode(){
	var digicode_rep = document.getElementById('digicode_rep').value
	if(digicode_rep.toLowerCase() === 'n'){
		alert("✔️ Bien joué chakal, il s'agit bien de la lettre N.")
		window.top.postMessage('fermer-cercle','*')

	}else if(digicode_rep.toLowerCase() === ''){
		alert("❌ Mais pourquoi tu saisis du vide ?")
	}else{
		alert("❌ Eh non ! refais à nouveau le code pour voir...")
	}
}