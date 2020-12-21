var apiShort = "/web/search/topsearch/?context=blended&query=";
var apiLink = "https://instagram.com/web/search/topsearch/?context=blended&query=";

document.getElementById("query").value = "";
document.getElementById("optionSelector").value = "users";

var resp = "";
var options = document.getElementById("optionSelector").value;

document.getElementById("goBtn").addEventListener("click",(e)=>{
var query = document.getElementById("query").value;

if (query){
	var req = new XMLHttpRequest();
	req.onreadystatechange = ()=>{
		if (req.readyState == 4 && req.status == 200){
			resp = req.responseText;
			console.log(JSON.parse(req.responseText)[options]);
			document.getElementById("textArea").innerHTML = (JSON.parse(req.responseText)[options].length > 0) ? JSON.stringify(JSON.parse(req.responseText)[options]) : "Not Found";
		}
	}

	req.open("GET",apiLink+query,true);
	req.send();
	document.getElementById("textArea").innerHTML = "Sending a request to "+apiLink+query+"...";
	}
})

document.getElementById('query').addEventListener("input",(e)=>{
	var elemValue = document.getElementById("query").value;
	if (elemValue){
		document.getElementById("queryDisplay").innerHTML = apiShort+elemValue;
	}
	else{
		document.getElementById("queryDisplay").innerHTML = "";
	}
})


document.getElementById("optionSelector").addEventListener("change",()=>{
	try{

	options = document.getElementById("optionSelector").value;
	document.getElementById("textArea").innerHTML = JSON.stringify(JSON.parse(resp)[options]);
	}catch{}
})

document.getElementById("textArea").addEventListener("mousemove",resize);

function resize(){
	document.getElementById("selectContainer").style.width = document.getElementById("textArea").style.width;
}