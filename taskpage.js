
const parameter = new URLSearchParams(location.search);
const id = parameter.get("id")
const body = document.getElementById("main")
var retrieveddata = localStorage.getItem(id);
    var parseddata = JSON.parse(retrieveddata);
    body.innerHTML += '<div><a href="./homepage.html"><button id ="go_back">Back</button></a></div><div id="title"><h4>' + parseddata.title + '</h4></div><div id="desc"><h4>' + parseddata.desc + '</h4></div>'