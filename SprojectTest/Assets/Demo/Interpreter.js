import UnityEngine.UI;
import UnityEngine.MonoBehaviour;

private var dGui : Object;

public class CNode{
	public function CNode(){
	}
	public function execute(){
	}
	public function display(){
	}
	public function parse() : String{
		return "This is not a real node";
	}
	public function parse2() : Array{
		var cnode = new Array ("empty node");
		return cnode;
	}
	public function lex() : Array{
		var cnode = new Array ("EMPTYTOKEN");
		return cnode;
	}
	public function run(): IEnumerator{
		Debug.Log("cnode run");
	}
	
}

public class RootNode extends CNode{
	var myChild;
	public function RootNode(child : CNode){
		myChild = child;
	}
	public function execute(){
	}
	public function display(){
		Debug.Log("Root");
		myChild.display();
	}
	public function updateMethod(type : CNode){
		myChild = type;
		myChild.myParent = this;
	}
	public function parse() : String{
		return "Root " + myChild.parse();
	}
	public function parse2() : Array{
		var root = new Array ("Root");
		var child = myChild.parse2();
		return root.concat(child);
	}
	public function lex() : Array{
		//var root = new Array ("ROOTTOKEN");
		var root = new Array ();
		root.Push(0);
		var child = myChild.lex();
		return root.concat(child);
	}
	public function run() : IEnumerator{
		Debug.Log("root run");
		myChild.run();
		Debug.Log("root ended");
	}
}


public class SequenceNode extends CNode{
	var myParent;
	var leftChild;
	var rightChild;
	public function SequenceNode(left : CNode, right :CNode){
		leftChild = left;
		rightChild = right;
	}
//	public function SequenceNode(left : CNode, right :CNode, parent : RootNode){
//		myParent = parent;
//		leftChild = left;
//		rightChild = right;
//	}
	public function execute(){
		leftChild.execute();
		rightChild.execute();
	}
	public function display(){
		Debug.Log("Sequence Node");
		leftChild.display();
		rightChild.display();
	}
	public function updateMethod(type : CNode){
		rightChild = type;
		rightChild.myParent = this;
	}
	public function parse() : String{
		return " Left (" + leftChild.parse() + ") and Right ("+ rightChild.parse() + ")"; 
	}
	public function parse2() : Array{
		var seq = new Array ("Sequence");
		var left = leftChild.parse2();
		var right = rightChild.parse2();
		return seq.concat(left.concat(right));
	}
	public function lex() : Array{
		var seq = new Array ();
		seq.Push(21);
		var left = leftChild.lex();
		var right = rightChild.lex();
		return seq.concat(left.concat(right));
	}
}
public class RepeatNode extends SequenceNode{

	public function RepeatNode(times : CNode, body : CNode){
		super(times, body);
	}
//	public function RepeatNode(times : CNode, body : CNode, parent : RootNode){
//		super(times, body, parent);
//	}
	
	public function execute(){
		for(i = 0; i < leftChild.myValue; i ++){
			rightChild.execute();
		}
	}
	
	public function updateVal(times :CNode){
		leftChild = times;
		leftChild.myParent = this;
	}
	public function updateMethod(type : CNode){
		rightChild = type;
		rightChild.myParent = this;
	}
//	public function updateBody(body :CNode){
//		rightChild = body;
//	}
	public function display(){
		Debug.Log("RepeatNode");
		for(i = 0; i < leftChild.myValue; i++){
			rightChild.display();
		}
	}
	public function parse() : String{
		return " Repeat (" + rightChild.parse() + ") " + leftChild.parse() + " times";
	}
	public function parse2() : Array{
		var seq = new Array ("Repeat");
		var left = leftChild.parse2();
		var right = rightChild.parse2();
		return seq.concat(left.concat(right));
	}
	public function lex() : Array{
		var rep = new Array ();
		rep.Push(22);
		var ti = leftChild.lex();
		var met = rightChild.lex();
		return rep.concat(ti.concat(met));
	}
	public function run() : IEnumerator {
		Debug.Log("repeat run called");
		for(i = 0; i < leftChild.myValue; i++){
			Debug.Log("running rightChild: " + i);
			//StartCoroutine(rightChild.run());
			rightChild.run();
			//yield WaitForSeconds(2);
		}
	}
}

public class IfNode extends SequenceNode{

	public function IfNode(condition : CNode, body : CNode){
		super(condition, body);
	}
//	public function IfNode(condition : CNode, body : CNode, parent : RootNode){
//		super(condition, body, parent);
//	}
	public function execute(){
		if(leftChild.myCondition){
			rightChild.execute();
		}
	}
	public function updateCond(condition :CNode){
		leftChild = condition;
		leftChild.myParent = this;
	}
	public function updateMethod(type : CNode){
		rightChild = type;
		rightChild.myParent = this;
	}
	public function updateBody(body :CNode){
		rightChild = body;
	}
	public function display(){
		Debug.Log("IfNode");
		rightChild.display();
	}
	public function parse() : String{
		return " If " + leftChild.parse() + ", do (" + rightChild.parse() + ")";
	}
	public function lex() : Array{
		var iff = new Array ();
		iff.Push(23);
		var co = leftChild.lex();
		var met = rightChild.lex();
		return iff.concat(co.concat(met));
	}
}

public class MethodNode extends CNode{
	var myParent;
	var myType;
	public function MethodNode(type : int){
		myType = type;
	}
//	public function MethodNode(type : int, parent : RootNode){
//		myParent = parent;
//		myType = type;
//	}
	public function execute(){
//		if(myType.execute() == 1){
//			//TODO: Figure out what to do with methods, probably just update values
//		}
		
	}
	public function display(){
		Debug.Log("MethodNode type: " + myType);
	}
	public function parse() : String{
		return " MethodNode type: " + myType;
	}
	public function parse2() : Array{
		var info : String = "Method " + myType;
		var met = new Array (info);
		return met;
	}
	public function lex() : Array{
		var mNum = 10 + myType;
		var met = new Array(mNum);
		return met;
	}
	public function run(): IEnumerator{
		if(myType == 0){
			GameObject.Find("player").GetComponent("PlayerPosition").moveRight();
		}
		else{
			GameObject.Find("player").GetComponent("PlayerPosition").moveUp();
		}
	}
}

public class ValueNode extends CNode{
	var myValue;
	var myParent;
	public function ValueNode(value : int){
		myValue = value;
	}
	public function ValueNode(value : int, parent : CNode){
		myValue = value;
		myParent = parent;
	}
	public function execute(){
		//return myTimes;
	}
	public function display(){
		
	}
	public function parse() : String{
		return " " + myValue;
	}
	public function lex() : Array{
		var val = new Array(myValue);
		return val;
	}
}



public class ConditionNode extends CNode{
	var myCondition;
	var myParent;
	public function ConditionNode(condition : int){
		myCondition = condition;
	}
	public function ConditionNode(condition : int, parent : CNode){
		myCondition = condition;
		myParent = parent;
	}
	public function execute(){
		//return myCondition;
	}
	public function display(){
	}
	public function parse() : String{
		return ""+myCondition;
	}
	public function lex() : Array{
		 var co = new Array(30+myCondition);
		return co;
	}
}

public class EndNode extends CNode{
	var myParent;
	public function EndNode(){
	}
	public function parse() : String{
		return "This is the end";
	}
	public function lex() : Array{
		var e = 50;
		var end = new Array();
		end.Push(e);
		return end;
	}
	
}

function Start () {
		dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
}

public function addX(){
	Debug.Log("Added to player X");
	dGui.playerX += 10;
}

function Update () {

}