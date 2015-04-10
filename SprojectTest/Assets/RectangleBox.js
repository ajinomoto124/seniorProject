import UnityEngine.UI;
import UnityEngine.GameObject;

private var rectVals : int[];
private var GLOBAL : Object;
private var RectText : Object;
private var RectButton : GameObject;
private var curval : int = 0;
private var showing : boolean;
private var rTrans : RectTransform;
private var xPos : float;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	RectText = GameObject.Find("RectangleText").GetComponent("RectangleText");
	showing = RectText.showing;
	rTrans = GetComponent(RectTransform);
	
	//Debug.Log(GetComponent(RectTransform).position.x);
}

function Update () {
	showing = RectText.showing;
	if(showing){
		GetComponent(Image).color = Color.black;
	}
	else{
		GetComponent(Image).color = Color.white;
	}
	rectVals = RectText.rectVals;

}

function increaseVal (x : int){
	
	if (x == 0){
		rTrans.position.x = rTrans.position.x + 10;
	}
	if (x == 1 && rectVals[x] != 10){
		rTrans.position.y = rTrans.position.y + 10;
	}
	if (x == 2){
		rTrans.sizeDelta.x = rTrans.sizeDelta.x + 10;
	}
	if (x == 3){
		rTrans.sizeDelta.y = rTrans.sizeDelta.y + 10;
	}
	
}

function decreaseVal (x : int){


	if (x == 0 && rectVals[x] != 10){
		rTrans.position.x = rTrans.position.x - 10;
	}
	if (x == 1){
		rTrans.position.y = rTrans.position.y - 10;
	}
	if (x == 2 && rectVals[x] != 10){
		rTrans.sizeDelta.x = rTrans.sizeDelta.x - 10;
	}
	if (x == 3 && rectVals[x] != 10){
		rTrans.sizeDelta.y = rTrans.sizeDelta.y - 10;
	}
}

