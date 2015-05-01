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
	breakpoint = 0;
	breakpoint2 = 1;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	movebox[0] = 0;
	info[0] = "The last tool we have to communicate with Alex is the 'If' Button.  This let's us tell Alex to do something only 'IF' something else is true.";

	movebox[1] = 0;
	info[1] = "Try pressing the 'If' button (or typing the number 0).";
	movebox[2] = 1;
	info[2] = "Now that we have a new 'If' line in our code box, let's take a look at the options.  Use the arrow buttons or keys to change the value until it says 'If (Alex is a Jellyfish)'.";
	
	movebox[3] = 0;
	info[3] = "Fantastic!  Now any new lines of code that Alex sees after the 'If' line, will only happen 'IF' Alex is a jellyfish.  And he is!  If we used a line like 'If (Alex is not a Jellyfish)', Alex would not do anything.\n\nNow let's finish off our code by adding a new action and pressing 'If' one more time to create an 'end' just like with the repeat we did last time.\n\nOnce you're done with that, press 'Run' to see what happens.";

	movebox[4] = 0;
	completeInfo[0] = "Great Job! You have finished all the lessons we have so far for JellyCode.  If you would like to see more lessons like this or have other questions/comments, please send an email to bmats124@sbcglobal.net";
}

function Update () {

}