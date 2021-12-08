let units = {
	compr: {
		metro: ["m", 1],
		centimetro: ["cm",100]
	}
}

const requestUrl = "https://bulovask.github.io/conversor/js/units.json";
const request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = "json";
request.send();

request.onload = function() {
	const res = request.response;
	units = res;
	updateDisplay();
}

const $ = (e) => document.querySelector(e);


const category = $("#category");
const eVi = $("#vi");
const eVf = $("#vf");
const eUi = $("#ui");
const eUf = $("#uf");

old = "null";

function loop() {
	requestAnimationFrame(loop);
	
	if(old != category.value) {
		updateDisplay()
	}
	//Atualiza o valor e o display
	const vi = eVi.value;
	const ui = eUi.value || 1;
	const uf = eUf.value || 1;
	
	eVf.innerText = vi / ui * uf;
}

loop()

function htmlunits(obj) {
	const li = Object.keys(obj);
	let text = "";
	for(i in li) { 
		text += `<option value="${obj[li[i]][1]}">${li[i]} (${obj[li[i]][0]})</option>`;
	}
	return text;
}

function updateDisplay() {
	//recarrega as unidades
	txt = htmlunits(units[category.value]);
	eUi.innerHTML = txt;
	eUf.innerHTML = txt;
	old = category.value;
}