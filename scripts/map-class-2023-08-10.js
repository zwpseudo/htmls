/**
 * Class representing a map
 */
class MapElement {
	//Private variables
	#id;	//Map ID
	#eventID; // Event ID
	#timeSlotID = 0; // Time slot ID
	
	//Public variables
	mapInfo = [];
	booths = [];
	sections = [];
	seats = [];
	icons = [];
	pictures = [];
	textBoxes = [];
	ticketRestrictions = [];
	containerElement;
	viewElement;				
	baseMapBW = 0;
	baseMapBH = 0;
	hwRatio = 1; // Height-width ratio
	mapZoom = 1;	// Zoom value
	mapZoomSliderSource = '#map';	// Where the zoom slider originates from. ['#map', '#map-preview']
	mapZoomMin = 1; // Zoom min 100%
	mapZoomMax = 10; // Zoom max 1000%
	zoomBtnStep = 0.25; // Zoom step 25%
	mapBackgroundViewDefaultWidth;
	mapBackgroundViewDefaultHeight;
	mapSource = 'ticket';
	selectedSeatInfo = {};
	holderList;
	actionBtn;
	iconLibrary = {
		'abseiling': 'Abseiling',
		'accounting': 'Accounting',
		'airport': 'Airport',
		'amusement-park': 'Amusement Park',
		'aquarium': 'Aquarium',
		'archery': 'Archery',
		'art-gallery': 'Art Gallery',
		'assistive-listening-system': 'Assistive Listening System',
		'atm': 'Atm',
		'audio-description': 'Audio Description',
		'bakery': 'Bakery',
		'bank': 'Bank',
		'bar': 'Bar',
		'baseball': 'Baseball',
		'beauty-salon': 'Beauty Salon',
		'bicycling': 'Bicycling',
		'boating': 'Boating',
		'boat-ramp': 'Boat Ramp',
		'boat-tour': 'Boat Tour',
		'book-store': 'Book Store',
		'bowling-alley': 'Bowling Alley',
		'braille': 'Braille',
		'bus-station': 'Bus Station',
		'cafe': 'Cafe',
		'campground': 'Campground',
		'canoe': 'Canoe',
		'car-dealer': 'Car Dealer',
		'car-rental': 'Car Rental',
		'car-repair': 'Car Repair',
		'car-wash': 'Car Wash',
		'casino': 'Casino',
		'cemetery': 'Cemetery',
		'chairlift': 'Chairlift',
		'church': 'Church',
		'circle': 'Circle',
		'city-hall': 'City Hall',
		'climbing': 'Climbing',
		'closed-captioning': 'Closed Captioning',
		'clothing-store': 'Clothing Store',
		'compass': 'Compass',
		'convenience-store': 'Convenience Store',
		'courthouse': 'Courthouse',
		'cross-country-skiing': 'Cross Country Skiing',
		'crosshairs': 'Crosshairs',
		'dentist': 'Dentist',
		'department-store': 'Department Store',
		'diving': 'Diving',
		'doctor': 'Doctor',
		'electrician': 'Electrician',
		'electronics-store': 'Electronics Store',
		'embassy': 'Embassy',
		'expand': 'Expand',
		'female': 'Female',
		'finance': 'Finance',
		'fire-station': 'Fire Station',
		'fish-cleaning': 'Fish Cleaning',
		'fishing': 'Fishing',
		'florist': 'Florist',
		'food': 'Food',
		'fullscreen': 'Fullscreen',
		'funeral-home': 'Funeral Home',
		'furniture-store': 'Furniture Store',
		'gas-station': 'Gas Station',
		'general-contractor': 'General Contractor',
		'grocery-or-supermarket': 'Grocery Or Supermarket',
		'gym': 'Gym',
		'hair-care': 'Hair Care',
		'hang-gliding': 'Hang Gliding',
		'hardware-store': 'Hardware Store',
		'health': 'Health',
		'hindu-temple': 'Hindu Temple',
		'hospital': 'Hospital',
		'ice-fishing': 'Ice Fishing',
		'ice-skating': 'Ice Skating',
		'inline-skating': 'Inline Skating',
		'insurance-agency': 'Insurance Agency',
		'jet-skiing': 'Jet Skiing',
		'jewelry-store': 'Jewelry Store',
		'kayaking': 'Kayaking',
		'laundry': 'Laundry',
		'lawyer': 'Lawyer',
		'library': 'Library',
		'liquor-store': 'Liquor Store',
		'local-government': 'Local Government',
		'location-arrow': 'Location Arrow',
		'locksmith': 'Locksmith',
		'lodging': 'Lodging',
		'low-vision-access': 'Low Vision Access',
		'male': 'Male',
		'map-pin': 'Map Pin',
		'marina': 'Marina',
		'mosque': 'Mosque',
		'movie-rental': 'Movie Rental',
		'movie-theater': 'Movie Theater',
		'moving-company': 'Moving Company',
		'museum': 'Museum',
		'natural-feature': 'Natural Feature',
		'night-club': 'Night Club',
		'open-captioning': 'Open Captioning',
		'painter': 'Painter',
		'park': 'Park',
		'parking': 'Parking',
		'pet-store': 'Pet Store',
		'pharmacy': 'Pharmacy',
		'physiotherapist': 'Physiotherapist',
		'place-of-worship': 'Place Of Worship',
		'playground': 'Playground',
		'plumber': 'Plumber',
		'point-of-interest': 'Point Of Interest',
		'police': 'Police',
		'political': 'Political',
		'postal-code': 'Postal Code',
		'postal-code-prefix': 'Postal Code Prefix',
		'post-box': 'Post Box',
		'post-office': 'Post Office',
		'rafting': 'Rafting',
		'real-estate-agency': 'Real Estate Agency',
		'restaurant': 'Restaurant',
		'roofing-contractor': 'Roofing Contractor',
		'route': 'Route',
		'route-pin': 'Route Pin',
		'rv-park': 'Rv Park',
		'sailing': 'Sailing',
		'school': 'School',
		'scuba-diving': 'Scuba Diving',
		'search': 'Search',
		'shopping-mall': 'Shopping Mall',
		'sign-language': 'Sign Language',
		'skateboarding': 'Skateboarding',
		'skiing': 'Skiing',
		'ski-jumping': 'Ski Jumping',
		'sledding': 'Sledding',
		'snow': 'Snow',
		'snowboarding': 'Snowboarding',
		'snowmobile': 'Snowmobile',
		'snow-shoeing': 'Snow Shoeing',
		'spa': 'Spa',
		'square': 'Square',
		'square-pin': 'Square Pin',
		'square-rounded': 'Square Rounded',
		'stadium': 'Stadium',
		'storage': 'Storage',
		'store': 'Store',
		'subway-station': 'Subway Station',
		'surfing': 'Surfing',
		'swimming': 'Swimming',
		'synagogue': 'Synagogue',
		'taxi-stand': 'Taxi Stand',
		'tennis': 'Tennis',
		'toilet': 'Toilet',
		'train-station': 'Train Station',
		'transit-station': 'Transit Station',
		'travel-agency': 'Travel Agency',
		'unisex': 'Unisex',
		'university': 'University',
		'veterinary-care': 'Veterinary Care',
		'volume-control-telephone': 'Volume Control Telephone',
		'waterskiing': 'Waterskiing',
		'whale-watching': 'Whale Watching',
		'wheelchair': 'Wheelchair',
		'wind-surfing': 'Wind Surfing',
		'zoo': 'Zoo',
		'zoom-in': 'Zoom In',
		'zoom-in-alt': 'Zoom In Alt',
		'zoom-out': 'Zoom Out',
		'zoom-out-alt': 'Zoom Out Alt',
	};

	/*---- Issuing tickets ----*/
	currentTicket;	// This is for issuing tickets from the EO's side
	label;	// This is for issuing tickets from the EO's side
	selectionQueue = [];
	preselectAssetList = [];
	showUnavailableSeats = true;
	issueTicketOnSeatSelect = () =>{};
	issueTicketMaxTicket = 0;


	constructor(id, eventID, containerElement, viewElement, actionBtn, mapZoomSliderSource) {
		this.#id = id;
		this.#eventID = eventID;
		this.containerElement = containerElement;
		this.viewElement = viewElement;
		this.actionBtn = actionBtn ?? '';
		this.mapZoomSliderSource = mapZoomSliderSource ?? '#map';	// If variable is null, assign '#map'
		this.mapBackgroundViewDefaultWidth = ($(this.containerElement).width() == 100) ? 1560 : $(this.containerElement).width(); // Map width is set to 100 by default so increase it to fill modal
		this.mapBackgroundViewDefaultHeight = this.mapBackgroundViewDefaultWidth * 0.625;
	}

	// Getters
	getMapID() {
		return this.#id;
	}

	getEventID() {
		return this.#eventID;
	}

	getTimeSlotID() {
		return this.#timeSlotID;
	}
	
	// Setters
	setMapID(id) {
		this.#id = id;
	}

	setTimeSlotID(id) {
		this.#timeSlotID = id;
	}
	
	resizeBackground() {
		// Assign new background sizes
		this.baseMapBW = this.mapBackgroundViewDefaultWidth * this.mapZoom;
		this.baseMapBH = this.mapBackgroundViewDefaultHeight * this.mapZoom * this.hwRatio;	
		$(this.viewElement).width(this.baseMapBW).height(this.baseMapBH);
	}	

	/**
	 * Creates and returns an HTML svg element with the specified shape, color, and dimensions
	 * If an invalid shape has been provided, a rectangle will be returned by default
	 * 
	 * @param 	{string}	shape	Shape of the asset ['circle', 'triangle', 'rectangle']
	 * @param 	{number}	width	Positive width value in px
	 * @param 	{number}	height	Positive height value in px
	 * @param 	{string}	color	Color of the asset either as a hex value or rgba()
	 * @param 	{string}	status	Status of the asset (e.g., 'active') coming from the seatAsset
	 * @returns {string}			HTML svg element
	 */
	createShape(shape, width, height, color, status = '') {
		let svgShape;
		switch(shape) {
			//Circle
			case 'circle':
				svgShape = `<circle cx="${width / 2}" cy="${width / 2}" r="${(width / 2) - 1}" stroke="#484848" fill="${color}" stroke-width="0.5" ${status.length > 0 ? 'class="' + status + '"' : ''} />`;
				break;

			//Triangle
			case 'triangle':
				svgShape = `<polygon points="${width / 2} 0, ${width} ${height}, 0 ${height}" stroke="#484848" fill="${color}" stroke-width="0.5" ${status.length > 0 ? 'class="' + status + '"' : ''} />`;
				break;

			//Default
			default:
				svgShape = `<rect width="${width}" height="${height}" style="fill:${color}; stroke-width:0.5; stroke:#484848;" ${status.length > 0 ? 'class="' + status + '"' : ''} />`;
				break;
		}
		return svgShape;
	}
	
	/**
	 * Fetches map assets via ajax call then renders as html by calling renderAssets()
	 * 
	 * @param {function|undefined}	callback	Optional function to call after ajax
	 */
	fetchMapAssets(callback = undefined) {
		showLoader();
		let self = this;
		let params = new FormData();
		params.append('post_type', 'get_map_assets');
		params.append('mid', this.getMapID());
		params.append('event_id', this.getEventID());
		params.append('time_slot_id', this.getTimeSlotID());
		let successFunc = function(data){
			self.mapInfo = data.map_info;
			self.booths = data.booths;
			self.sections = data.sections;
			self.seats = data.seats;
			self.icons = data.icons;
			self.pictures = data.pictures;
			self.textBoxes = data.text_boxes;
			self.ticketRestrictions = data.ticket_restrictions || [];
			self.hwRatio = data.hw_ratio;

			self.renderAssets();
			
			//Check if callback is passed
			if(typeof(callback) == 'function') callback();
			hideLoader();
		}
		// Handle error
		let errorFunc = function(data){
			$('#ticket-checkout-seating-chart-section .error').text(data.err_msg);
		}
		let errorServerFunc = function(jqXHR, textStatus, errorThrown){
			$('#ticket-checkout-seating-chart-section .error').text(textStatus);
		}
		baseFuncsContentUpdate('event/event-page-elements-tickets-2022-06-13.php', params, successFunc, errorFunc, errorServerFunc, false, 0);
	}

	/**
	 * Clears assets on the map
	 */
	clearAssets() {
		$(this.viewElement + ' div').remove(); //Remove existing seats
		$(this.viewElement).css('background-color', 'white');	//Clear background
	}
	
	/**
	 * Calls all the render functions required for a map
	 */
	renderAssets() {
		this.renderBackground();
		this.renderBooths();
		this.renderSections();
		this.renderSeats();
		this.renderIcons();
		this.renderPictures();
		this.renderTextBoxes();
		
		//Reset event handlers
		this.setupEventListeners();

		if(this.mapSource == 'issue'){
			if (this.preselectAssetList.length > 0) this.preselectAssets();

			this.preselectAssetList.forEach((elID) => {
				const element = $(`[data-id=${elID}]`);
				const queueElement = [$(element).data('id'), $(element).data('content')];

				this.selectionQueue.push(queueElement);
			});

			if (this.selectionQueue.length > 0) {
				this.selectionQueue.forEach((element) => {
					this.selectSeat($(`${this.viewElement} .seat-svg[data-id="${element[0]}"]`));
				});

				if (this.selectionQueue.length > 0) {
					this.selectionQueue.forEach((element) => {
						this.selectSeat($(`${this.viewElement} .seat-svg[data-id="${element[0]}"]`));
					});
				}
			}
		}
		
	}

	/**
	 * Render assets to the view element
	 */
	renderBackground(){
		this.resizeBackground();

		if(this.mapInfo.back_type == 'blank') $(this.viewElement).css({
			'background-color': this.mapInfo.back_color,
			'background-image': 'unset',
		});
		else if (this.mapInfo.back_type == 'image' || this.mapInfo.back_type == 'map') $(this.viewElement).css({
			'background-color': 'transparent',
			'background-image': 'url(/event-pics/' + this.mapInfo.back_2400 + ')',
			'background-size': 'contain',
			'background-repeat': 'no-repeat',
		});
	}

	renderBooths() {
		$(this.viewElement + ' .booth-svg').remove(); //Remove existing seats
		for(let a = 0; a < this.booths.length; a++) {
			let booth = this.booths[a], 
				id = booth.id,
				x = booth.pos_x * this.baseMapBW * this.hwRatio,
				y = booth.pos_y * this.baseMapBH,
				width = booth.width * this.baseMapBW * this.hwRatio,
				height = booth.height * this.baseMapBH,
				r = booth.rotate,
				color = booth.color,
				title = booth.title,
				description = booth.description,
				textColor = booth.text_color,
				fontSize = booth.text_size,
				amount = booth.amount,
				fees = booth.fees,
				blockStatus = booth.block,
				accessLimit = booth.access_limit,
				svgShape = this.createShape(booth.shape, width, height, color),
				selectedStatus = 0;
			// Dynamically set the font size using CSS clamp function
			let dynamicFontSize = `clamp(2px, 1.7vmin, ${fontSize}px)` ;
			let g = `
				<div class="booth-svg space-svg flex absolute" data-asset="space" data-shape="${booth.shape}" data-status="saved" data-id="${id}" data-selected="${selectedStatus}" data-bgcolor="${booth.color}" data-title="${title}" data-description="${description}" data-x="${booth.pos_x}" data-y="${booth.pos_y}" data-width="${booth.width}" data-height="${booth.height}" data-rotate="${booth.rotate}" data-text_size="${booth.text_size}" data-text_color="${booth.text_color}" data-amount="${amount}" data-fees="${fees}" data-block="${blockStatus}" data-access_limit="${accessLimit}" data-aspect_ratio="${(booth.shape == 'circle')}" style="height: ${(booth.shape == 'circle' ? width : height)}px; width: ${width}px; left: ${x}px; line-height: 100%; top: ${y}px; transform: rotate(${r}deg);">
					<svg width="${width}" height="${(booth.shape == 'circle' ? width : height)}">${svgShape}</svg>
					<div class="title strong truncate text-center absolute all-0 vertical-middle flex items-center justify-center" style="color: ${textColor}; font-size: ${dynamicFontSize}; height: ${(booth.shape == 'circle' ? width : height)}px; line-height: 100%; text-overflow: clip; width: ${width}px;">
						<div class="flex pre-wrap break-word text-center items-center justify-center" style="word-break:break-all; height: ${(booth.shape == 'circle' ? width : height)}px; line-height: 125%; max-height: 100%; max-width: 90%; width: ${width}px;">${title}</div>
					</div>
				</div>
			`;
			$(this.viewElement).append(g);
		}
	}

	renderSections() {
		$(this.viewElement + ' .section-svg').remove(); //Remove existing seats
		for(let a = 0; a < this.sections.length; a++) {
			let section = this.sections[a],
				id = section.id,
				x = section.pos_x * this.baseMapBW * this.hwRatio,
				y = section.pos_y * this.baseMapBH,
				width = section.width * this.baseMapBW * this.hwRatio,
				height = (section.shape == 'circle' ? width : section.height * this.baseMapBH),
				r = section.rotate,
				color = section.color,
				title = section.title,
				description = section.description,
				textColor = section.text_color,
				fontSize = section.text_size,
				svgShape = this.createShape(section.shape, width, height, color);
			// Dynamically set the font size using CSS clamp function
			let dynamicFontSize = `clamp(2px, 1.7vmin, ${fontSize}px)` ;
			let g = `
				<div class="section-svg flex absolute" data-asset="section" data-shape="${section.shape}" data-status="saved" data-id="${id}" data-selected="0" data-bgcolor="${section.color}" data-title="${title}" data-description="${description}" data-x="${section.pos_x}" data-y="${section.pos_y}" data-width="${section.width}" data-height="${section.height}" data-rotate="${section.rotate}" data-text_size="${section.text_size}" data-text_color="${section.text_color}" data-aspect_ratio="${(section.shape == 'circle')}" style="height: ${height}px; left: ${x}px; top: ${y}px; transform: rotate(${r}deg);" title="${title}">
					<svg width="${width}" height="${(section.shape == 'circle' ? width : height)}">${svgShape}</svg>
					<div class="title strong  text-center absolute all-0 vertical-middle flex items-center justify-center" style="color: ${textColor}; font-size: ${dynamicFontSize}; height: ${height}px; line-height: 100%; text-overflow: clip; width: ${width}px;">
						<div class="flex pre-wrap text-center items-center justify-center" style="word-break:break-word;color: ${textColor}; min-height: ${height}px; height:auto; line-height: 125%; max-height: 100%; max-width: 90%; width: 90%;">${title}</div>
					</div>
				</div>
			`;
			$(this.viewElement).append(g);
		}
	}


	createHoverBadge() {
		// Remove any existing hover badge
		$('#seat-hover-badge').remove();
		// Create a new badge element and append it to the body
		$('body').append(`
			<div id="seat-hover-badge" class="hidden" style=" position: absolute; z-index: 9999; background: white; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); width: 250px; padding: 16px; pointer-events: none; transition: opacity 0.2s; opacity: 0; border-top: 5px solid #08A6A0;">
				<div class="seat-name" style="font-size: 12px; color: #777; margin-bottom: 4px;">SEAT NAME</div>
				<div class="seat-name-content" style="font-size: 24px; font-weight: bold; padding-bottom: 8px; border-bottom: 2px solid #DDDDDD; margin-bottom: 12px;"></div>
				<div class="seat-badge-name" style="font-size: 12px; color: #777; margin-bottom: 4px;">SECTION NAME</div>
				<div class="seat-badge-content" style="font-size: 24px; font-weight: bold; padding-bottom: 8px; border-bottom: 2px solid #DDDDDD; margin-bottom: 12px;"></div>
				<div class="seat-badge-price-row" style="display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 2px solid #DDDDDD;">
					<div class="seat-badge-price-label" style="font-size: 12px; color: #7E7E7E;">Per seat</div>
					<div class="seat-badge-price" style="font-size: 12px; color: #7E7E7E;"></div>
				</div>
				<div class="seat-badge-desc-label" style="font-size: 12px; color: #777; margin-bottom: 4px; margin-top: 4px;">DESCRIPTION</div>
				<div class="seat-badge-description" style="font-size: 12px; line-height: 1.4;"></div>
			</div>
		`);
	}

	setupHoverEvents() {
		const self = this;
		
		// First ensure the badge element exists
		if ($('#seat-hover-badge').length === 0) {
			this.createHoverBadge();
		}
		
		// Add event listeners to all available seats
		$('.seat-svg:not(.unavailable)').off('pointerenter pointerleave pointermove touchend');
		
		// Show badge on pointerenter
		$('.seat-svg:not(.unavailable)').on('pointerenter', function(e) {
			const $seat = $(this);
			let seatName = $seat.attr('data-title') || $seat.attr('data-content') || '';
			seatName = (seatName && seatName !== 'null' && seatName.trim() !== '') ? seatName : '---';
			const seatSectionName = $seat.attr('data-section-name') || '---';
			const seatPrice = $seat.attr('data-price') || '---';
			const seatDescription = $seat.attr('data-description') || '---';
			
			// Update seat name
			$('#seat-hover-badge .seat-name-content').text(seatName);

			// Update section name
			if (seatSectionName === '---') {
				$('#seat-hover-badge .seat-badge-name').addClass('hide');
				$('#seat-hover-badge .seat-badge-content').addClass('hide');
			}else{
				$('#seat-hover-badge .seat-badge-name').removeClass('hide');
				$('#seat-hover-badge .seat-badge-content').removeClass('hide').text(seatSectionName);
			}

			// Update price
			if (seatPrice === '---') {
				$('.seat-badge-price-row').addClass('hide');
			} else {
				$('.seat-badge-price-row').removeClass('hide');
				$('#seat-hover-badge .seat-badge-price').text(seatPrice);
			}

			// Update description
			if(seatDescription === '---'){
				$('#seat-hover-badge .seat-badge-desc-label').addClass('hide');
				$('#seat-hover-badge .seat-badge-description').addClass('hide');
			} else {
				$('#seat-hover-badge .seat-badge-desc-label').removeClass('hide');
				$('#seat-hover-badge .seat-badge-description').removeClass('hide');
				$('#seat-hover-badge .seat-badge-description').html(seatDescription.replace(/\n/g, '<br>'));
			}
			
			// Show badge with transition
			$('#seat-hover-badge')
				.removeClass('hidden')
				.css({
					'opacity': '1',
					'top': (e.pageY + 20) + 'px',
					'left': (e.pageX + 10) + 'px'
				});
		});
		
		// Hide badge on pointerleave
		$('.seat-svg:not(.unavailable)').on('pointerleave', function() {
			$('#seat-hover-badge')
				.css('opacity', '0')
				.addClass('hidden');
		});
		
		// Move badge with cursor
		$('.seat-svg:not(.unavailable)').on('pointermove', function(e) {
			$('#seat-hover-badge').css({
				'top': (e.pageY + 20) + 'px',
				'left': (e.pageX + 10) + 'px'
			});
		});

		// Force clear on mobile
		$('.seat-svg:not(.unavailable)').on('touchend', function () {
			$('#seat-hover-badge')
				.css('opacity', '0')
				.addClass('hidden');
		});
	}

	renderSeats() {
		$(this.viewElement + ' .seat-svg').remove(); //Remove existing seats

		const fragment = document.createDocumentFragment(); // Batch DOM insertion

		//Render seating chart
		for (let a = 0; a < this.seats.length; a++) {
			let seat = this.seats[a],
				id = seat.id,
				x = seat.pos_x * this.baseMapBW * this.hwRatio,
				y = seat.pos_y * this.baseMapBH,
				width = seat.width * this.baseMapBW * this.hwRatio,
				height = seat.height * this.baseMapBH,
				rotation = seat.rotate,
				color = seat.color,
				content = seat.content,
				textColor = seat.text_color,
				shape = seat.shape,
				fontSize = seat.text_size,
				svgShape = '',
				activeHolderInd = $('#ticket-checkout-modal .attendee-seat-display.active').data('holder_id'),
				activeTimeSlotID = $('#ticket-checkout-modal .attendee-seat-display.active').data('time_slot_id'),
				classStatus = '',
				status;
			
			// Only update activeTicketID if we're in checkout modal (not hidden) and have an active attendee
			if (!$('#ticket-checkout-modal').hasClass('hide')) {
				const checkoutActiveTicketID = $('#ticket-checkout-modal .attendee-seat-display.active').data('ticket_id');
				if (checkoutActiveTicketID !== undefined) {
					this.activeTicketID = checkoutActiveTicketID;
				}
			}


			// Get additional seat data for the hover badge
			let seatPrice = '---';
			if (seat.section_price && seat.section_price > 0) {
				seatPrice = seat.section_currency + parseFloat(seat.section_price).toFixed(2);
			}
			if(Object.values(this.selectedSeatInfo).length > 0 && this.selectedSeatInfo[this.activeTicketID] && this.selectedSeatInfo[this.activeTicketID][activeHolderInd] && this.selectedSeatInfo[this.activeTicketID][activeHolderInd]['seatID'] == id){
				classStatus = 'active';
			}
			if(this.showUnavailableSeats){ // sometimes don't need to show unavailable seats and only view seat map only
				//Set selected status (buyer side)
				if(classStatus.length == 0 && Object.values(this.selectedSeatInfo).length > 0) {
					const selectedSeatInfoFlat = Object.values(this.selectedSeatInfo).flat(); // [{seatID: a, timeSlotID: b}, {seatID: c, timeSlotID: d}, ...] //
					for (let a = 0; a < selectedSeatInfoFlat.length; a++){
						// seat has been selected on page, and one of the following:
						// selectedSeatInfo[a]['timeSlotID'] = activeTimeSlotID: for the current slot we are selecting the seat for, this seat has been selected
						// selectedSeatInfo[a]['timeSlotID'] = 0: this seat is taken at all times, can't be selected now
						// activeTimeSlotID = 0: this seat has been selected, and the current ticket needs all times availability
						if (selectedSeatInfoFlat[a]['seatID'] == id && (selectedSeatInfoFlat[a]['timeSlotID'] == activeTimeSlotID || selectedSeatInfoFlat[a]['timeSlotID'] == 0 || activeTimeSlotID == 0)){
							classStatus = 'selected';
							break;
						}
					}
				}

				// Check ticket section restrictions
				if(seat.ticket_purchase_id === '0' && seat.reserved === '0') {
					// Seat is initially available, but check if current ticket is restricted from this section
					if(this.isTicketRestrictedFromSection(this.activeTicketID, seat.section_id)) {
						status = 'unavailable';
					} else {
						status = 'available';
					}
				} else if(seat.ticket_purchase_id === '0' && seat.reserved === '1') {
					status = 'unavailable';
				} else {
					status = 'unavailable';
				}
			}else{
				classStatus = 'available';
				status = 'available';
			}
			//Set availability
			
			// Dynamically set the font size using CSS clamp function
			let dynamicFontSize = `clamp(2px, 1.7vmin, ${fontSize}px)` ;

			// CUSTOM: Change text size to 0 for Blast Events only. (if unavailable)
			if (this.#eventID == 23697 && status == 'unavailable') {
				dynamicFontSize = '0px';
			}

			svgShape = this.createShape(shape, width, height, color, (classStatus == 'active') ? 'active' : '');

			let div = document.createElement('div');
			div.className = `seat-svg flex absolute ${status} ${classStatus}`;
			div.dataset.status = status;
			div.dataset.content = content;
			div.dataset.id = id;
			div.dataset.type = seat.section_name || '---';
			div.dataset.price = seatPrice;
			div.dataset.description = seat.section_description || '---';
			div.dataset.sectionId = seat.section_id;
			div.dataset.sectionName = seat.section_name;
			div.dataset.sectionPrice = seat.section_price;
			div.dataset.sectionCurrency = seat.section_currency;
			div.style.cssText = `
				height: ${(shape == 'circle' ? width : height)}px;
				left: ${x}px;
				top: ${y}px;
				transform: rotate(${rotation}deg);
				z-index: 1;
			`;
			div.innerHTML = `
				<svg width="${width}" height="${(shape == 'circle' ? width : height)}">${svgShape}</svg>
				<div class="content strong truncate text-center absolute all-0" style="color: ${textColor}; font-size: ${dynamicFontSize}; height: ${(shape == 'circle' ? width : height)}px; line-height: 100%; text-overflow: clip; width: ${width}px;">
					<div class="flex pre-wrap break-word text-center items-center justify-center" style="word-break:break-all; height: ${(shape == 'circle' ? width : height)}px; line-height: 100%; max-height: 100%; max-width: 100%; width: ${width}px;">${content}</div>
				</div>
			`;

			fragment.appendChild(div);
		}

		// Append all at once
		const selectedViewElement = document.querySelector(this.viewElement);
		selectedViewElement.appendChild(fragment);
	}

	/**
	 * Check if a ticket is restricted from a section
	 * @param {number} ticketId - The ticket ID
	 * @param {number} sectionId - The section ID  
	 * @returns {boolean} - True if ticket is restricted from this section
	 */
	isTicketRestrictedFromSection(ticketId, sectionId) {
		// If no section ID, no restriction applies
		if(!sectionId || sectionId === '0' || sectionId === 0) {
			return false;
		}
		
		// If no ticket ID, no restriction applies  
		if(!ticketId || ticketId === '0' || ticketId === 0) {
			return false;
		}
		
		// Check if this section has any ticket restrictions
		let sectionHasRestrictions = false;
		let ticketIsAllowed = false;
		
		for(let restriction of this.ticketRestrictions) {
			if(restriction.section_id == sectionId) {
				sectionHasRestrictions = true;
				if(restriction.ticket_id == ticketId) {
					ticketIsAllowed = true;
					break;
				}
			}
		}
		
		// If section has restrictions but this ticket is not in the allowed list, restrict access
		if(sectionHasRestrictions && !ticketIsAllowed) {
			return true; // Ticket is restricted from this section
		}
		
		return false; // No restriction applies (either no restrictions or ticket is allowed)
	}

	/**
	 * Check if a ticket is restricted from a section
	 * @param {number} ticketId - The ticket ID
	 * @param {number} sectionId - The section ID  
	 * @returns {boolean} - True if ticket is restricted from this section
	 */
	isTicketRestrictedFromSection(ticketId, sectionId) {
		// If no section ID, no restriction applies
		if(!sectionId || sectionId === '0' || sectionId === 0) {
			return false;
		}
		
		// If no ticket ID, no restriction applies  
		if(!ticketId || ticketId === '0' || ticketId === 0) {
			return false;
		}
		
		// Check if this section has any ticket restrictions
		let sectionHasRestrictions = false;
		let ticketIsAllowed = false;
		
		for(let restriction of this.ticketRestrictions) {
			if(restriction.section_id == sectionId) {
				sectionHasRestrictions = true;
				if(restriction.ticket_id == ticketId) {
					ticketIsAllowed = true;
					break;
				}
			}
		}
		
		// If section has restrictions but this ticket is not in the allowed list, restrict access
		if(sectionHasRestrictions && !ticketIsAllowed) {
			return true; // Ticket is restricted from this section
		}
		
		return false; // No restriction applies (either no restrictions or ticket is allowed)
	}

	renderIcons() {
		$(this.viewElement + ' .icon-svg').remove();
		for(let a = 0; a < this.icons.length; a++) {
			let icon = this.icons[a],
				id = icon.id,
				x = icon.pos_x * this.baseMapBW * this.hwRatio,
				y = icon.pos_y * this.baseMapBH,
				width = icon.width * this.baseMapBW * this.hwRatio,
				height = icon.height * this.baseMapBH,
				r = icon.rotate,
				color = icon.color,
				title = icon.content !== null ? icon.content : '',
				textColor = icon.text_color,
				iconName = baseValidateString(title, 'length') ? title.split('|') : [];
			if(this.iconLibrary[iconName[1]] != undefined) {
				let g = `
					<div class="icon-svg flex absolute" data-asset="icon" data-id="${id}" data-status="saved" data-bgcolor="${icon.color}" data-x="${icon.pos_x}" data-y="${icon.pos_y}" data-width="${icon.width}" data-height="${icon.height}" data-rotate="${icon.rotate}" data-text_color="${icon.text_color}" style="height: ${height}px; left: ${x}px; top: ${y}px; transform: rotate(${r}deg); width: ${width}px;" title="${iconName[1]}">
						<div class="icon-bg rounded" style="background-color: ${color}; height: 100%; padding: ${(height * .1)}px ${(width * .1)}px;  width: 100%;">
							<div class="icon-tc height-full width-full" style="background-color: ${textColor}; -webkit-mask-image: url(/images/icons/map/${iconName[1]}.svg); mask-image: url(/images/icons/map/${iconName[1]}.svg); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; -mask-size: contain;"></div>
						</div>
					</div>
				`;
				$(this.viewElement).append(g);
			}
		}
	}

	renderPictures() {
		$(this.viewElement + ' .picture-svg').remove();
		for(let a = 0; a < this.pictures.length; a++) {
			let picture = this.pictures[a],
				id = picture.id,
				x = picture.pos_x * this.baseMapBW * this.hwRatio,
				y = picture.pos_y * this.baseMapBH,
				width = picture.width * this.baseMapBW * this.hwRatio,
				height = picture.height * this.baseMapBH,
				r = picture.rotate,
				imgSrc = picture.pic_1200;
			if(width < 150) imgSrc = picture.pic_150;
			else if(width < 300) imgSrc = picture.pic_300;
			else if(width < 600) imgSrc = picture.pic_600;
			let g = `
				<div class="picture-svg flex absolute" data-asset="picture" data-status="saved" data-id="${id}" data-x="${picture.pos_x}" data-y="${picture.pos_y}" data-width="${picture.width}" data-height="${picture.height}" data-rotate="${picture.rotate}" data-pic_1200="${picture.pic_1200}" data-pic_600="${picture.pic_600}" data-pic_300="${picture.pic_300}" data-pic_150="${picture.pic_150}" style="height: ${height}px; left: ${x}px; top: ${y}px; transform: rotate(${r}deg);">
					<img src="/event-pics/${imgSrc}" style="height: ${height}px; object-fit: fill; width: ${width}px;" alt="Image" />
				</div>
			`;
			$(this.viewElement).append(g);
		}
	}

	renderTextBoxes() {
		$(this.viewElement + ' .text-svg').remove();
		for(let a = 0; a < this.textBoxes.length; a++) {
			let textBox = this.textBoxes[a],
				id = textBox.id,
				x = textBox.pos_x * this.baseMapBW * this.hwRatio,
				y = textBox.pos_y * this.baseMapBH,
				width = textBox.width * this.baseMapBW * this.hwRatio,
				height = textBox.height * this.baseMapBH,
				r = textBox.rotate,
				color = textBox.color !== undefined ? textBox.color : '#FFFFFF',
				textColor = textBox.text_color !== undefined ? textBox.text_color : '#000000',
				fontSize = textBox.text_size !== undefined ? Math.floor(textBox.text_size * (this.baseMapBW / 1400)) : '16',
				title = textBox.content !== null ? textBox.content : '';
			let g = `
				<div class="text-svg flex absolute" data-asset="content" data-status="saved" data-id="${id}" data-selected="0" data-bgcolor="${color}" data-x="${textBox.pos_x}" data-y="${textBox.pos_y}" data-width="${textBox.width}" data-height="${textBox.height}" data-rotate="${textBox.rotate}" data-text_size="${(textBox.text_size == undefined ? '16' : textBox.text_size)}" data-text_color="${textColor}" data-content="${title}" style="background-color: ${color}; color: ${textColor}; height: ${height}px; left: ${x}px; top: ${y}px; transform: rotate(${r}deg); width: ${width}px; z-index: 0;">
					<div class="content strong truncate text-center absolute all-0 vertical-middle flex items-center justify-center" style="font-size: ${fontSize}px; height: ${height}px; line-height: 100%; text-overflow: clip; width: ${width}px;">
						<div class="content-text flex pre-wrap break-word text-center items-center justify-center overflow-hidden" contenteditable="false" style="height: 90%; line-height: 125%; max-height: 90%; max-width: 90%; width: 90%;">${title}</div>
					</div>
				</div>
			`;
			$(this.viewElement).append(g);
		}
	}

	/**
	 * [Helper] Clears section information display for a specific seat
	 * 
	 * @param	{number}	ticketId	Ticket ID
	 * @param	{number}	holderId	Holder ID
	 */
	#clearSectionInfo(ticketId, holderId) {
		const $seatDisplay = $(`#ticket-checkout-modal .attendee-seat-display[data-ticket_id="${ticketId}"][data-holder_id="${holderId}"]`);
		const $sectionInfo = $seatDisplay.find('.seat-section-info');
		$sectionInfo.hide();
		$sectionInfo.find('.section-name-value').text('--');
		$sectionInfo.find('.section-price-value').text('--');
	}

	/**
	 * [Attendee side] Assigns and displays the seat to the active attendee on the ticket purchase modal
	 * 
	 * @param	{Object}	asset		Selected seat asset
	 * @param	{number}	ticketId	Ticket ID of the active user
	 * @param	{number}	holderId	Holder ID of the active user
	 */
	#displaySelections(asset, ticketId, holderId) {
		let holderIndex = $('#ticket-checkout-modal .attendee-seat-display.active .seat-name').data('holder_id');
		const holderTimeSlotID = $('#ticket-checkout-modal .attendee-seat-display.active').data('time_slot_id');
		let seatPrice = asset.data('price') || 0;
		let seatDescription = asset.data('description') || '';
		let seatSectionName = asset.attr('data-section-name') || ''; 
		let seatCurrency = asset.attr('data-section-currency') || '$';
		let sectionPrice = asset.attr('data-section-price') || '0';
		let totalPrice = asset.data('total_price') || 0;
		
		// Get ticket base price
		let ticketPrice = 0;
		const $ticketSelector = $(`.ticket-count-selector[data-id="${ticketId}"]`);
		if ($ticketSelector.length > 0) {
			ticketPrice = parseFloat($ticketSelector.data('price')) || 0;
		}
		
		// Calculate total price (ticket price + section price)
		let calculatedTotalPrice = ticketPrice + parseFloat(sectionPrice);
		
		// Clear any previous section info for this holder first
		this.#clearSectionInfo(ticketId, holderId);

		//Assign seat to active attendee
		this.holderList[ticketId][holderId]['seat'] = asset.data('id');
		$('#ticket-checkout-modal .attendee-seat-display.active .seat-name')
			.html(asset.data('content'))
			.attr('data-seat_id', asset.data('id'));
		$('#ticket-checkout-modal .attendee-seat-display.active').attr({
			'data-status': 'assigned',
			'data-seat_id': asset.data('id'),
		});
		$('#ticket-checkout-modal .attendee-seat-display.active').addClass('selected');
		
		// Update section information display
		const $activeSeatDisplay = $('#ticket-checkout-modal .attendee-seat-display.active');
		const $sectionInfo = $activeSeatDisplay.find('.seat-section-info');
		
		// Update the new section name and price elements in ticket-info area
		if (seatSectionName.length > 0) {
			$activeSeatDisplay.find('.section-name-value').text(seatSectionName).removeClass('hide');
		} else {
			$activeSeatDisplay.find('.section-name-value').addClass('hide');
		}
		$activeSeatDisplay.find('.section-price-value').text(seatCurrency + calculatedTotalPrice.toFixed(2)).removeClass('hide');
		
		if (seatSectionName && seatSectionName !== 'No section' && seatSectionName !== 'no section' && seatSectionName.trim() !== '') {
			// Show section info
			$sectionInfo.show();
			$sectionInfo.find('.section-name-value').text(seatSectionName);
			// Display total price (ticket + section)
			$sectionInfo.find('.section-price-value').text(seatCurrency + calculatedTotalPrice.toFixed(2));
		} else {
			// Hide section info if no section
			$sectionInfo.hide();
		}
		
		if (!this.selectedSeatInfo[ticketId]) {
			this.selectedSeatInfo[ticketId] = [];
		}
		this.selectedSeatInfo[ticketId][holderIndex] = { // temporarily store ticketID => holder => selection, overwrite when changing seats on the map
			'seatID': asset.data('id'),
			'timeSlotID': holderTimeSlotID,
			'seatPrice': seatPrice,
			'seatDescription': seatDescription,
			'seatSectionName': seatSectionName,
			'sectionPrice': sectionPrice,
			'sectionCurrency': seatCurrency,
			'ticketPrice': ticketPrice,
			'totalPrice': calculatedTotalPrice,
		};
	}

	/**
	 * [EO side] Lists the seat name below the corresponding ticket on the ticket issuance modal
	 * 	and assigns a hidden input value
	 */
	#updateSelectedSeats() {
		let seatNames = '',
			seatIDs = '',
			seatCount = 0;
		//Loop through selectionQueue to build seat name list
		this.selectionQueue.forEach((ele, ind) => {
			if(ind === 0) {
				seatIDs += ele[0];
				seatNames += ele[1];
			} else {
				seatIDs += `, ${ele[0]}`;
				seatNames += `, ${ele[1]}`;
			}
			seatCount++
		});

		//Show/hide supporting text based off the number of selections
		if(seatIDs.length > 0) {
			$(this.label).removeClass('hide');
			$(`${this.containerElement} .seat-selected`).removeClass('hide');
			$(`${this.containerElement} .seat-select-prompt`).addClass('hide');
		} else {
			$(this.label).addClass('hide');
			$(`${this.containerElement} .seat-selected`).addClass('hide');
			$(`${this.containerElement} .seat-select-prompt`).removeClass('hide');
		}

		if(this.mapSource === 'list') {
			//Disable save btn if no seats are selected
			$(this.actionBtn).attr('disabled', seatIDs.length === 0);

			// this input is used on ticket detail only but not functional to users
			$(`input[name="seat"]`).val(seatIDs);
		} else {
			// issue ticket
			$(this.label).text(seatNames);

			this.issueTicketOnSeatSelect(seatIDs, seatNames);
		}
		$(`${this.containerElement} .seat-name`).text(seatNames); // update seat name in real time as selected
	}

	/**
	 * Formats the ticket holder list with seat IDs to append to FormData paramters
	 * 
	 * @param 	{Object}	params	FormData Object
	 * @returns	{Object}			FormData Object with seat selection information
	 */
	formatHolderList(params) {
		Object.keys(this.holderList).forEach((ticketID) => {
			Object.keys(this.holderList[ticketID]).forEach((holderID) => {
				params.append(`seat[${ticketID}][${holderID}]`, `${JSON.stringify(this.holderList[ticketID][holderID])}`);
			});
		});
		return params;
	}

	/**
	 * This deselected the seat by removing the class `active`
	 * 
	 * @param {Number} seatID ID of the seat asset
	 */
	deselectSeat(seatID) {
		const activeSeatClassName = this.mapSource === 'issue' ? 'selected' : 'active'; // selected mark the seat as faded instaed of the active teal color
		$(`${this.viewElement} .seat-svg[data-id="${seatID}"]`).removeClass(activeSeatClassName);
		$(`${this.viewElement} .seat-svg.active[data-id="${seatID}"]`).find('circle, polygon, rect').removeClass(activeSeatClassName);
	}

	/**
	 * Selects the clicked seat by adding the class `active`
	 * 
	 * @param {Object} element HTML element that the user clicked on
	 */
	selectSeat(element) {
		// Add selection
		const activeSeatClassName = this.mapSource === 'issue' ? 'selected' : 'active'; // selected mark the seat as faded instaed of the active teal color
		element.addClass(activeSeatClassName);
		element.find('circle, polygon, rect').addClass(activeSeatClassName);
	}

	/**
	 * Preselects a list of assets
	 */
	preselectAssets() {
		this.preselectAssetList.forEach((element) => {
			this.selectSeat($(`${this.viewElement} .seat-svg[data-id="${element}"]`));
		});
	}
	
	/**Seat Selection */
	setUpSeatSelection() {
		$('#loader').fadeOut(500); //Hide loader
		let self = this;
		
		//Seat selection
		$(`${self.containerElement} .seat-svg:not(.unavailable):not(.selected)`).off();
		$(`${self.containerElement} .seat-svg:not(.unavailable):not(.selected)`).on('click', function(){
			/**
			 * 2 Scenarios:
			 * 	- Issuing tickets [EO side] => maxTickets will be based off the dropdown value. If 0, prompt the user to select a number
			 * 	- Purchasing tickets [Attendee side] => maxTickets will always be 1 since we cycle through the attendees
			 */
			let maxTickets = 1,
				targetAsset = [$(this).data('id'), $(this).data('content')];

			if (self.mapSource === 'issue') {
				maxTickets = self.issueTicketMaxTicket;
			}
			// Force user to select a dropdown value (Only for issuing tickets)
			if (maxTickets === 0) {
				$(`${self.containerElement} .error-msg`).text('Please select the number of tickets to issue.').removeClass('hide');
				return;
			}

			// Check ticket type restrictions for this seat
			if(self.mapSource === 'ticket') { // Only for ticket purchase flow
				let seatSectionId = $(this).data('section-id');
				let currentTicketId = self.activeTicketID;
				
				if(self.isTicketRestrictedFromSection(currentTicketId, seatSectionId)) {
					$(`${self.containerElement} .error-msg`).text('This seat is restricted to certain ticket types. Please select a different seat.').removeClass('hide');
					return;
				}
			}

			// If a user clicks on the same seat twice, remove from queue
			let existingIndex = self.selectionQueue.findIndex((e) => e[0] === targetAsset[0]);
			if(existingIndex !== -1) {
				self.selectionQueue.splice(existingIndex, 1);
				self.deselectSeat(targetAsset[0]);
				self.#updateSelectedSeats();

				return;
			}

			// Add the selection to a queue. The selection will be in the form [seat_id, seat_name]
			self.selectionQueue.push(targetAsset);

			// If the seats selected exceeds the quantity of tickets, remove first entry
			if(self.selectionQueue.length > maxTickets) {
				let removedSeat = self.selectionQueue.shift();
				self.deselectSeat(removedSeat[0]);
			}

			// Change the asset status to `active`
			self.selectSeat($(this));

			// Hide any existing error messages
			$(`${self.containerElement} .error-msg`).text('').addClass('hide');

			// Show the selected seat as a text
			if(self.mapSource === 'issue' || self.mapSource === 'list') {
				self.#updateSelectedSeats();
			} else {
				// Ticket checkout
				self.#displaySelections($(this), $('.attendee-seat-display.active').data('ticket_id'), $('.attendee-seat-display.active').data('holder_id'));
			}
		});
	}

	/**
	 * Sets event listeners
	 */
	setupEventListeners() {
		let self = this;		
		// Seat selection
		self.setUpSeatSelection();

		// Setup hover events for seat badges
		self.setupHoverEvents();

		// Map Slider
		// TODO: Bandaid solution for now.
		//  We mix base-map-zoom-slider and map-zoom-slider. Consolidate these.
		$(`.base-map-zoom-slider, ${this.mapZoomSliderSource}-zoom-slider`).slider({
			max: self.mapZoomMax, 
			min: self.mapZoomMin, 
			range: 'min', 
			step: 0.01, 
			create: function(){
				self.mapZoom = parseFloat($(this).slider('value').toFixed(2));
				self.mapZoomFunc();
			},
			value: self.mapZoom, 
			slide: function(event, ui){
				self.mapZoom = parseFloat(ui.value.toFixed(2));
				self.mapZoomFunc();
			}, 
		});
		
		// Slider buttons 
		$(`.map-slider-zoom-btn-increase, ${self.containerElement} .map-zoom-toggle-btn-increase`).off('click');
		$(`.map-slider-zoom-btn-increase, ${self.containerElement} .map-zoom-toggle-btn-increase`).on('click', function(e) {
			self.zoomInMap();
		});

		$(`.map-slider-zoom-btn-decrease, ${self.containerElement} .map-zoom-toggle-btn-decrease`).off('click');
		$(`.map-slider-zoom-btn-decrease, ${self.containerElement} .map-zoom-toggle-btn-decrease`).on('click', function(e) {
			self.zoomOutMap();
		});
	}

	/**
	 * Initialze zoom values when map first loads
	*/
	initializeMap() {
		// Get current zoom 
		this.mapZoom = $(this.containerElement).width() / this.mapBackgroundViewDefaultWidth ;
		this.mapZoom = Math.floor(this.mapZoom * 100) / 100;
		
		// Zoom the map with current value
		this.mapZoomFunc();
	}

	/**
	 * Reset Map background width and height as we zoom
	*/
	resetBackgroundHeightAndWidth() {
		baseMapBW = $(this.containerElement).width();
		baseMapBH = baseMapBW * 0.625 * baseMapHWRatio;
		$(this.viewElement).width(baseMapBW).height(baseMapBH);
	}

	/**
	 * Handles new values set by the zoom slider
	*/
	mapZoomFunc() {	
		let currentValue = this.mapZoom * this.mapBackgroundViewDefaultWidth;

		// Make the scrollable container wider as we zoom
		$(this.containerElement).css({ width: currentValue + 'px' });

		
		// Zoom slider value and text
		$(`#base-map-zoom-slider-container .base-map-zoom-slider .ui-slider-handle`).css('left',`${((this.mapZoom - this.mapZoomMin) / (this.mapZoomMax - this.mapZoomMin) * 100).toFixed(2)}%`);
		$(`#base-map-zoom-slider-container [data-type="value"]`).html(parseInt(this.mapZoom * 100) + '%');
		$(`${this.mapZoomSliderSource}-zoom-slider`).slider({ value: this.mapZoom });
		$(`${this.mapZoomSliderSource}-zoom-toggle-btn [data-type="value"]`).text(Math.round(this.mapZoom * 100) + '%');

		// Use transform on new maps, render on old maps using map-booths-funcs
		const legacy = !(this.viewElement === '#seating-chart-preview-background-view' || this.viewElement === '#seating-chart-background-view' || this.viewElement.includes('.seat-map-view'));
		
		// Visually scale map that has already rendered
		if (!legacy) {
			$(this.viewElement).css({
				transform: `scale(${this.mapZoom})`,
				transformOrigin: 'top left'
			});
			
		// Map background is rendered from the map-booths-funcs
		} else {
			this.resetBackgroundHeightAndWidth();
			baseMapUpdateMap();
		}

	}


	// Zoom out Map
	zoomOutMap() {
		if(this.mapZoom- this.zoomBtnStep < this.mapZoomMin) this.mapZoom = this.mapZoomMin;
		else this.mapZoom -= this.zoomBtnStep;
		this.mapZoomFunc();
	}

	// Zoom in Map
	zoomInMap() {
		if(this.mapZoom + this.zoomBtnStep > this.mapZoomMax)this.mapZoom = this.mapZoomMax;
		else this.mapZoom += this.zoomBtnStep;
		this.mapZoomFunc();
	}

}