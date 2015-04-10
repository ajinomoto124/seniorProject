import UnityEngine.UI;

private var tGui : Object;

var amplitudeX : float = 10.0f;
var amplitudeY : float = 5.0f;
var omegaX  : float = 1.0f;
var omegaY : float = 5.0f;
var index : float = 0.0;
var x : float = 0.0;
var bx : float = 0.0;
var y : float = 0.0;

function Start () {
	tGui = GameObject.Find("TitleUI").GetComponent("TitleUI");
//	y = tGui.bubble1y;
//	bx = tGui.bubble1x;
}

function Update () {
	index +=  Time.deltaTime;
	y = tGui.bubbley;
	bx = tGui.bubblex;
    //var x : float = amplitudeX*Mathf.Cos (omegaX*index);
    x = Mathf.Abs (amplitudeY*Mathf.Sin (omegaY*index)) + bx;
    transform.localPosition= new Vector3(2*x,100*y,0);
}