const TEMPS_ATTENTE_EN_SECONDES = 60


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

function allowDrop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}



function drop(ev,nom_classe_dropable) {


	ev.preventDefault();
	ev.stopPropagation();

	var ancien_horodateur_drop = recuperer('horodateur_drop')
	//console.log({ancien_horodateur_drop})

	//console.log({'maintenant':Date.now()})

	var difference_en_secondes = Date.now() - ancien_horodateur_drop
	difference_en_secondes = Math.floor(difference_en_secondes / 1000)
	//console.log({difference_en_secondes})


	//si nom_classe_dropable = 'case' et difference_en_secondes < 180 secondes: ne rien faire
	if(nom_classe_dropable==='case' && difference_en_secondes < TEMPS_ATTENTE_EN_SECONDES ){
		temps_restant = TEMPS_ATTENTE_EN_SECONDES-difference_en_secondes
		alert("⚠️ Merci d'attendre encore " + temps_restant + " secondes avant de placer une lettre.")
		return false	
	} 



	var data = ev.dataTransfer.getData("text");
	//console.log({data})


	//c'est dans la bonne zone de drop
	if(ev.target.className===nom_classe_dropable){

		ev.target.insertBefore(document.getElementById(data), ev.target.firstChild);

	//c'est pas dans la bonne zone de drop
	}else{

		//on drop dans le parent de là où j'ai drop en tant que 1er élément
		try{
			ev.target.parentNode.insertBefore(document.getElementById(data), ev.target.firstChild);	

		//on drop dans le parent de là où j'ai drop en tant que dernier élément
		}catch(e){
			//console.error(e)
			ev.target.parentNode.append(document.getElementById(data));	
		}

	}

	//si on drop dans une case -> enregistrer l'horodateur de drop PUIS les placements faits
	if(nom_classe_dropable==='case'){
		stocker('horodateur_drop', Date.now())	
		
	} 


  
}