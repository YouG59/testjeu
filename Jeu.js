//variables globales
var Max=5, Score=0,Operator="",cpt=0, resultCurrentOpe=0, Nb=10;

function Addition(a,b)
{
		var Sum=0;
		Sum = a+b;
		return Sum;
}

function Soustraction(a,b)
{
	var Sum=0;
	Sum = a-b;
	return Sum;
}

/*permet de sortir des chiffres de façon aléaloire en fonction 
de l'opérateur. Renvoie un tableau 0 = calcul, 1 = libellé*/
function Calcul(op)
{
	var Result=[];
	var a=0,b=0;
	switch(op)
	{
		case "+":
				a = Math.floor(Math.random() * Nb);
				b = Math.floor(Math.random() * Nb);
				Result[0]=Addition(a,b);
		break;
		case "-":
				do
				{
					a = Math.floor(Math.random() * Nb);
					b = Math.floor(Math.random() * Nb);
				}
				while(a<b)
				Result[0]=Soustraction(a,b);
		break;
	}
	Result[1]=a+" "+op+" "+b+" = ";
	return Result;
}

//Renvoie l'opérateur choisi par l'utilisateur
function setOperator(op)
{
	Operator=op;
	return true;
}

/*affiche le calcul à effectuer par l'utilisateur, stocke le résultat 
en attente de la réponse de l'utilisateur*/
function Game(op,firstLaunch)
{
	var a=0,b=0,r=0,cal=0;
	var TabO=["+","-"];
	var Result=[];

	initialize(firstLaunch);	

	setOperator(op);


	

	//si mode aléatoire choisi
	if(Operator==="2")
	{
			r=Math.floor(Math.random() * TabO.length);
			Result=Calcul(TabO[r]);
			resultCurrentOpe=Result[0];
			document.getElementById("Calcul").innerHTML=Result[1];
			cal=document.getElementById("Result").value;
			
	}
	else
	{
		Result=Calcul(Operator);
		resultCurrentOpe=Result[0];
		//	affichage d'une operation aléatoire:
		document.getElementById("Calcul").innerHTML=Result[1];
		
	}
	
	document.getElementById("Result").focus();	

	return true;
}


/*permet de récupérer la valeur saisie par l'utilisateur
quand il valide avec entrée*/
function valideValueEntry(event) {
	var cal=0;
    //See notes about 'which' and 'key'
    //13=enter
    if (event.keyCode == 13  ) 
    {
    	
		//	récupération de la saisie
		cal=document.getElementById("Result").value;
        //verif de la saisie user
        verifResult(cal);
    	
        event.preventDefault();
    	event.stopPropagation();
    }    
}

/* vérification du résultat saisi par l'utilisateur avec 
le calcul fait aléatoirement et affichage en conséquence*/
function verifResult(entry)
{
	
	cpt++;
	if(resultCurrentOpe===parseInt(entry))
    {
	    document.getElementById("Score").innerHTML="Bravo!";
	    Score++;
	}
	else
	{
		document.getElementById("Score").innerHTML="Faux!";
	}

	//	efface le résultat au bout de 3s
	setTimeout(resetResult, 1000); // surtout ne pas mettre resetAffichageResultat() sinon l'exécute de suite!

	if(parseInt(cpt)<Max )
	{
		//relance un jeu, sans réinitialiser le compteur
		Game(Operator,false);
	}
	else 
	{
		reset();
		scoreMsg();
	}
}

//affichage du score
function scoreMsg()
{
		if(Score > 1)
		{
				document.getElementById("msgScore").innerHTML="<b>"+Score+"</b> bonnes réponses sur "+Max+".<br>Clique sur une opération pour rejouer!";
		}
		else
		{
				document.getElementById("msgScore").innerHTML="<b>"+Score+"</b> bonne réponse sur "+Max+".<br>Clique sur une opération pour rejouer!";
		}	
		Score=0;
}
//réinitialisation du champ score
function resetResult()
{
	document.getElementById("Score").innerHTML="";
}

//initialisation des champs avec en argument un booléen (1er lancement=true)
function initialize(firstLaunch)
{
	document.getElementById("Calcul").visible = true;
	document.getElementById("Calcul").disabled = false;
	document.getElementById("Result").value = "";
	document.getElementById("Result").style.visibility = "visible";
	document.getElementById("msgScore").innerHTML="";
	if(firstLaunch == true)
		cpt=0;

}
//réinitialisation des différents champs
function reset()
{
	document.getElementById("Result").value="";
	document.getElementById("Result").style.visibility = "hidden";
	document.getElementById("Calcul").disabled = true;
	document.getElementById("Calcul").innerHTML="";
	document.getElementById("Score").innerHTML="";
	
}