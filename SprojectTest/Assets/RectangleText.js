import UnityEngine.UI;
import UnityEngine.GameObject;

var rectVals : int[];
var tcText : String = "Rectangle( 10, 10, 10, 10);";
private var GLOBAL : Object;
var intxt : Text;
var showing : boolean = false;


function Start () {
	intxt = GetComponent(Text);
	rectVals = new int[4];
	rectVals[0] = 10;
	rectVals[1] = 10;
	rectVals[2] = 10;
	rectVals[3] = 10;
}

function Update () {
	tcText = "Rectangle ( " + "<b>"+rectVals[0]+ "</b>" + ", " + rectVals[1] + ", " + rectVals[2] + ", " + rectVals[3] + ", black)";
	intxt.text = tcText;
}

function show() {
	
	if(showing){
		intxt.color = Color.white;
		showing = false;
	}
	else{
		intxt.color = Color.black;
		showing = true;
	}
}

function increase (curval : int){
	if (rectVals[curval] == 10 &&(curval == 1)){
	}
	else{
	rectVals[curval] += 10;
	}
//	if(curval == 4){
//		
//	}
}

function decrease (curval : int){
	if (rectVals[curval] == 10 &&( curval == 0 ||curval == 2|| curval == 3)){
	}
	else{
	rectVals[curval] -= 10;
	}
}

