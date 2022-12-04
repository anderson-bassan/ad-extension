let move_down = true;
let ads_number;

let update_ads = () => {
    ad_wrapper = document.querySelector('.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w');
    matching_ads = document.querySelectorAll('.matching-ad');
  
    matching_ads.forEach((ad) => {
        ad_wrapper.prepend(ad);
    });

    total_ads = matching_ads.length;
    chrome.runtime.sendMessage({ads: total_ads, hide: false}, function (response) {
        // do nothing
    });
}

let show_ads = () => {
    move_down = false;
    window.scrollTo(0, 100);

    update_ads();
};

let clear_ads = () => {
    matching_ads = document.querySelectorAll('.matching-ad');
    matching_ads.forEach((ad) => {
        ad.classList.remove('matching-ad');
    });
}

let get_ads = () => {
    ads = document.querySelectorAll('strong');
    ads.forEach((ad) => {
        if (ad.innerText == ads_number + ' anúncios') {
            ad_match = ad.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            ad_match.classList.add('matching-ad');
        }
    })
}

let move_page_down = () => {
    move_down = true;

    const resizeObserver = new ResizeObserver((entries) => {
        if (move_down) {
            window.scrollTo(0, document.body.scrollHeight); // move to the end of the page
            get_ads(ads_number);

        } else {
            get_ads();
            update_ads();
        }
    });

    resizeObserver.observe(document.body); // move to the end of the page on load. It forces the page resize
}


window.onload = () => {
	chrome.runtime.onMessage.addListener(
		(message, sender, sendResponse) => {
			if (message.flip) {
                ads_number = message.ads;

                clear_ads();
                move_page_down();
                sendResponse("searching");

            } else {
                get_ads();
                show_ads();
                sendResponse("stopping");
            }
		}
	);
}