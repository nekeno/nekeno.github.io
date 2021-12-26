function check_oeuf(){
	var oeuf_rep = document.getElementById('oeuf_rep').value
	if(oeuf_rep.toLowerCase() === 'e'){
		alert("✔️ Bien vu ! En effet, tu lis ça comme si c'était juste la lettre E.")
		window.top.postMessage('fermer-triangle','*')

	}else if(oeuf_rep.toLowerCase() === ''){
		alert("❌ Mais pourquoi tu saisis du vide ? Regarde bien il y en a combien...")
	}else{
		alert("❌ Eh non ! Relis bien la consigne.")
	}
}