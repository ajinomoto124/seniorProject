import UnityEngine.UI;


private var startPos : Vector3;
private var leftPos : Vector3;
private var rightPos : Vector3;
private var pos : int = 0;

function Start () {
	startPos = transform.position;
	leftPos = startPos + new Vector3(-220,0,0);
	rightPos = startPos + new Vector3(220, 0,0);
}

function Update () {

}

function MoveCenter(){
    transform.position = startPos;
}

function MoveRight() {
	transform.position = rightPos;
}
function MoveLeft() {
	transform.position = leftPos;
}