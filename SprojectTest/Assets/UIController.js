import UnityEngine.UI;

private var GLOBAL : Object;
private var RectText : Object;
private var RectButton : GameObject;
private var RectBox : Object;
private var curval : int = 0;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	RectText = GameObject.Find("RectangleText").GetComponent("RectangleText");
	RectBox = GameObject.Find("Rect").GetComponent("RectangleBox");
}

function Update () {
	if(Input.GetButtonDown("A")){
		valCycleLeft();
	}
	if(Input.GetButtonDown("D")){
		valCycleRight();
	}
	if(Input.GetButtonDown("W")){
		RectBox.increaseVal(curval);
		RectText.increase(curval);
	}
	if(Input.GetButtonDown("S")){
		RectBox.decreaseVal(curval);
		RectText.decrease(curval);
	}
}

function valCycleLeft(){
	if(curval == 0){
		curval = 3;
	}
	else{
		curval--;
	}
}
function valCycleRight(){
	if(curval == 3){
		curval = 0;
	}
	else{
		curval++;
	}
}