var levelVar : int;
var globe : Object;
var level1button : Button;
var level2button : Button;
var level3button : Button;
var level4button : GameObject;

function Start () {

	globe = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	level1button.interactable = false;
	level2button.interactable = false;
	level3button.interactable = false;
	level4button.gameObject.SetActive(false);
	//Debug.Log(levelVar);
	//DontDestroyOnLoad(GameObject.Find("GLOBAL"));
}

function Update () {
	if(globe.complete >= 1){
		level1button.interactable = true;
	}
	if (globe.complete >= 2){
		level2button.interactable = true;
	}
	if (globe.complete >= 3){
		level3button.interactable = true;
	}
	if (globe.complete >= 4){
		level4button.gameObject.SetActive(true);
	}
	if(Input.GetButtonDown("0")){
		l0();
	}
	if(Input.GetButtonDown("1")){
		l1();
	}
	if(Input.GetButtonDown("2")){
		l2();
	}
	if(Input.GetButtonDown("3")){
		l3();
	}
}
function l0(){
	globe.level0();
}
function l1(){
	globe.level1();
}
function l2(){
	globe.level2();
}
function l3(){
	globe.level3();
}