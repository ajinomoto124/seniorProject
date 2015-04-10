import UnityEngine.UI;

private var dGui : Object;
private var code : String[];
private var curlines : int = 0;
private var curCode : String = "";
private var tempLine : String = "";
var intxt : Text;

function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	code = new String[dGui.numLines];
	intxt = GetComponent(Text);
}

function Update () {
	curLines = dGui.getLines();
	curCode = "";
	for(i = 0; i < curLines; i++){
		tempLine = dGui.code[i];
		if (i > 0){
			tempLine = "\n" + tempLine;
		}
		curCode = curCode + tempLine;
	}
	intxt.text = curCode;
}