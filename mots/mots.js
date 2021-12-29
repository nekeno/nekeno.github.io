function check_mots(){

}

function liste_indices_cases_f(){
	return ",6,,22,,26,,38,,41,,42,,43,,44,,45,,46,,47,,48,,51,,52,,53,,54,,55,,56,,58,,70,,74,,75,,76,,77,,78,,79,,80,,81,,82,,83,,84,,85,,86,,87,,90,,94,,102,,104,,105,,106,,110,,118,,122,,133,,134,,135,,136,,137,,138,,139,,149,,165,,166,,167,,168,,169,,170,,171,,172,,173,,174,,175,"
}

function liste_reponses_f(){
	return ",C,,A,,B,,N,,M,,A,,N,,I,,E,,R,,E,,S,,T,,W,,I,,T,,C,,H,,B,,I,,A,,L,,G,,E,,R,,I,,E,,U,,K,,R,,A,,I,,N,,E,,Y,,I,,A,,G,,T,,A,,Z,,L,,G,,R,,E,,G,,U,,L,,A,,R,,A,,K,,O,,L,,A,,N,,T,,W,,I,,T,,C,,H,"
}

function init_mots_croises(){
	var html_cases = ""
	var liste_indices_cases = liste_indices_cases_f()
	var liste_reponses = liste_reponses_f()

	var compteur_case_entoure = 0

	var contenu = window.localStorage.getItem('mots_croises')
	if(contenu) contenu=JSON.parse(contenu)
	console.log({contenu})

	for(indice_case = 1;indice_case<=176;indice_case++){
		la_classe_case = "une_case"
		la_classe_case += liste_indices_cases.includes(','+indice_case+',') ? " entoure" : ""
		if(la_classe_case.includes("entoure")) compteur_case_entoure = compteur_case_entoure+1
		est_editable =  liste_indices_cases.includes(','+indice_case+',') ? "true" : "false"

		console.log()

		contenu_case = contenu && la_classe_case.includes("entoure") ? contenu[compteur_case_entoure].toUpperCase() : ""
		html_cases += '<span id="case'+indice_case+'" oninput="verif_case(this)" class="'+la_classe_case+'" contentEditable="'+est_editable+'">'+contenu_case+'</span>'
	}
	
	document.getElementsByClassName('container')[0].innerHTML = html_cases
	autoriser_que_un_car()
	$('.entoure').trigger("input")
}

function autoriser_que_un_car(){
	$('.une_case').keydown(function(e){
	   if(e.which!==9) return $.inArray(e.which, [8, 46, 37, 39]) > -1 || $(this).text().length == 0;
	});
}

function verif_case(ceci){
	//récupérer l'ID de la case où on a saisit
	//console.log(ceci.id)
	var identifiant_case = ceci.id.replace("case","")
	//console.log({identifiant_case})

	var les_indices = liste_indices_cases_f().replaceAll(',,',',').split(',')
	var les_reponses = liste_reponses_f().replaceAll(',,',',').split(',')

	//on enleve le 1er et le dernier
	les_indices.shift()
	les_indices.pop()
	les_reponses.shift()
	les_reponses.pop()

	/*
	console.log(les_indices)
	console.log(les_reponses)
	*/


	//trouver l'indice de l'ID
	var indice_id = les_indices.indexOf(identifiant_case)
	//console.log({indice_id})

	//regarder si la valeur est la bonne 
	var classe_finale = ceci.innerText.toUpperCase()==="" ? "" :
						ceci.innerText.toUpperCase()===les_reponses[indice_id] ? "correct":"incorrect"

	ceci.className = "une_case entoure "  + classe_finale

	var mots_croises = {}
	$('.entoure').each(function(indice,element){
		mots_croises[indice+1] = element.innerText
	})

	//console.log({mots_croises})
	//enregistrer le tout

	window.localStorage.setItem('mots_croises',JSON.stringify(mots_croises))

	if($('.correct').length === 62){
		alert("✔️ Mots croisés enfin terminés ! Retiens bien la lettre Z.")
		window.top.postMessage('fermer-mots','*')
	}

}

init_mots_croises()