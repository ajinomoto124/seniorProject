import UnityEngine.UI;

private var pButton : GameObject;
private var rButton : GameObject;
private var aButton : GameObject;

private var emptyTree : boolean = false;
private var tree : CNode;

private var player : int = 0;
private var playerLine : int = 0;
var playerX : int = 0;
var playerY : int = 0;
private var editPlayerX : boolean = false;
private var editPlayerY : boolean = false;

private var repeatTimes : int = 0;
private var repLine : int = 0;
private var editRepeat : boolean = false;

private var actLine : int = 0;
private var editAction : boolean = false;

private var action : int = 0;
private var lines : int = 0;
var code : String[];

private var failureType : String = "";
private var failure : boolean = false;
private var success : boolean = false;
private var finished : boolean = false;
private var failDict : Object = {};
var doneText : String = "";

function Start () {
	//pButton = GameObject.Find("PlayerButton");
	failDict["playerFail"] = "Try making a player and moving it to the correct position";
	failDict["repeatFail"] = "Try adding a repeat loop with the correct amount of loops";
	code = new String[3];
}

function Update () {
	
	
	
	
	if (editPlayerX){
		code[playerLine] = "Player (<b>" + playerX + "</b>, " + playerY + ");";
	}
	if (editPlayerY){
		code[playerLine] = "Player (" + playerX + ", <b>" + playerY + "</b>);";
	}
	else if (player == 1 && !editPlayerX && !editPlayerY){
		code[playerLine] = "Player (" + playerX + ", " + playerY + ");";
	}
	if (editRepeat){
		code[repLine] = "Repeat (<b>" + repeatTimes + "</b>) -";
	}
	else if (repeatTimes > 0 && !editRepeat){
		code[repLine] = "Repeat (<b>" + repeatTimes + "</b>) -";
	}
	if (editAction){
		if(action == 0){
			code[actLine] = "Player.MoveLeft();";
		}
		else{
			code[actLine] = "Player.Pickup();";
		}
	}

	if(finished && failure){
		doneText = failDict[failureType];
	}
	else if (finished && success){
		doneText = "Nice job! You did it!";
	}
	if(finished && Input.GetButtonDown == "Reset"){
		reset();
	}
	if(Input.GetButtonDown == "Submit"){
		Run();
	}
	if(Input.GetButtonDown == "P"){
		addPlayer();
		addLines();
	}
	if(Input.GetButtonDown == "R"){
		addRepeat();
		addLines();
	}
	if(Input.GetButtonDown == "S"){
		addAction();
		addLines();
	}

////Button presses
	if(Input.GetButtonDown("A")){
		if(editPlayerX){
			editPlayerX = false;
			editPlayerY = true;
		}
		else if (editPlayerY){
			editPlayerY = false;
			editPlayerX = true;
		}
	}
	if(Input.GetButtonDown("D")){
		if(editPlayerX){
			editPlayerX = false;
			editPlayerY = true;
		}
		else if (editPlayerY){
			editPlayerY = false;
			editPlayerX = true;
		}
	}
	if(Input.GetButtonDown("W")){
		if(editPlayerX && playerX < 130){
			playerX = playerX + 10;
		}
		else if (editPlayerY && playerY < 100){
			playerY = playerY + 10;
		}
		else if (editRepeat && repeatTimes < 3){
			repeatTimes++;
		}
		else if (editAction && action < 1){
			action++;
		}
	}
	if(Input.GetButtonDown("S")){
		if(editPlayerX && playerX > 0){
			playerX = playerX - 10;
		}
		else if (editPlayerY && playerY > 0){
			playerY = playerY - 10;
		}
		else if (editRepeat && repeatTimes > 0){
			repeatTimes--;
		}
		else if (editAction && action > 0){
			action--;
		}
	}
	
}

function Run(){

	
	if (repeatTimes == 0){
		failureType = "repeatFail";
		failure = true;
		finished = true;
	}
	if (repeatTimes == 1 && playerX == 130 && playerY == 0 && action == 1 && !finished){
		failureType = "repeatFail";
		failure = true;
		finished = true;
	}
	if (repeatTimes == 2 && playerX == 130 && playerY == 0 && action == 1 && !finished){
		failureType = "repeatFail";
		failure = true;
		finished = true;
	}
	if (repeatTimes == 3 && playerX == 130 && playerY == 0 && action == 1 && !finished){
		success = true;
		finished = true;
	}
	if (playerX != 130 || playerY != 0){
		failureType = "playerFail";
		failure = true;
		finished = true;
	}
	
}

function reset(){
	Debug.Log("RESET");
	player = 0;
	playerLine = 0;
	playerX = 0;
    playerY = 0;
	editPlayerX = false;
	editPlayerY = false;

	repeatTimes = 0;
	repLine = 0;
	editRepeat = false;

	actLine = 0;
	editAction = false;

	action = 0;
	lines = 0;
	code[0] = "";
	code[1] = "";
	code[2] = "";

	failureType = "";
	failure = false;
	success = false;
	finished = false;
	doneText = "";
	
	//pButton.Button.interactable = true;
	
}

function addNode (type : int){
	if(type == 0){
		
	}
}

function addPlayer (){
	player = 1;
	editRepeat = false;
	editAction = false;
	editPlayerX = true;
	playerLine = lines;
	code[lines] = "Player (<b>" + playerX + "</b>, " + playerY + ");";
}
function addRepeat (){
	repeatTimes = 1;
	editPlayerX = false;
	editPlayerY = false;
	editAction = false;
	editRepeat = true;
	repLine = lines;
	code[lines] = "Repeat (<b>" + repeatTimes + "</b>) -";
}

function addAction (){
	actLine = lines;
	editPlayerX = false;
	editPlayerY = false;
	editRepeat = false;
	editAction = true;
	code[lines] = "Player.MoveLeft();";
}

function getLines(){
	return lines;
}

function addLines(){
	lines++;
}