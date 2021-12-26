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
    console.log({timer})

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


//enlever('timer_en_secondes')
var nouveau = false
if(nouveau) enlever('timer_en_secondes')
startTimer(60, document.getElementById('timer'));
