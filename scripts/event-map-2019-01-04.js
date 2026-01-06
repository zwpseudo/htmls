/**
 * Future TODO: Use MapElement class
 */

let baseMapBW = 0,
	baseMapBH = 0;
const mapIconsLibrary = MapIconList.getAllIcons();

//Instance of the map class
let mapObjectApplicant = new MapElement(mID, eventID, '#background-view-container','#background-view', '#map');

mapObjectApplicant.initializeMap();
mapObjectApplicant.setupEventListeners();

$(window).on('resize', function(){
	mapObjectApplicant.resetBackgroundHeightAndWidth();
	baseMapUpdateMap();
});

function baseMapUpdateMap(){
	//Icons
	$('#background-view .icon-svg[data-status="saved"]').remove();
	$.each(icons, function(i,v){
		const title = v.content !== null ? v.content : '',
			iconName = baseValidateString(title, 'length') ? title.split('|')[1] : '';

		let iconHtml = '';
		if(mapIconsLibrary[iconName] != undefined) {
			const iconObj = new MapIcon(i, 'icon', iconName, iconName, {
				backgroundColor: v.color,
				iconColor: v.text_color,
				height: v.height * baseMapBH,
				width: v.width * baseMapBW * baseMapHWRatio,
				x: v.pos_x * baseMapBW * baseMapHWRatio,
				y: v.pos_y * baseMapBH,
				rotate: v.rotate,
			});
			iconHtml = iconObj.buildIconPublic();
		}
		$('#background-view').append(iconHtml);
	});
	//Pictures
	$('#background-view .picture-svg[data-status="saved"]').remove();
	$.each(pictures, function(i,v){
		var x = v.pos_x * baseMapBW * baseMapHWRatio, 
			y = v.pos_y * baseMapBH, 
			w = v.width * baseMapBW * baseMapHWRatio, 
			h = v.height * baseMapBH, 
			r = v.rotate, 
			s = v.pic_1200;
		if(w < 150) s = v.pic_150;
		else if(w < 300) s = v.pic_300;
		else if(w < 600) s = v.pic_600;
		var g = '<div class="picture-svg flex" data-status="saved" data-id="' + i + '" style="position: absolute; left: ' + x + 'px; top: ' + y + 'px; transform: rotate(' + r + 'deg); z-index: 0;">' + 
					'<img src="/event-pics/' + s + '" style="height: ' + h + 'px; object-fit: fill; width: ' + w + 'px;" />' + 
				'</div>';
		$('#background-view').append(g);
	});
	//Text boxes
	$('#background-view .text-svg[data-status="saved"]').remove();
	$.each(contents, function(i,v){
		var x = v.pos_x * baseMapBW * baseMapHWRatio, 
			y = v.pos_y * baseMapBH, 
			w = v.width * baseMapBW * baseMapHWRatio, 
			h = v.height * baseMapBH, 
			r = v.rotate, 
			t = v.content,
			fS = v.text_size * (baseMapBW / 1400),
			c = v.color,
			tC = v.text_color;
		var g = '<div class="text-svg flex" data-status="saved" data-id="' + i + '" style="background-color: ' + c + '; color: ' + tC + '; height: ' + h + 'px; position: absolute; left: ' + x + 'px; top: ' + y + 'px; transform: rotate(' + r + 'deg); width: ' + w + 'px; z-index: 1;">' + 
					'<div class="content strong truncate text-center absolute all-0 vertical-middle flex items-center justify-center" style="font-size: ' + fS + 'px; height: ' + h + 'px; line-height: 100%; text-overflow: clip; width: ' + w + 'px;">' + 
						'<p class="content-text flex pre-wrap break-word text-center items-center justify-center" style="height: 90%; line-height: 125%; max-height: 90%; max-width: 90%; width: 90%;">' + t + '</p>' + 
					'</div>' + 
				'</div>';
		$('#background-view').append(g);
	});
	//Sections
	$('#background-view .section-svg[data-status="saved"]').remove();
	$('.view-section-btn').each(function(i,v){
		if($(this).data('on_map') == 1){
			let s = $(this).data('shape'),
				x = $(this).data('pos_x') * baseMapBW * baseMapHWRatio,
				y = $(this).data('pos_y') * baseMapBH,
				w = $(this).data('width') * baseMapBW * baseMapHWRatio,
				h = (s == 'circle' ? w :  $(this).data('height') * baseMapBH),
				r = $(this).data('rotate'),
				c = $(this).data('color'),
				t = $(this).data('title'),
				tC = $(this).data('text_color'),
				i = $(this).data('id'),
				fS = $(this).data('text_size') * (baseMapBW / 1400),
				svgShape;
			switch(s) {
				//Circle
				case 'circle':
					svgShape = '<circle cx="' + w / 2 + '" cy="' + w / 2 + '" r="' + (w / 2 - 1) + '" stroke="#484848" fill="' + c + '" stroke-width="0.5" />';
					break;

				//Triangle
				case 'triangle':
					svgShape = '<polygon points="' + w / 2 + ' 0, ' + w + ' ' + h +  ', 0 ' + h + '" stroke="#484848" fill="' + c + '" stroke-width="0.5" />';
					break;

				//Default
				default:
					svgShape = '<rect width="' + w + '" height="' + h + '" style="fill:' + c + '; stroke-width:0.5; stroke:#484848;" />';
					break;
			}
			let g = `
				<div class="section-svg flex-inline" data-status="saved" data-id="${i}" style="left: ${x}px; top: ${y}px; transform: rotate(${r}deg); z-index: 1;">
					<svg width="${w}" height="${s == 'circle' ? w : h}">${svgShape}</svg>
					<div class="title strong truncate text-center absolute all-0" style="color: ${tC}; font-size: ${fS}px;  height: ${(s == 'circle' ? w : h)}px; line-height: 100%; text-overflow: clip; width: ${w}px;"> 
							<div class="flex pre-wrap break-word text-center items-center justify-center" style="word-break:break-all;height: ${(s == 'circle' ? w : h)}px; line-height: 100%; max-height: 100%; max-width: 100%; width: ${w}px;">${t}</div>
						</div>
					</div>
			`;
			$('#background-view').append(g);
		}
	});
	$('#background-view .section-svg[data-status="saved"]').off('click');
	$('#background-view .section-svg[data-status="saved"]').on('click', function(e){
		e.preventDefault();
		$('.view-section-btn[data-id="' + $(this).data('id') + '"]').click();
	});
	//Booths & Spaces
	$('#background-view .space-svg[data-status="saved"]').remove();
	$('.view-space-btn').each(function(i,v){
		var s = $(this).data('shape');
		var x = $(this).data('pos_x') * baseMapBW * baseMapHWRatio;
		var y = $(this).data('pos_y') * baseMapBH;
		var w = $(this).data('width') * baseMapBW * baseMapHWRatio;
		var h = $(this).data('height') * baseMapBH;
		var r = $(this).data('rotate');
		var c = $(this).data('color');
		var t = $(this).data('title');
		var bn = $(this).data('business_name');
		var cat = $(this).data('category');
		var tC = $(this).data('text_color');
		var i = $(this).data('id');
		var fS = $(this).data('text_size') * (baseMapBW / 1400),
			svgShape = '';
		switch(s) {
			//Circle
			case 'circle':
				svgShape = '<circle cx="' + w / 2 + '" cy="' + w / 2 + '" r="' + (w / 2 - 1) + '" stroke="#484848" fill="' + c + '" stroke-width="0.5" />';
				break;

			//Triangle
			case 'triangle':
				svgShape = '<polygon points="' + w / 2 + ' 0, ' + w + ' ' + h +  ', 0 ' + h + '" stroke="#484848" fill="' + c + '" stroke-width="0.5" />';
				break;

			//Default
			default:
				svgShape = '<rect width="' + w + '" height="' + h + '" style="fill:' + c + '; stroke-width:0.5; stroke:#484848;" />';
				break;
		}
		var g = '<div class="space-svg flex search-element" data-title="' + t + ' - ' + bn + cat + '" data-name="'+ cat +'" data-status="saved" data-id="' + i + '" style="height: ' + (s == 'circle' ? w : h) + 'px; left: ' + x + 'px; top: ' + y + 'px; transform: rotate(' + r + 'deg); z-index: 1;">' + 
					'<svg width="' + w + '" height="' + (s == 'circle' ? w : h) + '">' + svgShape + '</svg>' + 
					'<div class="title strong truncate text-center absolute all-0" style="color: ' + tC + '; font-size: ' + fS + 'px; height: ' + (s == 'circle' ? w : h) + 'px; line-height: 100%; text-overflow: clip; width: ' + w + 'px;">' + 
						'<div class="flex pre-wrap break-word text-center items-center justify-center" style="word-break:break-all;height: ' + (s == 'circle' ? w : h) + 'px; line-height:  ' + (fS * 1.2) + 'px; max-height: 100%; max-width: 100%; width: ' + w + 'px;">' + t + '</div>' + 
					'</div>' + 
				'</div>';
		$('#background-view').append(g);
	});
	$('#background-view .space-svg[data-status="saved"]').off('click');
	$('#background-view .space-svg[data-status="saved"]').on('click', function(e){
		e.preventDefault();
		$('.view-space-btn[data-id="' + $(this).data('id') + '"]').click();
	});
	$('#background-view .space-svg[data-status="saved"]').off('mouseenter').off('mouseleave');
	$('#background-view .space-svg[data-status="saved"]').on('mouseenter', function(){
		var a = $(this);
		var aD = a.data();
		var bD = $('#map-space-fixed .view-space-btn[data-id="' + aD.id + '"]').data();
		var	pL = a.position().left - 75, 
			pT = a.position().top + a.width();
		var h = '<div class="flex-inline col-12">' + 
					'<div class="float-left">' + 
						'<div class="stroked" style="background-color: ' + bD.color + '; border-radius: 20%; height: 20px; width: 20px;"></div>' + 
					'</div>' + 
					'<div class="strong size-16 truncate pl1 line-height-4">' + 
						'<div class="flex-auto pre-wrap">' + bD.title  + '</div>' + 
					'</div>' +
				'</div>' + 
                '<div class="col-12 flex flex-wrap pre-wrap" style="word-break: break-word;">' + bD.business_name + '</div>' +
				'<div class="col-12 flex flex-wrap pre-wrap" style="word-break: break-word; font-weight: 600;">' + bD.category + '</div>';
		$('#map-tooltip [data-print-container="true"]').html(h);
		$('#map-tooltip').removeClass('hide');
		if(pL < 5) pL = 5;
		else if((pL + $('#map-tooltip')[0].scrollWidth) > ($('#background-view')[0].scrollWidth - 5)) pL = $('#background-view')[0].scrollWidth - $('#map-tooltip')[0].scrollWidth - 5;
		if(pT < 5) pT = 5;
		else if(pT > ($('#background-view')[0].scrollHeight / 2)) pT = pT - $('#map-tooltip')[0].scrollHeight - $(this).width();
		$('#map-tooltip').css({
			'left' : pL + 'px',
			'top' : pT + 'px'
		});
	}).on('mouseleave', function(){
		$('#map-tooltip').addClass('hide');
	});
	//Seats
	$('#background-view .seat-svg[data-status="saved"]').remove();
	$.each(seats, function(i,v){
		let xPos = v.pos_x * baseMapBW * baseMapHWRatio,
			yPos = v.pos_y * baseMapBH,
			width = v.width * baseMapBW * baseMapHWRatio,
			height = v.height * baseMapBH,
			rotation = v.rotate,
			title = v.content,
			fontSize = v.text_size * (baseMapBW / 1400),
			assetColor = v.color,
			textColor = v.text_color,
			shape = v.shape,
			svgShape = '';
		switch(shape) {
			//Circle
			case 'circle':
				svgShape = '<circle cx="' + width / 2 + '" cy="' + width / 2 + '" r="' + (width / 2 - 1) + '" stroke="#484848" fill="' + assetColor + '" stroke-width="0.5" />';
				break;

			//Triangle
			case 'triangle':
				svgShape = '<polygon points="' + width / 2 + ' 0, ' + width + ' ' + height +  ', 0 ' + height + '" stroke="#484848" fill="' + assetColor + '" stroke-width="0.5" />';
				break;

			//Default
			default:
				svgShape = '<rect width="' + width + '" height="' + height + '" style="fill:' + assetColor + '; stroke-width:0.5; stroke:#484848;" />';
				break;
		}
		let g = 
			'<div class="seat-svg absolute" data-status="saved" data-id="' + i + '" data-content="' + title + '" style="left: ' + xPos + 'px; top: ' + yPos + 'px; transform: rotate(' + rotation + 'deg); z-index: 1;">' +
				'<svg width="' + width + '" height="' + (shape == 'circle' ? width : height) + '">' + svgShape + '</svg>' +
				'<div class="title strong truncate text-center absolute all-0" style="color: ' + textColor + '; font-size: ' + fontSize + 'px;  height: ' + (shape == 'circle' ? width : height) + 'px; line-height: 100%; text-overflow: clip; width: ' + width + 'px;">' +
					'<div class="flex pre-wrap break-word text-center items-center justify-center" style="word-break:break-all;height: ' + (shape == 'circle' ? width : height) + 'px; line-height: 100%; max-height: 100%; max-width: 100%; width: ' + width + 'px;">' + title + '</div>' +
				'</div>' +
			'</div>';
		$('#background-view').append(g);
	});
	
	// Seat hover events for seat booking
	$('#background-view .seat-svg[data-status="saved"]').off('mouseenter.seat mouseleave.seat');
	$('#background-view .seat-svg[data-status="saved"]').on('mouseenter.seat', function() {
		let $seat = $(this);
		let seatId = $seat.data('id');
		let currency = eventCurrency || '$';

		let seatSectionName = seatSectionMapping[seatId].section_name || '---';
		let seatPrice = seatSectionMapping[seatId].section_price || '0';
		let seatDescription =  seatSectionMapping[seatId].section_description || '---';

		// Calculate position like booth hover
		let pL = $seat.position().left - 125,  // Left offset (badge is wider than tooltip)
			pT = $seat.position().top + $seat.width();
		
		// Update badge content
		$('#seat-hover-badge .seat-badge-content').text(seatSectionName);
		$('#seat-hover-badge .seat-badge-price').text(currency + seatPrice);
		$('#seat-hover-badge .seat-badge-description').html(seatDescription);
		
		// Boundary checks like booth hover
		if(pL < 5) pL = 5;
		else if((pL + $('#seat-hover-badge')[0].scrollWidth) > ($('#background-view')[0].scrollWidth - 5)) 
			pL = $('#background-view')[0].scrollWidth - $('#seat-hover-badge')[0].scrollWidth - 5;
		if(pT < 5) pT = 5;
		else if(pT > ($('#background-view')[0].scrollHeight / 2)) 
			pT = pT - $('#seat-hover-badge')[0].scrollHeight - $seat.width();
		
		// Show badge with calculated position
		$('#seat-hover-badge')
			.removeClass('hidden')
			.css({
				'opacity': '1',
				'left': pL + 'px',
				'top': pT + 'px'
			});
	});
	
	// Hide badge on mouseleave
	$('#background-view .seat-svg[data-status="saved"]').on('mouseleave.seat', function() {
		$('#seat-hover-badge')
			.css('opacity', '0')
			.addClass('hidden');
	});
}
baseMapUpdateMap();

//Detail
$('.view-section-btn').on('click', function(e){
	e.preventDefault();
	var t = $(this).data('title');
	var d = $(this).data('description');
	var s = $(this).data('shape');
	var c = $(this).data('color');
	var tC = $(this).data('text_color');
	var p1 = $(this).data('pic_1200');
	var p2 = $(this).data('pic_600');
	$('[data-group="feedbase"][data-record="title"]').html(t);
	var h = '';
	if(d.length) h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Description</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word">' + d + '</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	if(p1.length) h += '<div class="labelCellPair">' + 
							'<div class="labelContainer">' + 
								'<div class="flex items-center mb1">' + 
									'<div class="flex-auto flex-inline items-center">' + 
										'<div class="small caps quiet fieldLabel truncate">Picture</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
							'<div class="cellContainer">' + 
								'<div class="cell detailCell col-12" data-columntype="text">' + 
									'<div class="flex-auto flex baymax">' + 
										'<div class="flex flex-wrap mxn1 overflow-auto width-full">' + 
											'<div class="col-12 pt-half rounded overflow-hidden" style="clip-path: inset(0px);">' + 
												'<div class="line-height-3 px1">' + 
													'<div class="col-12 rounded pointer white mb1 overflow-hidden">' + 
														'<div class="flex items-center justify-center noevents">' + 
															'<div class="flex-none" style="box-sizing: border-box; overflow: hidden; width: 100%;">' + 
																'<div class="background-contain background-center background-norepeat width-full" style="background-image: url(/event-pics/' + p2 + '); padding-top: 66%;"></div>' + 
															'</div>' + 
														'</div>' + 
													'</div>' + 
												'</div>' + 
											'</div>' + 
										'</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>';
	$('[data-group="feedbase"][data-record="detail"]').html(h);
	$('body').addClass('noscroll');
	$('.detailViewWithActivityFeedBase').removeClass('hide');
});
$('.view-space-btn').on('click', function(e){
	e.preventDefault();
	var t = $(this).data('title');
	var d = $(this).data('description');
	var c = $(this).data('color');
	var tC = $(this).data('text_color');
	var bID = $(this).data('biz_id');
	var bN = $(this).data('business_name');
	var bLink = $(this).data('biz_link');
	var w = $(this).data('website');
	var l = $(this).data('logo'), 
		ct = $(this).data('category');
	$('[data-group="feedbase"][data-record="title"]').html(t);
    var aCT = $(this).data('asset_connect_type'), 
        aCS = $(this).data('connect_source');
    if(aCT == 'sponsor' && aCS == 'data') {
        l = '/event-pics/' + l;
    }
	var h = '';
	if(d.length) h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Description</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word">' + d + '</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	if(bN.length) h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Name</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word">' + bN + '</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	if(ct != undefined && ct != null && ct.length){
		h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Category</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word">';
		$.each(ct.split(', '), function(i,v){
			h += 							'<span class="rounded px1 flex-none mr-half mb-half flex-inline items-center fit truncate line-height-4 text-dark grayLight2 user-select-none" style="height: 22px;">' + v + '</span>';
		});
		h += 							'</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	}
	if(bID > 0) h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Shop page</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word"><a class="text-blue link understroke" href="/company/' + ((bLink != null && bLink != undefined && bLink.length > 0) ? bLink + '/' : '?c=' + bID) + '" target="_blank">Go to shop page <i class="material-icons">open_in_new</i></a></div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	else if (w.length > 0 && aCT == 'guest') {
		const websites = w.split('||');
		let websiteText = ``;

		websites.forEach(website => {
			websiteText += `
				<div class="col-12 overflow-hidden pre-wrap break-word"><a class="text-blue link understroke" href="${website}" target="_blank">${website}</a></div>
			`;
		});
		h += 		'<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Website</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										websiteText + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	}
	else if(w.length > 0 && aCT != 'vendor') 
				h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Website</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word"><a class="text-blue link understroke" href="' + w + '" target="_blank">' + w + '</a></div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';

	if (aCT == 'guest') {
		l = '/event-pics/' + l;
	}
	if(l.length) h += '<div class="labelCellPair">' + 
						'<div class="labelContainer">' + 
							'<div class="flex items-center mb1">' + 
								'<div class="flex-auto flex-inline items-center">' + 
									'<div class="small caps quiet fieldLabel truncate">Logo</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
						'<div class="cellContainer">' + 
							'<div class="cell detailCell col-12" data-columntype="text">' + 
								'<div class="flex-auto flex baymax">' + 
									'<div class="flex-auto rounded border-darken2 border-darken2-hover border-blue-focus detailCursor-border-blue line-height-4 detailViewTextWithLinks border-thick cursor-text" style="background: transparent; box-shadow: none;">' + 
										'<div class="col-12 overflow-hidden pre-wrap break-word">' + 
											'<div class="background-contain background-center background-norepeat" style="background-image: url(' + l + '); padding-top: 200px; width: 200px;"></div>' +  
										'</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
	$('[data-group="feedbase"][data-record="detail"]').html(h);
	$('body').addClass('noscroll');
	$('.detailViewWithActivityFeedBase').removeClass('hide');
});
$('#close-feedbase-btn').on('click', function(e){
	e.preventDefault();
	$('body').removeClass('noscroll');
	$('.detailViewWithActivityFeedBase').addClass('hide')
});

function resetSearch() {
	$('.search-element').removeClass('hide');
	$('.element-search-bar').each((i, item) => {
		$(item).val('');
	});
}
$('.element-search-bar').on('input keyup change paste', (e) => { 
	filterBooths();
});

$('#categoryFilter, #categoryFilterMobile').on('change', (e) => { 
    // Sync the values between both dropdowns
    syncDropdowns(e.target);
    filterBooths();
});


function syncDropdowns(changedElement) {
    if (changedElement.id === 'categoryFilter') {
        // Desktop version changed, sync to mobile version
        const selectedValue = changedElement.value;
        if (selectedValue === 'Select Category') {
            $('#categoryFilterMobile').val('Select Category Mobile');
        } else {
            $('#categoryFilterMobile').val('mobile_' + selectedValue);
        }
    } else {
        // Mobile version changed, sync to desktop version
        const selectedValue = changedElement.value;
        if (selectedValue === 'Select Category Mobile') {
            $('#categoryFilter').val('Select Category');
        } else {
            const actualCategory = selectedValue.replace('mobile_', '');
            $('#categoryFilter').val(actualCategory);
        }
    }
}


function filterBooths() {
    let categories = document.getElementById("categoryFilter");
    let mobileCategories = document.getElementById("categoryFilterMobile");
    
    let currentCategory;
	if (window.innerWidth <= 768) {
		// On mobile devices
		let mobileValue = mobileCategories.options[mobileCategories.selectedIndex].value;
		if (mobileValue === 'Select Category Mobile') {
			currentCategory = 'Select Category';
		} else {
			currentCategory = mobileValue.replace('mobile_', '');
		}
	} else {
		// On desktop devices
		currentCategory = categories.options[categories.selectedIndex].value;
	}

	// Get search input value
	let searchedItem = document.getElementsByClassName("element-search-bar")[0].value;

	// Reset all elements
	$('.search-element').removeClass('hide');
	$('.parentEle').removeClass('hide');
	$('.space-svg').css('opacity', 1);

	// Apply filters based on search and category selection
	if(searchedItem == "" && currentCategory == "Select Category"){
		// No filters applied - show all elements
		$('.space-svg').each((i, item) => {
			$(item).css('opacity', 1);
		});
	}else if(searchedItem == "" && currentCategory != "Select Category"){
		// Only category filter applied
		$('.search-element:not([data-name*="'+ currentCategory +'" i])').each((i, item) => {
			if(item.parentNode.id == "background-view"){
				item.style.opacity = 0.3;
			} else {
				item.parentElement.classList.add('hide');
			}
		});
	}else if(searchedItem != "" && currentCategory == "Select Category"){
		// Only search filter applied
		$('.search-element:not([data-title*="'+ searchedItem +'" i])').each((i, item) => {
			(item.parentNode.id == "background-view") ? item.style.opacity = 0.3 : item.parentElement.classList.add('hide');
		});
		}else{
		// Both search and category filters applied
		$('.search-element:not([data-title*="'+ searchedItem +'" i])').each((i, item) => {
			(item.parentNode.id == "background-view") ? item.style.opacity = 0.3 : item.parentElement.classList.add('hide');
		});
		$('.search-element:not([data-name*="'+ currentCategory +'" i])').each((i, item) => {
			if(item.parentNode.id == "background-view" && item.style.opacity > 0.3){
				item.style.opacity = 0.3;
			}else if($('.parentEle').is(":visible") && item.parentNode.id != "background-view" ){
				item.parentElement.classList.add('hide');
			}
		});
	}
}
//Filter to remove duplicate select category options in dropdown
$(document).ready(function () {
	$('.space-svg').each((i, item) => {
		$(item).css('opacity', 1);
	});
    var categories = {};
    $("select > option").each(function () {
        if (categories[this.value]) {
            $(this).remove();
        } else {
            categories[this.value] = this.text;
        }
    });
});