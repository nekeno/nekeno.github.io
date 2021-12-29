function check_anniv(){
	var avec_donnees = false
	var res_anniv = $('#liste_anniv>li').text() === resultat_final().replaceAll(',','')


	if(res_anniv){
		alert("✔️ Exact ! C'est le bon ordre chakal. Retiens donc la lettre X.")
		window.top.postMessage('fermer-anniv','*')
		
	}else{
		alert("❌ Ce n'est pas le bon ordre ! relis bien la consigne et vérifie ta réponse sale noob...")
	}
}

function resultat_final(){
	return 'Hug,Sambe,Drak,Bezan,Noor,Lila,ReyZz,Solane,Nalla,Nekeno,Zebo'
}

function init_anniv(){
	var membres_sbd_str = resultat_final()
	var membres_sbd = membres_sbd_str.split(',')

	membres_sbd=membres_sbd.sort(function(){return 0.5-Math.random()}).join(',').split(',');
	//console.log(membres_sbd)

	var html_anniv = ""
	membres_sbd.forEach( function(element, index) {
		html_anniv = html_anniv+`<li class="list-item" draggable="true" ondragend="dragEnd()" ondragover="dragOver(event)" ondragstart="dragStart(event)" >`+element+`</li>`
	});
	

	html_anniv += `<button onclick="check_anniv()">Vérifier l'ordre</button>`
	document.getElementById('liste_anniv').innerHTML=html_anniv

}

init_anniv()














let selected = null

function dragOver(e) {
  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target)
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling)
  }
}

function dragEnd() {
  selected = null
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', null)
  selected = e.target
}

function isBefore(el1, el2) {
  let cur
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true
    }
  }
  return false;
}