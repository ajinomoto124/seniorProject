var info : String[];
var movebox : int[];
var completeInfo : String[];
var braek : boolean = false;
var total : int;
var ctotal : int;
var numLines : int;

function Start () {
	total = 2;
	ctotal = 1;
	numLines = 7;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	movebox[0] = 0;
	info[0] = "Let's try add and end to this repeat";
	
	movebox[1] = 0;
	info[1] = "Now that we've ended this repeat, let's add a Move Down for Alex";
	
	movebox[2] = 0;
	completeInfo[0] = "Great job!  \n\nAs you can see, everything after Repeat and before End happened twice and the line we have after End only happened once!\n\nRepeats are very useful for doing a lot of actions without having to write as many lines of code";
}

function Update () {

}