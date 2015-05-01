var info : String[];
var movebox : int[];
var completeInfo : String[];
var braek : boolean = false;
var total : int;
var ctotal : int;
var numLines : int;
var numBreaks : int;
var breakpoint : int;
var breakpoint2 : int;
//see level0info for variable descriptions

function Start () {
	total = 4;
	ctotal = 1;
	numLines = 3;
	numBreaks = 2;
	breakpoint = 1;
	breakpoint2 = 3;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	movebox[0] = 0;
	info[0] = "";

	movebox[1] = 0;
	info[1] = "";
	
	movebox[2] = 0;
	info[2] = "";
	
	movebox[3] = 0;
	info[3] = "";

	movebox[4] = 1;
	completeInfo[0] = "";
}

function Update () {

}