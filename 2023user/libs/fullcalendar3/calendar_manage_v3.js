/**
 * calendar manager v3
 * ver : 0.2
 */

var cldMain = (function(){

	function fnInit(year, month){
		var targetEl = $('.calendar-schedule > li > a');
		targetEl.on({click:function(){
			targetEl.parent().removeClass('on');
			$(this).parent().addClass('on');
			fnGetCalendarSchedule($(this), year, targetEl.index($(this))+1);
		}});
		targetEl.eq((parseInt(month)-1)).trigger('click');
	}

	function fnGetCalendarSchedule(target, y, m){
		var month = m<10?'0'+m:''+m;
		var cMonth = y+''+month;
		$.getAjax({
	        commandUrl  : '/user/main/CalendarMainList.do',
	        commandData : { "searchMonth" : cMonth},
	        loading: 'hide',
	        commandJsonp: true,
	        onSuccess   : function (result) {
	        	console.log(result);
	        	if(result.length > 0){
	        		var tHtml = '';
	        		$.each(result, function(idx, item){
	        			tHtml += '<li>';
		        		tHtml += '	<a href="javascript:void(0);"> <em class="cate">'+item.cldCdNm+'</em>';
		        		tHtml += '		<span class="txt">'+item.cldTitle+'</span> <span class="txt">'+item.cldDt+'</span>';
		        		if(item.cldLink != undefined && item.cldLink.length > 0 && item.cldLink.indexOf('http') > -1){
		        			tHtml += '	<div class="btn-g btn-blue" onClick="window.open(&#39'+item.cldLink+'&#39);">바로가기</div>';
		        		}
		        		tHtml += '	</a>';
		        		tHtml += '</li>';
	        		});
	        		target.next('ul').html(tHtml);
	        	}else{
	        		target.next('ul').html('<li><a href="javascript:void(0);"><span class="txt">일정이 없습니다.</span></a></li>');
	        	}
	        }
	    });
	}

	function fnWindowOpen(link){
		window.open(link);
	}
	return {
		fnInit : fnInit
	}
})();


var cldManager = (function(){

	var _Action = "";

	function fnInit(act){
		//TODO : scope확인, searchSgrCd를 param으로 넘기지 못해서 setTimeout으로 감쌈. 추후 수정 필요($.fn.searchSgr)
		_Action = act;
		setTimeout(function(){
			fnSetCalendar();
		},400);
	}
	//call : top.frames["contentsFrame"].cldManager.fnReFetchEvents();
	function fnReFetchEvents(){
		$('#calendar').fullCalendar('refetchEvents');
	}
	function fnSetCalendar(){
		$('#calendar').fullCalendar({
			header : {
				left : 'prev,next today',
				center : 'title',
		        right: 'month,agendaWeek,agendaDay,listMonth'
			},
			height: _Action=="M"?"auto":600,
			locale: 'ko',
			//defaultDate : '2019-01-12',
			navLinks : false, // can click day/week names to navigate views
			//businessHours: true, // display business hours
			//editable : true,
			eventLimit : false, // allow "more" link when too many events
			displayEventTime: false, // don't show the time column in list view
			googleCalendarApiKey : 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
			eventSources: [
				{
					googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
					color: '#fff',   // an option!
					textColor: '#ff0000', // an option!
  					className : "koHolidays",	// 대한민국의 공휴일
  					//rendering: 'background'
				},
				{
					events: function(start, end, timezone, callback) {
						$.ajax({
				            url: _Action=="M"?"/manager/homepage/CalendarList.do":"/user/intro/CalendarList.do",
				            dataType: 'jsonp',
				            data: {
				            	searchSgrCd : _Action=="M"?$('#searchSgrCd', top.frames["contentsFrame"].document).val():$('#searchSgrCd').val(),
				            	searchCldCd : $('#searchCldCd').val(),
				            	searchStartDt : start.format('YYYY/MM/DD HH:MM'),
				            	searchEndDt : end.format('YYYY/MM/DD HH:MM')
				            },
				            success: function(doc) {
				                var events = [];
				                if(!!doc){
				                    $.map(doc, function( r ) {
				                        events.push({
				                            seq: r.cldSeqno,
				                            title: r.cldTitle,
				                            start: r.cldStartDt,
				                            end: r.cldEndDt,
				                            color: r.cldBarColor
				                        });
				                    });
				                }
				                callback(events);
				            }
				        });
					}
				}
			],
			eventClick: function(calEvent, jsEvent, view) {
				if(calEvent.url!=undefined && calEvent.url.length > 0){
					//window.open(calEvent.url, 'google-calendar-event', 'width=700,height=600');
				}else{
					if(calEvent.seq!=undefined && calEvent.seq > 0){
						//console.log(calEvent.seq, '수정폼');
						if(_Action=="M"){
							fnCmdUpdateForm(calEvent.seq);
						}else{
							fnUserView(calEvent.seq);
						}
					}
				}
				jsEvent.preventDefault() // don't navigate in main tab
			  }
		});
	}
	function fnUserView(seq){
		$('#cldSeqno').val(seq);
		$.getAjax({
	        commandUrl  : "/user/intro/CalendarDetail.do",
	        commandData : $("#listForm").serialize(),
	        loading: 'hide',
	        commandJsonp: true,
	        onSuccess   : function (result) {
	        	//console.log(result);
	        	//$('#calendarDetail tbody .al.cldSgrNm').html(result.sgrNm);
	        	$('#calendarDetail tbody .al.cldTitle').html(result.cldTitle);
	        	$('#calendarDetail tbody .al.cldStartDt').html(result.cldStartDt);
	        	$('#calendarDetail tbody .al.cldEndDt').html(result.cldEndDt);
	        	$('#calendarDetail tbody .al.cldCdNm').html(result.cldCdNm);
	        	$('#calendarDetail tbody .al.cldStatus').html(result.cldStatus);
	        	$('#calendarDetail tbody .al.cldContents').html(result.cldContents);
	        	$('#calendarDetail tbody .al.etc1').html(result.etc1);
	        	$('#calendarDetail tbody .al.etc2').html(result.etc2);
	        	$('#calendarDetail tbody .al.etc3').html(result.etc3);
	        	$('#calendarDetail tbody .al.etc4').html(result.etc4);
	        	$('#calendarDetail tbody .al.cldDt').html(result.cldDt);
	        	if(result.cldLink != undefined && result.cldLink.length > 0 && result.cldLink.indexOf('http') > -1){
	        		$('#calendarDetail button.btn3.spot').parent().show();
	        		$('#calendarDetail button.btn3.spot').off().on('click', function(e){
	        			e.preventDefault();
	        			window.open(result.cldLink);
	        		});
	        	}else{
	        		$('#calendarDetail button.btn3.spot').parent().hide();
	        		$('#calendarDetail button.btn3.spot').off();
	        	}
	        	$('#calendarDetail').layerPop();
	        }
	    });
	}
	return {
		fnInit : fnInit,
		fnReFetchEvents : fnReFetchEvents
	}
})();


var cldColorPicker = (function(){

	var targetId = '#cldBarColor';
	var targetText = '.cldBarColorText';
	var currentColor = "";

	function fnInit(pColor){
		currentColor = pColor;
		$(targetId).val(currentColor);
		$(targetText).text(currentColor);
		fnSpectrumColor(currentColor);
	}

	function fnSpectrumColor(targetColor){
		$(targetId).spectrum({
			allowEmpty:true,
			color: targetColor,
			showInput: true,
			containerClassName: "full-spectrum",
			showInitial: true,
			showPalette: true,
			showSelectionPalette: true,
			showAlpha: false,		//알파값은 숨김
			maxPaletteSize: 10,
			preferredFormat: "hex",
			localStorageKey: "spectrum.demo",
			move: function (color) { updateSpectrumColor(color); },
			show: function () {},
			beforeShow: function () {},
			hide: function (color) { updateSpectrumColor(color);}
		});
	}
	function updateSpectrumColor(color) {
		var target = targetId.replace(/\#/g,'');
		var hexColor = "transparent";
		if(color) {
			hexColor = color.toHexString();
			$(targetId).val(hexColor);
			$(targetText).text(hexColor);
		}
	}
	return {
		fnInit : fnInit
	}
})();
