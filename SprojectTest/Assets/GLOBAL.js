var levelVar : int = 0;

function Start () {
	DontDestroyOnLoad(this);
}

function Update () {

}

function level0(){
levelVar = 0;
Debug.Log(levelVar);
Application.LoadLevel("LessonDemo");
}
function level1(){
levelVar = 1;
Debug.Log(levelVar);
Application.LoadLevel("LessonDemo");
}
function level2(){
levelVar = 2;
Debug.Log(levelVar);
Application.LoadLevel("LessonDemo");
}
function level3(){
levelVar = 3;
Debug.Log(levelVar);
Application.LoadLevel("LessonDemo");
}
