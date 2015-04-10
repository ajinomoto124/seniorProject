import UnityEngine.UI;

private var dGui : Object;
private var posX : int = 0;
private var posY : int = 0;
private var rTrans : RectTransform;
private var rotating : boolean = false;
private var timer : float;
private var journeyLength: float;
private var startPos : Vector3;
private var endPos : Vector3;
private var on : boolean = false;
private var moveDist : int = 30;

// Movement speed in units/sec.
	var speed = 1.0;

function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	
	//timer=Time.time;
	startPos = new Vector3 (305, 75, 0);
	endPos = startPos;
	
}

function Update () {

}
function RotateLeft () {
	for(i = 0; i < 72; i++){
    	transform.Rotate (Vector3.forward * -5);
    	yield WaitForSeconds(0.00001);
    }
}
function jump(){

}
function moveRight() {
	startPos = transform.position;
	endPos = startPos + new Vector3(moveDist, 0, 0);
    var i = 0.0;
    var rate = 1.0/speed;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        transform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
	Debug.Log("Alex's Position = " + transform.position.x+ ", " +transform.position.y);
}


function moveLeft() {
	startPos = transform.position;
	endPos = startPos + new Vector3(-moveDist, 0, 0);
    var i = 0.0;
    var rate = 1.0/speed;
    if(transform.position.x > 300.85){
    	Debug.Log(transform.position.x);
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        transform.position = Vector3.Lerp(startPos, endPos, i);
	        yield; 
	    }
    }
    Debug.Log("Alex's Position = " + transform.position.x+ ", " +transform.position.y);
}
function moveUp() {
	startPos = transform.position;
	endPos = startPos + new Vector3(0, moveDist, 0);
    var i = 0.0;
    var rate = 1.0/speed;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        transform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
    Debug.Log("Alex's Position = " + transform.position.x+ ", " +transform.position.y);
}
function moveDown() {
	startPos = transform.position;
	endPos = startPos + new Vector3(0, -moveDist, 0);
    var i = 0.0;
    var rate = 1.0/speed;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        transform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
    Debug.Log("Alex's Position = " + transform.position.x+ ", " +transform.position.y);
}

