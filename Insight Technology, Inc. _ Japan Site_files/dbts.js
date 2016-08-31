
(function($jquery){
var gaRoomNames        = ['A','B','C','D','E'];
var gaMoveBtn          = ['up','right','down','left'];
var goSessionData      = null;
var goSpeakerData      = null;
var goSponsorData      = null;
var pbIsEn             = (location.search && location.search.search(/lang=en/) > -1) ? true : false;
var psSessionVal        = $jquery('#dbts-session-value').val();
var psSpeakerVal        = $jquery('#dbts-speaker-value').val();
var psSponsorVal       = $jquery('#dbts-sponsor-value').val();
var psSessionURL       = (pbIsEn) ? psSessionVal + '_E.json' : psSessionVal + '.json'
var psSpeakerURL       = (pbIsEn) ? psSpeakerVal + 'E.json'                : psSpeakerVal + '.json'
var psSponsorURL       = psSponsorVal


var psBiographyText    = (pbIsEn) ? 'Biography' : '講師略歴'
$jquery(function () {
	$jquery(document).ready(function(){
		if($jquery('#param').length && location.search){
			$jquery('#param').val(location.search);
		}
		if($jquery('.dbts-box').length){
			var pjContainer = $jquery('.dbts-box').closest('.entry-content')
			if(pjContainer.length === 0) pjContainer = $jquery('body');
			pjContainer.attr('id','bs');
			var psHTML = '<div id="sessionDetail" class="hiddenBox sessionDetail">';
			psHTML += '<a href="javascript:void(0)" class="up-btn move-btn" move-btn="up"><i class="glyphicon glyphicon-chevron-up move-icon up-icon"></i></a>';
			psHTML += '<a href="javascript:void(0)" class="next-btn move-btn" move-btn="next"><i class="glyphicon glyphicon-chevron-right move-icon next-icon"></i></a>';
			psHTML += '<a href="javascript:void(0)" class="down-btn move-btn" move-btn="down"><i class="glyphicon glyphicon-chevron-down move-icon down-icon"></i></a>';
			psHTML += '<a href="javascript:void(0)" class="prev-btn move-btn" move-btn="prev"><i class="glyphicon glyphicon-chevron-left move-icon prev-icon"></i></a>';
			psHTML += '</div>'
			$jquery('.dbts-box')
				.append(psHTML);
			//buildSession(goSession, goSpeaker);
			$jquery.ajax({
				// url   : '/wordpress/wp-includes/js/iti-common/sessionData.json'
				// url      : '/wp-includes/js/dbts/dbts_tokyo_2015_session_schedule.json'
				 url      : psSessionURL
				,cache    :  false
				,type     : 'GET'
				,dataType : 'json'
				,success  : function(poDataJson){
					$jquery(document).ready(function(){
						$jquery.ajax({
							// url   : '/wordpress/wp-includes/js/iti-common/sessionDetailData.json'
							// url      : '//wp-includes/js/dbts/2015_sessionDetailData.json'
							 url      : psSpeakerURL
							,cache    :  false
							,type     : 'GET'
							,dataType : 'json'
							,success  : function(poDetailJson){
								buildSession(poDataJson, poDetailJson);
							}
						})
					})
				}
				,error   : function(){
					//console.log('fail..')
				}
			})
		}
		if($jquery('.dbts-sponsor-box').length){
			//buildSponsorBox(goSponsor)
			$jquery.ajax({
				// url      : '/wordpress/wp-includes/js/iti-common/dbts_tokyo_2014_sponsor.json'
				 url      : psSponsorURL
				,cache    :  false
				,type     : 'GET'
				,dataType : 'json'
				,success  : function(poSponsorJson){
					buildSponsorBox(poSponsorJson);
				}
				,error   : function(){
					//console.log('fail..')
				}
			})
		}
	})
});

function buildSession(poDataJson, poDetailJson){
	goSessionData     = poDataJson;
	goSpeakerData     = poDetailJson;
	var psHTML        = '<div class="container-fluid">';
	var psCol         = 'col-lg-2 col-md-2 col-sm-12 col-xs-12' ;
	var psRoomClass   = 'col-lg-10 col-md-10 hidden-xs hidden-sm col-lg-offset-2 col-md-offset-2 ';
	var pnRowIndex    = 0;
	for(var i=0, len=goSessionData.length; i<len; i++){
		var poDate = goSessionData[i];
		for(var j in poDate){
			psHTML += '<div id="dayContainer-'+ i +'">';
			psHTML += '<div class="row sessionDaily">';
			psHTML += '<div class="'+ psRoomClass +'"><h4 class="room">Room</h4></div>';
			psHTML += '<div class="'+ psCol +'">';
			psHTML += '<h3 class="dayTitle">' + j +'</h3>';
			psHTML += '</div>';
			var paDayDate = poDate[j];
			var pnRoomLength = 0;
			for(var k=0, len2=paDayDate.length; k<len2; k++){
				if(pnRoomLength < paDayDate[k]['sessions'].length){
					pnRoomLength = paDayDate[k]['sessions'].length;
				}
			}
			for(var k=0, len2=pnRoomLength; k<len2; k++){
				var psRoomText = gaRoomNames[k];
				psHTML += '<div class="'+ psCol +' roomBox">';
				psHTML += '<h4 class="roomTtile room' + psRoomText + ' hidden-xs hidden-sm">' + psRoomText + '</h4>';
				psHTML += '</div>';
			}
			psHTML += '</div>';
			
			for(var k=0, len2=paDayDate.length; k<len2; k++){
				var psCategory = paDayDate[k]['sessionCategory'];
				var psTime    = paDayDate[k]['time'];
				var poSession = paDayDate[k]['sessions'];
				var psLastClass = (k === len2-1) ? ' sessionRowLast' : '';
				psHTML += '<div class="row sessionRow ' + psLastClass + '" id="row-' + pnRowIndex + '">';
				psHTML += '<div class="' + psCol +' sessionThBox">';
				psHTML += '<h4 class="sessionTitle">'+ psCategory +'<br/>'+psTime +'</h4>';
				psHTML += '</div>';
				for(var l=0, len3=poSession.length; l<len3; l++){
					var psSesCategory = poSession[l]['category'];
					var psSesTitle    = (poSession[l]['title'] === '') ? 'TBD' : poSession[l]['title'];
					var paSesSpeakerId= (typeof(poSession[l]['speakerId']) === 'string') ? [poSession[l]['speakerId']] : poSession[l]['speakerId'];
					var psSesSession  = poSession[l]['detail'];
					var psSesType     = poSession[l]['type'];
					var poSesAlert    = (poSession[l]['alert'] === undefined) ? null : poSession[l]['alert'];
					var psRoomName    = gaRoomNames[l];
					var psRoomId      = psRoomName + (i+1) + (k+1);
					var psName        = '';
					var psCompany     = '';
					var psSessionIndex = pnRowIndex + '-' + l; 
					var psSesClass    = (poSession[l]['colClass']) ? poSession[l]['colClass'] : psCol;
					//if(paSesSpeakerId[0] !== ''){
						createDetail(paSesSpeakerId, psRoomId, psSesTitle, psSesSession, poSesAlert,psSesCategory, psSessionIndex);
					//}
					
					psHTML += '<a href="javascript:void(0)" class="'+ psSesClass +' sessionBox" data-speakerid="' + psRoomId + '" id="link-' + pnRowIndex + '-' + l + '" data-row-index="'+ pnRowIndex +'" data-col-index="' + l +'">';
					psHTML += '<span class="sessionId room'+ psRoomName +'">' + psRoomId +':'+ psSesCategory;
					if(poSesAlert){
						psHTML += '<span class="glyphicon glyphicon-warning-sign session-alert pull-right" data-toggle="tooltip" data-placement="top" title="注意事項があります"></span>';
					}
					psHTML += '</span>';
					psHTML += '<h5 class="sessionListTitle">' + psSesTitle +'</h5>';

					for(var m=0, len4=paSesSpeakerId.length; m<len4; m++){
						if(goSpeakerData[paSesSpeakerId[m]] !== undefined){
							var paSpeakerData = goSpeakerData[paSesSpeakerId[m]];
							psName        = (paSpeakerData['name']        !== "" ) ? paSpeakerData['name']        : '';
							psCompany     = (paSpeakerData['company']     !== "" ) ? paSpeakerData['company']     : '';
							psCompanyUnit = (paSpeakerData['companyUnit'] !== "" ) ? paSpeakerData['companyUnit'] : '';
							psHTML += '<span class="sessionListSpeaker"><span class="sessionListCompany">' + psCompany +'</span><br>'+ psName ;
							if(psCompanyUnit){
								psHTML += ' ( ' + psCompanyUnit +' )';
							}
							psHTML += '</span>';
						}
					}
					psHTML += '</a>';
					var psRoomTitle ='<div class="'+ psCol +'"><h3 class="roomTitle roomTitle'+ psRoomName +'">Room '+ psRoomName +'</h3>';
					$jquery(psHTML).find('.roomName').append(psRoomTitle);
				}
				psHTML += '</div>';
				pnRowIndex++;
			}
		}
		psHTML += '</div>';
	}
	psHTML += '</div>';

	$jquery('#sessionDetail')
		.bind('click', function(){
			$jquery(this).hide();
			$jquery('html, body').css('overflow', 'auto');
		})
		.find('.close-btn')
		.bind('click', function(){
			$jquery('#sessionDetail').trigger('click');
		})
		.end()
		.find('.move-btn')
		.bind('click',function(event){
			event.stopPropagation();
			var pjLink  = $jquery(this);
			var psMove  = pjLink.attr('move-btn');
			var paDetails = $jquery('#sessionDetail').find('.sessionDetailInner');
			for(var i=0, len=paDetails.length; i<len; i++){
				if($jquery(paDetails[i]).is(':visible')){
					var pnIndex = ($jquery(paDetails[i])).attr('data-index');
					break;
				}
			}
			moveBtn(psMove, pnIndex);
		})
		.bind('mousewheel', function(){
			var that = this;
			$jquery(this).hide();
			setTimeout(function(){
				$jquery(that).show();
			}, 1000)
		})
		.end()
		.find('.sessionDetailInner')
		.bind('click', function(event){
			event.stopPropagation();
		});
	$jquery('.dbts-box')
		.prepend(psHTML)
		.find('.sessionBox')
		.bind('click', function(){
			var psId = '#speaker-' + $jquery(this).attr('data-speakerId');
			$jquery('html, body').css('overflow', 'hidden');
			$jquery('#sessionDetail')
				.show()
				.find('.sessionDetailInner')
				.css({
					display : 'none'
					,opacity: 0
				})
				.end()
			$jquery(psId).css({
				display : 'block'
				,opacity: 1
			})
		})
		//.off()
		.end()
		.find('.session-alert')
		//.tooltip();
}

function createDetail(paSesSpeakerId, psRoomId, psSesTitle, psSesSession, poSesAlert,psSesCategory, psSessionIndex){
	var psHTML          = '';
	var psCol12         = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
	var psColSpeaker    = psCol12;
	var psColPicture    = 'col-lg-4 col-md-4 col-sm-4 col-xs-12';
	var psSessionTitle  = psSesTitle;
	var psSession       = psSesSession;
	var poSessionAlert  = poSesAlert;
	var psRoomName      = psRoomId.substr(0,1);

	psHTML += '<div id="speaker-' + psRoomId + '" class="sessionDetailInner container" data-index="' + psSessionIndex + '">';
	psHTML += '<a href="javascript:void(0)" class="glyphicon glyphicon-remove close-btn"></a>';
	psHTML += '<div class="row">';
	psHTML += '<div class="' + psCol12 +'">';
	psHTML += '<span class="detailSessionId room'+ psRoomName +'">' + psRoomId +':'+ psSesCategory + '</span>';
	psHTML += '<h5 class="detaiTitle">'+ psSessionTitle +'</h5>';
	psHTML += '</div>';
	psHTML += '<div class="' + psCol12 +'">';
	if(poSessionAlert){
		var psWebsite = poSessionAlert['site'];
		var psComment = poSessionAlert['comment'];
		psHTML += '<div class="alert alert-warning detailText" role="alert">';
		psHTML += '<h6 class="alertTitle" aria-describedat="AlertDialog'+ psRoomId +'">お申し込みサイト</h6>';
		psHTML += '<div id="AlertDialog'+ psRoomId +'">';
		psHTML += '<a class="alertLink" href="'+ psWebsite +'" target="_blank">'+ psWebsite +'</a>';
		psHTML += '<p class="detailText">'+ psComment +'</p>';
		psHTML += '</div>';
		psHTML += '</div>';
	}
	psHTML += '<p class="detailText">'+ psSession +'</p>';
	psHTML += '</div>';
	for(var i=0, len=paSesSpeakerId.length; i<len; i++){
		var poSpeaker          = goSpeakerData[paSesSpeakerId[i]];
		var psSpeakerUndefined = '<div class="'+ psCol12 +'"><span class="speakerUndefined">講師未定</span></div>';
		if(typeof(poSpeaker) !== 'undefined' && poSpeaker['name'] !==""){
			var psSpeakerName        = poSpeaker['name'];
			var psSpeakerRoman       = poSpeaker['roman'];
			var psSpeakerCompany     = poSpeaker['company'];
			var psSpeakerCompanyUnit = poSpeaker['companyUnit'];
			var psSpeakerLife        = poSpeaker['life'];
			var psSpeakerBlog        = poSpeaker['blog'];
			var psSpeakerPicture     = poSpeaker['picture'];
			psHTML += '<div class="'+ psCol12 +'">';
			psHTML += '<div class="row speakerDetailRow">';
			if(psSpeakerPicture){
				psHTML += '<div class="'+ psColPicture +'">';
				psHTML += '<img class="speakerPhoto" alt="" src="'+ psSpeakerPicture +'"/>';
				psHTML += '</div>';
				psColSpeaker = 'col-lg-8 col-md-8 col-sm-8 col-xs-12';
			}
			psHTML += '<div class="'+ psColSpeaker +'">';
			psHTML += '<h6 class="detailSpeaker">'+ psSpeakerName;
			if(psSpeakerRoman !== ""){
				psHTML += ' ('+ psSpeakerRoman +')</h6>';
			}
			psHTML += '<h6 class="detailCompany">'+ psSpeakerCompany;
			if(psSpeakerCompanyUnit !== ""){
				psHTML += ' - '+ psSpeakerCompanyUnit ;
			}
			psHTML += '</h6>';
			psHTML += '<dl class="datailDl"><dt class="detailTtile">' + psBiographyText + '</dt>';
			psHTML += '<dd class="detailLife detailText">' +  psSpeakerLife +'</dd>';
			if(psSpeakerBlog !== ""){
				psHTML += '<dt class="detailTtile">blog</dt>';
				psHTML += '<dd><a href="'+ psSpeakerBlog +'" class="detailBlog detailText" target="_blank">' + psSpeakerBlog +'</a></dd>';
			}
			psHTML += '</dl>';
			psHTML += '</div></div>';
			psHTML += '</div>';
		}else{
			psHTML += psSpeakerUndefined;
		}
	}
	psHTML += '</div>';
	psHTML += '</div>';
	$jquery('#sessionDetail').append(psHTML);
	//$jquery('#sessionDetail-inner').append(psHTML);
}
function getSession(pnRowIndex, pnColIndex){
	return $jquery('#link-' + pnRowIndex + '-' + pnColIndex);
}
function moveBtn(psMove, pnIndex){
	var pnTotal       = $jquery('#bs').find('a.sessionBox').length;
	var pjTarget      = null;
	var pnAddNum      = 0;
	var pnMoveIndex   = -1;
	var pnRowIndex    = $jquery('#link-' + pnIndex).attr('data-row-index')*1;
	var pnNextRow     = pnRowIndex+1;
	var pnBackRow     = pnRowIndex-1;
	var pnColIndex    = $jquery('#link-' + pnIndex).attr('data-col-index')*1;
	var pnBackCol     = pnColIndex-1;
	var pnTotalRowLen = $jquery('#bs').find('.sessionRow').length-1;
	if(psMove === 'up'){
		pjTarget = getSession(pnBackRow, pnColIndex);
		if(pjTarget.length === 0 && pnRowIndex > 0){
			pjTarget = getSession(pnBackRow, pnBackCol);
		}
	}
	if(psMove === 'down'){
		pjTarget = getSession(pnNextRow, pnColIndex);
		if(pjTarget.length === 0 && pnTotalRowLen > pnRowIndex){
			pjTarget = getSession(pnNextRow, pnBackCol);
		}
	}
	if(psMove === 'prev'){
		pjTarget = getSession(pnRowIndex, pnBackCol);
		if(pjTarget.length === 0){
			var pjRow = $jquery('#row-' + (pnBackRow));
			if(pjRow.length){
				pjTarget = getSession(pnBackRow, pjRow.find('a').length-1);
			}
		}
	}
	if(psMove === 'next'){
		pjTarget = getSession(pnRowIndex, pnColIndex+1);
		if(pjTarget.length === 0){
			pjTarget = getSession(pnNextRow, 0);
		}
	}
	
	if(pjTarget.length === 0){
		pjTarget = $jquery('#sessionDetail');
		
	}
	pjTarget.trigger('click');
	$jquery('html, body').scrollTop(pjTarget.offset().top -100);
}
function buildSponsorBox(poSponsorJson){
	goSponsorData = poSponsorJson;
	var psImgCol  = 'col-lg-2 col-md-2 col-sm-2 col-xs-12';
	var psFullCol = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
	var psHTML    = '<div class="container-fluid">';
	psHTML += '<div class="row">';
	for(var i=0, len=goSponsorData.length; i<len; i++){
		var psSponsorType   = goSponsorData[i]['type']
		var psSponsorPath   = goSponsorData[i]['path']
		var paSponsorDetail = goSponsorData[i]['detail']
		psHTML += '<div class="'+ psFullCol +'">';
		psHTML += '<div class="row">';
		psHTML += '<div class="'+ psFullCol +'"><h3 class="sponsorType-title">'+ psSponsorType +'</h3></div>';
		for(var k=0, len2=paSponsorDetail.length; k<len2; k++){
			var poSponsor = paSponsorDetail[k]
			var psName    = poSponsor['name'];
			var psSrc     = psSponsorPath + poSponsor['src'];
			var psUrl     = (poSponsor['url'] === '') ? ''    : poSponsor['url'];
			var psTagName = (psUrl === '')            ? 'div' : 'a';
			
			psHTML += '<div class="sponsor-box '+ psImgCol +'">';
			psHTML += '<' + psTagName + ' href="'+ psUrl +'" class="sponsor-box-link" style="background-image:url(' + psSrc + ')" target="_blank">';
			psHTML += '<img class="sponsor-img" src="'+ psSrc +'" alt="'+ psName +'" style="visibility:hidden;" />';
			psHTML += '</' + psTagName + '>';
			psHTML += '</div>';
		}
		psHTML += '</div></div>';
	}
	psHTML += '</div></div>';
	$jquery('.dbts-sponsor-box').html(psHTML);
	
	$jquery(window).bind('resize', function(){
		var pjSponsorBox = $jquery('.sponsor-box-link');
		var pbIsTouch    = ($jquery('#wptouch-search').length === 0) ? false : true;
		var psClassName  = (pbIsTouch) ? 'mini-sp' : 'mini';
		if($jquery(window).width() < 751){
			pjSponsorBox.addClass(psClassName);
		}else{
			pjSponsorBox.removeClass(psClassName);
		}
	})
	.trigger('resize');
}
})(jQuery);