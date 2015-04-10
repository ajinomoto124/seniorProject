import UnityEngine.UI;

//public var infoBox : UI.Text;

private var emptyTree : boolean = true;
private var inSequence : boolean = false;
private var inSequence2 : boolean = false;
private var available : boolean = false; //for removing empty default method node of if and repeat
private var interp : Object;
private var tree : CNode;
private var root : RootNode;
var numLines : int = 3;

var infoOn : boolean = false;
var infoSequence : int = 0;
var infoSequence2 : int = 0;
var numActions : int = 0;
var levelInfo : Object;
var overlay : GameObject;
var level : int = 0;
private var P : Object;

private var player : int = 0;
private var playerLine : int = 0;
var playerX : int = 0;
var playerY : int = 0;
private var editPlayerX : boolean = false;
private var editPlayerY : boolean = false;

private var repeatTimes : int = 0;
private var repLine : int = 0;
private var editRepeat : boolean = false;

private var conditional : String = "";
private var conditionalBool : int = 0;
private var conditions : String[];
private var conditionsB : boolean[];
private var actions : String[];
private var ifLine : int = 0;
private var editIf : boolean = false;

private var actLine : int = 0;
private var editAction : boolean = false;
private var indent : int = 0;
private var indents : String = "";

private var action : int = 0;
private var lines : int = 0;
var code : String[];
var helpText : String;
var infoBox : Object;
private var failureType : String = "";
private var failure : boolean = false;
private var success : boolean = false;
private var finished : boolean = false;
private var failDict : Object = {};
var doneText : String = "";

private var layers;
private var layer : int;//counter for current layer

function Start () {
	
	DontDestroyOnLoad(GameObject.Find("GLOBAL")); 

	layers = new Array();
	clearLayers();

	
	interp = GameObject.Find("Interpreter").GetComponent("Interpreter"); 
	P = GameObject.Find("player").GetComponent("PlayerPosition"); 
	level = GameObject.Find("GLOBAL").GetComponent("GLOBAL").levelVar; 
		
	overlay = GameObject.Find("overlay"); 
	infoBox = GameObject.Find("infoBox").GetComponent("infoBox");
	
	conditionsB = new boolean[10];
	for(i = 0; i < 10; i++){
		conditionsB[i] = false;
	}
	conditions = new String[10];
	conditions[0] = "Alex is NOT a Jellyfish";
	conditions[1] = "Alex is NOT Under Water";
	conditions[2] = "Alex is a Jellyfish";
	conditions[3] = "Alex is Blue";
	conditions[4] = "Alex is Next to a Bubble";
	conditions[5] = "";
	conditions[6] = "";
	conditions[7] = "";
	conditions[8] = "";
	conditions[9] = "";
	
	actions = new String[10];
	actions[0] = "Alex.MoveRight()";
	actions[1] = "Alex.MoveLeft()";
	actions[2] = "Alex.MoveUp()";
	actions[3] = "Alex.MoveDown()";
	actions[4] = "Alex.PopBubble()";
	actions[5] = "";
	actions[6] = "";
	actions[7] = "";
	actions[8] = "";
	actions[9] = "";
	//Debug.Log("Level : " + level);
	
	tree = new CNode();
	root = new RootNode(tree);
	
	failDict["playerFail"] = "Try making a player and moving it to the correct position";
	failDict["repeatFail"] = "Try adding a repeat loop with the correct amount of loops";
	
	var levelHelp : String = "level"+level+"info";
//	try
//        {
//            levelInfo = GameObject.Find(levelHelp).GetComponent(levelHelp);
//        }
//        catch (e)
//        {
//            Debug.Log(e.ToString());
//        }
	//Debug.Log(levelHelp);
	levelInfo = GameObject.Find(levelHelp).GetComponent(levelHelp);
	//Debug.Log(infoSequence + " info");
	helpText = levelInfo.info[infoSequence];
	
	
	numLines = levelInfo.numLines;

	code = new String[numLines];
//	for(i = 0; i < numLines; i++){
//		code[i] = "";
//	}
	prepLevel();
	infoOn = true;
}

function Update () {
	
	
	
	if(infoOn){
		overlay.gameObject.SetActive(true);
		if(Input.GetButtonDown("Space") || Input.GetMouseButtonDown(0)){
			if(success){
				if(infoSequence2 < levelInfo.ctotal-1){
					infoSequence2++;
					helpText = levelInfo.completeInfo[infoSequence2];
				}
				else{					
					if(level == 3){
						Application.LoadLevel("titleScene");
					}
					else{
					infoOn = false;
					
					Application.LoadLevel("LevelSelect");
					}
				}
			}
			else if(failure){
				GameObject.Find("GLOBAL").GetComponent("GLOBAL").level1();
			}
			else{
				if(infoSequence < levelInfo.total-1 && !levelInfo.braek){
					infoSequence++;
					Debug.Log("level and infoseq "+level + " " + infoSequence);
					if(level == 1 && infoSequence == 2 ){
						levelInfo.braek = true;
					}
					else if (level == 3 && infoSequence == 1){
						levelInfo.braek = true;
					}
					else{
						helpText = levelInfo.info[infoSequence];
					}
					
				}
				else{
					
					infoOn = false;
				}
			}
		}
	}
	else{
		overlay.gameObject.SetActive(false);
	}
	//Debug.Log("level "+levelInfo);
	//Debug.Log("infosequence "+infoSequence);
	if(levelInfo.movebox[infoSequence+infoSequence2] == 1){
		infoBox.MoveRight();
	}
	else if(levelInfo.movebox[infoSequence+infoSequence2] == -1){
		infoBox.MoveLeft();
	}
	else if(levelInfo.movebox[infoSequence+infoSequence2] == 0){
		infoBox.MoveCenter();
	}

//	if (editPlayerX){
//		code[playerLine] = "if (<b>" + playerX + "</b>, " + playerY + ");";
//	}
//	if (editPlayerY){
//		code[playerLine] = "Player (" + playerX + ", <b>" + playerY + "</b>);";
//	}
//	else if (player == 1 && !editPlayerX && !editPlayerY){
//		code[playerLine] = "Player (" + playerX + ", " + playerY + ");";
//	}
	if(editIf){
		code[ifLine] = indents+ "If (<b>" + conditions[conditionalBool] + "</b>) -";
		updateIf(conditionalBool);
	}
	if (editRepeat){
	
		code[repLine] = indents+ "Repeat (<b>" + repeatTimes + "</b>) -";

		updateRepeat(repeatTimes);
	}
//	else if (repeatTimes > 0 && !editRepeat){
//		code[repLine] = indents+ "Repeat (<b>" + repeatTimes + "</b>) -";
//	}
	if (editAction){
			code[actLine] = indents+ actions[action];	
//			if(action == 0){
//				code[actLine] = indents+ actions[action];
//			}
//			else{
//				code[actLine] = indents+ actions[action];
//			}

		updateMethod(action);
		
	}

	if(finished && failure){
		doneText = failDict[failureType];
	}
	else if (finished && success){
		doneText = "Nice job! You did it!";
	}
	if(finished && Input.GetButtonDown("Reset")){
		reset();
	}
	if(Input.GetButtonDown("Submit")){
		Run();
	}
	if(Input.GetButtonDown("0")){
		//addPlayer();
		addIf();
//		addIfNode();
//		addLines();
	}
	if(Input.GetButtonDown("1")){
		addRepeat();
//		addRepeatNode();
//		addLines();
	}
	if(Input.GetButtonDown("2")){
		addAction();

//		addMethodNode(0);
//		addLines();
	}
	if(Input.GetButtonDown("I")){
//		P.Move();
		infoOn = !infoOn;
//		testdelay(3);
	}

////Button presses
//	if(Input.GetButtonDown("A")){
//		if(editPlayerX){
//			editPlayerX = false;
//			editPlayerY = true;
//		}
//		else if (editPlayerY){
//			editPlayerY = false;
//			editPlayerX = true;
//		}
//	}
//	if(Input.GetButtonDown("D")){
//		if(editPlayerX){
//			editPlayerX = false;
//			editPlayerY = true;
//		}
//		else if (editPlayerY){
//			editPlayerY = false;
//			editPlayerX = true;
//		}
//	}
	if(Input.GetButtonDown("W")){
//		if(editPlayerX && playerX < 130){
//			playerX = playerX + 10;
//		}
//		else if (editPlayerY && playerY < 100){
//			playerY = playerY + 10;
//		}
//		else 
		if (editRepeat && repeatTimes < 3){
			repeatTimes++;
		}
		else if (editAction){
			if(action < 5){
				action++;
			}
			else{
				action = 0;
			}
		}	
		else if (editIf){
			if(conditionalBool < 5){
				conditionalBool++;
			}
			else{
				conditionalBool = 0;
			}
//			if(conditional == "Is Under Water"){
//				conditionalBool = 23;
//				conditional = "Is Not Under Water";
//			}
//			else{
//				conditionalBool = 24;
//				conditional = "Is Under Water";
//			}
//			
		}
	}
	if(Input.GetButtonDown("S")){
//		if(editPlayerX && playerX > 0){
//			playerX = playerX - 10;
//		}
//		else if (editPlayerY && playerY > 0){
//			playerY = playerY - 10;
//		}
//		else 
		if (editRepeat && repeatTimes > 0){
			repeatTimes--;
		}
		else if (editAction){
			if(action == 0){
				action = 5;
			}
			else{
				action--;
			}
		}
		else if (editIf){
			if(conditionalBool == 0){
				conditionalBool = 5;
			}
			else{
				conditionalBool--;
			}
		}
	}
	//TODO: COMMENT THIS OUT FOR RELEASE. DEBUGGING ONLY
	if(Input.GetButtonDown("B")){
		Debug.Log(root.parse());
		for(i = 0; i < root.lex().length; i++){
			Debug.Log(root.parse2()[i]+" "+root.lex()[i]);
		}
//		P.RotateLeft();
//		Application.LoadLevel("LevelSelect");
	}
	if(Input.GetButtonDown("G")){
		var a = "";
		for(i = 0; i < 10; i++){//row is layer
			a = "";
			for(j = 0; j < 10; j++){//column is how many times method "j" is called per layer 
				a = a+" "+layers[i][j];
			}
			Debug.Log(a);
		}
	}
	if(Input.GetButtonDown("End")){
		addEnd();
	}
}
function clearLayers(){
	for(i = 0; i < 10; i++){//row is layer
		layers[i] = new Array();
		for(j = 0; j < 10; j++){//column is how many times method "j" is called per layer 
			if(j == 9){
				layers[i][j] = 1;
			}
			else{
				layers[i][j] = 0;
			}
		}
		
	}
}
function actionBlock(){
	
}

function prepLevel(){
	if(level == 0){
		addAction();
	}
	else if(level == 1){
	}
	else if(level == 2){
	}
	else if(level == 3){
	}
}

function testdelay(times : int){
//		for(i = 0; i < times; i++){
//			Debug.Log("Moving " + i);
//			yield WaitForSeconds (1.5);
//			P.Move();
//		}

}

function Run(){
	//StartCoroutine(root.run());
	for(i = 0; i < root.lex().length; i++){
			//Debug.Log(root.parse2()[i]+" "+root.lex()[i]);
			var curr : int = root.lex()[i];
			Debug.Log("Curr is " + curr);
			if(curr == 22){
				layer++;
			}
			if(curr > 9 && curr < 20){
				//Debug.Log("adding to "+(curr-10));
				layers[layer][curr-10] = layers[layer][curr-10]+1;
				//Debug.Log("method is now "+layers[layer][curr-10]);
				numActions++;
			}
			if(curr < 10 && curr > 0){
				Debug.Log("added: "+curr+" to layer "+layer);
				layers[layer][9] =layers[layer][9]+curr-1;
				numActions+=layers[layer][9];
			}
			if(curr > 29 && curr < 40){
				layers[layer][8] =  curr -29;
			}
			if(curr == 50){
				layer++;
			}
	}
	ifCheck();
	rep2();
	
}
function rep2() : IEnumerator{
	Debug.Log("layer var is " +layer);
	for(i = 0; i <= layer; i++){
		Debug.Log("Layer " + i);
			for(j = 0; j < layers[i][9]; j++){
				Debug.Log("With Repeat " + j);
				for(k = 0; k < layers[i][0]; k++){
					P.moveRight();
					yield WaitForSeconds(2);
				}
				for(k = 0; k < layers[i][1]; k++){
					Debug.Log("With method " + k);
					P.moveLeft();
					yield WaitForSeconds(2);
				}
				for(k = 0; k < layers[i][2]; k++){
					P.moveUp();
					yield WaitForSeconds(2);
				}
				for(k = 0; k < layers[i][3]; k++){
					P.moveDown();
					yield WaitForSeconds(2);
				}
				for(k = 0; k < layers[i][3]; k++){
					//popbubble
					yield WaitForSeconds(2);
				}
		}
		//yield WaitForSeconds(2);
	}
	checkState();
	
}
function ifCheck(){
	for(i = 0; i <= layer; i++){
		if(layers[i][8] != 3 && layers[i][8] != 0){
			Debug.Log("check happened at layer " + i);
//			for(j = i; j <= layer; j++){
//				for(k = 0; k < 9; k++){
//					//Debug.Log("j and k are " + j + " and " +k);
//					layers[j][k] = 0;
//				}
//			}
		}
	}
}
function rep(currLayer : int) : IEnumerator{
	//Debug.Log("Currlayer is: "+currLayer);
	if(currLayer == 0){
		//for(i = 0; i <= currLayer; i++){
			for(j = 0; j < layers[currLayer][0];j++){
				//Debug.Log("layer "+currLayer);
				P.moveRight();
				yield WaitForSeconds(2);
			}
			for(j = 0; j < layers[currLayer][1];j++){
				//Debug.Log("inner layer "+currLayer);
				P.moveUp();
				yield WaitForSeconds(2);
			}
			rep(currLayer+1);
		//}
	}
	else if(currLayer == layer){
		for(i = 0; i < layers[currLayer][9]; i++){
			Debug.Log("Outer "+i);
			for(j = 0; j < layers[currLayer][0];j++){
				Debug.Log("\tInner 1"+currLayer);
				P.moveRight();
				yield WaitForSeconds(2);
			}
			for(j = 0; j < layers[currLayer][1];j++){
				Debug.Log("\tInner 2"+currLayer);
				P.moveUp();
				yield WaitForSeconds(2);
			}
			//yield WaitForSeconds(1);
			
		}
	}
	else{
		for(i = 0; i < layers[currLayer][9]; i++){
			//Debug.Log("layer "+currLayer);
//			for(j = 0; j < layers[currLayer][0];j++){
//				P.moveRight();
//				yield WaitForSeconds(2);
//			}
		Debug.Log("TOP "+i);
			rep(currLayer+1);
			yield WaitForSeconds(6);
		}
	}
//	for(i = 0; i <= layer; i++){
//		Debug.Log("layer: "+i);
//		var counter = 1;
//		
//		for(k = i; k <= layer;k++){
//			Debug.Log(layers[k][9]);
//			counter *= layers[k][9];
//		}
//		Debug.Log("counter: "+counter);
//		Debug.Log("layers i 0: "+ layers[i][0]);
//			for(j = 0; j < layers[i][0]*counter;j++){
//				Debug.Log("movign right");
//				P.moveRight();
//				yield WaitForSeconds(2);
//			}
//		
//	}
	
}
function checkState(){
	Debug.Log("at check state level is "+ level + " and layers01 is "+layers[0][1]);
	if(level == 0){
		if(layers[0][0] == 1){
			success = true;
			helpText = levelInfo.completeInfo[infoSequence2];
			infoOn = true;
		}
	}
	else{
		if(layers[0][2] == 1){
			success = true;
			helpText = levelInfo.completeInfo[infoSequence2];
			infoOn = true;
		}
		else if(level == 1){
			failure = true;
			helpText = "Oops try making Alex move upwards.  You can do this making your action say 'Alex.MoveUp()' by using the arrow keys (or w and d keys) and press the 'Run' button (or enter key)";
			infoOn = true;
		}
		else{
			success = true;
			helpText = levelInfo.completeInfo[infoSequence2];
			infoOn = true;
		}
	}
}
function reset(){
	Debug.Log("RESET");
	editRepeat = false;
	edifIf = false;
	editAction = false;
	player = 0;
	playerLine = 0;
	playerX = 0;
    playerY = 0;
	editPlayerX = false;
	editPlayerY = false;

	repeatTimes = 0;
	repLine = 0;
	
	actLine = 0;
	
	indent = 0;
	indents = "";
	action = 0;
	for(i = 0; i < lines; i++){
		code[i] = "";
	}
	lines = 0;
	inSequence = false;
	emptyTree = true;
	available = true;
	tree = new CNode();
	root = new RootNode(tree);
	
	failureType = "";
	failure = false;
	success = false;
	finished = false;
	doneText = "";
	clearLayers();
	layer = 0;
}

//function move(){
//}

function displayNodes(){
	//root.display();
	Debug.Log(root.parse());
}

function updateRepeat(amt : int){
	var times = new ValueNode(amt);
	tree.myParent.updateVal(times);
}

function updateIf(cond : int){
	var bool = new ConditionNode(cond);
	tree.myParent.updateCond(bool);
}

function updateMethod(type : int){
	var method = new MethodNode(type);
	method.myParent = tree.myParent;
	
	tree.myParent.updateMethod(method);
	tree = method;
}

function addMethodNode(type : int){
if(indent> 0){
		indents = indents + "    ";
		Debug.Log("Added to indents.  Now" +indents+"this many");
		indent = 0;
	}
	var newChild = new MethodNode(type);
	if(emptyTree){
		//current points to this one
		tree = newChild;
		
		//the parent of the current is set to the root
		tree.myParent = root;
		
		//the root's child is updated to be this
		root.myChild = tree;
		
		//no longer an empty tree
		emptyTree = false;
	}
	else {
		var sequence = new SequenceNode(tree, newChild);
		
		//in the case that the current node is a repeat, if or sequence node
		if (inSequence){
			
			if(available){ //in the case where the last node added was a repeat or if and we need to replace empty preset
				newChild.myParent = tree.myParent;
				tree.myParent.rightChild = newChild;
				tree = newChild;
				
				
				available = false;
			}
			else{
			//make the new sequence node's parent the parent of the current node
			sequence.myParent = tree.myParent;
			
			
			//set the current node's right child to be this node
			//tree.myParent.rightChild = newChild;
			tree.myParent.rightChild = sequence;
			
			//set the parent of the current node to be the empty sequence node
			tree.myParent = sequence;
			
			//set the parent of this node to be the sequence
			newChild.myParent = sequence;
			
			//set the current pointer to this
			tree = newChild;
			}
		}
		else{
			tree = newChild;
			//set the parent of this to be the sequence node
			tree.myParent = sequence;
			
			//set the sequence's parent to be the root?
			sequence.myParent = root;
			root.myChild = sequence;
			
			inSequence = true;
		}
	}

}
function addEndNode(){
if(indent> 0){
		indents = "";
		Debug.Log("Reset indents" +indents+"this many");
		indent = 0;
	}
	var newChild = new EndNode();
	if(emptyTree){
		//current points to this one
		tree = newChild;
		
		//the parent of the current is set to the root
		tree.myParent = root;
		
		//the root's child is updated to be this
		root.myChild = tree;
		
		//no longer an empty tree
		emptyTree = false;
	}
	else {
		var sequence = new SequenceNode(tree, newChild);
		
		//in the case that the current node is a repeat, if or sequence node
		if (inSequence){
			
			if(available){ //in the case where the last node added was a repeat or if and we need to replace empty preset
				newChild.myParent = tree.myParent;
				tree.myParent.rightChild = newChild;
				tree = newChild;
				
				
				available = false;
			}
			else{
			//make the new sequence node's parent the parent of the current node
			sequence.myParent = tree.myParent;
			
			
			//set the current node's right child to be this node
			//tree.myParent.rightChild = newChild;
			tree.myParent.rightChild = sequence;
			
			//set the parent of the current node to be the empty sequence node
			tree.myParent = sequence;
			
			//set the parent of this node to be the sequence
			newChild.myParent = sequence;
			
			//set the current pointer to this
			tree = newChild;
			}
		}
		else{
			tree = newChild;
			//set the parent of this to be the sequence node
			tree.myParent = sequence;
			
			//set the sequence's parent to be the root?
			sequence.myParent = root;
			root.myChild = sequence;
			
			inSequence = true;
		}
	}

}


function addRepeatNode(){
	if(indent> 0){
		indents = indents + "    ";
		Debug.Log("Added to indents.  Now" +indents+"this many");
		indent = 0;
	}
	indent++;
	var times = new ValueNode(1);
	var body = new MethodNode(2);
	if(emptyTree){
		var repeat = new RepeatNode(times, body);
		repeat.myParent = root;
		times.myParent = repeat;
		body.myParent = repeat;
		root.myChild = repeat;
		tree = body;
		emptyTree = false;
	}
	else{
		var newChild = new RepeatNode(times, body);
		if(inSequence){
			Debug.Log("repeat says in sequence");
			if(available){
				Debug.Log("repeat says available");
				newChild.myParent = tree.myParent;
				tree.myParent.rightChild = newChild;
				body.myParent = newChild;
				tree = body;
			}
			else{
				sequence = new SequenceNode(tree, newChild);
				sequence.myParent = tree.myParent;
				newChild.myParent = sequence;
				Debug.Log(tree.myParent);
				if(tree.myParent == SequenceNode || IfNode || RepeatNode){
					tree.myParent.rightChild = sequence;
				}
				else{
					tree.myParent.myChild = sequence;
				}
				tree = newChild.rightChild;
				tree.myParent = newChild;
			}
			
		}
		else{
			Debug.Log("repeat says not in sequence");
			sequence = new SequenceNode(tree, newChild);
			sequence.myParent = tree.myParent;
			newChild.myParent = sequence;
			root.myChild = sequence;
			tree = newChild.rightChild;
			tree.myParent = newChild;
		}
	}
	inSequence = true;
	available = true;
}

function addIfNode(){
	var condition = new ConditionNode(23);
	if(indent> 0){
		indents = indents + "    ";
		Debug.Log("Added to indents.  Now" +indents+"this many");
		indent = 0;
	}
	indent++;
	var body = new MethodNode(2);
	if(emptyTree){
		var iffy = new IfNode(condition, body);
		iffy.myParent = root;
		condition.myParent = iffy;
		body.myParent = iffy;
		root.myChild = iffy;
		tree = body;
		emptyTree = false;
	}
	else{
		var newChild = new IfNode(condition, body);
		if(inSequence){
//			Debug.Log("if says in sequence");
			if(available){
//				Debug.Log("if says available");
				newChild.myParent = tree.myParent;
				tree.myParent.rightChild = newChild;
				body.myParent = newChild;
				tree = body;
			}
			else{
				sequence = new SequenceNode(tree, newChild);
				sequence.myParent = tree.myParent;
				newChild.myParent = sequence;
				Debug.Log(tree.myParent);
				if(tree.myParent == SequenceNode || IfNode || RepeatNode){
					tree.myParent.rightChild = sequence;
				}
				else{
					tree.myParent.myChild = sequence;
				}
				tree = newChild.rightChild;
				tree.myParent = newChild;
			}
			
		}
		else{
//			Debug.Log("if says not in sequence");
			sequence = new SequenceNode(tree, newChild);
			sequence.myParent = tree.myParent;
			newChild.myParent = sequence;
			root.myChild = sequence;
			tree = newChild.rightChild;
			tree.myParent = newChild;
		}
	}
	inSequence = true;
	available = true;
}

//function addPlayer (){
//	player = 1;
//	editRepeat = false;
//	editAction = false;
////	editPlayerX = true;
//	playerLine = lines;
//	code[lines] = "If (true) -";
//}

function addIf(){
	if(lines < numLines){
		
		ifLine = lines;
		code[lines] = "If (<b>" + conditional + " </b> -";
		addIfNode();
		addLines();
		editAction = false;
		editRepeat = false;
		editIf = true;
	}
}
function addRepeat (){
	if(lines < numLines){
		repeatTimes = 1;
	//	editPlayerX = false;
	//	editPlayerY = false;
		
		repLine = lines;
		code[lines] = "Repeat (<b>" + repeatTimes + "</b>) -";
		addRepeatNode();
		addLines();
		editIf = false;
		editAction = false;
		editRepeat = true;
	}
}

function addAction (){
	if(levelInfo.braek && level == 0){
			infoSequence++;
			helpText = levelInfo.info[infoSequence];
			levelInfo.braek = false;
			infoOn = true;
	}
	if(lines < numLines){
		actLine = lines;
		//action = 0;
	//	editPlayerX = false;
	//	editPlayerY = false;
		
		code[lines] = "Alex.MoveRight();";
		addMethodNode(0);
		addLines();
		editIf = false;
		editRepeat = false;
		editAction = true;
	}
}
function addEnd(){
	if(levelInfo.braek && level == 3){
			//infoSequence++;
			helpText = levelInfo.info[infoSequence];
			levelInfo.braek = false;
			infoOn = true;
	}
	if(lines < numLines){
		if(indents == "        "){
			indents = "    ";
		}
		else{
			indents = "";
		}
		actLine = lines;
		editIf = false;
		editAction = false;
		editRepeat = false;
		repLine = lines;
		code[lines] = indents + "End";
	
	addEndNode();
	addLines();
	}
	
}

function getLines(){
	return lines;
}

function addLines(){
	lines++;
}