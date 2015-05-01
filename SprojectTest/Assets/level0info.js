var info : String[]; 			//string array that holds tutorial messages
var movebox : int[];			//corresponding array that tells info box where to move
var completeInfo : String[]; 	//string array that has messages for after objective is completed
var braek : boolean = false; 	//boolean says if we are currently on a break between messages
var total : int; 				//total number of lines in all info messages
var ctotal : int; 				//total number of lines in complete info messages
var numLines : int; 			//how many lines the user is allowed to use
var breakpoint : int; 			//where the break (braek) is between 1st and later objectives
var numBreaks : int;			//number of breakpoints we have

function Start () {
	total = 7;
	ctotal = 3;
	numLines = 1;
	movebox = new int[total+ctotal];
	info = new String[total];
	completeInfo = new String[ctotal];
	
	//set up for tutorial text
	//movebox is 0 for center, -1 for left, and 1 for right
	movebox[0] = 0;
	info[0] = "Hello There! \n\nWelcome to your first lesson with Jelly Code.  Here you will learn the basics in computer science without the hassle of having to type all the code out yourself.";
	
	movebox[1] = 0;
	info[1] = "This first lesson is a tour of your workspace.  This will just help you get set up so you can understand the controls";
	
	movebox[2] = -1;
	info[2] = "On the right, we have a screen that shows us our jellyfish friend, Alex.  Alex can't understand English, but we can communicate by using special code.";
	
	movebox[3] = 1;
	info[3] = "On the left, we have a computer screen that shows us the code we use to talk to Alex.";
	
	movebox[4] = 0;
	info[4] = "At the top of the screen there are three buttons.  You can click these buttons to add code into our code screen. \n\nIf you would rather press keys, you can type the number in bold instead of clicking the button";
	
	movebox[5] = 0;
	info[5] = "At the bottom left we can see the number of lines we've used over the number of lines we are allowed to use (right now, we've used 1 line and we are allowed to use 1 line).\n\nThe button that says 'Run' sends our code to Alex the Jellyfish.  You can also press the 'Enter' or 'Return' key to do the same thing.\n\nYou can press the Undo button in the bottom left to remove the last line you added.";

	movebox[6] = 0;
	info[6] = "Close this box by pressing space or clicking the screen and then press the 'Run' Button.  You will see that Alex gets our message and does what it says.\n\nIn this case, we use the code MoveRight and Alex moves to the right.";

	movebox[7] = 0;
	completeInfo[0] = "See?  That was pretty easy.  Let's take a look at what we did.";
	
	movebox[8] = 0;
	completeInfo[1] = "The line of code used says 'Alex.MoveRight()'.  Let's separate this into 2 parts.  The part before the period '.' and the part after the period.\n\nAlex        .       MoveRight()\n\nThe left side is just making sure we are telling Alex what to do.  The right side is saying the action we want to do.  If we had another jellyfish friend named, 'Bob' we could tell him what to do instead by saying Bob.MoveRight()";

	movebox[9] = 0;
	completeInfo[2] = "That's all there is to it.  Let's move on to the next lesson shall we?";
}	

function Update () {

}