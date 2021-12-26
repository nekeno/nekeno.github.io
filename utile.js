function stocker(nom_variable,valeur_variable){
	window.localStorage.setItem(nom_variable, valeur_variable)
	return recuperer(nom_variable)
}

function recuperer(nom_variable,mode_chiffre){
	resultat =  window.localStorage.getItem(nom_variable)
	if(mode_chiffre){
		resultat = isNaN(Number(resultat)) ? 9999999999 : Number(resultat)	
	}else{
		if(resultat === null) resultat = ""
	}
	return resultat 
}

function enlever(nom_variable){
	window.localStorage.removeItem(nom_variable)
	return true
}

function afficher(id){
	document.getElementById(id).style.display = 'block'
}

function masquer(id){
	document.getElementById(id).style.display = 'none'
}

