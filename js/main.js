let units = {
	compr: {
		metro: ["m", 1],
		centimetro: ["cm",100]
	}
}

const requestUrl = "js/units.json";
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
t=0
function loop() {
	requestAnimationFrame(loop);
	
	if(old != category.value) {
		updateDisplay()
	}
	//Atualiza o valor e o display
	const vi = eVi.value;
	let ui = eUi.value;
	let uf = eUf.value;
	
	if(category.value == 'compr') {
		ui = (ui == 0 ? 1 : ui);
		uf = (uf == 0 ? 1 : uf);
		eVf.innerText = vi / ui * uf;
	}
	else if(category.value) {
		ui = ui.split(',');
		uf = uf.split(',');
		eVf.innerText = (uf[1]-uf[0]) * (vi-ui[0]) / (ui[1]-ui[0]) + Number(uf[0]);
	}
	else {
		eVf.innerText = 'Erro';
	}
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