var apiShort = "/web/search/topsearch/?context=blended&query=";
var apiLink = "https://instagram.com/web/search/topsearch/?context=blended&query=";
var jsonObj;
document.getElementById("previewBtn").disabled = true;
document.getElementById("query").value = "";
document.getElementById("optionSelector").value = "users";

var resp;
var options = document.getElementById("optionSelector").value;

document.getElementById("goBtn").addEventListener("click",(e)=>{
var query = document.getElementById("query").value;

if (query){
	var req = new XMLHttpRequest();
	req.onreadystatechange = ()=>{
		if (req.readyState == 4 && req.status == 200){
			resp = JSON.parse(req.responseText) ;
			document.getElementById("textArea").innerHTML = (JSON.parse(req.responseText)[options].length > 0) ? JSON.stringify(JSON.parse(req.responseText)[options]) : "Not Found";
			document.getElementById("previewBtn").disabled = false;
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
	document.getElementById("textArea").innerHTML = JSON.stringify(resp[options]);
	}catch{}
})

document.getElementById("textArea").addEventListener("mousemove",resize);

function resize(){
	
	var sc = document.getElementById("selectContainer")
	var co = document.getElementById("container");
	var coWidth = co.offsetWidth;
	var relativeWidth = (95*coWidth)/100;
	if (document.getElementById("textArea") >= relativeWidth){
	sc.style.width = relativeWidth;
	}else{
	sc.style.width = document.getElementById("textArea").style.width;
	}

}
// Disable The Effects
document.getElementById("previewCloseBtn").addEventListener("click",()=>{
	var previewDiv = document.getElementById("preview")
	var mainD = document.getElementById("main");
	var bb = document.getElementById("blurBlock");
	bb.style.display = "none";
	
	bb.classList.remove("blur")
	document.body.classList.remove("blur")
	preview.style.display = "none";
	preview.classList.remove("clickable");
	preview.classList.add("unclickable");
	mainD.classList.remove("blur")
	document.body.classList.add("clickable");
	document.body.classList.remove("unclickable");
	document.getElementById("previewArea").innerHTML ="";
})
// Enable The Effects
document.getElementById("previewBtn").addEventListener("click",()=>{
	var previewDiv = document.getElementById("preview");
	var mainD = document.getElementById("main");
	var bb = document.getElementById("blurBlock");
	bb.style.display = "initial";
	bb.style.opacity = "1";
	bb.classList.add("blur")
	mainD.classList.add("blur")
	preview.style.display = "initial";
	preview.classList.add("clickable");
	preview.classList.remove("unclickable");
	// preview.classList.add("unblur");
	document.body.classList.add("unclickable");
	document.body.classList.remove("clickable");
	jsonObj = resp[options];
	var area = document.getElementById("previewArea");

	for (var i = jsonObj.length - 1; i >= 0; i--) {
				var element = document.createElement("div");
				if (options == "hashtags"){
				// Initializing and filling variables
				var url = "https://instagram.com/explore/tags/"+jsonObj[i].hashtag.name;
				var name = jsonObj[i].hashtag.name;
				var propic = jsonObj[i].hashtag.profile_pic_url;
				var media_count_ranged = jsonObj[i].hashtag.search_result_subtitle;
				// Create Necessary Elements
				var redirectBtn = document.createElement("button");
				var redirectLink = document.createElement("a");
				var hashTitle = document.createElement("p");
				var hashpropic = document.createElement("img");
				var hashmediac = document.createElement("p");
				//IDK Something Important
				hashTitle.innerHTML = name;
				hashpropic.src = propic;
				hashmediac.innerHTML = media_count_ranged;
				//Styling
				hashTitle.style = "font-size:20px;font-weight:bold;color:#121212;";
				hashpropic.style = "border:1px solid black;border-radius:50%;width:85px;";
				hashmediac.style = "font-size:15px;font-weight:bold;color:#121212;";
				element.style = "width:40%;background-color:#242424;text-align:center;padding:10px;border-radius:5px;margin:5px;"
				//Redirection (Button & a tags) and appending necessary elements
				redirectLink.setAttribute("href",url);
				redirectLink.setAttribute("target","_blank");
				redirectBtn.setAttribute("class","btn btn-light");
				redirectBtn.innerHTML = "Explore";
				redirectLink.appendChild(redirectBtn);

				//Append element to "area"
				element.appendChild(hashpropic);
				element.appendChild(hashmediac);
				element.appendChild(hashTitle);
				element.appendChild(redirectLink);
				area.appendChild(element);
				}
				else if (options == "users"){
				// Initializing and filling variables
				var url = "https://instagram.com/"+jsonObj[i].user.username;
				var username = jsonObj[i].user.username;
				var fullname = jsonObj[i].user.full_name;
				if (!fullname){
					fullname = "N/A"
				}
				var propic = jsonObj[i].user.profile_pic_url;
				
				// Create Necessary Elements
				var redirectBtn = document.createElement("button");
				var redirectLink = document.createElement("a");
				var userTitle = document.createElement("p");
				var userpropic = document.createElement("img");
				var usermediac = document.createElement("p");
				//IDK Something Important
				userTitle.innerHTML = username;
				userpropic.src = propic;
				usermediac.innerHTML = fullname;
				//Styling
				userTitle.style = "font-size:20px;font-weight:bold;color:#121212;";
				userpropic.style = "border:1px solid black;border-radius:50%;width:85px;";
				usermediac.style = "font-size:15px;font-weight:bold;color:#121212;";
				element.style = "width:40%;background-color:#242424;text-align:center;padding:10px;border-radius:5px;margin:5px;"
				//Redirection (Button & a tags) and appending necessary elements
				redirectLink.setAttribute("href",url);
				redirectLink.setAttribute("target","_blank");
				redirectBtn.setAttribute("class","btn btn-light");
				redirectBtn.innerHTML = "Explore";
				redirectLink.appendChild(redirectBtn);

				//Append element to "area"
				element.appendChild(userpropic);
				element.appendChild(usermediac);
				element.appendChild(userTitle);
				element.appendChild(redirectLink);
				area.appendChild(element);
				}
				else{
					var element = document.createElement("div");
					var p = document.createElement("p");
					element.style = "width:40%;background-color:#242424;text-align:center;padding:10px;border-radius:5px;margin:5px;";
					p.innerHTML = "'Places' are not available yet ,why? because no one care about them lol";
					p.style = "font-size:15px;font-weight:bold;color:#121212;";
					element.appendChild(p);
					area.appendChild(element);
					break;
				}
			}
})