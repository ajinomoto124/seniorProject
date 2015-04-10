var width : float;
var height : float;
var bubbley : float = 0.0;
var bubblex : float = 0.0;
var bubble1y : float = 0.0;
var bubble1x : float = 0.0;
var bubble2y : float = 0.0;
var bubble2x : float = 0.0;
//var spaceAlpha : float = 0.0;
var index : float = 0.0;

function Start () {
	width = Screen.width;
	height = Screen.height;
	//bubble1 -= height/100;
	bubbley = -4;
	bubblex = Random.Range(-width/2, width/2);
	DontDestroyOnLoad(GameObject.Find("GLOBAL"));
//	bubble1x = Random.Range(-width/2, width/2);
//
//	bubble2x = Random.Range(-width/2, width/2);
	//Instantiate(bubble, Vector3 (width/8, height/8, 0), Quaternion.identity);
}

function Update () {
	index +=  Time.deltaTime;
	
	if(Input.GetButtonDown("Submit")){
		Application.LoadLevel("LevelSelect");
	}
	
	//spaceAlpha = Mathf.Cos(index);
	
	bubbley += Time.deltaTime;
	if(bubbley > 4){
		bubbley = -5;
		bubblex = Random.Range(-width/2, width/2);
	}
	bubble1y = bubbley +1;
	
	if(bubble1y > 4){

		bubble1x = bubblex + Random.Range(-width/12, width/12);
	}
	bubble2y = bubbley + 2;
	
	if(bubble2y > 4){

		bubble2x = bubble1x + Random.Range(-width/16, width/16);
	}
}

function load(){
Application.LoadLevel("LevelSelect");
}