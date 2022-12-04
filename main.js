let ads_number;
let flip = true;

window.onload = () => {
	let btn = document.querySelector('button');
	let number_input = document.querySelector('input[type="number"]');


	btn.addEventListener('click', () => {
		if (flip) {
			btn.innerText = 'parar';

			// code to search
			ads_number = number_input.value;
			

			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ads: ads_number, flip: true}, (response) => {
					flip = false;
				});
			});

		} else {
			btn.innerText = 'buscar';

			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ads: ads_number, flip: false}, (response) => {
					flip = true;
				});
			});
		}
	});
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (!message.hide) {
		total_ads = message.ads;

		message = document.querySelector('span');
		message.innerText = total_ads.toString() + ' anúncios encontrados';
		message.classList.add('active');
	}

    sendResponse({}); 
});