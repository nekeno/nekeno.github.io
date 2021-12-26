function startTimer(duration_en_minutes, display) {

    //si la valeur stockée est inférieure à ce qui est affichée -> on change l'affichage
    var valeur_anterieure = recuperer('timer_en_secondes',true)
    //console.log({valeur_anterieure})

    if(valeur_anterieure > 0 && valeur_anterieure !== 9999999999 && valeur_anterieure < (duration_en_minutes *60)){
        var duration = valeur_anterieure
    }else {
    	var duration = duration_en_minutes *60
    }




    var timer = duration, minutes, seconds;
    //console.log('\n')
    //console.log({timer})

    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //dans tous les cas, on stocke et on met à jour
        stocker('timer_en_secondes',minutes*60+seconds)
    	display.innerText = minutes + ":" + seconds;


        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

function commencer_timer(nouveau){


	//enlever('timer_en_secondes')
	if(nouveau) enlever('timer_en_secondes')
	startTimer(60, document.getElementById('timer'));

}

function masquer_texte_principal(){
	document.getElementById('text-principal').style.display = 'none'
}

function mettre_ce_texte(texte){
	document.getElementById('new-text').innerHTML = texte
	document.getElementById('new-text').style.display = 'block'
}

function texte_explications(){
	return `  <div class="fond-blanc">
La SBD Family, on a besoin de vous !<br>  <br>
  Vous avez <strong>60 minutes</strong> pour aider Sambe à trouver son cadeau...<br>
  Inutile de spammer les réponses au hasard, pensez à réfléchir calmement avant de répondre aux énigmes.<br><br>Nekeno sera dans le chat en tant que Game Master pour vous donner des indices, si jamais vous êtes trop lents.<br><br>

  
  <!--<b>ATTENTION: NE PAS ACTUALISER LA PAGE SINON VOUS RISQUEZ DE PERDRE LA PROGRESSION.<b><br><br>-->
    <strong>Google et calculatrice interdits !</strong><br><br>
    
    <rouge>Lorsque vous cliquerez sur le bouton ci-dessous, le timer va commencer.</rouge><br><br>
    <button class="normal" onclick="aller_etape(2)">OK j'ai compris</button>

</b></b></div>
	`
}

function menu_principal(classe2,classe3){
	return `<div id="main-menu" class="grand center-screen">
  	<span class="bleu"  onclick="aller_etape(3)" >DECOUVRE LE PENDU</span>
	<span class="`+classe2+`" id="etape4" onclick="aller_etape(4)" >MULTI-JEUX</span>
	<span class="`+classe3+`" id="etape5" onclick="aller_etape(5)" >UN DERNIER POUR LA ROUTE</span>
    </div>`
}


function titre(contenu){
	return `<strong class="grand">DECOUVRE LE PENDU</strong><br>`
}

function texte_pendu(){
	return titre('DECOUVRE LE PENDU') + `1 forme = 1 énigme = 1 lettre.`
}



//etape 2
function aller_accueil(sans_init_compteur,ne_pas_relancer_timer){
	var class2 = recuperer("class2") ? "vert" : "desact"
	var class3 =  recuperer("class3") ? "jaune" :  "desact"
	
	enlever_accueil()

	mettre_ce_texte(menu_principal(class2,class3))
	if(!ne_pas_relancer_timer)	commencer_timer(!sans_init_compteur)
	alerte_si_clic_desac()
	changer_indication(texte_menu_principal())

	stocker('etape',2)

	return true
}

function texte_menu_principal(){
	return `Vous pourrez revenir à ce menu principal en cliquant sur le bouton <img src="home.png" class="mini-home">, qui se situera en haut à droite.`
}




//etape 3
function charger_pendu(){

	var nb_resolues = 0

	changer_indication(texte_pendu())
	mettre_ce_texte(texte_shapes())

    //action en fonction des énigmes résolues
    if(recuperer('enigmes_resolues').includes(',cercle,')){
    	rajouter_le_N_digicode()
    	nb_resolues += 1
    }

    //action en fonction des énigmes résolues
    if(recuperer('enigmes_resolues').includes(',triangle,')){
    	rajouter_le_E_triangle()
    	nb_resolues += 1
    }
    

    //action en fonction des énigmes résolues
    if(recuperer('enigmes_resolues').includes(',carre,')){
    	rajouter_le_U_puzzle()
    	nb_resolues += 1
    }

    //action en fonction des énigmes résolues
    if(recuperer('enigmes_resolues').includes(',diamond,')){
    	rajouter_le_F_diamond()
    	nb_resolues += 1
    }

    if(nb_resolues === 4){
    	alert('✔️ Il y a NEUF lettres dans le pendu.')
    	stocker("class2",true)
    	enlever_accueil()
    	aller_etape(2,true)
    }else{
    	rajouter_accueil()
    	enlever("class2")
    }

	return true
}



function texte_shapes(){


	return `

		<div id="conteneur">
			<div onclick="gerer_shape('○ Digicode ○','./digicode/index.html','cercle', 'N')" id="cercle"></div>
			<div onclick="gerer_shape('▲ Prononciation ▲','./oeufs/index.html','triangle','E')" id="triangle"></div>
			<div onclick="gerer_shape('■ Puzzle ■','./puzzle/index.html','carre', 'U')" id="carre"></div>
			<div onclick="gerer_shape('♦ Alphabet ♦','./alphabet/index.html','diamond', 'F')" id="diamond"></div>
		</div>

	`


}

function gerer_shape(titre,lien,nom_enigme, resultat){
	var enigmes_resolues = recuperer('enigmes_resolues')
	if(enigmes_resolues.includes(nom_enigme)){
		alert("Cette énigme est déjà résolue. La réponse que vous avez trouvée: " + resultat)
	}else{
		creer_fenetre(titre,lien)
	}
}


function fermer_fenetre(){
	if(document.getElementById('fenetre')) document.getElementById('fenetre').remove()
}



function creer_fenetre(titre,lien_html){

	fermer_fenetre()

	var html= `
			<div class="ma_fenetre" id="fenetre" name="fenetre">
				<div id="entete-fenetre" style="display: inline-flex;float: right;">
					<img alt="X" src="./quitter.png" id="bye_prev" class="bye_prev" onclick="fermer_fenetre()">
				</div>

				<div class="titre_fenetre" id="titre_fenetre">`+titre+`</div>
				<div id="previsualisation" class="responsive-container">
					<iframe id="viz_frame" src="`+lien_html+`" scrolling="no" seamless="" frameborder="0"></iframe>
				</div>
			</div>

	`

	document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', html)

	return html
}


//etape 4
function charger_multi(){

	var activ = document.getElementById('etape4').className !== 'desact'

	if(activ){
		changer_indication(texte_multi())
		mettre_ce_texte("1 2 3 4 5 6 7 8")
		rajouter_accueil()
	}else{
		enlever_accueil()
	}

	return activ
}


function texte_multi(){
	return titre('MULTI-JEUX') + `1 jeu résolu = 1 lettre.`
}


//etape 5
function charger_finale(){

	var activ = document.getElementById('etape5').className !== 'desact'

	if(activ){
		changer_indication(text_clavier())
		mettre_ce_texte("1 2 3 4 5 6 7 8")
		rajouter_accueil()
	}else{
		enlever_accueil()
	}

	return activ


	return false
}

function text_clavier(){
	return 'Fais un pas à droite, sauf pour l\'espace.'
}

//étape 6: dévoiler le cadeau
function ecran_final(){
	return false
}

function enlever_accueil(){
	if(document.getElementById('back-home')) document.getElementById('back-home').remove()

}

function rajouter_accueil(){

	var html = `<img id="back-home" src="home.png" onclick="aller_accueil(true,true)" class="home">`
	var body = document.getElementsByTagName('body')[0] 
	var bouton_img = document.createElement('div')
	bouton_img.innerHTML = html;
	body.insertBefore(bouton_img.firstChild, body.firstChild);


	return html
}

function aller_etape(numero_etape,sans_init_compteur){
	enlever_accueil()
	var retour = false

	//explications
	if(numero_etape === 1){
		masquer_texte_principal()
		mettre_ce_texte(texte_explications())

		if(!sans_init_compteur) document.getElementById('timer').innerText ="60:00";
		retour = true

	//menu principal
	}else if(numero_etape === 2){

		masquer_texte_principal()
		retour = aller_accueil(sans_init_compteur)

	
	//pendu à 4 énigmes
	}else if(numero_etape === 3){
		retour = charger_pendu()
		

	//8 énigmes multi
	}else if(numero_etape === 4){
		retour = charger_multi()

	//dernière énigme avec le clavier
	}else if(numero_etape === 5){
		retour = charger_finale()
	
	//dévoiler
	}else if(numero_etape === 6){
		retour = ecran_final()
	}


	if(retour) stocker('etape',numero_etape)

}

function changer_indication(text){
	if(text) afficher("indication")
	document.getElementById('indication').innerHTML = text;
}

function alerte_si_clic_desac(){
	document.querySelectorAll(".desact").forEach(box => 
	  box.addEventListener("click", () => alert("Vas-y par étape, zebi."))
	)
}

function init(){

	//si on a déjà une étape -> y aller
	var numero_etape = recuperer('etape')
	//console.log({numero_etape})
	if(numero_etape){
		for(i=1;i<=numero_etape;i++){
			aller_etape(i,true)	
		}
		
	}


	if(!recuperer('etape_pendu')){

	}else{

	}


	if(!recuperer('etape_multi')){
		
	}


	if(!recuperer('etape_finale')){
		
	}


	//cerner les messages recus
	window.onmessage = function(e) {
	    if (e.data.includes('fermer-')) {
	    	nom_enigme = e.data.split('fermer-')[1]
	        fermer_fenetre();

	        //stocker l'énigme terminée (si pas déjà le cas)
	        console.log({nom_enigme})
	        if(!recuperer('enigmes_resolues').includes(',' + nom_enigme+',')) stocker('enigmes_resolues',recuperer('enigmes_resolues') + ',' + nom_enigme + ',')

	        //actualiser en allant à l'étape actuelle
	    	window.location.href = window.location.href 

        	
	    }
	};


}



function rajouter_le_N_digicode(){
	if(document.getElementById('cercle')) document.getElementById('cercle').innerHTML = '<span style="font-size: 100px;">N</span>'
}



function rajouter_le_U_puzzle(){
	if(document.getElementById('carre')) document.getElementById('carre').innerHTML = '<span style="font-size: 100px;">U</span>'
}

function rajouter_le_E_triangle(){
	if(document.getElementById('triangle')) document.getElementById('triangle').innerHTML = '<span class="lettre_E">E</span>'
}


function rajouter_le_F_diamond(){
	if(document.getElementById('diamond')) document.getElementById('diamond').innerHTML = '<span class="lettre_F">F</span>'
}


init()