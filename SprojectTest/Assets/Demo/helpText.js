import UnityEngine.UI;

private var dGui : Object;
private var helpText : String;
private var intxt : Text;



function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	intxt = GetComponent(Text);
}

function Update () {
	helpText = dGui.helpText;
	intxt.text = helpText;
}