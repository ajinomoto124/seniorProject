import UnityEngine.UI;

private var dGui : Object;
private var lines : int = 0;
private var linesText : String = "";
var intxt : Text;

function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	intxt = GetComponent(Text);
}

function Update () {
	lines = dGui.lines;
	linesText = "Lines (" + lines + "/"+dGui.numLines+")";
	intxt.text = linesText;
}