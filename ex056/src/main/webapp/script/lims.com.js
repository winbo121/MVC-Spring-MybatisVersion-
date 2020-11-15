//document.write("<script src='script/lims.pop.js'></script>");

/**
 * @설명 : contextpath 를 구한다.
 */


function fn_getConTextPath(){
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
}
/**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
 * fnIsEmpty : 입력값이 Null이거나 빈값인지 체크한다. fnGetRowCount : 현재 그리드의 Row Count를 읽어온다. fnIsNumeric : 입력된 값이 Numeric 여부를 체크한다. fnDateFormatCheck : 날짜형식을 체크한다. fnStartLoading : 화면 로딩 이미지를 보여준다. fnStopLoading : 화면 로딩 이미지를 사라지게한다. fnSessionCheck : 서버에서 받은 값으로 세션을 체크한다. fnViewPage : 페이지를 가져온다. fnAjaxAction : ajax로 데이터처리한다. ajaxCombo : 공통 콤보를 읽어온다. ajaxComboForm : 폼에서 공통 콤보를 읽어온다.
 * 
 * 
 * 
 *************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
var com_auth_select = true;
var com_auth_save = true;

$(function() {
	$(document).ajaxStart(fnBasicStartLoading()).ajaxStop(fnBasicEndLoading());
});

/**
 * @설명 : 입력값이 Null이거나 빈값인지 체크한다.
 */
function fnIsEmpty(inVal) {
	if (new String(inVal).valueOf() == "undefined")
		return true;
	if (inVal == null)
		return true;

	var v_ChkStr = new String(inVal);

	if (v_ChkStr == null)
		return true;
	if (v_ChkStr.toString().length == 0)
		return true;
	return false;
}

/**
 * @설명 : 현재 그리드의 Row Count를 읽어온다.
 */
function fnGetRowCount(jqgridId) {
	try {
		return jQuery("#" + jqgridId).jqGrid('getGridParam', 'records');
	} catch (e) {
		alert(e.toString());
	}
}

/**
 * @설명 : 입력된 값이 Numeric 여부를 체크한다.
 */
function fnIsNumeric(value) {
	var strValidChars = "0123456789.-";
	var strChar;
	var blnResult = true;

	if (value.length == 0)
		return false;

	for (var i = 0; i < value.length && blnResult == true; i++) {
		strChar = value.charAt(i);
		if (strValidChars.indexOf(strChar) == -1) {
			blnResult = false;
		}
	}
	return blnResult;
}

/**
 * @설명 : 날짜형식을 체크한다.
 */
function fnDateFormatCheck(dateValue) {
	var tmp = gfncReplaceAll(dateValue, "/", "");
	if (tmp.length != 8) {
		return false;
	}
	var pattern = /\d{4}\/\d{2}\/\d{2}/;
	return pattern.test(dateValue);
}
/**
 * @설명 : 화면 기본 로딩 이미지를 보여준다.
 */
function fnBasicStartLoading() {
	//var msg = '<img src="images/ajax-loader.gif"/>';
	var msg = '';
	fnStartLoading('mainBody', msg);
}
/**
 * @설명 : 화면 기본 로딩 이미지를 사라지게 한다.
 */
function fnBasicEndLoading() {
	fnStopLoading('mainBody');
}
/**
 * @설명 : 화면 로딩 이미지를 보여준다.
 */
function fnStartLoading(id, msg) {
	var height;
	if ($('#'+ id).height() == 0 ){
		height = 293; 
	} else {
		height = $('#'+ id).height() - 20;
	}
	$('#' + id).block({
		message : msg,
		showOverlay : true,
		css : {
			border : 'none',
			//cursor : 'wait',
			cursor : 'point',
			backgroundColor : 'transparent'
		},
		overlayCSS : {
			opacity : 0.5,
			//cursor : 'wait',
			border : '2px solid #ad77db',
			cursor : 'point',
			backgroundColor : '#fff',
			top : '20px',
			height : height
		}
	});
}
/**
 * @설명 : 화면 로딩 이미지를 사라지게한다
 */
function fnStopLoading(id) {
	$('#' + id).unblock();
}
/**
 * @설명 : 서버에서 받은 값으로 세션을 체크한다
 */
function fnSessionCheck(data) {
	if (data == 'noSession') {
		location.href = "login.lims";
	}
}
/**
 * @설명 : 페이지를 가져온다
 * @파라미터 : url - 주소 , div - 페이지를 붙여넣을 태크 , data - 조회조건
 */
function fnViewPage(url, div, data) {
	//alert(div +":"+url);
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'html',
		async : false,
		data : data,
		success : function(html) {
			fnSessionCheck(html);
			$('#' + div).html(html);
		},
		error : function() {
			alert('[001]페이지를 찾을 수 없습니다.');
		}
	});
	
	/*	$('#' + div).load(
	url,
	data,
	function(responseTxt,statusTxt,xhr){
        //responseTxt : 호출이 성공하면, 결과의 컨테츠를 포함
        //statusTxt : 함수 호출의 결과
        //xhr : XMLHttpRequest 객체
        if(statusTxt=="success"){ 
        }  
        if(statusTxt=="error"){ //실행하면
            alert("Error: "+xhr.status+" : "+xhr.statusText);
        }
    });*/
}
/**
 * @설명 : ajax로 데이터처리
 * @파라미터 : url - 주소 , data - 데이터
 */


function ajaxJsonParam(url, param, successfunction, errorfunction) {
	$.ajax({
        url : url,
        dataType : 'json',
		type : 'POST',
		async : false,
        data : JSON.stringify(param),
        beforeSend : function(xmlHttpRequest){
            xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
        },        
        success : function(data,status,request){
        	if(successfunction != undefined && successfunction != null)
        		successfunction(data);
        },
        error : function(request,status,error) {
        	if(request.responseText != undefined){
    			var errorlog = JSON.parse(request.responseText);
    			alert("에러가 발생하였습니다. (" + errorlog.error.errorlogId + ")\n");
    		}
        	if(errorfunction != undefined && errorfunction != null){
        		errorfunction(request,status,error);
        	}
        }   
	});
}

/**
 * @설명 : ajax로 데이터처리
 * @파라미터 : url - 주소 , data - 데이터
 */
function fnAjaxAction2(url, data) {
	var ret = null;
	$.ajax({
		url : url,
		dataType : 'json',
		type : 'POST',
		async : false,
		data : data,
		success : function(json) {
			fnSessionCheck(json);
			ret = json;
		},
		error : function(error) {
			$.showAlert(error);
		}
	});
	return ret;
}

/**
 * @설명 : ajax로 데이터처리
 * @파라미터 : url - 주소 , data - 데이터
 */
function fnAjaxFileActionNone$(url, formData, success, error) {
	var xhr = ( window.XMLHttpRequest ) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	
	xhr.onload = function (data) {
		if( this.readyState == 4 && this.status == 200 ){
			if( success ) {
				success(data.target.response, xhr);
			}
		} else {
			if( error ) {
				error(xhr);
			}
		}
	}
	
	xhr.open('POST', url, true);
	xhr.setRequestHeader('encType', 'multipart/form-data');
	xhr.send(formData);
}
function gotoEdit1(){
	  $("#reqSampleGrid").setColProp("sample_reg_nm", {editable: true});
}
function gotoEdit2(){
	  $("#reqSampleGrid").setColProp("sample_reg_nm", {editable: false});
}
/**
 * @설명 : ajax로 데이터처리
 * @파라미터 : url - 주소 , data - 데이터
 */
function fnAjaxFileAction(url, form, func) {
	$("#" + form).ajaxSubmit({
		url : url,
		type : "post",
		dataType : 'json',
		// data : $('#' + form).serialize(),
		success : function(json) {
			fnSessionCheck(json);
			func(json);
		},
		error : function() {
			$.showAlert('[003]서버에 접속할 수 없습니다.');
		}
	});
}
function fnAjaxFileAction2(url, form, func) {
	var ret = null;
	var data = new FormData($('#'+form)[0]);
	$.ajax({
		type: "POST",
        enctype: 'multipart/form-data',
        url: url,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
		async : false,
		success : function(json) {
			fnSessionCheck(json);
			func(json);
			ret = json;
		},
		error : function() {
			$.showAlert('[002]서버에 접속할 수 없습니다.');
		}
	});
	return ret;
}
/**
 * @설명 : 달력표현
 * @파라미터 : id = input box id
 */
function fnDatePicker(id) {
	$("#" + id).datepicker({
		dateFormat : 'yy-mm-dd',
		monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
		changeYear : true,
		changeMonth : true

	});
}
/**
 * @설명 : 달력표현(이미지포함)
 * @파라미터 : id = input box id
 */
function fnDatePickerImg(id) {
	$("#" + id).datepicker({
		dateFormat : 'yy-mm-dd',
		monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
		changeYear : true,
		changeMonth : true,
		showOn : 'button',
		buttonImageOnly : true,
		buttonImage : "/images/common/calendar_img.gif"
	});
}

function fnDatePickerImg2(id) {
	$("#" + id).datepicker({
		dateFormat : 'yy-mm-dd',
		monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
		changeYear : true,
		changeMonth : true,
		showOn : 'button',
		buttonImageOnly : true,
		buttonImage : "/images/common/calendar_img.gif",
		beforeShowDay: function(date){
			var day = date.getDay();
			return [(day != 0 && day != 6)];
		}
	});
}

/**
 * @설명 : 달력표현(이미지포함) 팝업
 * @파라미터 : id = input box id, pop = string
 */
/*function fnDatePickerImgPop(id,pop) {
	$("#" + id).datepicker({
		dateFormat : 'yy-mm-dd',
		monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
		dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
		dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
		changeYear : true,
		changeMonth : true,
		showOn : 'button',
		buttonImageOnly : true,
		buttonImage : "../images/common/calendar_img.gif"
	});
}*/

/**
 * @설명 : ajax로 콤보 데이터처리
 * @파라미터 : obj - 콤보id , thisCode - 그룹코드 , type - ALL / CHOICE / 실제 데이터값 , name - ALLNAME - 데이터가 all일 경우
 */
function ajaxCombo(obj, thisCode, type, name) {

	if (obj == 'deptCd') {
		url = 'commonCode/selectCommonCodeDept.lims';
	} else if (obj == 'unitWork') {
		url = 'commonCode/selectCommonCodeUnitWork.lims';
	} else {
		url = 'commonCode/selectCommonCodeCombo.lims';
	}

	$.ajax({
		url : url,
		type : 'POST',
		async : false,
		dataType : 'json',
		data : "code=" + thisCode,
		timeout : 5000,
		error : function() {
			alert('공통Script 조회시 오류가 발생하였습니다.\n위치 : ajaxCombo');
		},
		success : function(json) {
			$("#" + obj).empty();
			if (type != "NON") {
				if (type == "ALL" && name != "ALLNAME") {
					$("#" + obj).append("<option value=''>전체</option>");
				} else if ((type == null || type == '' || type == "CHOICE") && name != "ALLNAME") {
					$("#" + obj).append("<option value=''>선택</option>");
				} else if (type != null && type != '' && name != "ALLNAME") {
					$("#" + obj).append("<option value=''>선택</option>");
				}

				if (name == "ALLNAME") {
					if (type == "ALL") {
						$("#" + obj).append("<option selected value='ALL'>전체</option>");
					} else if (type == "CHOICE") {
						$("#" + obj).append("<option value=''>선택</option>");
					} else {
						$("#" + obj).append("<option value='ALL'>전체</option>");
					}
				}
			}

			$(json).each(function(index, entry) {
				if (type == entry["code"] || type == entry["code_Name"]) {
					$("#" + obj).append("<option selected value='" + entry["code"] + "'>" + entry["code_Name"] + "</option>");
				} else {
					$("#" + obj).append("<option value='" + entry["code"] + "'>" + entry["code_Name"] + "</option>");
				}
			});
			$("#" + obj).trigger('change');// 강제로 이벤트 시키기
		}
	});
}

/**
 * @설명 : ajax로 콤보 데이터처리
 * @파라미터 : obj - 콤보id , thisCode - 그룹코드 , type - ALL / CHOICE / 실제 데이터값 , name - ALLNAME - 데이터가 all일 경우 , form - 폼id
 */
function ajaxComboForm(obj, thisCode, type, name, form) {
	/* 2019-09-19 정언구
	 * 콤보박스 호출 시 url오류로 인해 url의 호스트 부분을 제거
	 */
	//var url = fn_getConTextPath();
	var url = '';
	if (obj == 'supv_dept_cd') {
		url += '/commonCode/selectCommonCodeDept.lims';
	} else if (obj == 'dept_cd' || obj == 'mng_sub_dept_cd' || obj == 'sales_dept_cd' || obj == 'charger_dept_cd' ||obj == 'quality_dept_cd1'||obj == 'quality_dept_cd2') {
		url += '/commonCode/selectCommonCodeDept.lims';
	} else if (obj == 'pre_dept_cd') {
		url += '/commonCode/selectCommonCodePreDept.lims';
	} else if (obj == 'sales_user_id' || obj == 'charger_user_id'||obj == 'quality_user_id1'||obj == 'quality_user_id2') {
		url += '/commonCode/selectCommonCodeUser.lims';
	} else if (obj == 'unit_work_cd') {
		url += '/commonCode/selectCommonCodeUnitWork.lims';
	} else if (obj == 'state') {
		url += '/commonCode/selectCommonCodeState.lims';
	} else if (obj == 'statusState') {
		url += '/commonCode/selectCommonCodeStatusState.lims';
	} else if (obj == 'qreport_id') {
		url += '/commonCode/selectCommonCodePaper.lims';
	} else if (obj == 'counsel_path'){
		url += '/commonCode/selectCommonCodeCounselPath.lims';
	} else if (obj == 'counsel_div'){
		url += '/commonCode/selectCommonCodeCounselDiv.lims';
	} else if (obj == 'form_type'){
		url += '/commonCode/selectCommonFormType.lims';
	} else if (obj == 'doc_seq'){
		url += '/commonCode/selectCommonFormTypeDetail.lims';
	} else if (obj == 'counsel_progress_sts'){
		url += '/commonCode/selectCommonCodeCounselprogressSts.lims';	
	} else if (obj == 'testitm_lclas_cd'){ //항목 대분류 콤보
		thisCode = 'C20';
		url += '/commonCode/selectCommonCodeCombo.lims';
	} else if (obj == 'testitm_mlsfc_cd'){ //항목 중분류 콤보
		thisCode = 'C2A';
		url += '/commonCode/selectCommonCodeCombo.lims';
	} else if (obj == 'org_cd'){ // 업체 리스트
		url += '/commonCode/selectCommonOrgList.lims';	
	} else if (obj == 'form_seq'){ // 양식
		url += '/commonCode/selectFormComboList.lims';	
	} else if (obj == 'mailToSelect' || obj == 'mailToSelectCc'){ // 메일그룹 숨은참조 /참조
		url += '/master/selectListMailGroup.lims';	
	} else if (obj == 'oxide_cd' ){ //산화물표기
		url += '/commonCode/selectItemOxideMarkList.lims';
	} else if (obj == 'protocol' ){ //프로토콜
		url += '/commonCode/selectProtocolList.lims';
	} else {
		url += '/commonCode/selectCommonCodeCombo.lims';
	}

	if(name == 'EX1'){
		url = '/commonCode/selectCommonCodeEX1Combo.lims';
	}else if(name == 'EX2'){
		url = '/commonCode/selectCommonCodeEX2Combo.lims';
	}
	
	$.ajax({
		url : url,
		type : 'POST',
		async : false,
		dataType : 'json',
		data : "code=" + thisCode,
		timeout : 5000,
		error : function() {
			alert('공통Script 조회시 오류가 발생하였습니다.\n위치 : ajaxComboForm');
		},
		success : function(json) {
			var select = $("#" + form).find("#" + obj);
			select.empty();
			if (type != "NON" && name != "NON") {
				if (type == "ALL" && name != "ALLNAME") {
					select.append("<option value=''>전체</option>");
				} else if ((type == null || type == '' || type == "CHOICE") && name != "ALLNAME") {
					select.append("<option value=''>선택</option>");
				} else if (type != null && type != '' && name != "ALLNAME") {
					select.append("<option value=''>선택</option>");
				}

				if (name == "ALLNAME") {
					if (type == "ALL") {
						select.append("<option selected value=''>전체</option>");
					} else if (type == "CHOICE") {
						select.append("<option value=''>선택</option>");
					} else {
						select.append("<option value=''>전체</option>");
					}
				}
			}
			$(json).each(function(index, entry) {
				var codeNm;
				if (entry["codeNm"] != undefined)
					codeNm = entry["codeNm"]; 
				else if (entry["code_Name"] != undefined)
					codeNm = entry["code_Name"]; 
					
				if (type == entry["code"] || type == codeNm) {
					select.append("<option selected value='" + entry["code"] + "'>" + codeNm + "</option>");
				} else {
					select.append("<option value='" + entry["code"] + "'>" + codeNm + "</option>");
				}
				
				
			});
			select.trigger('change');// 강제로 이벤트 시키기
		}
	});
}

/**
 * 2019-10-01 정언구
 * 의뢰, 접수 정보의 채취 방법/구분을 로드합니다. 
 * @파라미터 : elementId - 체크박스를 삽입할 영역의 id , thisCode - 그룹코드 , type - ALL / CHOICE / 실제 데이터값 , name - ALLNAME - 데이터가 all일 경우, 
 * 								form - 폼id, collectList: (의뢰의)채취 방법, 채취 구분의 값들
 */

function ajaxCheckboxForm1(elementId, thisCode, type, name, form, collectList) {
	/* 2019-09-19 정언구
	 * 콤보박스 호출 시 url오류로 인해 url의 호스트 부분을 제거
	 */
	//var url = fn_getConTextPath();
	var url = '/commonCode/selectCommonCodeCombo.lims';

	$.ajax({
		url : url,
		type : 'POST',
		async : false,
		dataType : 'json',
		data : "code=" + thisCode,
		timeout : 5000,
		error : function() {
			alert('공통Script 조회시 오류가 발생하였습니다.\n위치 : ajaxCheckboxForm');
		},
		success : function(jsonArray) {
			var html = '';
			var checked = '';
			var etc = '';
			
			jsonArray.forEach(function (item) {
				checked = '';
				etc = '';
				//서버에서 가져온 채취 데이터와 비교하여 동일한 코드라면 checked 속성을 부여합니다.
				if( collectList && Array.isArray(collectList) ){
					collectList.forEach(function (obj) {
						if(obj.preCode != thisCode) return; 
						
						if( item.code == obj.code ){
							checked = 'checked';
						}
						// 기타 값이 있다면 기타 텍스트란에 삽입합니다.
						if( obj.etc ){
							etc = obj.etc;
						}
					});
				}
				
				// 의뢰의 채취 방법/구분 체크박스일 때, 텍스트 입력란을 추가합니다.
				if(item.code == 'C71007' || item.code == 'C72006'){
					html += '<input type="checkbox" disabled="disabled" name="'+name+'" value="'+item.code+'" '+checked+'/>'
								 + item.code_Name
								 + '<input type="text" disabled="disabled" name="'+name+'_etc" style="width:150px; margin-left:3px;" value="'+etc+'"/>';
				} else {
					html += '<input type="checkbox" disabled="disabled" name="'+name+'" value="'+item.code+'" '+checked+'/>'+item.code_Name;
				}
			});
			document.getElementById(elementId).innerHTML = html;
		}
	});
}






function ajaxCheckboxForm(elementId, thisCode, type, name, form, collectList) {
	/* 2019-09-19 정언구
	 * 콤보박스 호출 시 url오류로 인해 url의 호스트 부분을 제거
	 */
	//var url = fn_getConTextPath();
	var url = '/commonCode/selectCommonCodeCombo.lims';

	$.ajax({
		url : url,
		type : 'POST',
		async : false,
		dataType : 'json',
		data : "code=" + thisCode,
		timeout : 5000,
		error : function() {
			alert('공통Script 조회시 오류가 발생하였습니다.\n위치 : ajaxCheckboxForm');
		},
		success : function(jsonArray) {
			var html = '';
			var checked = '';
			var etc = '';
			
			jsonArray.forEach(function (item) {
				checked = '';
				etc = '';
				//서버에서 가져온 채취 데이터와 비교하여 동일한 코드라면 checked 속성을 부여합니다.
				if( collectList && Array.isArray(collectList) ){
					collectList.forEach(function (obj) {
						if(obj.preCode != thisCode) return; 
						
						if( item.code == obj.code ){
							checked = 'checked';
						}
						// 기타 값이 있다면 기타 텍스트란에 삽입합니다.
						if( obj.etc ){
							etc = obj.etc;
						}
					});
				}
				
				// 의뢰의 채취 방법/구분 체크박스일 때, 텍스트 입력란을 추가합니다.
				if(item.code == 'C71007' || item.code == 'C72006'){
					html += '<input type="checkbox" name="'+name+'" value="'+item.code+'" '+checked+'/>'
								 + item.code_Name
								 + '<input type="text" name="'+name+'_etc" style="width:150px; margin-left:3px;" value="'+etc+'"/>';
				} else {
					html += '<input type="checkbox" name="'+name+'" value="'+item.code+'" '+checked+'/>'+item.code_Name;
				}
			});
			document.getElementById(elementId).innerHTML = html;
		}
	});
}

/**
 * @설명 : 오늘날짜(달력)
 */
// mode = 0 , dayMode = 0 OR 14
function fnGetToday(mode, dayMode) {
	var d = new Date();
	var year = d.getFullYear();
	var month;
	if (mode == 0) {
		month = (d.getMonth() + 1).toString();
	} else {
		month = d.getMonth() + 1 - mode;
		
		if(month > 12){
			month = month - 12;
			year = (year + 1).toString();
		}
		
		if (month <= 0) {
			month = 12 + month;
			year = (year - 1).toString();
		}
		
		month = month.toString();
	}

	// day 계산
	var date = d.getDate();
	
	if (dayMode != 0){ 
		var day_last = new Date();
		var day = new Date();
		
		day_last.setDate(day.getDate() + dayMode);
		
		month = (day_last.getMonth()+1).toString();
		date = (day_last.getDate()).toString();
	} else {
		date = d.getDate().toString();
	}
	
	if (month.length == 1) {
		month = '0' + month;
	}
	if (date.length == 1) {
		date = '0' + date;
	}	
	
	return year + '-' + month + '-' + date;
}

/**
 * @설명 : 배열 중복제거
 */
function removeArrayDuplicate(array) {
	var a = {};
	for (var i = 0; i < array.length; i++) {
		if (typeof a[array[i]] == "undefined")
			a[array[i]] = 1;
	}
	array.length = 0;
	for ( var i in a)
		array[array.length] = i;
	return array;
}

/**
 * window open
 * 
 * @param url:
 *            url path
 * @param windowName
 *            windows Name
 * @param iwidth
 *            window width
 * @param iheight
 *            height
 * @param option
 *            option
 * @returns
 */
function gfncShowWindow(url, windowName, iwidth, iheight, option , formName) {

	if (option == null || option == "") {
		option = "toolbar=no, location=no, menubar=no, scrollbars=no, status=no, resizable=yes";
	}
	
	alert($("#"+formName).find('#popParam').val());
	
	var itop = ($(window).height() - iheight) / 2;
	var ileft = ($(window).width() - iwidth) / 2;
	option += ", width=" + iwidth + ", height=" + iheight + ", top=" + itop + ", left=" + ileft;

	var winOpen = window.open("", windowName, option);
	$("#"+formName).attr("target", windowName);
	$("#"+formName).attr("action", "popMain.lims").submit();
	//var _win = window.open(url, windowName, option);
	//	return _win;
}

/**
 * windows ModalDialog Open
 * 
 * @param strPageURL
 * @param vntInParams
 * @param iwidth
 * @param iheight
 * @returns
 */
function fnShowModalWindow(url, obj, iwidth, iheight) {
	var result;

	result = window.showModalDialog(url, obj, "dialogWidth=" + iwidth + "px;dialogHeight=" + iheight + "px;Status=no;Center=yes;border=thin;Resizable=no;Statusbar=no;Scroll=no;");
	return result;
}

/**
 * @설명 : 소수점 자리수 자르기
 */
function truncateDecimals(num, digits) {	
	/*digits = Number(digits);
	if (digits == 0) {
		digits = -1;
	}
	var numS = num.toString();
	var decPos = numS.indexOf('.');
	var substrLength = decPos == -1 ? numS.length : 1 + decPos + digits;
	var trimmedResult = numS.substr(0, substrLength);
	var finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;*/
	
	var finalResult = "";
	

	if(num != ""){
		if (digits == '') {
			finalResult = parseFloat(num);
		} else{
			var finalResult = Number(Math.round(num+'e'+digits)+'e-'+digits);
			finalResult = finalResult.toFixed(digits);

		}
	}
	
	return finalResult;
}
/**
 * @설명 : 사용자 조회 팝업
 */
function popUserInfo() {
	var obj = new Object();
	obj.msg1 = 'userChoice.lims';
	return fnShowModalWindow("popMain.lims", obj, 720, 410);
}

///**
// * @설명 : 시험방법 팝업
// */
//function btn_Pop_Method(test_item_cd) {
//	var obj = new Object();
//	obj.msg1 = 'analysis/testMethodChoice.lims';
//	obj.test_item_cd = test_item_cd;
//	var popup = fnShowModalWindow("popMain.lims", obj, 900, 335);
//	return popup;
//}
///**
// * @설명 : 시험기기 팝업
// */
//function btn_Pop_Machine(test_item_cd) {
//	var obj = new Object();
//	obj.msg1 = 'analysis/testMachineChoice.lims';
//	obj.test_item_cd = test_item_cd;
//	var popup = fnShowModalWindow("popMain.lims", obj, 900, 335);
//	return popup;
//}
/**
 * @설명 : 특이사항 다이얼로그 가져오기
 */
function fn_get_req_message(rowId) {
	var data = 'test_sample_seq=' + rowId;
	var json = fnAjaxAction('analysis/showReqmessage.lims', data);
	if (json == null) {
		$.showAlert('실패하였습니다.');
		return false;
	}
	if (json == 'no_data') {
		json = '';
	}
	$('#dialog').text(json);
	$("#dialog").dialog({
		buttons : [ {
			text : "확인",
			click : function() {
				$(this).dialog("close");
			}
		} ]
	});
}
///**
// * @설명 : 의뢰정보 팝업
// */
//function fn_pop_req_info(test_req_no, update) {
//	var obj = new Object();
//	obj.msg1 = 'showReqInfo.lims?test_req_no=' + test_req_no + '&pageType=' + update;
//	var popup = fnShowModalWindow("popMain.lims", obj, 900, 630);
//	return popup;
//}

///**
// * @설명 : 시료진행상황 팝업
// */
//function fn_pop_state_info(test_req_no, test_sample_seq) {
//	var obj = new Object();
//	obj.msg1 = 'showReqHistory.lims?test_req_no=' + test_req_no + '&test_sample_seq=' + test_sample_seq;
//	//obj.test_req_no = test_req_no;
//	//obj.test_sample_seq = test_sample_seq;
//	var popup = fnShowModalWindow("popMain.lims", obj, 1000, 600);
//	return popup;
//}

/**
 * @설명 : 기준 보기/숨기기
 */
function fn_visible_column(grid, mode) {
	switch (mode) {
	case 0:
		var arr = new Array();
		arr.push('std_fit_val');
		arr.push('std_unfit_val');
		if ($('#' + grid).jqGrid('getColProp', 'std_fit_val').hidden) {
			$('#btn_Choice_Show').find('button').text('선택형기준 숨김');
			$('#' + grid).showCol(arr);
		} else {
			$('#btn_Choice_Show').find('button').text('선택형기준 보기');
			$('#' + grid).hideCol(arr);
		}
		break;
	case 1:
		var arr = new Array();
		arr.push('std_hval');
		arr.push('hval_type');
		arr.push('std_lval');
		arr.push('lval_type');
		arr.push('loq_hval');
		arr.push('loq_lval');
		if ($('#' + grid).jqGrid('getColProp', 'std_hval').hidden) {
			$('#btn_Num_Show').find('button').text('수치형기준 숨김');
			$('#' + grid).showCol(arr);
		} else {
			$('#btn_Num_Show').find('button').text('수치형기준 보기');
			$('#' + grid).hideCol(arr);
		}
		break;
	case 2:
		var arr = new Array();
		arr.push('grade1');
		arr.push('grade1_range');
		arr.push('grade2');
		arr.push('grade2_range');
		arr.push('grade3');
		arr.push('grade3_range');
		arr.push('grade4');
		arr.push('grade4_range');
		if ($('#' + grid).jqGrid('getColProp', 'grade1').hidden) {
			$('#btn_Grade_Show').find('button').text('등급별기준 숨김');
			$('#' + grid).showCol(arr);
		} else {
			$('#btn_Grade_Show').find('button').text('등급별기준 보기');
			$('#' + grid).hideCol(arr);
		}
		break;
	}
}
/**
 * text 박스 초기화 시키기 ex) TextClear("textId");
 * 
 * @param title
 *            다이얼로그의 팝업 title
 * @param memo
 *            dialog의 내부 내용
 * @param div_name
 *            div의 name
 * @return
 */
function fn_TextClear(textId) {
	if ($("#" + textId) != null) {
		$("#" + textId).val('');
	}
}
/**
 * @설명 : 첨부파일 file_name label 초기화 시키기 ex) fn_LabelClear("labelId");
 * 
 */
function fn_LabelClear(labelId) {
	if ($('#' + labelId) != null)
		$('#' + labelId).text('첨부파일이 없습니다.');
}

/**
 * @설명 : 엔터 조회
 */
function fn_Enter_Search(form, grid) {
	$('form[name=' + form + '] input , form[name=' + form + '] select').keypress(function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			$('#'+form).find('#btn_Select').click();
			//$('#' + grid).trigger('reloadGrid');
		}
	});
}
/**
 * @설명 : 성적서 미리보기
 */
function fn_RDView(file, param, print, publish, width, height) {
	var obj = new Object();
	obj.file = file;
	obj.param = param;
	obj.print = print;
	var data = '?gridData=' + file + '|' + param + '|' + print + '|' + publish;
	var pop = window.open("rdView.lims" + data, null, "width=" + width + "px, height=" + height + "px, toolbar=no, location=no, menubar=no, scrollbars=yes, status=yes, resizable=yes");
	//pop.dialogArguments = obj;
	pop.focus();
}
/**
 * @설명 : 바코드출력
 */
function fn_RDViewLabel(file, param, print, publish, width, height) {

	var obj = new Object();
	obj.file = file;
	obj.param = param;
	obj.print = print;
	var data = '?gridData=' + file + '|' + param + '|' + print + '|' + publish;
	var pop = window.open("rdViewLabel.lims" + data, null, "width=" + width + "px, height=" + height + "px, toolbar=no, location=no, menubar=no, scrollbars=no, status=no, resizable=no");
	//pop.dialogArguments = obj;
	pop.focus();
}
/**
 * @설명 : 시약 바코드출력
 */
function fn_RDViewMtlrLabel(file, param, print, publish, width, height) {

	var obj = new Object();
	obj.file = file;
	obj.param = param;
	obj.print = print;
	var data = '?gridData=' + file + '|' + param + '|' + print + '|' + publish;
	var pop = window.open("rdViewMtlrLabel.lims" + data, null, "width=" + width + "px, height=" + height + "px, toolbar=no, location=no, menubar=no, scrollbars=no, status=no, resizable=no");
	//pop.dialogArguments = obj;
	pop.focus();
}
/**
 * @설명 : rdms 뷰어 호출
 */
function fn_RDMS_Viewer(data) {
	$.ajax({
		url : "rdmsViewer.lims",
		type : "post",
		async : false,
		data : data,
		dataType : "json",
		success : function(data) {
			if (data[1] == 0) {
				alert('데이터가 존재하지 않습니다.');
			} else {
				document.getElementById("vParam").value = data[1];
				var frm = document.getElementById("frmBinder");
				frm.target = "ifrmexcel";// 새창X
				frm.action = 'http://' + data[0] + '/RDMS_ViewerRun/RDMS_ViewerRun.application';
				//frm.method = "post";
				frm.submit();
			}
		},
		error : function() {
			alert("[004]RDMS 뷰어 오류가 발생했습니다.");
		}
	});
}
/**
 * @설명 : 결과확인/승인/성적서발행 그룹해더 설정
 */
function fn_Result_setGroupHeaders2(grid) {
	$('#' + grid).jqGrid('setGroupHeaders', {
		useColSpanStyle : true,
		groupHeaders : [ {
			startColumnName : 'std_lval',
			numberOfColumns : 6,
			titleText : '수치형기준'
		}, {
			startColumnName : 'std_fit_val',
			numberOfColumns : 2,
			titleText : '선택형기준'
		}, {
			startColumnName : 'result_val',
			numberOfColumns : 4,
			titleText : '결과'
		} ]
	});
}
/**
 * @설명 : 금액 , 표현
 */
function commaNum(num) {
	var len, point, str;
	num = num + "";
	point = num.length % 3;
	len = num.length;
	str = num.substring(0, point);
	while (point < len) {
		if (str != "")
			str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
}
///**
// * @설명 : 주소검색팝업창
// */
//function fn_zipcode() {
//
//	var obj = new Object();
//	obj.msg1 = 'popAddrCode.lims';
//	var popup = fnShowModalWindow("popMain.lims", obj, 800, 480);
//	var ret = popup;
//
//	var arr = ret.split('◆★◆');
//
//	$('#addr1').val(arr[0]);
//	$('#zip_code').val(arr[1]);
//
//}

//function btn_pop_req_result_info() {
//	var rowId = $('#reqListGrid').getGridParam('selrow');
//	if (rowId == null) {
//		alert('선택된 행이 없습니다.');
//		return false;
//	} else {
//		var row = $('#reqListGrid').getRowData(rowId);
//		var obj = new Object();
//		obj.test_req_no = row.test_req_no;
//		obj.msg1 = 'showReqResultInfo.lims';
//		fnShowModalWindow("popMain.lims", obj, 900, 700);
//	}
//}


/**
 * @설명 : 의뢰처팝업창
 */
//function btn_Pop_ReqOrgChoice(formName) {
//	var form = formName;
//
//	if ($('#tabs').tabs('option', 'active') == 1) {
//		form = 'reqListForm';
//	}
//	var obj = new Object();
//	//alert($('#' + form).find('#req_type').val());
//	// 의뢰구분에 따른 변경(현재 정의되지않음으로 주석)
//	//obj.req_type = $('#' + form).find('#req_type').val();
//	obj.msg1 = 'accept/reqOrgChoice.lims';
//
//	var popup = fnShowModalWindow("popMain.lims", obj, 700, 485);
//	if (popup != null) {
//		var arr = popup.split('■★■');
//		for ( var r in arr) {
//			var v = arr[r].split('●★●');
//			var id = v[0];
//			if (id == 'req_org_no' || id == 'code') {
//				id = 'req_org_no';
//				$('#' + form).find('#' + id).val(v[1]);
//			} else if (id == 'org_nm' || id == 'code_Name') {
//				id = 'req_org_nm';
//				$('#' + form).find('#' + id).val(v[1]);
//			} else {
//				$('#' + form).find('#' + id).val(v[1]);
//			}
//		}
//	}
//	$('#' + form).find('#req_org_nm').focus();
//}

/**
 * form 벨리데이션 체크 ex) formValidationCheck("formName");
 * 
 * @param formName
 *            form 객체명
 * @return bool
 */
function formValidationCheck(form){
	//input check
	var formInput = $("input[class*=inputCheck][type=text], select[class*=inputCheck], textarea[class*=inputCheck]", "#"+form);
	for(var i =0; i < formInput.length; i++){
		if(fnIsEmpty($(formInput[i]).val())){
			var nodeNm = $(formInput[i]).parent('td').prev('th').text();
			alert(nodeNm + ": 필수 입력 입니다.");
			$("#"+$(formInput[i]).attr("id"), "#"+form).focus();
			return true;
		}

	}
	//radio check
	var formInput = $("input[class*=inputCheck][type=radio]", "#"+form);
		
	for(var i =0; i < formInput.length; i++){
		var rdoid = $(formInput[i]).attr("id");
		if(fnIsEmpty($(':radio[id='+rdoid+']:checked').val())){
			var nodeNm = $(formInput[i]).parent('td').prev('th').text();
			alert(nodeNm + ": 필수 입력 입니다.");
			$("#"+$(formInput[i]).attr("id"), "#"+form).focus();
			return true;
		}
	}
	
	return false;
}

/**
 * 벨리데이션 체크 length ex) fn_lengthCheck("dept_cd","7");
 * 
 * @param obj, len
 *             객체명
 * @return bool
 */
function fn_lengthCheck(obj, len){
	if($("#"+obj).val().length == len){
		return true;
	}else{
		var nodeNm = $("#"+obj).parent('td').prev('th').text();
		alert(nodeNm + ": " + len+"자리로 입력해주세요.");
		return false;
	}
}

/**
 * 화면 세부 권한체크
 * 선행조건 해당 이벤트 span 이나 button class에 
 * 'auth_select' or 'auth_save'를 추가한다.
 * @param 
 *            
 * @return 
 */
function fn_auth_check(){
	//var formInput = $("span[class*=auth_save]", "#authGroupForm");
	var menu_cd = $("#menu_cd").val();
	if(fnIsEmpty(menu_cd)){
		alert("ERROR]MENU_CD IS NULL");
		return;
	}
	var data = "menu_cd="+ menu_cd;
	var auth_save = 0;
	var auth_select = 0;
	
	$.ajax({
		url : "menuAuthCheck.lims",
		type : "post",
		async : false,
		data : data,
		dataType : "json",
		success : function(data) {
			if(data.length > 0){
				for(var i=0; i < data.length; i++){
					if(data[i].auth_save > 0){
						auth_save ++;
					}
					if(data[i].auth_select > 0){
						auth_select ++;
					}
				}
			}
			if(!(auth_save > 0)){
				var objCheck = $("span[class*=auth_save], button[class*=auth_save]");
				for(var i =0; i < objCheck.length; i++){
					//alert($(objCheck[i]).text());
					$(objCheck[i]).attr("onclick", '').unbind('click');
					$(objCheck[i]).attr("onclick", '').click(event_msg);
					com_auth_select = false;
				}
			}
			if(!(auth_select > 0)){
				var objCheck = $("span[class*=auth_select], button[class*=auth_select], select[class*=auth_select]");
				for(var i =0; i < objCheck.length; i++){
					$(objCheck[i]).attr("onclick", '').unbind('click');
					$(objCheck[i]).attr("onclick", '').click(event_msg);
					com_auth_save = false;
				}
			}
		},
		error : function() {
		}
	});
}
/**
 * 보여줄 메세지
 * 
 * @param 
 *            
 * @return 
 */
function event_msg(){
	alert('권한이 없어 사용할 수 없습니다.\n관리자에게 문의바랍니다.'); return false;
}

function fn_zero_pad (str) {
	return ( str.length > 1 ) ? str : '0' + str;
}

function fn_getToday_number () {
	var today = new Date();
	return (today.getFullYear().toString() + fn_zero_pad((today.getMonth() + 1).toString()) + fn_zero_pad(today.getDate().toString()))/1;  
}

function html5Viewer(fileNm,params,printYn, downloadYn) {
	var param = {"fileNm" : fileNm, "parameter" : params};
	$.ajax({
		url : "/html5Viewer.lims",
		type : "post",
		async : false,
		data : param,
		dataType : "json",
		success : function(data) {	
			var param = data[1];
			var serverUrl = data[2];
			var filePath = data[3] + data[0];
			
			if (downloadYn != undefined) 
				viewerFunc(param, serverUrl, filePath, printYn, downloadYn);
			else
				viewerFunc(param, serverUrl, filePath, printYn);	

			
		},
		error : function() {
			alert("[009]RD 뷰어 오류가 발생했습니다.");
		}
	});
}



function viewerFunc(param, serverUrl, filePath, printYn, downloadYn){
	var viewer = new m2soft.crownix.Viewer(serverUrl);
	viewer.openFile(filePath, param);
	
	if (downloadYn != undefined && downloadYn) {
		viewer.bind('report-finished', function() {
			viewer.export('pdf',function(pdf) {
			});
		});	
	}
	
	if(printYn){
		viewer.print({isServerSide:true});
	}

}

function html5Viewer2(fileNm, parameterArr1, parameterArr2, parameterArr3,parameterArr4,parameterArr5,parameterArr6,parameterArr7,parameterArr8,parameterArr9 ){
	ajaxJsonParam("../html5Viewer.lims", {}, function(data){
		var data_server = data[0];
		var reportingServerPath = data[2];
		var rportServiceInfo = data[4];
		var mrd_path = data[3];
		
		var paramArr1 = new Array();
		var paramArr2 = new Array();
		var paramArr3 = new Array();
		var paramArr4 = new Array();
		var paramArr5 = new Array();
		var paramArr6 = new Array();
		var paramArr7 = new Array();
		var paramArr8 = new Array();
		var paramArr9 = new Array();
		

		if(parameterArr1 != undefined){
			paramArr1 = parameterArr1;
		}
		if(parameterArr2 != undefined){
			paramArr2 = parameterArr2;
		}
		if(parameterArr3 != undefined){
			paramArr3 = parameterArr3;
		}
		if(parameterArr4 != undefined){
			paramArr4 = parameterArr4;
		}
		if(parameterArr5 != undefined){
			paramArr5 = parameterArr5;
		}
		if(parameterArr6 != undefined){
			paramArr6 = parameterArr6;
		}
		if(parameterArr7 != undefined){
			paramArr7 = parameterArr7;
		}
		if(parameterArr8 != undefined){
			paramArr8 = parameterArr8;
		}
		if(parameterArr9 != undefined){
			paramArr9 = parameterArr9;
		}

		var mrdList = new Array();
		for(var i = 0; i < parameterArr2.length; i++){
			mrdList[i] = {mrdPath:mrd_path+fileNm,mrdParam:" /rp "+"["+paramArr1+"]"+" ["+paramArr2[i]+"]"+" ["+paramArr3+"]"+" ["+paramArr4+"]"+" ["+paramArr5+"]"+" ["+paramArr6+"]"+" ["+paramArr7+"]"+" ["+paramArr8[i]+"]"+" ["+paramArr9+"]" + rportServiceInfo};			
		}
		viewerFunc2(reportingServerPath, mrdList);
	});
}

function viewerFunc2(reportingServerPath, mrdList){
	var viewer = new m2soft.crownix.Viewer(reportingServerPath);
	viewer.openFile(mrdList);
}

function html5Viewer3(fileNmArr, parameterArr1, parameterArr2, parameterArr3,parameterArr4,parameterArr5,parameterArr6,parameterArr7,parameterArr8,parameterArr9){
	ajaxJsonParam("../html5Viewer.lims", {}, function(data){
		var data_server = data[0];
		var reportingServerPath = data[2];
		var rportServiceInfo = data[4];
		var mrd_path = data[3];
		
		var paramArr1 = new Array();
		var paramArr2 = new Array();
		var paramArr3 = new Array();
		var paramArr4 = new Array();
		var paramArr5 = new Array();
		var paramArr6 = new Array();
		var paramArr7 = new Array();
		var paramArr8 = new Array();
		var paramArr9 = new Array();
		
		
		if(parameterArr1 != undefined){
			paramArr1 = parameterArr1;
		}
		if(parameterArr2 != undefined){
			paramArr2 = parameterArr2;
		}
		if(parameterArr3 != undefined){
			paramArr3 = parameterArr3;
		}
		if(parameterArr4 != undefined){
			paramArr4 = parameterArr4;
		}
		if(parameterArr5 != undefined){
			paramArr5 = parameterArr5;
		}
		if(parameterArr6 != undefined){
			paramArr6 = parameterArr6;
		}
		if(parameterArr7 != undefined){
			paramArr7 = parameterArr7;
		}
		if(parameterArr8 != undefined){
			paramArr8 = parameterArr8;
		}
		if(parameterArr9 != undefined){
			paramArr9 = parameterArr9;
		}
		
		var mrdList = new Array();
		for(var i = 0; i < fileNmArr.length; i++){
			mrdList[i] = {mrdPath:mrd_path+fileNmArr[i],mrdParam:" /rp "+"["+paramArr1+"]"+" ["+paramArr2[i]+"]"+" ["+paramArr3+"]"+" ["+paramArr4+"]"+" ["+paramArr5+"]"+" ["+paramArr6+"]"+" ["+paramArr7+"]"+" ["+paramArr8[i]+"]"+" ["+paramArr9+"]" + rportServiceInfo};			
		}
		
		viewerFunc3(reportingServerPath, mrdList);
	});
}

function viewerFunc3(reportingServerPath, mrdList){
	var viewer = new m2soft.crownix.Viewer(reportingServerPath);
	viewer.openFile(mrdList);
}

function getReportFile(fileNm, params, reqNo, samNo, formData) {
	var attFileNm;
	//시험분석 의뢰서
	attFileNm = "TestResult_" + reqNo +".pdf";
	var param = {"fileNm" : fileNm,  "parameter" : params};
	var mailTo = $("#mailTo").val();
	var mailCc = $("#mailToCc").val();
	var mailBcc = $("#mailToBcc").val();	
	var mailAttach1 = $("#mailAttach1").val();
		
	//sampling 여부 
	if (samNo == '' || samNo == null ) {
		var title = "성적서 송부의 건 [" + reqNo + "]";
	} else {
		//var title = "성적서 송부의 건 [" + reqNo + "] ["+samNo+"]";
		var title = "성적서 송부의 건 [" + reqNo + "]";
	}
	//메일 기본 문구
	//var contents =  "안녕하세요 대덕분석기술연구소입니다. <br>의뢰하신 샘플의 분석결과를 첨부하여 보내드리오니 확인 후 문의사항이 있으시면 연락주시기 바랍니다. <br>감사합니다. 좋은 하루 보내세요. <br><br><br> * 성적서 관련 문의 042-867-6019";
	var contents =  "";
	
	formData.append("title",title);
	formData.append("contents",contents);
	formData.append("reportFileNm",fileNm);
	formData.append("fileNm",attFileNm);
	formData.append("mrd_path",fileNm);
	formData.append("mrd_param",params);
	
	$.ajax({
		url : "/accept/reportMailSend.lims",
		type : 'post',
		dataType : 'html',
		async : false,
		data : formData,
		contentType:false,
		processData:false,
		success : function() {
			alert("메일을 전송했습니다.");
			window.close();
		},
		error : function(request,error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			alert('[001]페이지를 찾을 수 없습니다.');
		}
	});
}

//분리발행
function getReportFile2(fileNm, parameterArr1, parameterArr2, parameterArr3,parameterArr4,parameterArr5,parameterArr6,parameterArr7,parameterArr8, reqNo, judge, formData){
	var attFileNm;
	attFileNm = "TestResult_" + reqNo +".pdf";
	var fileNmArr = new Array();
	var paramArr1 = new Array();
	var paramArr2 = new Array();
	var paramArr3 = new Array();
	var paramArr4 = new Array();
	var paramArr5 = new Array();
	var paramArr6 = new Array();
	var paramArr7 = new Array();
	var paramArr8 = new Array();
	
	if(fileNm != undefined){
		fileNmArr = fileNm;
	}
	if(parameterArr1 != undefined){
		paramArr1 = parameterArr1;
	}
	if(parameterArr2 != undefined){
		paramArr2 = parameterArr2;
	}
	if(parameterArr3 != undefined){
		paramArr3 = parameterArr3;
	}
	if(parameterArr4 != undefined){
		paramArr4 = parameterArr4;
	}
	if(parameterArr5 != undefined){
		paramArr5 = parameterArr5;
	}
	if(parameterArr6 != undefined){
		paramArr6 = parameterArr6;
	}
	if(parameterArr7 != undefined){
		paramArr7 = parameterArr7;
	}
	if(parameterArr8 != undefined){
		paramArr8 = parameterArr8;
	}

	
	var mrdPathList = [];
	var mrdList = [];
	var mrdPath = "";
	var mrdParam = "";
	var sep = '★ ';
	
	for(var i = 0; i < parameterArr2.length; i++){
		if (judge == "sep"){
			mrdPath  += "★" + fileNmArr;
		} else if (judge == "mix"){
			mrdPath  += "★" + fileNmArr[i];
		}
		mrdParam += "★/rp "+"["+paramArr1+"]"+" ["+paramArr2[i]+"]"+" ["+paramArr3+"]"+" ["+paramArr4+"]"+" ["+paramArr5+"]"+" ["+paramArr6+"]"+" ["+paramArr7+"]"+" ["+paramArr8[i]+"]";
	}
	console.log("&&&&&&")
console.log(mrdPath)
	var mailTo = $("#mailTo").val();
	var mailCc = $("#mailToCc").val();
	var mailBcc = $("#mailToBcc").val();	
	var title = "";
	title = "성적서 송부의 건 [" + reqNo + "]";

	//메일 기본 문구
	//var contents =  "안녕하세요 대덕분석기술연구소입니다. <br>의뢰하신 샘플의 분석결과를 첨부하여 보내드리오니 확인 후 문의사항이 있으시면 연락주시기 바랍니다. <br>감사합니다. 좋은 하루 보내세요. <br><br><br> * 성적서 관련 문의 042-867-6019";
	var contents =  "";

	formData.append("title",title);
	formData.append("contents",contents);
	formData.append("reportFileNm",fileNm);
	formData.append("fileNm",attFileNm);
	formData.append("mrd_path",mrdPath.substring(1));
	formData.append("mrd_param",mrdParam.substring(1));
	
	$.ajax({
		url : "/accept/reportMailSend.lims",
		type : 'post',
		dataType : 'html',
		async : false,
		data : formData,
		contentType:false,
		processData:false,
		success : function() {
			alert("메일을 전송했습니다.");
			window.close();
		},
		error : function(request,error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			alert('[001]페이지를 찾을 수 없습니다.');
		}
	});
}

function getReportFile3(fileNmArr, parameterArr1, parameterArr2, parameterArr3,parameterArr4, titleAdd){
	var attFile = "EstimatePaper_" + parameterArr2 +".pdf";
	
	var est = parameterArr4;
	
	var mrdPathList = [];
	var mrdList = [];
	var mrdPath = "";
	var mrdParam = "";
	var sep = '★ ';

	for(var i = 0; i < fileNmArr.length; i++){
		mrdPath  += "★" + fileNmArr[i];
		mrdParam += "★/rp "+"["+parameterArr1[i]+"]"+" ["+parameterArr2+"]";
	}

	var mailTo = $("#mailTo").val();
	var mailCc = $("#mailToCc").val();
	var mailBcc = $("#mailToBcc").val();	
	
	if (parameterArr3 == '' || parameterArr3 == null ) {
		var title = "접수증 송부의 건 [" + parameterArr2 + "] "+ titleAdd;
	} else {
		//var title = "접수증 송부의 건 [" + parameterArr2 + "] [" + parameterArr3 + "] "+ titleAdd;
		var title = "접수증 송부의 건 [" + parameterArr2 + "] "+ titleAdd;
	}
	//var contents = "안녕하세요. 대덕분석기술연구소입니다. 시험분석 서비스를 이용해주심에 감사드리며, 의뢰하신 시험분석에 대해 다음과 같이 안내하여 드립니다.";
	var contents = "";
	var data = "mailTo=" + mailTo + "&mailCc=" + mailCc + "&mailBcc=" + mailBcc + "&title=" + title + "&contents=" + contents	+ "&dpi=100" + "&mrd_path=" + mrdPath.substring(1) 
	+ "&mrd_param=" + mrdParam.substring(1) + "&fileNm=" + attFile + "&est=" + est;
	
	console.log(data);
	
	$.ajax({
		url : "/accept/mailSend.lims",
		type : 'post',
		dataType : 'html',
		async : false,
		data : data,
		success : function() {
			alert("메일을 전송했습니다.");
			window.close();
		},
		error : function() {
			alert('[001]페이지를 찾을 수 없습니다.');
		}
	});
}

function makeblob(dataURL) {
	const BASE64_MARKER = ';base64,';
	const parts = dataURL.split(BASE64_MARKER);
	const contentType = parts[0].split(':')[1];
	const raw = window.atob(parts[1]);
	const rawLength = raw.length;
	const uInt8Array = new Uint8Array(rawLength);

	for (var i = 0; i < rawLength; ++i) {
	    uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], { type: contentType });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//메일전송
function fn_Send_Mail_report_onclick(grid, logNo) {
	var rowId = $('#'+grid).getGridParam('selrow');
	var gridRow = $('#'+grid).getRowData(rowId);
	if (rowId == null || rowId == '') {
		alert('선택된 의뢰가 없습니다.');
		return false;
	}
	//발행이력목록
	rowId = gridRow.log_no;
	
	//성적성 목록
	if (logNo != undefined && logNo != null)
		rowId = logNo;
	
	fnpop_sendMailPop(grid, "1000", "1500", rowId);
} 