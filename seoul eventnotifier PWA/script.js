window.onload = function() {
    getEvent();
}

window.addEventListener('load', ()=>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
            .then(() => console.log("Service Worker Registered"))
            .catch(error => console.log("Service Worker Registration Failed", error));
    }
});

const url = "https://cors-anywhere-6o89.onrender.com/" + "http://openapi.seoul.go.kr:8088/477356695762736a383359704e466f/json/culturalEventInfo/1/1000"

let dataDiv = document.getElementById("dataDiv");
let watchButton = document.getElementById("what");
let gu = document.getElementById("gu")

async function getEvent() {
    const response = await fetch(url);
    let data = await response.json();
    
    console.log(data);

    let eventList = data.culturalEventInfo.row;
    let gus = gu.options[gu.selectedIndex].value;

    for (var i = 0; i < eventList.length; i++) {
        if(gus == eventList[i].CODENAME) {
            var div = document.createElement("div");
            div.setAttribute("class", "dataItem");
            div.innerHTML = '<div class="card" style="width: 18rem;">'+
            '<img class="card-img-top" src=' + eventList[i].MAIN_IMG+">"+
            "<br>* 제목: "+ eventList[i].TITLE+
            "<br>* 공연기간: "+ eventList[i].DATE+
            "<br>* 공연장: "+ eventList[i].PLACE+
            "<br>* <a href="+ eventList[i].ORG_LINK+" target=blank>"
            +"홈페이지 바로가기 "+"</a><br>";

            if (dataDiv.childElementCount == 0) {
                dataDiv.appendChild(div);
            }
            else {
                dataDiv.insertBefore(div, dataDiv.firstChild);
            }
        }
    }
}

watchButton.addEventListener("click", () => {
    getEvent()
})