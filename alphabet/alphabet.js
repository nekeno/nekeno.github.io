function check_alphabet(){
	var alphabet_rep = document.getElementById('alphabet_rep').value
	if(alphabet_rep.toLowerCase() === 'f'){
		alert("✔️ Exact ! Il y a 26 lettres donc il faut le 26 - 21 + 1 = 6ème lettre, soit la lettre F.")
		window.top.postMessage('fermer-diamond','*')

	}else if(alphabet_rep.toLowerCase() === ''){
		alert("❌ Mais pourquoi tu saisis du vide ? Commence à compter akhy.")
	}else{
		alert("❌ Eh non ! relis bien la consigne...")
	}
}