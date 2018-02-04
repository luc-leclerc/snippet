javascript:(()=>{if (window.location.hostname.indexOf('www.businessinsider.com') >= 0) {
	document.getElementsByClassName('tp-modal')[0].parentNode
			.removeChild(document.getElementsByClassName('tp-modal')[0]);
	document.getElementsByClassName('tp-backdrop tp-active')[0].parentNode.removeChild(document
			.getElementsByClassName('tp-backdrop tp-active')[0]);
	document.getElementsByTagName('body')[0].classList.remove('tp-modal-open');
} else if (window.location.hostname.indexOf("journalstar.com") >= 0) {
	document.getElementsByClassName('fc-dialog-overlay')[0].parentNode.removeChild(document
			.getElementsByClassName('fc-dialog-overlay')[0]);
	document.getElementsByTagName('body')[0].style["overflow-y"] = "auto";
} else if (window.location.hostname.indexOf("technologyreview.com") >= 0){
	var wall = document.getElementsByClassName('incognito-wall')[0];
	wall.parentNode.removeChild(wall);
	document.getElementsByTagName('html')[0].style["overflow"] = "auto";
} else if (window.location.hostname.indexOf("telegraph.co.uk") >= 0) {
	document.getElementsByClassName('adblocker-message')[0].parentNode.removeChild(document.getElementsByClassName('adblocker-message')[0]);
} else if (window.location.hostname.indexOf("menshealth.com") >= 0) {
	document.getElementById('block-zeus-newsletter-ad-block-signup').parentNode.removeChild(document.getElementById('block-zeus-newsletter-ad-block-signup'));
} else {
	console.log('not effective here');
}

removeBlur();

function removeBlur() {
	/* Find every unique class */
	var classSet = {};
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		var curElement = all[i];
		if (curElement && curElement.classList && curElement.classList.length) {
			for (var j = 0; j < curElement.classList.length; j++) {
				var curClass = curElement.classList[j];
				classSet[curClass] = 1;
			}
		}
		curElement.style["filter"] ="";
		curElement.style["-webkit-filter"] ="";
	}

	/* Test presence of blur on each class */
	var testDiv = document.createElement('div');
	for (var className in classSet) {
		if (!classSet.hasOwnProperty(className)) {
			continue;
		}
		testDiv.setAttribute('class', className); 
		
		/* check blur presence */
		var computedStyle = window.getComputedStyle(testDiv, null);
		var filterVal = computedStyle.getPropertyValue('filter') + "";
		var webkitFilterVal = computedStyle.getPropertyValue('-webkit-filter') + "";
		if (filterVal.indexOf('blur') >= 0 || webkitFilterVal.indexOf('blur') >= 0) {
			classSet[className] = 2;
		}
	}
	
	/* Remove offending class from all objects. */
	for (var className in classSet) {
		if (!classSet.hasOwnProperty(className)) {
			continue;
		}
		if (classSet[className] == 2) {
			for (var i = 0; i < all.length; i++) {
				var curElement = all[i];
				curElement.classList.remove(className);
			}
		}
	}
}

})();