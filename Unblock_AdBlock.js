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
} else {
	console.log('not effective here');
}
})();