var info : String[];
var movebox : int[];
var completeInfo : String[];
var braek : boolean = false;
var total : int;
var ctotal : int;
var numLines : int;
var breakpoint : int;
var numBreaks : int;
//see level0info for variable descriptions

function Start () {
	total = 4;
	ctotal = 1;
	numLines = 1;
	breakpoint = 1;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	//set up for tutorial text
	movebox[0] = 0;
	info[0] = "Hello There! \n\nWelcome to your second lesson with Jelly Code.  This time let's play around with more actions.";
	
	movebox[1] = 1;
	info[1] = "This time, our computer screen is blank and you get to choose what to tell Alex the Jellyfish.";
	
	movebox[2] = 1;
	info[2] = "Let's start by sending an Action for Alex to do.  You can do this by either clicking the 'Action' button on the top right, or by pressing the number key '2'.";
	
	movebox[3] = 0;
	info[3] = "Now that we have a line of code on the screen, we can change what it does by pressing the up/down arrow keys or the w/s keys.  Go ahead and try changing the line so it says 'Alex.MoveUp()'.  When you do that, press 'Run' and watch what happens.";
	
	movebox[4] = 0;
	completeInfo[0] = "Easy right?  In computer science the line of code we just used is called a method or function.  These are basic building blocks in getting a computer program to do what you want it to.";

	
}

function Update () {

}