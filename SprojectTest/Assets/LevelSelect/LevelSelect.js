var levelVar : int;
var globe : Object;

function Start () {

	globe = GameObject.Find("GLOBAL").GetComponent("GLOBAL");

	//Debug.Log(levelVar);
	//DontDestroyOnLoad(GameObject.Find("GLOBAL"));
}

function Update () {
	if(Input.GetButtonDown("0")){
		l0();
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