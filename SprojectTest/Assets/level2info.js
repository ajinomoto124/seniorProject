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
var breakpoint3 : int;
//see level0info for variable descriptions

function Start () {
	total = 5;
	ctotal = 1;
	numLines = 3;
	numBreaks = 2;
	breakpoint = 0;
	breakpoint2 = 1;
	breakpoint3 = 2;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	movebox[0] = 0;
	info[0] = "Now let's move on to something more interesting.\n\nWhat if we want to tell Alex to do something many times?  Instead of writing the same code over and over again, we can use something called a loop.";

	movebox[1] = 0;
	info[1] = "In this lesson, you can try out our handy 'Repeat' button in the button box above.\n\nTry pressing it (or type the number '1') to add a new line of code to the box.";
	
	movebox[2] = 0;
	info[2] = "Great! Now that we have a repeat, try changing the number in parenthesis by using the up arrow key.\n\nFor now, let's make it say '3'.";
	
	movebox[3] = 0;
	info[3] = "After you've done that, add an action by pressing the Action button or typing the number '2'.";
	
	movebox[4] = 0;
	info[4] = "Now if we press the repeat button again, something different will happen.  It will put an 'end' to the loop. This means that anything that happens after end will not be in the repeat.  Try pressing 'Run' now.";

	movebox[5] = 1;
	completeInfo[0] = "Good job!  Since we told Alex to moveLeft and we put a '3' in the repeat, Alex moved left 3 times!";
}

function Update () {

}