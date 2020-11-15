	var openPopup;
	/**
	 * @설명 : 의뢰처팝업창
	 */
	function fnpop_reqOrgChoicePop(formName, width, hight, popupName) {
		var form = formName;		
		var url;
		// 팝업 사용하는 종류에 따른 분기
		if (popupName == "상담의뢰업체" || popupName == "의뢰정보팝업" || popupName == "장비대여접수" || popupName == "견적업체"  
			|| popupName == "견적업체_TEMP" ||  !popupName) {
			url = fn_getConTextPath()+"/reqOrgChoice.lims";
		} else if(popupName == "참조메일" || popupName == "숨은참조메일"){
			url = "../accept/reqOrgChoice.lims";
		} else {
			url = "accept/reqOrgChoice.lims";
		}
		
		var option = "";
		
		if ($('#tabs').tabs('option', 'active') == 1) {
			form = 'reqListForm';
		}	
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 그리드에서 사용하는 시료 팝업창
	 */
	function fnpop_sampleChoicePop(width, hight, popupName, type, pageName) {
		var url = "accept/sampleChoice.lims";
		
		if(!type){
			url = fn_getConTextPath()+"/accept/sampleChoice.lims";
		}
		var option = "";
		popupName = popupName + "★●★" + type + "★●★" + pageName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 팀 관리팝업(등록/수정) 
	 * 
	 */
	function fnpop_deptTeamPop(popupName, pageType, dept_cd, team_cd){

		var url = "system/deptTeamPop.lims?pageType="+pageType+"&dept_cd="+dept_cd+"&team_cd="+team_cd;
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes";
		var iwidth = "520";
		var iheight = "250";
		var itop = ($(window).height() - iheight) / 2;
		var ileft = ($(window).width() - iwidth) / 2;
		option += ", width=" + iwidth + ", height=" + iheight + ", top=" + itop + ", left=" + ileft;

		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 상담관리 > 통합상담리스트 팝업(등록/수정) 
	 * 
	 */
	function fnpop_CounselTotalPop(pageType, popupName){		
		var chk_total_no = $('#counselTotalGrid').jqGrid('getGridParam', 'selrow');
		var url;
		if(pageType == 'insert'){
			url = "accept/selectCounselTotalDetail.lims?pageType="+pageType;			
			fnBasicStartLoading();
		}		
		else if(pageType == 'update'){
			if(chk_total_no != '' && chk_total_no != null){
				url = "accept/selectCounselTotalDetail.lims?pageType="+pageType+"&totalNo="+chk_total_no;
				fnBasicStartLoading();
			}else{
				alert('선택된 행이 없습니다.');
			}
		}
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes";
		var iwidth = "600";
		var iheight = "260";
		var itop = ($(window).height() - iheight) / 2;
		var ileft = ($(window).width() - iwidth) / 2;
		option += ", width=" + iwidth + ", height=" + iheight + ", top=" + itop + ", left=" + ileft;
		
		if(url != '' && url != null){
			var winOpen = window.open(url, popupName, option);
		}		
	}
	
	/**
	 * @설명 : 상담관리 > 개별상담리스트 팝업(등록/수정) 
	 * 
	 */
	function fnpop_CounselPersonalPop(pageType, popupName){		
		var chk_total_no = $('#counselTotalGrid').jqGrid('getGridParam', 'selrow');
		var chk_personal_no = $('#counselPersonalGrid').jqGrid('getGridParam', 'selrow');
		
		var url;
		if(pageType == 'insert'){
			if(chk_total_no == ''){
				alert("통합상담번호가 없습니다.");
			}else{
				url = "accept/selectCounselPersonalDetail.lims?pageType="+pageType+"&totalNo="+chk_total_no;
				fnBasicStartLoading();
			}
		}
		else if(pageType == 'update'){
			if(chk_personal_no == null){
				alert('선택된 행이 없습니다.');
				return;
			} else{
				url = "accept/selectCounselPersonalDetail.lims?pageType="+pageType+"&totalNo="+chk_total_no+"&personalNo="+chk_personal_no;
				fnBasicStartLoading();
			}
		}				
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes";
		var iwidth = "600";
		var iheight = "500";
		var itop = ($(window).height() - iheight) / 2;
		var ileft = ($(window).width() - iwidth) / 2;
		option += ", width=" + iwidth + ", height=" + iheight + ", top=" + itop + ", left=" + ileft;
		
		if(url != '' && url != null){
			var winOpen = window.open(url, popupName, option);
		}
	}
	
	
	/**
	 * @설명 : 항목 선택 팝업 
	 * 
	 */
	function fnpop_itemChoicePop(formName, width, hight, popupName) {
		var url = "accept/itemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 접수 - 항목 선택 팝업 
	 * 
	 */
	function fnpop_stdItemChoicePop(formName, width, hight, popupName) {
		var url = "accept/stdItemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 식약처기준품목선택팝업(품목 - 항목 선택 팝업) 
	 * 
	 */
	function fnpop_mfdsStdItemChoicePop(formName, width, hight, popupName) {
		//var url = "master/prdItemChoice.lims";
		var url = "accept/mfdsStdItemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 자가기준품목선택팝업(품목 - 항목 선택 팝업) 
	 * 
	 */
	function fnpop_selfStdItemChoicePop(formName, width, hight, popupName) {
		var url = "accept/selfStdItemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 스탠다드선택팝업(품목 - 항목 선택 팝업) 
	 * 
	 */
	function fnpop_selfStandItemChoicePop(formName, width, hight, popupName) {
		var url = "accept/selfStnadPItemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 등급별품목선택팝업(품목 - 항목 선택 팝업) 
	 * 
	 */
	function fnpop_selfGradeChoicePop(formName, width, hight, popupName) {
		var url = "accept/selfGradeChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 접수 메일전송 팝업 
	 * 
	 */
	function fnpop_sendMailPop(formName, width, hight, popupName) {
		var url;
		//시험분석 의뢰서(접수 메일)
		if (formName == 'reqItemForm') {
			url = "accept/acceptMailSendPop.lims";
		//성적서(성적서발행)
		} else {
			url = "report/reportMailSendPop.lims";
		}
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 품목별 전처리비용
	 * 
	 */
	function fnpop_pretreatmentPop(formName, width, hight, popupName) {
		var url = "accept/pretreatmentPop.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	
	/**
	 * @설명 : 품목 - 항목 선택 팝업 
	 * 
	 */
	function fnpop_prdItemChoicePop(formName, width, hight, popupName) {
		var url = "master/prdItemChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	
	/**
	 * @설명 : 장비 선택 팝업 
	 * 
	 */
	function fnpop_instChoicePop(formName, width, hight, popupName) {
		var url = "accept/instChoice.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	
	/**
	 * @설명 : 사용자 조회 팝업
	 */
	function fnpop_UserInfoPop(formName, width, hight, popupName, rowId) {
		var team_cd = $('#deptTeamUserForm').find('#team_cd').val();
		var url = "system/userChoice.lims?team_cd="+team_cd;
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		popupName = popupName + "★●★" + formName + "★●★" + rowId;
		
		window.open(url, popupName, option);
	}
	
	
	/**
	 * @설명 : 접수 [의뢰정보] 팝업
	 */
	function fnpop_reqInfoPop(formName, width, hight, popupName, test_req_seq, update) {
		var url = 'showReqInfo.lims?test_req_seq=' + test_req_seq + '&pageType=' + update;
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		window.open(url, "reloadGrid", option);
	}
	
	/**
	 * @설명 : 접수 시료 [진행상황] 팝업
	 */
	function fnpop_stateInfoPop(formName, width, hight, popupName, test_req_seq, test_req_no, test_sample_seq) {
		//common/pop/acceptHistory
		var url = 'showReqHistory.lims?test_req_seq=' + test_req_seq + '&test_req_no=' + test_req_no + '&test_sample_seq=' + test_sample_seq;
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		window.open(url, popupName, option);
		
//		var obj = new Object();
//		obj.msg1 = '../showReqHistory.lims?test_req_no=' + test_req_no + '&test_sample_seq=' + test_sample_seq;
//		//obj.test_req_no = test_req_no;
//		//obj.test_sample_seq = test_sample_seq;
//		var popup = fnShowModalWindow("popMain.lims", obj, 1000, 600);
//		return popup;
	}
	
	/**
	 * @설명 : 접수 [결과보기] 팝업
	 */
	function fnpop_reqResultInfoPop(formName, width, hight, test_req_seq, test_req_no) {
		
		var url = 'showReqResultInfo.lims';
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		var popupName = test_req_seq + "★●★" + test_req_no;
		window.open(url, popupName, option);
//		var rowId = $('#reqListGrid').getGridParam('selrow');
//		if (rowId == null) {
//			alert('선택된 행이 없습니다.');
//			return false;
//		} else {
//			var row = $('#reqListGrid').getRowData(rowId);
//			var obj = new Object();
//			obj.test_req_no = row.test_req_no;
//			obj.msg1 = '../showReqResultInfo.lims';
//			fnShowModalWindow("popMain.lims", obj, 900, 700);
//		}
	}	
	
	/**
	 * @설명 : 접수 부서 선택 팝업
	 */
	function fnpop_reqDeptPop(formName, width, hight, popupName, rowId, test_sample_seq, test_item_seq) {
		
		var form = formName;		
		var url = "accept/deptChoice.lims";
		var option = "";
		
		if ($('#tabs').tabs('option', 'active') == 1) {
			form = 'reqListForm';
		}
		
		popupName = popupName + "★●★" + rowId + "★●★" + test_sample_seq + "★●★" + test_item_seq;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
		
	}
	
	/**
	 * @설명 : 접수 팀(& 시험자) 선택 팝업
	 */
	function fnpop_reqTeamPop(formName, width, hight, popupName, rowId, dept_cd, test_sample_seq, test_item_seq, id) {
		
		var form = formName;
		var url = "";
		
		url = "accept/reqTeamChoice.lims";
		var option = "";
		
		if ($('#tabs').tabs('option', 'active') == 1) {
			form = 'reqListForm';
		}	
		
		popupName = popupName + "★●★" + rowId + "★●★" + dept_cd + "★●★" + test_sample_seq + "★●★" + test_item_seq + "★●★" + id;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
		
	}
	
	/**
	 * @설명 : 팀 선택 팝업
	 */
	function fnpop_TeamInfoPop(formName, width, hight, popupName) {
		
		var url = "";		
		url = "system/teamChoice.lims";
		var option = "";			
		
		popupName = formName + "★●★" + popupName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
		
	}
	
	/**
	 * @설명 : 접수 [템플릿 가져오기]
	 */
	function fnpop_temPop(mode, width, hight, type, sample_temp_cd, test_sample_seq, sample_cd, sample_nm) {
		var form;
		var url = "";
		
		url = "accept/sampleTemplete.lims";
		var option = "";
		
		if ($('#tabs').tabs('option', 'active') == 1) {
			form = 'reqListForm';
		}	
		
		popupName = mode + "★●★" + type + "★●★" + sample_temp_cd + "★●★" + test_sample_seq + "★●★" + sample_cd + "★●★" + sample_nm;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
		
		
		
//		var obj = new Object();
//		obj.msg1 = 'accept/sampleTemplete.lims';
//		obj.type = '${type}';
//
//		var popup = fnShowModalWindow("popMain.lims", obj, 1100, 920);
//		if (popup != null) {
//			var arr = popup.split('@');
//			var rowId = fnGridAddLine('reqSampleGrid');
//			$('#reqSampleGrid').setCell(rowId, 'test_req_no', $('#reqDetailForm').find('#test_req_no').val());
//			$('#reqSampleGrid').setCell(rowId, 'sample_temp_cd', arr[0]);
//			$('#reqSampleGrid').setCell(rowId, 'sample_reg_nm', arr[1]);
//			$('#reqSampleGrid').setCell(rowId, 'sample_cd', arr[2]);
//			var today = fnGetToday(0);
//			$('#reqSampleGrid').setCell(rowId, 'sampling_date', today);
//			fn_Div_Block('itemDiv', itemMsg, false);
//		}
	}
	
	/**
	 * @설명 : 주소 가져오기
	 */
	function fnpop_zipCodePop(popupName, width, hight) {
		var url = fn_getConTextPath()+"/popAddrCode.lims";
		var option = "";
		
		if(popupName == "detailForm" || popupName == "pacForm" ){
			var url = "/popAddrCode.lims";
		}
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
	}
	
	
	/**
	 * @설명 : 반려 팝업
	 */
	function fnpop_return(obj, width, hight) {
		var url = obj.msg1;
		
		popupName = obj.msg1 + "★●★" + obj.test_req_seq + "★●★" + obj.type + "★●★" + obj.state + "★●★" + obj.return_comment;
		
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 결재선 지정 팝업
	 */
	function fnpop_apprLinePop( grid, width, hight, gridName, obj, flag ) {
//		fnpop_apprLinePop(grid, "900" , "630" , 'reqListGrid', obj, true);
//		var arr = popup.split('■★■');
//			$('#reqListForm').find('#appr_line_nm').val(arr[0]);
//			$('#reqListForm').find('#appr_mst_seq').val(arr[1]);
		
		var url = obj.msg1;
		
		popupName = obj.msg1 + "★●★" + obj.type + "★●★" + obj.test_sample_seq + "★●★" + gridName;
		
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 장비관리 팝업
	 */
	function fnpop_reqInstChoicePop(grid, width, hight, rowId) {
		var url = "accept/instRentChoicePop.lims";
		
		grid = grid + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 계산식 팝업(선택용)
	 */
	function fnpop_accountSelPop(grid, width, hight, rowId, test_method_no, test_item_cd, test_sample_seq, account_no) {
		var url = "accountSelPop.lims";
		
		grid = grid + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=1%, left=1%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	/**
	 * @설명 : 계산식 팝업(결과입력용)
	 */
	function fnpop_accountPop(grid, width, hight, rowId, test_item_cd, test_sample_seq, account_no) {
		var url = "accountPop.lims";
		
		grid = grid + "★●★" + rowId + "★●★" + test_item_cd + "★●★" + test_sample_seq + "★●★" + account_no;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=1%, left=1%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 시험방법 팝업
	 */
	function fnpop_methodPop(grid, width, hight, test_item_cd, test_std_cd, rowId) {
		var url = "analysis/testMethodChoice.lims";
		
		grid = grid + "★●★" + test_item_cd + "★●★" + test_std_cd + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 시험방법 팝업
	 */
	function fnpop_testMethodPop(grid, width, hight, rowId) {
		var url = "analysis/testMethodChoice.lims";
		
		grid = grid + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 시험기기 팝업
	 */
	function fnpop_machinePop(grid, width, hight, test_item_cd, test_std_cd, rowId) {
		var url = "analysis/testMachineChoice.lims";
		
		grid = grid + "★●★" + test_item_cd + "★●★" + test_std_cd + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 견적서 팝업
	 */
	function fnpop_estChoicePop(grid, width, hight) {
		var url = "accept/estChoicePop.lims";
		
		//grid = grid + "★●★" + rowId;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
		
	/**
	 * @설명 : 파일 등록 팝업
	 */
	function fnpop_filePop(grid, width, hight, test_item_cd, test_sample_seq, rowId, test_req_seq) {
		var url;
		if ( grid == 'sampleReportGrid' || grid == 'resultGrid' ){
			url = "analysis/reportFilePop.lims?test_item_cd="+test_item_cd+"&test_sample_seq="+test_sample_seq+"&rowId="+rowId;
		} else if ( grid == 'requestFileGrid' ){
			url = "accept/filePop.lims?rowId="+rowId+"&test_req_seq="+test_req_seq;	
		} else {
			url = "accept/filePop.lims?test_item_cd="+test_item_cd+"&test_sample_seq="+test_sample_seq+"&rowId="+rowId;
		} 

		grid = grid + "★●★" + test_item_cd + "★●★" + test_sample_seq + "★●★" + rowId + "★●★" + test_req_seq;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 메일 첨부파일 등록 팝업
	 */
	function fnpop_mailFilePop(grid, width, hight, test_item_cd, test_sample_seq, rowId, test_req_seq) {
		var url = "report/filePop.lims?rowId="+rowId;
		grid = grid + "★●★" + rowId;
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 수수료 팝업
	 */
	function fnpop_testItemPop(grid, width, hight, mode) {
		var url = "master/feeGroup.lims";
		
		grid = grid + "★●★" + mode;
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 첨부파일 팝업
	 */
	function fnpop_eduAttendPop(grid, width, hight, attend_no) {
		var url = "kolas/popEduAttendFileUpload.lims?attend_no="+attend_no;
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 교육참석자명단 팝업
	 */
	function fnpop_eduAttendInfoPop(grid, width, hight, key) {
		var url = "kolas/popEduAttendInfo.lims?key="+key;
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 부서구매물품 팝업
	 */
	function fnpop_reagentsGlassInOutPop(grid, width, hight, param) {
		var url = "reagents/popNewReagentsGlassInout.lims";

		grid = grid + "★●★" + param;
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}

	/**
	 * @설명 : 장비대여 업체등록 팝업
	 */
	function fnpop_instRentPop(width, hight, mode, rowId) {
		var url;
		if(mode == 'insert'){
			url = "accept/instRentPop.lims?pageType="+ mode;
		}else{
			url = "accept/instRentPop.lims?pageType="+ mode + "&instRent_receipt_no=" + rowId;
		}		

		var grid = '';
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 검사기준 관리 팝업
	 */
	function fnpop_testStdManagePop(grid, width, hight, rowId) {
		var url = "master/popTestStdManage.lims";		

		var grid = '';
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 검사기준 관리 팝업(신규)
	 */
	function fnpop_testPrdStdManagePop(grid, width, hight, rowId) {
		var url = "master/popTestPrdStdManage.lims";		

		var grid = '';
		
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 항목별 결과 기록 조회 팝업
	 */
	function fnpop_itemResultHistoryPop(formName, width, hight, reqNo) {
		var url = "analysis/itemResultHistoryPop.lims";
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		popupName = formName + "★●★" + reqNo;
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 구매요청등록 팝업
	 */
	function fnpop_buyingRequestPop(formName, width, hight, rowId) {
		var url = "reagents/popReagentsInfo.lims";
		var option = "";
		
		var popupName = formName + "★●★" + rowId;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 구매필요대상등록 팝업
	 */
	function fnpop_buyingNeedTargetPop(formName, width, hight) {
		var url = fn_getConTextPath()+"/popReagentsInsert.lims";
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 시약/실험기구정보 팝업
	 */
	function fnpop_popBuyingConfirmationManagePop(formName, width, hight) {
		var url = fn_getConTextPath()+"/reagents/popBuyingConfirmationManage.lims";
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 시약/실험기구정보 수정 팝업
	 */
	function fnpop_updatePurchaseConfirmPop(formName, width, hight){
		var url = fn_getConTextPath()+"/reagents/popUpdatePurchaseConfirm.lims";
		
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 파일 관리 팝업
	 */
	function cfnpop_fileManage(formName, width, hight, option){
		var url = fn_getConTextPath()+"/fileManagePop.lims";
		
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 품목 관리 팝업
	 */
	function fnpop_prdLstPop(formName, width, hight, option){
		var url = fn_getConTextPath()+"/master/prdLstPop.lims";
		
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 식약처 품목 조회 팝업
	 */
	function fnpop_kfdaPrdLstPop(formName, width, hight, option){
		var url = fn_getConTextPath()+"/master/kfdaPrdLstPop.lims";
		
		var option = "";
		
		var popupName = formName;
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}
		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 품목구분 팝업
	 */
	function fnpop_prdlst_gubunPop(grid, width, hight, gubun) {
		var url = fn_getConTextPath()+ "/master/prdlstGubunPop.lims";
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 견적서 템플릿 팝업
	 */
	function fnpop_estimateTemplatePop(grid, width, hight) {
		var url = fn_getConTextPath()+ "/accept/estimateTemplatePop.lims";
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		openPopup = window.open(url, grid, option);
	}
	
	function fnpop_select_test_item (grid, width, height) {
		var url = fn_getConTextPath()+ "/master/selectTestItemPop.lims";
		var option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + height +'px' ;
		openPopup = window.open(url, grid, option);
	}
	
	
	/**
	 * @설명 : 전자세금계산서발행 팝업
	 */
	function fnpop_commissionTaxInvoicePerSmpPop(grid) {
		var url = fn_getConTextPath()+ "/accept/commissionTaxInvoicePop.lims";
		var option = "top=0px, left=0px, resizable=yes, width=" + screen.width + ",height=" + screen.height;
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 계산식 팝업(결과입력용)
	 */
	function fnpop_formulaPop(grid, width, hight, rowId, test_item_cd, menuGbn, sm_code) {
		var url = "formulaPop.lims";
		
		grid = grid + "★●★" + rowId + "★●★" + test_item_cd + "★●★" + menuGbn + "★●★" + sm_code;

		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=1%, left=1%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, grid, option);
	}
	
	/**
	 * @설명 : 접수 - 성적서 표시순서 팝업 
	 * 
	 */
	function fnpop_reportOrder(formName, width, hight, popupName) {
		var url = "accept/reportOrder.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : 메일그룹 팝업창
	 */
	function fnpop_mailGroupChoicePop(formName, width, hight, popupName) {
		var form = formName;		
		var url;
		// 팝업 사용하는 종류에 따른 분기
		if (popupName == "참조메일" || popupName == "숨은참조메일"  || !popupName) {
			url = "../accept/mailGroupChoice.lims";
		} else {
			url = "accept/mailGroupChoice.lims";
		}
		
		var option = "";
		
		if (option == null || option == "") {
			option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		}		
		window.open(url, popupName, option);
	}
	
	/**
	 * @설명 : tat 팝업창
	 * 
	 */
	function fnpop_tatPop(formName, width, hight, popupName) {
		var url = "resultStatistical/tatPop.lims";
		var option = "";
		
		if (option == null || option == "") {
		}
		option = "toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, resizable=yes, top=50%, left=50%, width=" + width + 'px, height=' + hight +'px' ;
		
		openPopup = window.open(url, popupName, option);
	}