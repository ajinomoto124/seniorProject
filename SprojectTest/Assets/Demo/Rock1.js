import UnityEngine.UI;

private var dGui : Object;


function Start () {
	dGui = GameObject.Find("DemoUI").GetComponent("DemoUI");
	this.enabled = true;
	//GetComponent(Image).color = Color.gray;
}

function Update () {
//19 206 255
	if(dGui.success){
		//GetComponent(Image).color = Color.cyan;
		this.hideFlags = HideFlags.HideInHierarchy;
		this.enabled = false;
		
	}
	else{
	//GetComponent(Image).color = Color.gray;
	
	}
}