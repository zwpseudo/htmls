/*----Data log----*/
function basePageClickTracker(value){
	var params = new FormData();
	params.append('post_type', 'log_click');
	$.each(value, function(i,v){
		params.append(i,v);
	});
	var successFunc = function(data){};
	var errorFunc = function(data){
		console.log(data.err_msg);
	};
	var errorServerFunc = function(jqXHR, textStatus, errorThrown){
		console.log(textStatus);
	};
	baseFuncsContentUpdate('base-click-tracker-2021-03-25.php', params, successFunc, errorFunc, errorServerFunc, false, 0);
}

/**
 * Console logs parameter values for debugging purposes
 * @param formData
 */
function printParams(formData){
	for (var pair of formData.entries()) {
		console.log(pair[0]+ ', ' + pair[1]);
	}
}


/*---- Library ----*/
function librarySquircle() {
	if("paintWorklet" in CSS) CSS.paintWorklet.addModule("https://www.unpkg.com/css-houdini-squircle@0.1.3/squircle.min.js");
}

function isMobileDevice() {
	return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) // For mobile device
		|| window.innerWidth <= 430; // For devTool mobile
}


/*----Tooltip----*/
function uiTooltipAddition(ele, content){
	$(ele).tooltip({
		content: content, 
		position: {
			my: 'center bottom-20', 
			at: 'center top', 
			collision: 'flipfit', 
			using: function(position, feedback){
				$(this).css(position);
				$('<div>').addClass('ui-tooltip-arrow').addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
			}
		}
	});
}




/*----Inblock loader----*/
function inBlockLoader(bgColor, color, width, height){
    var html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:' + bgColor + ';display:block;" width="' + width + 'px" height="' + height + 'px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">' + 
                    '<circle cx="50" cy="50" fill="none" stroke="' + color + '" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(137.903 50 50)">' + 
                        '<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>' + 
                    '</circle>' + 
                '</svg>';
    return html;
}




/*----Button loader----*/
function domDisableLoader(dom, html, disabled, showLoader, bgColor, color, width, height){
    dom.prop('disabled', disabled);
    if(disabled == true){
        if(showLoader == true) dom.html(inBlockLoader(bgColor, color, width, height));
    }else dom.html(html);
}

//More text button
$(document).ready(function(){
	$('.text-more-link').on('click', function(e){
		e.preventDefault();
		var tP = $(this).parent();
		tP.html(tP.data('description'));
	});
});

//Expand text
//This is an old way of handling expandable text, might be deprecated
function baseExpandableTextReset() {
	$('[data-type="text"][data-text="expandable"]').each(function(i,v) {

		if($(this).parent().siblings('[data-type="text"][data-text="expandable"]').length > 0){
			$(this).parent().siblings('[data-type="text"][data-text="expandable"]').css({
				'display': 'block',
				'height': 'auto',
			});
		}
        
		var h = $(this).height(), 
			l = parseInt($(this).css('line-height')),
			lineAmt = parseInt($(this).data('line'));

		if(isNaN(h) || isNaN(l) || isNaN(lineAmt)){
			return true; // continue
		}

		$(this).siblings().children('[data-type="button"][data-button="expand-text"]').removeClass('hide');
		if(h/l <= lineAmt) {
            $(this).siblings().children('[data-type="button"][data-button="expand-text"]').addClass('hide');
        } else {
            $(this).css({
                'display': '-webkit-box',
                'height': '8.5rem',
            });
        }
	});
}
baseExpandableTextReset();
//This is an old way of handling expandable text, might be deprecated
$('[data-type="button"][data-button="expand-text"]').on('click', function(e) {
	if($(this).parent().siblings('[data-type="text"][data-text="expandable"]').length == 0){
		return;
	}
	e.preventDefault();
	$(this).addClass('hide');
	$(this).parent().siblings('[data-type="text"][data-text="expandable"]').css({
		'display': 'block',
		'height': 'auto',
	});
});

//Copy text to clipboard
function copyTextToClipboard(text, offset){
    navigator.clipboard.writeText(text);

    // Remove any existing tooltips
    $('.copy-notification').remove();

    let notification = `
		<div class="tooltip-24 top copy-notification" style="
			position: fixed;
			top: ${offset.top + 20}px;
			left: ${offset.left}px;
			z-index: 9999;
			transform: translateX(-40%);
		">
		<div class="tooltip-arrow"></div>
		<div class="tooltip-content">Copied!</div>
		</div>
    `; //tooltip html

    $('body').append(notification);

    $('.copy-notification').fadeOut(2000); //set fade out animation for 2 seconds
    
    setTimeout(function(){ //remove notification after 2 seconds
      $('.copy-notification').remove();
    }, 2000);
}

//Check if the text is not undefined, null, or blank
function baseLegitimateTextData(text){
	return (text != undefined && text != null && text.length > 0);
}

//HTML entities
function html_entities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

//HTML entities decode
function html_entities_decode(str) {
	let tmpTextArea = $('<textarea></textarea>');
	tmpTextArea.html(str);
	return tmpTextArea.text();
}

//Extract numbers only
function baseExtractNumbersOnly(str){
	return str.replace(/\D+/g, '');
}

//Strip tags
function strip_tags(str) {
	if (!baseValidateString(str, 'length')) {
		return '';
	} else {
		str = str.toString();
		return str.replace(/(<([^>]+)>)/ig, '');
	}
}

//Get key by value
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function capitalizeFirstLetter(str) {
	if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/*----Number manipulation----*/
//Format float numbers
function baseFormatFloatNumbers(number, round){
	return Math.round(number) !== number ? number.toFixed(round): number.toFixed(0);
}

//Number format
function number_format(number, decimals, dec_point, thousand_sep){
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number, 
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), 
		sep = (typeof thousand_sep === 'undefined') ? ',' : thousand_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point, 
		s = '';
	var toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if(s[0].length > 3) s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
	return s.join(dec);
}

/**
 * Calculates the distance between two points with the Pythagorean theorem
 * 
 * @param {array} start Starting coordinates
 * @param {array} end Ending coordinates
 * @returns {number} Distance between two points via Pythagorean theorem
 */
function distanceBetweenTwoPoints(start, end) {
	var a = start[0] - end[0], 
		b = start[1] - end[1];
	return Math.sqrt((a * a) + (b * b));
}

/**
 * Format large numbers into 1k, 100k, 1M, 100M, ...
 * @reference https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
 * 
 * @param {int} num 	Number of interest
 * @param {int} digits	Digits to show after decimal
 * @returns {string}
 */
function nFormatter(num, digits) {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
	];
	const regexp = /(\.[0-9]*[1-9])0+$|\.0+$/;
	const item = lookup.findLast(item => num >= item.value);
	return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

/*----Randomizer----*/
function randomVarLength(length) {
	var result = '';
	var characters = 'BCDFGHJKLMNPQRSTVWXYZ0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++){
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}




/*----Data validation----*/
function validateEmailAddress(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function baseValidateBoolean(bool, type){
	if(type == 'value' && bool != undefined && bool != null && bool == true) return true;
	return false;
}
function baseValidateNumber(num, type){
	num = parseFloat(num);
	if(type == 'is' && num != undefined && num != null && Number.isFinite(num)) return true;
	else if(type == 'positive' && num != undefined && num != null && Number.isFinite(num) && num > 0) return true;
	return false;
}
function baseValidateString(str, type){
	if(type == 'length' && str != undefined && str != null && str.length > 0) return true;
	return false;
}
function baseValidateArray(arr, type){
	if(type == 'is' && arr != undefined && arr != null && ($.isArray(arr) || typeof arr === 'object')) return true;
	else if(type == 'length' && arr != undefined && arr != null && (($.isArray(arr) && arr.length > 0) || (typeof arr === 'object' && Object.keys(arr).length > 0))) return true;
	return false;
}
function baseValidateZip(zip, country){
	if(country == "US" || country == "United States"){
		return /^\d{5}(?:[-\s]\d{4})?$/.test(zip);
	}
	if(country == "CA" || country == "Canada"){
		return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(zip);
	}
	else return true;
}




/*----Format date----*/
//Format date from timestamp
function formatDateFromTimestamp(date){
	var dObj = new Date(date), 
		month = '' + (dObj.getMonth() + 1), 
		day = '' + dObj.getDate(), 
		year = dObj.getFullYear();
	var Y = year, 
		m = month, 
		d = day;
	if(m.length < 2) m = '0' + m;
	if(d.length < 2) d = '0' + d;
	return {
		d: d, 
		m: m, 
		Y: Y
	};
}

/**
 * Formats a date from a timestamp to a string in the format of
 *  "Month Day, Year"
 *  ex: "Feb 01, 2025"
 * @param {Number} time Epoch time from DB
 * @returns A formatted string
 */
function formatDateFromTimestampMDY(time) {
	const date = new Date(time * 1000);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

/**
 * Formats a date from a timestamp to a string in the format of
 *  "Month Day, Year, Hour:Minute am/pm"
 *  ex: "Feb 01, 2025, 12:00 pm"
 * @param {Number} time Epoch time from DB
 * @returns A formatted string
 */
function formatDateFromTimestampMDYT(time) {
	const date = new Date(time * 1000);
	return date.toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

/**
 * Converts an epoch timestamp into a structured date object.
 *
 * @param {number} epochTime - The epoch timestamp in seconds.
 * @returns {Object} An object containing various date components.
 * @property {number} year - The full year (e.g., 2025).
 * @property {number} monthNumber - The month number (1-12).
 * @property {string} monthLong - The full name of the month (e.g., "February").
 * @property {string} monthShort - The abbreviated name of the month (e.g., "Feb").
 * @property {number} dayOfMonth - The day of the month (1-31).
 * @property {string} dayLong - The full name of the day (e.g., "Friday").
 * @property {string} dayShort - The abbreviated name of the day (e.g., "Fri").
 * @property {number} hour - The hour in 12-hour format (1-12).
 * @property {string} minute - The minute (00-59), formatted as a two-digit string.
 * @property {number} second - The second (0-59).
 * @property {string} period - Either "am" or "pm" depending on the time.
 */
function convertEpochToDate(epochTime) {
    const date = new Date(epochTime * 1000); // Convert to milliseconds
    
    const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const year = date.getFullYear();
    const monthNumber = date.getMonth() + 1;
    const monthLong = monthsLong[date.getMonth()];
    const monthShort = monthsShort[date.getMonth()];
    const dayOfMonth = date.getDate();
    const dayLong = daysLong[date.getDay()];
    const dayShort = daysShort[date.getDay()];
    
    let hour = date.getHours();
    let minute = date.getMinutes();
    const second = date.getSeconds();
    const period = hour >= 12 ? "pm" : "am";

	// Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12;
    
    // Ensure minute is always two digits
    minute = minute === 0 ? "00" : minute;
    
    return {
        year,
        monthNumber,
        monthLong,
        monthShort,
        dayOfMonth,
        dayLong,
        dayShort,
        hour,
        minute,
        second,
        period
    };
}

/**
 * Formats a date from a timestamp to a string in the format of
 *  "YYYY-MM-DDTHH:MM:SS" with the time being optional
 *  ex:
 * 	console.log(formatEpoch(1645615800));                // "2022-02-23" (Local Date)
 * 	console.log(formatEpoch(1645615800, true));          // "2022-02-23T12:30:00" (Local Date & Time)
 * 	console.log(formatEpoch(1645615800, true, false));   // "2022-02-23T12:30:00" (ISO/UTC Date & Time)
 * 	console.log(formatEpoch(1645615800, false, false));  // "2022-02-23" (ISO/UTC Date)
 * @param {Number} time Epoch time from DB
 * @param {Boolean} includeTime Whether to include the time in the formatted string
 * @param {Boolean} isLocal Show as local or UTC time
 * @returns A formatted string
 */
function formatEpochToISO(epoch, includeTime = false, isLocal = true) {
    const date = new Date(epoch * 1000); // Convert epoch to milliseconds

    const year = isLocal ? date.getFullYear() : date.getUTCFullYear();
    const month = String((isLocal ? date.getMonth() : date.getUTCMonth()) + 1).padStart(2, '0');
    const day = String(isLocal ? date.getDate() : date.getUTCDate()).padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;

    if (includeTime) {
        const hours = String(isLocal ? date.getHours() : date.getUTCHours()).padStart(2, '0');
        const minutes = String(isLocal ? date.getMinutes() : date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(isLocal ? date.getSeconds() : date.getUTCSeconds()).padStart(2, '0');
        formattedDate += `T${hours}:${minutes}:${seconds}`;
    }

    return formattedDate;
}

function getHoursandMinutesFromEpoch(time) {
	const date = new Date(time * 1000); // Convert to milliseconds

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
}

function getQuarterlyTime() {
	const quarterlyTimes = [];
	
	for (let hour = 12; hour <= 23; hour++) {
		// Loop through 15-minute intervals
		for (let minute = 0; minute < 60; minute += 15) {
			const displayHour = hour > 12 ? hour - 12 : hour; // Convert 24-hour format to 12-hour format
			const displayMinute = minute === 0 ? '00' : minute; // Add leading zeros for minutes
			const time = `${displayHour}:${displayMinute}`;
			
			quarterlyTimes.push(time);
		}
	}

	return quarterlyTimes;
}

//Time in seconds conversion
function formatTimeSecondsNormalization(seconds){
	//Variables
	var sec = parseInt(Math.max(seconds, 1), 10), 
		text = '', 
		output = {
			'text': '',
		};
	
	//Calculate
	var hours = Math.floor(sec / 3600);
	var minutes = Math.floor((sec - (hours * 3600)) / 60);
	seconds = sec - (hours * 3600) - (minutes * 60);
	
	//Text
	if(hours > 0) text += hours + ' hour' + (hours > 1 ? 's' : '');
	if(minutes > 0) text += ' ' + minutes + ' minute' + (minutes > 1 ? 's' : '');
	if(seconds > 0) text += ' ' + seconds + ' second' + (seconds > 1 ? 's' : '');
	output.text = text;
	
	//Output
	return output;
}

//JS function for date_format
(function () {
  // Defining locale
  Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Date.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  Date.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // Defining patterns
  var replaceChars = {
    // Day
    d: function () { var d = this.getDate(); return (d < 10 ? '0' : '') + d },
    D: function () { return Date.shortDays[this.getDay()] },
    j: function () { return this.getDate() },
    l: function () { return Date.longDays[this.getDay()] },
    N: function () { var N = this.getDay(); return (N === 0 ? 7 : N) },
    S: function () { var S = this.getDate(); return (S % 10 === 1 && S !== 11 ? 'st' : (S % 10 === 2 && S !== 12 ? 'nd' : (S % 10 === 3 && S !== 13 ? 'rd' : 'th'))) },
    w: function () { return this.getDay() },
    z: function () { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((this - d) / 86400000) },
    // Week
    W: function () {
      var target = new Date(this.valueOf())
      var dayNr = (this.getDay() + 6) % 7
      target.setDate(target.getDate() - dayNr + 3)
      var firstThursday = target.valueOf()
      target.setMonth(0, 1)
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7)
      }
      var retVal = 1 + Math.ceil((firstThursday - target) / 604800000)

      return (retVal < 10 ? '0' + retVal : retVal)
    },
    // Month
    F: function () { return Date.longMonths[this.getMonth()] },
    m: function () { var m = this.getMonth(); return (m < 9 ? '0' : '') + (m + 1) },
    M: function () { return Date.shortMonths[this.getMonth()] },
    n: function () { return this.getMonth() + 1 },
    t: function () {
      var year = this.getFullYear()
      var nextMonth = this.getMonth() + 1
      if (nextMonth === 12) {
        year = year++
        nextMonth = 0
      }
      return new Date(year, nextMonth, 0).getDate()
    },
    // Year
    L: function () { var L = this.getFullYear(); return (L % 400 === 0 || (L % 100 !== 0 && L % 4 === 0)) },
    o: function () { var d = new Date(this.valueOf()); d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear() },
    Y: function () { return this.getFullYear() },
    y: function () { return ('' + this.getFullYear()).substr(2) },
    // Time
    a: function () { return this.getHours() < 12 ? 'am' : 'pm' },
    A: function () { return this.getHours() < 12 ? 'AM' : 'PM' },
    B: function () { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24) },
    g: function () { return this.getHours() % 12 || 12 },
    G: function () { return this.getHours() },
    h: function () { var h = this.getHours(); return ((h % 12 || 12) < 10 ? '0' : '') + (h % 12 || 12) },
    H: function () { var H = this.getHours(); return (H < 10 ? '0' : '') + H },
    i: function () { var i = this.getMinutes(); return (i < 10 ? '0' : '') + i },
    s: function () { var s = this.getSeconds(); return (s < 10 ? '0' : '') + s },
    v: function () { var v = this.getMilliseconds(); return (v < 10 ? '00' : (v < 100 ? '0' : '')) + v },
    // Timezone
    e: function () { return Intl.DateTimeFormat().resolvedOptions().timeZone },
    I: function () {
      var DST = null
      for (var i = 0; i < 12; ++i) {
        var d = new Date(this.getFullYear(), i, 1)
        var offset = d.getTimezoneOffset()

        if (DST === null) DST = offset
        else if (offset < DST) { DST = offset; break } else if (offset > DST) break
      }
      return (this.getTimezoneOffset() === DST) | 0
    },
    O: function () { var O = this.getTimezoneOffset(); return (-O < 0 ? '-' : '+') + (Math.abs(O / 60) < 10 ? '0' : '') + Math.floor(Math.abs(O / 60)) + (Math.abs(O % 60) === 0 ? '00' : ((Math.abs(O % 60) < 10 ? '0' : '')) + (Math.abs(O % 60))) },
    P: function () { var P = this.getTimezoneOffset(); return (-P < 0 ? '-' : '+') + (Math.abs(P / 60) < 10 ? '0' : '') + Math.floor(Math.abs(P / 60)) + ':' + (Math.abs(P % 60) === 0 ? '00' : ((Math.abs(P % 60) < 10 ? '0' : '')) + (Math.abs(P % 60))) },
    T: function () { var tz = this.toLocaleTimeString(navigator.language, {timeZoneName: 'short'}).split(' '); return tz[tz.length - 1] },
    Z: function () { return -this.getTimezoneOffset() * 60 },
    // Full Date/Time
    c: function () { return this.format('Y-m-d\\TH:i:sP') },
    r: function () { return this.toString() },
    U: function () { return Math.floor(this.getTime() / 1000) }
  }

  // Simulates PHP's date function
  Date.prototype.format = function (format) {
    var date = this;
    return format.replace(/(\\?)(.)/g, function (_, esc, chr) {
      return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
    });
  }
}).call(this);
function date_format(dateVal, formatVal){
    return dateVal.format(formatVal);
}




/*---- Modal manager ----*/
function baseRightModalManager(modal, time, action){
	if(baseValidateNumber(time, 'positive')) time = 250;
	switch(action) {
		//Open
		case 'open':
			$('body').addClass('noscroll');
			$(modal).removeClass('hide');
			var m = $(modal + ' .modal-right-box');
			m.css('right', '-' + m.width() + 'px');
			m.animate({
				right: '0px'
			}, time);
			break;
		
		//Default
		default:
			var m = $(modal + ' .modal-right-box');
			m.animate({
				right: '-' + m.width() + 'px'
			}, time);
			setTimeout(function(){
				$(modal).addClass('hide');
			}, time);
			$('body').removeClass('noscroll');
			break;
	}
}
function baseCenterModalManager(modal, time, action, direction){
	if(!baseValidateNumber(time, 'positive')) time = 250;
	if(baseValidateString(direction, 'length') && $.inArray(direction, ['top', 'bottom', 'left', 'right']) < 0) direction = 'bottom';
	var m = $(modal + ' .modal-center-box'), 
		run = 0;
	switch(action) {
		//Open
		case 'open':
			$('body').addClass('noscroll');
			$(modal).removeClass('hide').addClass('noscroll');
			if($.inArray(direction, ['top', 'bottom']) > -1) run = $(modal).height();
			else if($.inArray(direction, ['left', 'right']) > -1) run = $(modal).width();
			switch(direction) {
				case 'top':
					m.css('top', '-' + run + 'px');
					m.animate({
						top: '0px'
					}, time);
					break;
				case 'bottom':
					m.css('bottom', '-' + run + 'px');
					m.animate({
						bottom: '0px'
					}, time);
					break;
				case 'left':
					m.css('left', '-' + run + 'px');
					m.animate({
						left: '0px'
					}, time);
					break;
				case 'right':
					m.css('right', '-' + run + 'px');
					m.animate({
						right: '0px'
					}, time);
					break;
			}
			setTimeout(function() {
				$(modal).removeClass('noscroll');
			}, time)
			break;
		
		//Default
		default:
			$(modal).addClass('noscroll');
			if($.inArray(direction, ['top', 'bottom']) > -1) run = $(modal).height();
			else if($.inArray(direction, ['left', 'right']) > -1) run = $(modal).width();
			switch(direction) {
				case 'top':
					m.animate({
						top: '-' + run + 'px'
					}, time);
					break;
				case 'bottom':
					m.animate({
						bottom: '-' + run + 'px'
					}, time);
					break;
				case 'left':
					m.animate({
						left: '-' + run + 'px'
					}, time);
					break;
				case 'right':
					m.animate({
						right: '-' + run + 'px'
					}, time);
					break;
			}
			setTimeout(function() {
				$(modal).addClass('hide').removeClass('noscroll');
				$('body').removeClass('noscroll');
			}, time)
			break;
	}
}




/*----Form submission----*/
//Form with images
var getFormData = function(form) {
	var $inputs = $('input[type="file"]:not([disabled])', form);
	$inputs.each(function(_, input){
		if(input.files.length > 0) return;
    	$(input).prop('disabled', true);
  	});
  	var formData = new FormData(form);
  	$inputs.prop('disabled', false);
  	return formData;
};

//Update content
function baseFuncsContentUpdate(location, params, successFunc, errorFunc, errorServerFunc, loaderShow, timeout){
	if(timeout == undefined) timeout = 0;
	if(loaderShow) showLoader();
	$('.modal-error').html('');
	$.ajax({
		url:'/funcs/' + location,
		type:'POST',
		data:params,
		contentType:false,
		cache:false,
		processData:false,
		timeout:timeout,
		error: function(jqXHR, textStatus, errorThrown){
			hideLoader();
			errorServerFunc(jqXHR, textStatus, errorThrown);
		},
		success: function(data){
			data = $.parseJSON(data);
			if(data.success == false){
				hideLoader();
				errorFunc(data);
			}else{
				successFunc(data);
			}
		}
	});
}



//Upload file asynchronously
function baseFuncsFileAsyncUploader(location, params, successFunc, errorFunc, errorServerFunc, progressElement, loaderShow, timeout){
	if(timeout == undefined) timeout = 0;
	if(loaderShow) showLoader();
	$.ajax({
		url: '/funcs/' + location, 
		type: 'POST', 
		data: params, 
		contentType: false, 
		processData: false, 
		timeout: timeout, 
		xhr: function(){
			var myXhr = $.ajaxSettings.xhr();
			if(myXhr.upload){
				myXhr.upload.addEventListener('progress', function(e){
					console.log((e.loaded / e.total) * 100);
					if(e.lengthComputable) progressElement.progressbar('value', (e.loaded / e.total) * 100);
				}, false);
			}
			return myXhr;
		},
		error: function(jqXHR, textStatus, errorThrown){
			hideLoader();
			errorServerFunc(jqXHR, textStatus, errorThrown);
		}, 
		success: function(data){
			data = $.parseJSON(data);
			if(data.success == false){
				hideLoader();
				errorFunc(data);
			}else{
				successFunc(data);
			}
		}
	});
}




/*----Visible Social sharing----*/
function baseVisibleSocialSharing(){
	$('body').append('<div id="fb-root"></div>');
	
	//Facebook setup
	window.fbAsyncInit = function() {
		FB.init({
		  appId      : '1855183678057183',
		  status	 :	true,
		  xfbml      : true,
		  version    : 'v2.12'
		});
	};
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	//Button action
	$('[data-action-group="visible-share-btn"]').on('click', function(e){
		e.preventDefault();
		if($(this).data('version') == '201907'){
			var visibleShareLink = $(this).data('href');
			var visibleShareText = $(this).data('text');
			
			//Copy
			if($(this).data('action') == 'copy'){
				var $temp = $('<input>');
				$('body').append($temp);
				$temp.val(visibleShareLink).select();
				document.execCommand('copy');
				$temp.remove();
			}
			
			//Facebook
			else if($(this).data('action') == 'facebook'){
				FB.ui({
                    method: 'share',
                    mobile_iframe: true,
                    href: visibleShareLink,
                    quote: (visibleShareText.length ? visibleShareText : ''),
				}, function(response){});
			}
			
			//Twitter
			else if($(this).data('action') == 'twitter') window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(visibleShareLink) + '&text=' + encodeURIComponent(visibleShareText));
			
			//Linked In
			else if($(this).data('action') == 'linkedin') window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(visibleShareLink) + '&summary=' + encodeURIComponent(visibleShareText));
			
			//Whatsapp
			else if($(this).data('action') == 'whatsapp') window.open('https://web.whatsapp.com/send?text=' + encodeURIComponent(visibleShareText + ' ' + visibleShareLink));
		}
	});
}




/*----Geometry----*/
//Radians to degrees
function baseRadiansToDegrees(radians){
	var degrees = radians * (180 / Math.PI);
	degrees = degrees % 360;
	return degrees < 0 ? degrees + 360 : degrees;
}

//Degrees to radian
function baseDegreesToRadians(degrees){
	degrees = degrees % 360;
	return degrees * (Math.PI / 180);
}




/*----Mail----*/
function baseMailValues(){
	//Variables
	var output = {
		'bulk_email_limit': 50, 
	};
	
	return output;
}




/*---- Cookie Manager ----*/
function baseCookieManager(method, name) {
	var c = document.cookie.split(';');
	for(var i = 0; i < c.length; i++) {
		var p = c[i].split('=');
		if(name == p[0].trim()) return decodeURIComponent(p[1]);
	}
	return null;
}




/*---- Preset-values ----*/
//Countries
function baseGetCountriesArray() {
	return {
		US	: 'United States', 
		AF	: 'Afghanistan', 
		AL	: 'Albania', 
		AX	: 'Åland Islands', 
		DZ	: 'Algeria', 
		AS	: 'American Samoa', 
		AD	: 'Andorra', 
		AO	: 'Angola', 
		AI	: 'Anguilla', 
		AQ	: 'Antarctica', 
		AG	: 'Antigua and Barbuda', 
		AR	: 'Argentina', 
		AM	: 'Armenia', 
		AW	: 'Aruba', 
		AU	: 'Australia', 
		AT	: 'Austria', 
		AZ	: 'Azerbaijan', 
		BS	: 'Bahamas', 
		BH	: 'Bahrain', 
		BD	: 'Bangladesh', 
		BB	: 'Barbados', 
		BY	: 'Belarus', 
		BE	: 'Belgium', 
		BZ	: 'Belize', 
		BJ	: 'Benin', 
		BM	: 'Bermuda', 
		BT	: 'Bhutan', 
		BO	: 'Bolivia', 
		BQ	: 'Bonaire, Sint Eustatius and Saba', 
		BA	: 'Bosnia and Herzegovina', 
		BW	: 'Botswana', 
		BV	: 'Bouvet Island', 
		BR	: 'Brazil', 
		IO	: 'British Indian Ocean Territory', 
		BN	: 'Brunei Darussalam', 
		BG	: 'Bulgaria', 
		BF	: 'Burkina Faso', 
		BI	: 'Burundi', 
		CV	: 'Cabo Verde', 
		KH	: 'Cambodia', 
		CM	: 'Cameroon', 
		CA	: 'Canada', 
		KY	: 'Cayman Islands', 
		CF	: 'Central African Republic', 
		TD	: 'Chad', 
		CL	: 'Chile', 
		CN	: 'China', 
		CX	: 'Christmas Island', 
		CC	: 'Cocos Islands', 
		CO	: 'Colombia', 
		KM	: 'Comoros', 
		CD	: 'Democratic Republic of the Congo', 
		CG	: 'Congo', 
		CK	: 'Cook Islands', 
		CR	: 'Costa Rica', 
		HR	: 'Croatia', 
		CU	: 'Cuba', 
		CW	: 'Curaçao', 
		CY	: 'Cyprus', 
		CZ	: 'Czechia', 
		CI	: 'Côte d', 
		DK	: 'Denmark', 
		DJ	: 'Djibouti', 
		DM	: 'Dominica', 
		DO	: 'Dominican Republic', 
		EC	: 'Ecuador', 
		EG	: 'Egypt', 
		SV	: 'El Salvador', 
		GQ	: 'Equatorial Guinea', 
		ER	: 'Eritrea', 
		EE	: 'Estonia', 
		SZ	: 'Eswatini', 
		ET	: 'Ethiopia', 
		FK	: 'Falkland Islands', 
		FO	: 'Faroe Islands', 
		FJ	: 'Fiji', 
		FI	: 'Finland', 
		FR	: 'France', 
		GF	: 'French Guiana', 
		PF	: 'French Polynesia', 
		TF	: 'French Southern Territories', 
		GA	: 'Gabon', 
		GM	: 'Gambia', 
		GE	: 'Georgia', 
		DE	: 'Germany', 
		GH	: 'Ghana', 
		GI	: 'Gibraltar', 
		GR	: 'Greece', 
		GL	: 'Greenland', 
		GD	: 'Grenada', 
		GP	: 'Guadeloupe', 
		GU	: 'Guam', 
		GT	: 'Guatemala', 
		GG	: 'Guernsey', 
		GN	: 'Guinea', 
		GW	: 'Guinea-Bissau', 
		GY	: 'Guyana', 
		HT	: 'Haiti', 
		HM	: 'Heard Island and McDonald Islands', 
		VA	: 'Holy See', 
		HN	: 'Honduras', 
		HK	: 'Hong Kong', 
		HU	: 'Hungary', 
		IS	: 'Iceland', 
		IN	: 'India', 
		ID	: 'Indonesia', 
		IR	: 'Iran', 
		IQ	: 'Iraq', 
		IE	: 'Ireland', 
		IM	: 'Isle of Man', 
		IL	: 'Israel', 
		IT	: 'Italy', 
		JM	: 'Jamaica', 
		JP	: 'Japan', 
		JE	: 'Jersey', 
		JO	: 'Jordan', 
		KZ	: 'Kazakhstan', 
		KE	: 'Kenya', 
		KI	: 'Kiribati', 
		KP	: 'South Korea', 
		KW	: 'Kuwait', 
		KG	: 'Kyrgyzstan', 
		LA	: 'Lao People', 
		LV	: 'Latvia', 
		LB	: 'Lebanon', 
		LS	: 'Lesotho', 
		LR	: 'Liberia', 
		LY	: 'Libya', 
		LI	: 'Liechtenstein', 
		LT	: 'Lithuania', 
		LU	: 'Luxembourg', 
		MO	: 'Macao', 
		MG	: 'Madagascar', 
		MW	: 'Malawi', 
		MY	: 'Malaysia', 
		MV	: 'Maldives', 
		ML	: 'Mali', 
		MT	: 'Malta', 
		MH	: 'Marshall Islands', 
		MQ	: 'Martinique', 
		MR	: 'Mauritania', 
		MU	: 'Mauritius', 
		YT	: 'Mayotte', 
		MX	: 'Mexico', 
		FM	: 'Micronesia', 
		MD	: 'Moldova', 
		MC	: 'Monaco', 
		MN	: 'Mongolia', 
		ME	: 'Montenegro', 
		MS	: 'Montserrat', 
		MA	: 'Morocco', 
		MZ	: 'Mozambique', 
		MM	: 'Myanmar', 
		NA	: 'Namibia', 
		NR	: 'Nauru', 
		NP	: 'Nepal', 
		NL	: 'Netherlands', 
		NC	: 'New Caledonia', 
		NZ	: 'New Zealand', 
		NI	: 'Nicaragua', 
		NE	: 'Niger', 
		NG	: 'Nigeria', 
		NU	: 'Niue', 
		NF	: 'Norfolk Island', 
		MP	: 'Northern Mariana Islands', 
		NO	: 'Norway', 
		OM	: 'Oman', 
		PK	: 'Pakistan', 
		PW	: 'Palau', 
		PS	: 'Palestine, State of', 
		PA	: 'Panama', 
		PG	: 'Papua New Guinea', 
		PY	: 'Paraguay', 
		PE	: 'Peru', 
		PH	: 'Philippines', 
		PN	: 'Pitcairn', 
		PL	: 'Poland', 
		PT	: 'Portugal', 
		PR	: 'Puerto Rico', 
		QA	: 'Qatar', 
		MK	: 'Republic of North Macedonia', 
		RO	: 'Romania', 
		RU	: 'Russian Federation', 
		RW	: 'Rwanda', 
		RE	: 'Réunion', 
		BL	: 'Saint Barthélemy', 
		SH	: 'Saint Helena, Ascension and Tristan da Cunha', 
		KN	: 'Saint Kitts and Nevis', 
		LC	: 'Saint Lucia', 
		MF	: 'Saint Martin', 
		PM	: 'Saint Pierre and Miquelon', 
		VC	: 'Saint Vincent and the Grenadines', 
		WS	: 'Samoa', 
		SM	: 'San Marino', 
		ST	: 'Sao Tome and Principe', 
		SA	: 'Saudi Arabia', 
		SN	: 'Senegal', 
		RS	: 'Serbia', 
		SC	: 'Seychelles', 
		SL	: 'Sierra Leone', 
		SG	: 'Singapore', 
		SX	: 'Sint Maarten', 
		SK	: 'Slovakia', 
		SI	: 'Slovenia', 
		SB	: 'Solomon Islands', 
		SO	: 'Somalia', 
		ZA	: 'South Africa', 
		GS	: 'South Georgia and the South Sandwich Islands', 
		SS	: 'South Sudan', 
		ES	: 'Spain', 
		LK	: 'Sri Lanka', 
		SD	: 'Sudan', 
		SR	: 'Suriname', 
		SJ	: 'Svalbard and Jan Mayen', 
		SE	: 'Sweden', 
		CH	: 'Switzerland', 
		SY	: 'Syrian Arab Republic', 
		TW	: 'Taiwan', 
		TJ	: 'Tajikistan', 
		TZ	: 'Tanzania, United Republic of', 
		TH	: 'Thailand', 
		TL	: 'Timor-Leste', 
		TG	: 'Togo', 
		TK	: 'Tokelau', 
		TO	: 'Tonga', 
		TT	: 'Trinidad and Tobago', 
		TN	: 'Tunisia', 
		TR	: 'Turkey', 
		TM	: 'Turkmenistan', 
		TC	: 'Turks and Caicos Islands', 
		TV	: 'Tuvalu', 
		UG	: 'Uganda', 
		UA	: 'Ukraine', 
		AE	: 'United Arab Emirates', 
		GB	: 'United Kingdom Of Great Britain And Northern Ireland', 
		UM	: 'United States Minor Outlying Islands', 
		UY	: 'Uruguay', 
		UZ	: 'Uzbekistan', 
		VU	: 'Vanuatu', 
		VE	: 'Venezuela', 
		VN	: 'Viet Nam', 
		VI	: 'Virgin Islands', 
		WF	: 'Wallis and Futuna', 
		EH	: 'Western Sahara', 
		YE	: 'Yemen', 
		ZM	: 'Zambia', 
		ZW	: 'Zimbabwe', 		
	};
}

//State
function baseGetStatesArray(country) {
	var s = {};
	switch(country) {
		case 'United States':
			s = {
				AL:	'Alabama',
				AK:	'Alaska',
				AZ:	'Arizona',
				AR:	'Arkansas',
				CA:	'California',
				CO:	'Colorado',
				CT:	'Connecticut',
				DE:	'Delaware',
				DC:	'District of Columbia',
				FL:	'Florida',
				GA:	'Georgia',
				HI:	'Hawaii',
				ID:	'Idaho',
				IL:	'Illinois',
				IN:	'Indiana',
				IA:	'Iowa',
				KS:	'Kansas',
				KY:	'Kentucky',
				LA:	'Louisiana',
				ME:	'Maine',
				MD:	'Maryland',
				MA:	'Massachusetts',
				MI:	'Michigan',
				MN:	'Minnesota',
				MS:	'Mississippi',
				MO:	'Missouri',
				MT:	'Montana',
				NE:	'Nebraska',
				NV:	'Nevada',
				NH:	'New Hampshire',
				NJ:	'New Jersey',
				NM:	'New Mexico',
				NY:	'New York',
				NC:	'North Carolina',
				ND:	'North Dakota',
				OH:	'Ohio',
				OK:	'Oklahoma',
				OR:	'Oregon',
				PA:	'Pennsylvania',
				RI:	'Rhode Island',
				SC:	'South Carolina',
				SD:	'South Dakota',
				TN:	'Tennessee',
				TX:	'Texas',
				UT:	'Utah',
				VT:	'Vermont',
				VA:	'Virginia',
				WA:	'Washington',
				WV:	'West Virginia',
				WI:	'Wisconsin',
				WY:	'Wyoming',
				Other:	'Other',
			};
			break;
		
		case 'Canada':
			s = {
				AB: 'Alberta', 
				BC:	'British Columbia', 
				MB:	'Manitoba', 
				NB:	'New Brunswick', 
				NL:	'Newfoundland and Labrador', 
				NT:	'Northwest Territories', 
				NS:	'Nova Scotia', 
				NU:	'Nunavut', 
				ON:	'Ontario', 
				PE:	'Prince Edward Island', 
				QC: 'Quebec', 
				SK:	'Saskatchewan', 
				YT: 'Yukon Territory', 
				Other: 'Other',
			};
			break;
	}
	return s;
}

/**
 * triggers state dropdown for targeted country-state pair in forms.
 * this function finds the states based on selected country and put them to <option>
 * html should already have state's <select> and necessary name, (data-default-state, id, class).
 * if there's no state data for selected country, show an input.
 */
function baseTriggerStateDropdown(){
	if($('select[name*="[country]"][data-base="country-state-pair"]').length === 0){  //Length is a better way of determining if an element exists 
		return;
	}
	$('body').on('change','select[name*="[country]"][data-base="country-state-pair"]', function(e) {  //Attaching the change event to body for event delegation and event binding problems if function is called before DOM is fully loaded
		const stateSelect = $(this).closest('form').find('[name*="[state]"]');
		
		if(stateSelect.length === 0){  //Length is a better way of determining if an element exists 
			return;
		}
		
		if ($(this).val() === '') {
			stateSelect.prop('disabled', true);
			return;
		}else{
			stateSelect.prop('disabled', false);
		}
		const selectClass = stateSelect.attr('class') ? stateSelect.attr('class').toString() : '';
		const defaultState = stateSelect.data('default-state') ? stateSelect.data('default-state').toString().toLowerCase() : '';
		const states = baseGetStatesArray($(this).val());
		let html = '';
		
		if(baseValidateArray(states, 'length')){ // state dropdown
			html = `<select class="${selectClass}" id="${stateSelect.attr('id')}" name="${stateSelect.attr('name')}" data-default-state="${defaultState}">
						<option value="">- Select state/province -</option>`;
			for(const abbr in states){
				const state = states[abbr];
				html += `<option value="${state}" ${state.toString().toLowerCase() == defaultState ? 'selected' : ''}>${state}</option>`;
			}
			html += '</select>'
		}else{ // input
			html = `<input class="${selectClass}" id="${stateSelect.attr('id')}" name="${stateSelect.attr('name')}" data-default-state="${defaultState}" value="${defaultState}" type="text" maxlength="75"/>`;
		}
		stateSelect.replaceWith(html);
		
	});
	$('select[name*="[country]"][data-base="country-state-pair"]').trigger('change');  //Initialize and trigger state population
}


  
  // 2) Function to normalize & lookup
  function getStateCode(stateName) {
	const STATE_CODES = {
		'alabama':               'AL',
		'alaska':                'AK',
		'arizona':               'AZ',
		'arkansas':              'AR',
		'california':            'CA',
		'colorado':              'CO',
		'connecticut':           'CT',
		'delaware':              'DE',
		'district of columbia':  'DC',
		'florida':               'FL',
		'georgia':               'GA',
		'hawaii':                'HI',
		'idaho':                 'ID',
		'illinois':              'IL',
		'indiana':               'IN',
		'iowa':                  'IA',
		'kansas':                'KS',
		'kentucky':              'KY',
		'louisiana':             'LA',
		'maine':                 'ME',
		'maryland':              'MD',
		'massachusetts':         'MA',
		'michigan':              'MI',
		'minnesota':             'MN',
		'mississippi':           'MS',
		'missouri':              'MO',
		'montana':               'MT',
		'nebraska':              'NE',
		'nevada':                'NV',
		'new hampshire':         'NH',
		'new jersey':            'NJ',
		'new mexico':            'NM',
		'new york':              'NY',
		'north carolina':        'NC',
		'north dakota':          'ND',
		'ohio':                  'OH',
		'oklahoma':              'OK',
		'oregon':                'OR',
		'pennsylvania':          'PA',
		'rhode island':          'RI',
		'south carolina':        'SC',
		'south dakota':          'SD',
		'tennessee':             'TN',
		'texas':                 'TX',
		'utah':                  'UT',
		'vermont':               'VT',
		'virginia':              'VA',
		'washington':            'WA',
		'west virginia':         'WV',
		'wisconsin':             'WI',
		'wyoming':               'WY'
	  };

	if (typeof stateName !== 'string') return null;
	const key = stateName.trim().toLowerCase();
	return STATE_CODES[key] || null;
  }
  

//Prepared column names
function basePreparedColumnNames(columnNames) {
	let preparedColNames = [];
	for (let col in columnNames) {
		let tmp = columnNames[col].split('_');
		for (let index in tmp) {
			tmp[index] = tmp[index][0].toUpperCase() + tmp[index].substring(1);
		}
		preparedColNames[col] = tmp.join(' ');
	}
	return preparedColNames;
}

/**
 * Download data as a CSV onto the user's machine
 * @param {string} data The CSV data to save onto the user's machine
 * @param {*} fileName The name of the file to save. Note, this does not append a file extension.
 */
function baseDownloadCSV(data, fileName) {
	const blob = new Blob([data], {
		type: 'text/csv',
	});
	const url = window.URL.createObjectURL(blob), 
		  a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('download', fileName);
	a.click();
}


/*---- Receipt ----*/
function fetchReceipt(section, category, eventID, appID, processID, acctID, backendPath){
	let generateReceipt = (data) => {
		$('#app_receipt').html(data.html);
	}

	let params = new FormData();
	params.append('post_type', 'fetch_receipt');
	params.append('section', section);
	params.append('category', category);
	params.append('event_id', eventID);
	params.append('app_id', appID);
	params.append('process_id', processID);
	params.append('applicant_acct_id', acctID);
	var successFunc = function(data){
		hideLoader();
		$.when(generateReceipt(data)).done(
			function() {
				setTimeout(() => {
					window.print();
				}, 600);
			}
		);
	};
	var errorFunc = function(data){
	};
	var errorServerFunc = function(jqXHR, textStatus, errorThrown){
	};
	baseFuncsContentUpdate(backendPath, params, successFunc, errorFunc, errorServerFunc, true, 0);
}



/*---- Elements ----*/
//Progress bar
function baseProgressBarCreator(params) {
	let progress = 0,	//Must be >=0
		totalSteps = 1,	//Must be >=1
		type = '';	//[create, update]
	let output = {
			bar: '',
			css: '',
			text: '',
		};
	
	if(baseValidateNumber(params.progress, 'is')) progress = params.progress;
	if(baseValidateNumber(params.totalSteps, 'positive')) totalSteps = params.totalSteps;
	if(baseValidateString(params.type, 'length') && $.inArray(params.type, ['create', 'update']) > -1) type = params.type;

	let completed = (progress / totalSteps) * 100;
	switch(type){
		case 'create':
			output.css = 
			`<style type="text/css">
				#base-progress-bar-container { background: #FFF; border: 1px solid #222; border-radius: 8px; height: 10px; width: 100%; }
				#base-progress-bar { background-color: #08A6A0; border-radius: 8px; height: 100%; }
			</style>`;

			output.bar = 
				`<div id="base-progress-bar-container">
					<div id="base-progress-bar" style="width: ${completed}%;"></div>
				</div>`;
			
			output.text = `<div id="base-progress-percentage" class="size-14 stronger my1">${number_format(completed, 0, '.', ',')}% complete</div>`;
			break;
		
		case 'update':
			if($('#base-progress-bar').length) $('#base-progress-bar').css('width', completed + '%');
			if($('#base-progress-text').length) $('#base-progress-text').html(number_format(completed, 0, '.', ','));
			break;
	}

	return output;
}

/*---- Actions ----*/
function scrollToSection(sectionID){
	$('html, body').animate({
		'scrollTop': $(sectionID).offset().top
	}, 1500);
}

/*---- Dropdown ----*/
// Use together with html and css classes
function baseAddDropdownListener(parentID){
	// open options
	$(`#${parentID} .dropdown-btn-24`).on('click', function(e){
		const dropdown = $(this).closest('.dropdown-container-24');
		//Hide any previously opened dropdown
		$('.dropdown-btn-active-style-24').not(this).next().addClass('hide');
		$('.dropdown-btn-active-style-24').not(this).removeClass('dropdown-btn-active-style-24');

		$(this).toggleClass('dropdown-btn-active-style-24');
		// change chevron up or down icon
		dropdown.find('.option-closed-icon').toggleClass('hide');
		dropdown.find('.option-open-icon').toggleClass('hide');
	
		e.stopPropagation(); // when click outside of the option container, we'll close the container, but we don't want it to close it immediately when click on dropdown btn
		dropdown.find('.dropdown-option-container-24').toggleClass('hide');
	});

	// option listener
	$(`#${parentID} .dropdown-option-24`).on('click', function(){
		if($(this).hasClass('selected')){
			return;
		}
		// styling changes when clicked
		const dropdown = $(this).closest('.dropdown-container-24');
		dropdown.find('.dropdown-option-24.selected').removeClass('selected'); // reset selected option
		$(this).addClass('selected');
		$('.option-closed-icon').removeClass('hide');
		$('.option-open-icon').addClass('hide');
	});

	// click outside of the options container, close the container
	$(document).ready(function(){
		$(document).on('click', function(e) {
			var target = $(e.target);
			if (!target.closest('.dropdown-option-container-24').length && !target.is('.dropdown-option-container-24')) {
				$('.dropdown-option-container-24').addClass('hide');
				$('.dropdown-btn-24').removeClass('dropdown-btn-active-style-24');
				$('.option-closed-icon').removeClass('hide');
				$('.option-open-icon').addClass('hide');
			}
		});
	});
}

/*---- Color ----*/
/**
 * Checks if an RGB string represents a transparent color.
 *
 * @param {string} rgbString - A string representing a color in RGB or RGBA format.
 * @returns {boolean} - Returns `true` if the color is transparent, otherwise `false`.
 */
function isColorTransparent(rgbString) {
	// Use regular expression to extract RGBA components
	const rgbaPattern = /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]*)\s*\)/;
	const match = rgbaPattern.exec(rgbString);

	if (match) {
		const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
		return alpha === 0;
	}

	return false;
}

/**
 * Sets the opacity of a color to 50%. If the color is transparent, sets it to #ffffff80.
 *
 * @param {string} color - A string representing a color in RGB, RGBA, or HEX format.
 * @returns {string} - The modified color string.
 */
function setColorOpacityToHalf(color){
	//If the color is transparent, then set the color to #ffffff80, 
	//If the color is not transparent, then set opacity to 50% (add 4th parameter = 0.5 to rgb colors or an 80 at the end of HEX)
	if (color.includes("rgba")) {
		return color.replace(/rgba\\(([^,]+),([^,]+),([^,]+),[^\\)]+\\)/, "rgba($1,$2,$3,0.5)");
	}else if(color.includes("rgb")){
		color = !isColorTransparent(color) ? color.slice(0, -1) + ", 0.5)" : '#ffffff80';
	}else{
		color = color + "80";
	}
	return color;
}

/**
 * Converts a HEX color string to an RGB object.
 *
 * @param {string} hex - A string representing a color in HEX format (e.g. "#abc" or "#aabbcc").
 * @returns {object} - An object representing the RGB components of the color.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString#using_toString_to_convert_numbers_to_base_16
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
function hexToRgb(hex) {
	hex = hex.replace('#', '');

	// Handle short format (#abc → #aabbcc)
	if (hex.length === 3) {
		hex = hex.split('').map(c => c + c).join('');
	}

	// Extract two characters at a time and parse as base-16 (hex)
	const r = parseInt(hex.substring(0, 2), 16); // 'AA'
	const g = parseInt(hex.substring(2, 4), 16); // 'BB'
	const b = parseInt(hex.substring(4, 6), 16); // 'CC'

	return { r, g, b };
}

/**
 * Parses an RGB string and returns an object with r, g, b properties.
 * 
 * @param {string} rgbStr - The RGB string to parse (e.g. "rgb(255, 255, 255)").
 * @returns {object|null} - An object with r, g, b properties or null if invalid.
 */
function parseRgb(rgbStr) {
	const result = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!result) return null;
	return {
		r: parseInt(result[1]),
		g: parseInt(result[2]),
		b: parseInt(result[3])
	};
}

/**
 * Parses an RGBA string and returns an object with r, g, b, a properties.
 *
 * @param {string} rgbaStr - The RGBA string to parse (e.g. "rgba(255, 255, 255, 0.5)").
 * @returns {object|null} - An object with r, g, b, a properties or null if invalid.
 */
function parseRgba(rgbaStr) {
	const result = rgbaStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/);
	if (!result) return null;
	return {
		r: parseInt(result[1]),
		g: parseInt(result[2]),
		b: parseInt(result[3]),
		a: parseFloat(result[4])
	};
}

/**
 * Blends a color with white based on its alpha value.
 * 
 * @param {number} r - The red component (0-255).
 * @param {number} g - The green component (0-255).
 * @param {number} b - The blue component (0-255).
 * @param {number} a - The alpha component (0-1).
 * @returns {object} - The blended color as an object with r, g, b properties.
 * @see https://drafts.fxtf.org/compositing-1/#simplealphacompositing
 */
function blendWithWhite(r, g, b, a) {
	// Blend against white background (default)
	return {
		r: Math.round((1 - a) * 255 + a * r),
		g: Math.round((1 - a) * 255 + a * g),
		b: Math.round((1 - a) * 255 + a * b)
	};
}

/**
 * Calculates the relative luminance of a color.
 * 
 * @param {number} r - The red component (0-255).
 * @param {number} g - The green component (0-255).
 * @param {number} b - The blue component (0-255).
 * @returns The relative luminance (0-1).
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getLuminance(r, g, b) {
	// Luminance weights based on the WCAG 2.0 standard
	const redWeight = 0.2126;
	const greenWeight = 0.7152; // most important to human vision
	const blueWeight = 0.0722;

	// Convert to [0, 1] scale and apply sRGB gamma correction
	const srgb = [r, g, b].map(v => {
		v /= 255; // 255 is the max value for RGB components
		return v <= 0.03928           // WCAG threshold for linear vs gamma-corrected brightness
			? v / 12.92                 // Linear segment of sRGB
			: Math.pow((v + 0.055) / 1.055, 2.4); // Gamma-corrected segment -- constants from sRGB gamma correction formula
	});

	// Weighted sum of R, G, B — based on human eye sensitivity
	return redWeight * srgb[0] + greenWeight * srgb[1] + blueWeight * srgb[2];
}

/**
 * Calculates the contrast ratio between two luminance values.
 * TL;DR for why we add 0.05:
 * The +0.05 is added to avoid division by zero and accounts for perceptual differences in near-black/white areas.
 * 
 * @param {number} l1 - The first luminance value.
 * @param {number} l2 - The second luminance value.
 * @returns The contrast ratio (1-21).
 * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function contrastRatio(l1, l2) {
	// Always use lighter over darker: (L1 + 0.05) / (L2 + 0.05)
	return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Gets the accessible text color (black or white) for a given background color.
 * 
 * @param {string} bgColor - The background color (HEX or RGB format).
 * @returns The recommended text color (black or white).
 * @see https://www.w3.org/TR/WCAG21/#contrast-minimum
 */
function getAccessibleTextColor(bgColor) {
	let rgb;

	// Determine input format and convert to RGB
	if (bgColor.startsWith('#')) {
		rgb = hexToRgb(bgColor);      // Convert hex to {r, g, b}
	} else if (bgColor.startsWith('rgb')) {
		rgb = parseRgb(bgColor);      // Extract RGB values
	} else if (bgColor.startsWith('rgba(')) {
		const rgba = parseRgba(bgColor);
		rgb = blendWithWhite(rgba.r, rgba.g, rgba.b, rgba.a);
	} else {
		throw new Error('Unsupported color format: ' + bgColor);
	}

	const bgLuminance = getLuminance(rgb.r, rgb.g, rgb.b); // Relative luminance of background

	const whiteLuminance = getLuminance(255, 255, 255);
	const blackLuminance = getLuminance(0, 0, 0);

	const whiteContrast = contrastRatio(bgLuminance, whiteLuminance); // Contrast with white
	const blackContrast = contrastRatio(bgLuminance, blackLuminance); // Contrast with black

	// Pick color with best contrast (must be ≥ 4.5 to meet AA)
	// Contrast ratio follows WCAG 2.1 Constrast requirements https://www.w3.org/TR/WCAG21/#contrast-minimum
	if (whiteContrast >= 4.5 && whiteContrast > blackContrast) {
		return '#FFFFFF'; // Use white text
	} else {
		return '#000000'; // Use black text (better or only valid option)
	}
}




async function priceCheck(items, discount, additionalFees, taxRate, feeCalculationMethod, paymentMethod, module, plan, shippingRate = 0, shippingIncrement = 0, shippingFeeCalculationMethod = '') {
	let promise = new Promise((resolve) => {
		let return_data = [];
		let params = new FormData();
		params.append('post_type', 'calculate_price');
		params.append('items', JSON.stringify(items)); // this should be an array of objects. [{price:100,id:1,tax_rate:.08}]
		params.append('discount', JSON.stringify(discount)); // this should also be an array of objects. TODO: template this.
		params.append('additional_fees', JSON.stringify(additionalFees)); // this should also be an array of objects. TODO: template this.
		params.append('tax_rate', taxRate);
		params.append('fee_calculation_method', feeCalculationMethod);
		params.append('payment_method', paymentMethod);
		params.append('module', module);
		params.append('plan', plan);
		params.append('shipping_rate', shippingRate);
		params.append('shipping_increment', shippingIncrement);
		params.append('shipping_fee_calculation_method', shippingFeeCalculationMethod);
	
		const successFunc = async (data) => {
			resolve(data);
		}
	
		baseFuncsContentUpdate('common/calculator.php', params, successFunc, (e)=>{console.log(e)},(e)=>{console.log(e)},false,0);
	});
	
	return await promise;
}

function setupExpandableTextToggle() {
	$('body').on('click', '.expand-text-toggle', function(e){
		e.preventDefault();
		const status = $(this).data('status');
	
		//Default variables for onclick of "Show more >"
		let newMaxHeight = '';
		let newStatus = 'expanded';
		let newBtnText = 'Show less <i class="uil uil-angle-up"></i>';
		
		//Update variables for onclick of "Show less >"
		if (status === 'expanded') {
			//Add max height to "collapse" extra text
			newMaxHeight = $(this).parent().find('.expandable').data('default-height');
			newStatus = 'collapsed';
			newBtnText = 'Show more <i class="uil uil-angle-down"></i>';
		}
	
		//Change HTML
		$(this).parent().find('.expandable').css('max-height', newMaxHeight);
		$(this).html(newBtnText).data('status', newStatus);
	});
}

/*---- Form ----*/

/**
 * Highlights required questions in a form by adding a class to the associated labels.
 *
 * @param {object} formData - Data from the questions form.
 * @param {array} hiddenChildQuestions - required child questions that are hidden.
 * @returns {bolean} - true if all required questions are filled, false if any required questions are empty.
 */
function highlightRequiredCustomQuestion(formID, hiddenChildQuestions){
	let required = 0,
		requiredInputs = [];
	requiredInputs = document.querySelectorAll(`${formID} [data-required="1"]`);	//Find all elements where data-required is 1
	requiredInputs.forEach(function(input) {	
		if($.inArray($(input).parent().closest('.user-conditional-question').data('id'), hiddenChildQuestions) == -1){ //Enforce response only when question is not hidden
			let inputType = input.getAttribute('type');
			let isChecked = false;
			let fileExists = 0;
			if(inputType == 'file'){
				inputName = input.getAttribute('id');	//Get the id value if file because name is not in the same format as other questions
				fileExists = input.getAttribute('data-existing-file');	//0 if none exist
			}else if(inputType == 'checkbox'){
				inputName = input.getAttribute('id');	//Get the id value if checkbox because name is an array
				isChecked = input.checked;	//True if checked
			}else{
				inputName = input.getAttribute('name');	//Get the name value if not checkbox
			}
			let label = document.querySelector('label[for="' + inputName +  '"');	//Get label element for the input name
			if(inputType == 'checkbox' || inputType == 'radio'){
				let checked = 0;	//Start at 0 checked
				let siblings = document.querySelectorAll('[id="' + inputName + '"]');	//Get all checkboxes for the id question[id]
				siblings.forEach(sibling => {
					if(sibling.checked){
						checked++;	//Add 1 to checked if it's checked
					}
				});
				if(checked == 0){
					label.classList.add('requiredHighlight');
					required++;
				}else{
					label.classList.remove('requiredHighlight');
				}
			}else if(inputType == 'file'){
				if((input.files && input.files.length > 0) || fileExists > 0){
					label.classList.remove('requiredHighlight');
				}else{
					label.classList.add('requiredHighlight');
					required++;
				}
			}else{
				if(!input.value || input.value == '' || !input.value.trim().length){
					label.classList.add('requiredHighlight');
				}else{
					label.classList.remove('requiredHighlight');
				}
			}
		}
	});
	if(required == 0) return true;
	else return false;	 
}


//Append video tutorial to tutorial video modal container
function appendAndShowVideoTutorial(videoType) {
	$('html').css('overflow', 'hidden');
	$('#tutorial-modal').css('display', 'flex').fadeIn();
	
	// videoType = section-subsection
	const tutorialVideoIDs = {
			'ave-application-info': '839091469',
			'ave-picture-uploads': '841315329',
			'ave-custom-questions-1': '839091920',
			'ave-custom-questions-2': '841315161',
			'ave-price-amount': '848751615',
			'ave-charge-process': '862513164',
			'ave-time-restriction': '865570530',
			'ave-payment-plans': '970089448',
			'ave-cover-picture': '848762231',
			'ave-messages': '855603615',
			'ave-map': '865567628',
			'ave-jury-setup': '867946812',
			'ave-conditional-logic': '1011062263',
			'ave-recurring-prices': '825564263',
			'map-info': '890363801',
			'map-booths': '885764308',
			'map-booth-assignment': '896642239',
			'map-background': '881703590',
			'map-background-size': '881736960',
			'map-pictures': '887388717',
			'map-sections': '887389799',
			'map-icons': '896641350',
			'program-management-schedule': '1098267321',
			'ticket-allow-reselling': '964650104',
			'ticket-requires-documentation': '951989786',
			'ticket-refundable': '1022293038',
			'ticket-switch': '964637319',
			'ticket-refund-cancel': '926401036',
			'ticket-timeslots': '1087132994',
			'sponsor-booths-spaces': '988992249',
			'sponsor-copy-deals': '970146991',
			'sponsor-embed-apps': '975713537',
			'sponsor-invoices': '987255307',
			'sponsor-manual-deals': '987256294',
			'sponsor-manage-deals': '987256294',
			'sponsor-manage-tags': '978076093',
			'sponsor-tickets': '990596208',
			'volunteer-create-app': '1011439498',
			'volunteer-create-departments': '1016143109',
			'volunteer-copy-app': '1013301424',
			'volunteer-bulk-import': '1016106316',
			'volunteer-manage-documents': '1008976317',
			'volunteer-analytics': '1018734197',
			'volunteer-submissions': '1011126110',
 	}; // Video IDs provided by marketing
	 
	 
	 const videoId = tutorialVideoIDs[videoType];
	 if(!videoId) {
		 console.warn(`No tutorial video ID found for: ${videoType}`);
		 return;
		}
		
	const currentSrc = $('#tutorial-video').attr('src');
	const videoURL = `https://player.vimeo.com/video/${tutorialVideoIDs[videoType]}?badge=0&autopause=0&player_id=0&app_id=58479`;

  	//If video is already attached due to duplicate id, return
	if(currentSrc === videoURL) return;

	//Append tutorial video
	$('#tutorial-video').attr('src', videoURL);
}

//Close video modal and empty src
$('#tutorial-modal').on('click', function(){ 
	$('#tutorial-modal').fadeOut();
	$('#tutorial-video').attr('src', '');
	$('html').css('overflow', 'auto');
});

function verifyImageDimensions(input){
	const files = input.files;
	const formsErrorContainer = $(input).closest('form').find('.error');
	const dragAndDropSelectArea = $(input).closest('.drag-and-drop-uploader').find('label[data-content="Select file"]');
	let exitLoop = false;
	
	if(files && files.length > 0){
		for(let i = 0; i < files.length; i++){
			if(exitLoop) break;
			const file = files[i];
			
			if(['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)){
				const reader = new FileReader();
				const img = new Image();

				reader.onload = function(e){
					img.onload = function(){
						const width = img.width;
						const height = img.height;
						const maxMemory = 134217728; //128MB in bytes
						const memoryRequired = (file.type === 'image/png') ? (width * height * 4) : (width * height * 3);  //4 components for PNG, 3 components for JPG/JPEG 

						//Check if the memory exceeds the limit
						if(memoryRequired > maxMemory){
							formsErrorContainer.html('Please verify the image(s) under 5000px x 5000px and try again.');	//Error message
							dragAndDropSelectArea.attr('data-content', 'Select file');	//Reset drag and drop message
							input.value = '';	//Clear file upload input
							exitLoop = true;	//Guard to exit loop if an image requires more than max memory
						}
					};
					img.src = e.target.result; //Trigger img.onload
				};

				reader.readAsDataURL(file); //Trigger reader.onload
			} else {
				formsErrorContainer.html('');	//Success - clear error message if another file type is uploaded
			}
		}
	}
}

function showError(errorElement, error) {
	console.error(error);
	$(`${errorElement} .error`).text(error).removeClass('hide');
}

function hideError(errorElement) {
	$(`${errorElement} .error`).text('').addClass('hide');
}

function linkify(link) {
	//Regex comes from https://stackoverflow.com/a/17773849
	const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

	if (link.match(regex)) {
		if (link.charAt(0) === 'h') {
			return `<a href="${link}" target="_blank" style="color: var(--secondary-2); text-decoration: underline;">${link}</a>`;
		} else {
			return `<a href="https://${link}" target="_blank" style="color: var(--secondary-2); text-decoration: underline;">${link}</a>`;
		}
	} else {
		return link;
	}
}

function sendHubspotUpgradeIntentForm(hubspotData, feature = null, intentPriority = null){
	const firstName = hubspotData.firstName || 'First Name Unknown';
	const lastName = hubspotData.lastName || 'Last Name Unknown';
	const companyName = hubspotData.companyName || 'No Company';
	const email = hubspotData.email || 'no-email@example.com';
	const subscriptionLevel = hubspotData.subscriptionLevel || 'free';
	const subscriptionRecurrence = hubspotData.subscriptionRecurrence || 'monthly';
	const section = hubspotData.section || 'event';
	const associatedFeature = feature || 'general';
	const subscriptionStartTimestamp = hubspotData.subscriptionStartTimestamp || '2000/01/01';
	const priority = intentPriority || 'low';
	const eventID = hubspotData.eventID || '0';
	const ipAddress = hubspotData.ipAddress || '0.0.0.0';
	const fromUrlPath = hubspotData.fromUrlPath || '';

	//Upgrade intent forms by priority - IDs provided by Hubspot
	const hubSpotFormObj = {
		embed: { low: { formID: "aecbc4a1-287d-431a-8f58-e0e851ad13e6" }, high: { formID: "6fe70d0f-9165-41e8-b081-efabc29033ea" } },
		maps: { low: { formID: "4d33037c-48d2-4f7d-b5ba-6bf8cbf81181" }, high: { formID: "40c521bd-b4a5-4a71-b5a5-5c695f66bdee" } },
		hardware: { low: { formID: "4b79af75-9dd5-4f4e-8b8f-a31bb48913ac" }, high: { formID: "ed73a131-1b55-4692-8f8f-f947bd6474cc" } },
		schedule: { low: { formID: "3ef1a6bf-7317-4bf2-9dbc-546e8615c251" }, high: { formID: "d15c105f-5cac-424f-a4e2-bf78bc9e9c73" } },
		volunteers: { low: { formID: "0f8be442-57e4-4504-9113-cda30db27a71" }, high: { formID: "ef8bf583-4eef-4f0b-be7d-ee57a304ea7c" } },
		sponsors: { low: { formID: "774f635d-fbc2-4035-8a7e-ef6b40e76ba5" }, high: { formID: "0fb61967-7a79-4c08-81f1-4cc822256845" } },
		analytics: { low: { formID: "20d92b03-6d1c-4834-aff4-db3af70ae042" }, high: { formID: "bc5c55fb-c71e-4841-8626-02c09748f821" } },
		group_message: { low: { formID: "9efbd4bd-7d7d-4a38-b8f7-86e78615295c" }, high: { formID: "060206f6-76e0-4759-b311-9710c62a96c8" } },
		export: { low: { formID: "939ced8a-e364-4807-bee3-ce120b69dd48" }, high: { formID: "6ebf38ce-383d-4e36-ad35-6e07d50280b6" } },
		deliverables: { low: { formID: "252e70ab-4829-4d7e-920b-5dcd1fa5fb63" }, high: { formID: "34c84c15-ea96-4a2b-b405-846015b2bd21" } },
		tags:  { low: { formID: "4af0f67f-481e-43a8-9a41-c40de269dd37" }, high: { formID: "df616291-edbd-40d5-acbe-9a9e40e3f830" } },
		bulk_import:  { low: { formID: "7b9150ac-9237-4a2e-8de0-8b127f0bbad4" }, high: { formID: "bc679321-e00b-497e-a83a-7189d7ff37e2" } },
		ticket_timeslots_callout: { high: {formID: "dc189da1-9b0a-4c3e-87ad-c11969f56b7d"}},
		ticket_timeslots_banner: { high: {formID: "3fdaf8b6-30c2-4350-9e48-80c5335b97aa"}},
	};

	//Check if form is complete
	const hubSpotSection = hubSpotFormObj?.[associatedFeature];
	const hubSpotForm = hubSpotSection?.[priority];

	if(!hubSpotSection || !hubSpotForm){
		return Promise.reject('Associated feature not provided or invalid.');
	}

	//Create form
	const url = `https://api.hsforms.com/submissions/v3/integration/submit/4492849/${hubSpotForm.formID}`;
	const data = {
		submittedAt: Date.now(),
		fields: [
			{ name: 'firstname', value: firstName },
			{ name: 'lastname', value: lastName },
			{ name: 'email', value: email },
			{ name: 'company', value: companyName },
			{ name: 'subscription_level_intent', value: subscriptionLevel },
			{ name: 'subscription_recurrence_intent', value: subscriptionRecurrence },
			{ name: 'associated_feature_intent', value: section },
			{ name: 'subscription_start_date_intent', value: subscriptionStartTimestamp },
		],
		context: {
			hutk: baseCookieManager('hubspotutk'),
			ipAddress: ipAddress,
			pageUri: `https://eventeny.com${fromUrlPath}${eventID}`
		}
	};

	//Send form
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function(){
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve();
			} else {
				reject({
					status: xhr.status,
					statusText: xhr.statusText,
					response: JSON.parse(xhr.responseText)
				});
			}
		};

		xhr.onerror = function(){
			reject();
		};

		xhr.send(JSON.stringify(data));
	});
}

//Helper function to set a cookie
function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

//Helper function to get a cookie by name
function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

//TinyMCE initialization function
// You'll also need to add the tinymce script for this to work:
//<script src="/vendor/tinymce/tinymce/tinymce.min.js" referrerpolicy="origin"></script>
async function initHtmlTextEditor(selector = 'textarea.html-texteditor', options = {}) {
    // Remove any existing editors bound to this selector (so re-inits are clean)
    if (window.tinymce && Array.isArray(tinymce.editors)) {
      document.querySelectorAll(selector).forEach(el => {
        const ed = tinymce.editors.find(e => e.target === el || e.id === el.id);
        if (ed) tinymce.remove(ed);
      });
    }

	// preload custom icons before TinyMCE renders UI
  	await loadTinyMCEIcons('/images/icons/tinymce-icons/icons.js?v=' + Date.now());

    const baseConfig = {
		selector,
		content_css: [
		  "/css/base-2017-05-15.css?v=202005210955",
		  "/css/base-2018-11-17.css?v=202005210955"
		],
		contextmenu: false,
		base_url: '/vendor/tinymce/tinymce', // tinymce.js, skins/, icons/, plugins/
		suffix: '.min',
		cache_suffix: '?v=' + Date.now(),
		force_br_newlines: true,
		height: 300,
		menubar: false,
		paste_as_text: true,
		paste_block_drop: true,
		paste_data_images: false,
		setup: function (editor) {
		  editor.on('change', function () { editor.save(); });
		},
		plugins: 'advlist autolink link lists hr pagebreak',
		toolbar: 'undo redo | bold italic underline | bullist numlist | forecolor backcolor |',
		advlist_bullet_styles: 'default,circle,square',
		color_map: [
			// Light row
			"BFEDD2", "Light Green",
			"FBEEB8", "Light Yellow",
			"F8CAC6", "Light Red",
			"ECCAFA", "Light Purple",
			"C2E0F4", "Light Blue",
		
			// Mid row
			"2DC26B", "Green",
			"F1C40F", "Yellow",
			"E03E2D", "Red",
			"B96AD9", "Purple",
			"3598DB", "Blue",
		
			// Dark row
			"169179", "Dark Turquoise",
			"E67E23", "Orange",
			"BA372A", "Dark Red",
			"843FA1", "Dark Purple",
			"236FA1", "Dark Blue",
		
			// Grays
			"ECF0F1", "Light Gray",
			"CED4D9", "Medium Gray",
			"95A5A6", "Gray",
			"7E8C8D", "Dark Gray",
			"34495E", "Navy Blue",
		
			// Black (keep), White removed
			"000000", "Black"
		  ],
		color_cols: 5,
		menu: {},
		license_key: 'gpl',
		promotion: false,
		branding: false,
		width: "100%",
		statusbar: false,
		toolbar_sticky: true,
		icons_url: '/images/icons/tinymce-icons/icons.js',
		icons: 'tinymce-icons',
		content_style: `
		  ::placeholder {
			font-family: 'Plus Jakarta Sans', sans-serif !important;
		  }
		`
	};

    // Merge in any overrides you pass
    const config = Object.assign({}, baseConfig, options, { selector });

    return tinymce.init(config); // returns a Promise (TinyMCE 6+)
}

function loadTinyMCEIcons(url) {
	return new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = url;
		s.onload = resolve;
		s.onerror = reject;
		document.head.appendChild(s);
	});
}