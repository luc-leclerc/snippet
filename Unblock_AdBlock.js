javascript:(()=>{
	/*
	 * Ex. of site to test on: 
	 * 
	 * https://www.washingtonpost.com/
	 * 
	 * businessinsider.com
	 * 
	 * journalstar.com
	 * 
	 * technologyreview.com
	 * 
	 * menshealth.com
	 * 
	 * telegraph.co.uk
	 */
	
/* Amp project is web framework to manage ads and improve latency, first used by washingtonpost.com */	
removeAmpAccess();
	
removeNonOpaqueEmptyElements();

allowOverflowOnBodyAndHeader();

removeBlur();

/*removeTopFixedModal();*/

removeImmovableDivAndIFrame();

function removeImmovableDivAndIFrame() {
	var divs = Array.prototype.slice.call(document.getElementsByTagName("div"), 0);
	var iframes = Array.prototype.slice.call(document.getElementsByTagName("iframe"), 0);
	
	var elems = divs.concat(iframes);
	
	var elemsPositions = [];
	for (var i = 0; i < elems.length; i++) {
		var curElem = elems[i];
		
		var obj = {};
		obj.elem = curElem;
		var rec = curElem.getBoundingClientRect();
		obj.rec = rec;
		obj.air = rec.width * rec.height;
		
		if (rec.width > rec.height) {
			obj.ratio = rec.width / rec.height;
		} else {
			obj.ratio = rec.height / rec.width;
		}
		
		elemsPositions[i] = obj;
	}
	
	elemsPositions = elemsPositions.filter(function (e, i, r) {
		return e.air > 100 && e.ratio < 20;
	});
	
	window.scrollTo(0,document.body.scrollHeight);
	
	var after_divs = Array.prototype.slice.call(document.getElementsByTagName("div"), 0);
	var after_iframes = Array.prototype.slice.call(document.getElementsByTagName("iframe"), 0);
	
	var after_elems = after_divs.concat(after_iframes);
	
	var after_elemsPositions = [];
	for (var i = 0; i < after_elems.length; i++) {
		var curElem = after_elems[i];
		
		var obj = {};
		obj.elem = curElem;
		var rec = curElem.getBoundingClientRect();
		obj.rec = rec;
		obj.air = rec.width * rec.height;
		
		if (rec.width > rec.height) {
			obj.ratio = rec.width / rec.height;
		} else {
			obj.ratio = rec.height / rec.width;
		}
		
		after_elemsPositions[i] = obj;
	}
	
	after_elemsPositions = after_elemsPositions.filter(function (e, i, r) {
		return e.air > 10000 && e.ratio < 20;
	});
	
	var toDel = [];
	var count = 0;
	for (var i = 0; i < elemsPositions.length; i++) {
		var bef = elemsPositions[i];
		for (var j = 0; j < after_elemsPositions.length; j++) {
			var aft = after_elemsPositions[j];
			
			if (bef.elem == aft.elem) {
				if (bef.rec.top != aft.rec.top) {
					console.log(count++);
					console.log(bef);
				} else {
					toDel.push(bef);
				}
			}
		}
	}
	
	for (var k = 0; k < toDel.length; k++) {
		toDel[k].elem.parentNode.removeChild(toDel[k].elem);
	}
	
	window.scrollTo(0,0);
}

function removeAmpAccess() {
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		var curElement = all[i];
		curElement.removeAttribute('amp-access');
	}
}


function removeNonOpaqueEmptyElements() {
	window.opa = [];
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		var curElement = all[i];
		var computedStyle = window.getComputedStyle(curElement, null);
		var opacity = computedStyle.getPropertyValue('opacity') - 0;
		
		if (opacity != 1 && !curElement.innerHTML) {
			window.opa.push(curElement);
			curElement.parentNode.removeChild(curElement);
		}
	}
}

function allowOverflowOnBodyAndHeader() {
	var bodyElem = Array.prototype.slice.call(document.getElementsByTagName('body'));
	var htmlElem = Array.prototype.slice.call(document.getElementsByTagName('html'));
	var elemArr = bodyElem.concat(htmlElem);
	var classSet = getClassSetFromElementArray(elemArr);
	
	/* Test presence of overflow on each class for multiple elem type */
	detectOffendingClasses(["div", "body", "html"], classSet, "overflow", function(computedStyle) {
		var overVal = computedStyle.getPropertyValue('overflow') + "";
		var overYVal = computedStyle.getPropertyValue('overflow-y') + "";
		if (overVal.indexOf('hidden') >= 0 || overYVal.indexOf('hidden') >= 0) {
			return true;
		}
		return false;
	});
	
	/* For each element. */
	for (var i = 0; i < elemArr.length; i++) {
		var curElement = elemArr[i];
		
		/* Remove offending class */
		for (var className in classSet) {
			if (!classSet.hasOwnProperty(className)) {
				continue;
			}
			if (classSet[className].overflow) {
				curElement.classList.remove(className);
			}
		}
		
		/* Overwrite direct style */
		if (curElement.style["overflow"].indexOf('hidden') >= 0) {
			curElement.style["overflow"] = "auto";
		}
		if (curElement.style["overflow-y"].indexOf('hidden') >= 0) {
			curElement.style["overflow-y"] = "auto";
		}
	}
}

function removeTopFixedModal() {
	window.mod = [];
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		var curElement = all[i];
		var computedStyle = window.getComputedStyle(curElement, null);
		var currentZ = computedStyle.getPropertyValue('z-index') - 0;
		var isVisible = computedStyle.getPropertyValue('visibility') != 'hidden';
		var elemFrames = curElement.getElementsByTagName('iframe');
		var containsAdBlock = curElement.innerHTML.toLowerCase().indexOf('ad-block') >= 0;
		var containsAllowAds = curElement.innerHTML.toLowerCase().indexOf('allow ads') >= 0;
		var isMainTag = curElement.tagName.toLowerCase() == "main";
		/* Some times we get some iframes, for now assume an internal iframe means legit content */
		var hasIFrames = elemFrames.length > 0;
		var containsInternalIFrame = false;
		var host = window.location.hostname.toLowerCase();
		if (host.indexOf('www.') == 0) {
			host = host.substring(4) + "/";
		}
		for (var j = 0; j < elemFrames.length; j++) {
			if (elemFrames[j].src.toLowerCase().indexOf(host) >= 0) {
				containsInternalIFrame = true;
			}
		}
		if (!isNaN(currentZ) && isVisible && !isMainTag && (containsAdBlock || containsAllowAds || (hasIFrames && !containsInternalIFrame))) {
			console.log(curElement);
			window.mod.push(curElement);
			curElement.parentNode.removeChild(curElement);
		}
	}
}

function removeBlur() {
	/* Find every unique class */
	var all = document.getElementsByTagName("*");
	var classSet = getClassSetFromElementArray(all);

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
			classSet[className].blur = true;
		}
	}
	
	/* Remove offending class from all objects. */
	for (var className in classSet) {
		if (!classSet.hasOwnProperty(className)) {
			continue;
		}
		if (classSet[className].blur) {
			for (var i = 0; i < all.length; i++) {
				var curElement = all[i];
				curElement.classList.remove(className);
			}
		}
	}
}

function findElem(elem) {
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		if (all[i] == elem) {
			console.log(i);
		}
	}
}

function removeArray(elemArr){
	for (var i = 0; i < elemArr.length; i++) {
		elemArr[i].parentNode.removeChild(elemArr[i]);
	}
}

function getClassSetFromElementArray(elemArr) {
	var classSet = {};
	for (var i = 0; i < elemArr.length; i++) {
		var curElement = elemArr[i];
		if (curElement && curElement.classList && curElement.classList.length) {
			for (var j = 0; j < curElement.classList.length; j++) {
				var curClass = curElement.classList[j];
				classSet[curClass] = {};
			}
		}
	}
	return classSet;
}

function detectOffendingClasses(elemTypeArr, classSet, resultName, testFunction) {
	/* For each tested elem type */
	for (var i = 0; i < elemTypeArr.length; i++) {
		var testElem = document.createElement(elemTypeArr[i]);
		
		/* For each class */
		for (var className in classSet) {
			if (!classSet.hasOwnProperty(className)) {
				continue;
			}
			testElem.setAttribute('class', className); 
			var computedStyle = window.getComputedStyle(testElem, null);
			
			classSet[className][resultName] = testFunction(computedStyle);
		}
	}
}

})();