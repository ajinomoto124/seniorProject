import UnityEngine.UI;

private var dGui : Object;
private var finishedText : String = "";
var intxt : Text;

function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	intxt = GetComponent(Text);
}

function Update () {
	if (dGui.finished){
		finishedText = dGui.doneText + "<size=20>\n\n...press space to retry</size>";
		intxt.text = finishedText;
	}
	else{
	finishedText = dGui.doneText;
	intxt.text = finishedText;
	}
}