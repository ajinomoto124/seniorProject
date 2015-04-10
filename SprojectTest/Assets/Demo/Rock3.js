import UnityEngine.UI;

private var dGui : Object;


function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	GetComponent(Image).color = Color.gray;
}

function Update () {
//19 206 255
	if(dGui.success || dGui.failure && dGui.repeatTimes == 0){
		GetComponent(Image).color = Color.cyan;
	}
	else{
		GetComponent(Image).color = Color.gray;
	}
	
}