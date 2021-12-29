const TEMPS_ATTENTE_EN_SECONDES = 30


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

	//save les placements faits
	valeurs_cases = {}
	$('.case').each(function(myindex,element){
		if(element.firstChild){
			valeurs_cases[element.id] = element.firstChild.innerText || "VIDE"
		}
	})
	
	//console.log({valeurs_cases})
	stocker('valeurs_cases',JSON.stringify(valeurs_cases))



	//si on drop dans une case -> enregistrer l'horodateur de drop + vérifier que tout est ok
	if(nom_classe_dropable==='case'){
		stocker('horodateur_drop', Date.now())	
		verifier_tout()


	} 

  
}

function verifier_tout(){
	if(verifier_cases()){
		setTimeout(function(){
			alert("👏PENDU RESOLU👏 Il reste une dernière étape...")
    		stocker("class3",true)
    		enlever_accueil()
    		aller_etape(2,true)	
		}, 300)
		
	}else{
		enlever("class3")
	}
}