$(function(){
    let caseID,//Préparation d'une variable pour récupérer les index des cases, renverra un array
        id = 1,//Préparation d'un ID de départ des cases, sera incrémenté lors de la création du tableau
        tour = 0,//Préparation d'une variable pour les tours, utilisée pour l'attribution des pions
        arrCroix = [],//Tableau des cases "prises" par le joueur X
        arrRond = [],//Tableau des cases "prises" par le joueur O
        victoire = false,
        message;//Permet de renvoyer quelque chose dans la fonction check

    //Préparation de l'objet tableau
    class Board{
    //Constructeur
    constructor(lines, cases){
    this.lines = lines;
    this.cases = cases;
    }
    };
   
    //Début de travail sur des objets joueurs
    class Player{
        constructor(classe, cases, score, nom){
            this.classe = classe;
            this.cases = cases;
            this.score = score;
            this.nom = nom;
        }
    };
   
    P1 = new Player("croix", [], 0, "Croix");
    P2 = new Player("rond", [], 0, "Ronds");
   
    //**********************************UTILISATION ET MISE EN PLACE DU TABLEAU*********************************
    //Utilisation du tableau
    $('#tableau').prepend($('<table>'));//Insère une table dans la div avec id = tableau
    const board1 = new Board(2, 2);
    const lines = board1.lines;
    const cases = board1.cases;
    for (i=0; i<=lines; i++){
        $('table').append($('<tr>'));
    };
   
    //Ajout de 3 cases (td) dans chaque ligne (tr)
    $('tr').each(function(){
        for (i=0; i<=cases; i++){
            $(this).append($('<td>'));//Ajout des cases avec class = free au départ
        };
    });
   
    //Ajout d'un ID sur chaque case "td", commence à 1
    $('td').each(function(){
            $(this).attr('id', id);
            id ++;
    });
   
    //Fonction de rafraîchissement des scores
   	function refreshScore(){
        $('#scoreP2').empty().append('<h4> Score : ' + P2.score + '</h4>');
        $('#scoreP1').empty().append('<h4> Score : ' + P1.score + '</h4>');
    };

     //Fonction de remise à zéro du tableau
    $("#reload").click(function(){
    	victoire = false;
        tour = 0;
        P1.cases = [];
        P2.cases = [];
        $('td').removeClass();
        //refreshP1();
        //refreshP2();
    });

    let suite = [];
    //Essai de fonction de vérification des vitoires
    //suite = liste des cases pour la victoire
    //player = tableau des cases du joueur
    function checkP1(suite, player){
    	for(i=0, len = suite.length; i<len; i++){
    		if($.inArray(suite[i], player) == -1)
    			return false;
    		}
    //Essai d'ajout du message, supposé adapté au gagnant
       	 	message = alert("Victoire des croix !");
       	 	P1.score ++;
       	 	victoire = true;
        return message;
    };

    function checkP2(suite, player){
    	for(i=0, len = suite.length; i<len; i++){
    		if($.inArray(suite[i], player) == -1)
    			return false;
    		}
    //Essai d'ajout du message, supposé adapté au gagnant
       	 	message = alert("Victoire des ronds !");
       	 	P2.score ++;
       	 	victoire = true;
        return message;
    };
    
    //Ajout de l'image
    $('td').click(function play(){
        //Essai pour éviter qu'on ne puisse recliquer sur une case.
        if (!$(this).hasClass("croix") && !$(this).hasClass("rond") && victoire == false){
            caseID = this.id;//Récupère l'id pour les conditions de victoire
            if (tour%2 == 0 && tour < 10){//Premier coup : les croix
                $(this).addClass(P1.classe);
                P1.cases.push(this.id);
                console.log("arrCroix : " + P1.cases);
                checkP1(["1","2","3"], P1.cases);
    			checkP1(["4","5","6"], P1.cases);
    			checkP1(["7","8","9"], P1.cases);
    			checkP1(["1","4","7"], P1.cases);
    			checkP1(["2","5","8"], P1.cases);
    			checkP1(["3","6","9"], P1.cases);
    			checkP1(["1","5","9"], P1.cases);
    			checkP1(["3","5","7"], P1.cases);
    			//check();

            } else if (tour%2 == 1 && tour < 10){
                $(this).addClass(P2.classe);
                P2.cases.push(this.id);
                console.log("arrRond : " + P2.cases);
                checkP2(["1","2","3"], P2.cases);
    			checkP2(["4","5","6"], P2.cases);
    			checkP2(["7","8","9"], P2.cases);
    			checkP2(["1","4","7"], P2.cases);
    			checkP2(["2","5","8"], P2.cases);
    			checkP2(["3","6","9"], P2.cases);
    			checkP2(["1","5","9"], P2.cases);
    			checkP2(["3","5","7"], P2.cases);
    			//check();
            }
            /*check(P1);
            check(P2);*/
            tour ++;
            refreshScore();
        } 
        //check();
        console.log(caseID);
        return caseID;
    });
   
   

   
});