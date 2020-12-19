
/*
 * 변수 선언
*/

var reqMsg = '<div class="txt_accept"><span class="txt_accept01"></span></div>';
var itemMsg = '<div class="txt_accept"><span class="txt_accept03"></span></div>';
var sampleMsg = '<div class="txt_accept"><span class="txt_accept02"></span></div>';
var test_std;
var sampling_method;
var editChange;
var reqListGridInit = false;



/*
 * 함수
*/


/**
 * fn_Div_Block 
 * 화면 블럭지정
 * @param  id, msg, reqCheck     
 * @return 
 */
function fn_Div_Block(id, msg, reqCheck) {
	fnStartLoading(id, msg);
	if (!reqCheck) {
		$('.blockUI').click(function() {
			if (id == 'itemDiv') {
				var grid = 'reqSampleGrid';
				if (!confirm('검체정보를 되돌리시겠습니까?')) {
					return false;
				} else {
					btn_Reset_Sub_onclick(grid);
				}
			} else if (id == 'sampleDiv') {
				var grid = 'reqItemGrid';
				if (!confirm('항목정보를 되돌리시겠습니까?')) {
					return false;
				} else {
					btn_Reset_Sub_onclick(grid);
				}
			}
		});
	}
}


//각각 ROW에 첨부파일 다운로드 링크 걸기
/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function displaySampleAlink(cellvalue, options, rowObject) {
	var edit;
	if (rowObject.file_nm == undefined)
		edit = '<label></label>';
	else
		edit = "<label><a href='accept/sampleFileDown.lims?att_seq=" + rowObject.att_seq + "'>" + rowObject.file_nm + "</a></label>";
	return edit;
}

//각각 ROW에 첨부파일 다운로드 링크 걸기(항목별)
/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function displayItemAlink(cellvalue, options, rowObject) {
	var edit;
	if (rowObject.file_nm == undefined)
		edit = '<label></label>';
	else
		edit = "<label><a href='accept/itemFileDown.lims?att_seq=" + rowObject.att_seq + "'>" + rowObject.file_nm + "</a></label>";
	return edit;
}

//각각 ROW에 첨부파일 다운로드 링크 걸기(의뢰별)
/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function displayRequestAlink(cellvalue, options, rowObject) {
	var edit;
	if (rowObject.file_nm == undefined)
		edit = '<label></label>';
	else
		edit = "<label><a href='accept/requestFileDown.lims?att_seq=" + rowObject.att_seq + "'>" + rowObject.file_nm + "</a></label>";
	return edit;
}


//시험 팀 선택
/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function fnpop_reqTeam(formName, width, hight , type, rowId, dept_cd, test_sample_seq, test_item_seq, user_id) {
	fnBasicStartLoading();
	fnpop_reqTeamPop(formName, width, hight , type, rowId, dept_cd, test_sample_seq, test_item_seq, user_id);
}



//검체추가(행추가) 품목 팝업에서 등록시 사용안함
/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function btn_AddLine_Sample_onclick() {
	fnBasicStartLoading();
	for (var i = 0; i < $('#copyNum').val(); i++) {
		fn_Div_Block('itemDiv', itemMsg, false);
		$('#btn_Tem').hide();
		var grid = 'reqSampleGrid';
		var rowId = fnGridAddLine(grid, null);
		$('#' + grid).setCell(rowId, 'test_req_seq', $('#reqSampleForm').find('#test_req_seq').val());
		//$('#' + grid).setCell(rowId, 'sampling_date', fnGetToday(0,0));
	}
	$('#copyNum').val('1');
	fnBasicEndLoading();
}


//항목 추가팝업 
function fn_itemChoice(){
	var rowId = $('#reqSampleGrid').getGridParam('selrow');
	
	if (rowId == null) {
		$.showAlert('한개의 품목을 선택해 주세요.');
	} else {
		var sampleRow = $('#reqSampleGrid').getRowData(rowId);
		var ids = $('#reqItemGrid').jqGrid("getDataIDs");
		var param = "";
		var arr = new Array();
		for ( var i in ids) {
			var row_ids = $('#reqItemGrid').getRowData(ids[i]);
			arr[i] = row_ids.test_item_cd;
		}
		param = $('#reqItemForm').find('#test_sample_seq').val() + "◆★◆" + removeArrayDuplicate(arr) 
				+ "◆★◆" +  sampleRow.test_std_no + "◆★◆" + $("#saveType").val()
				+ "◆★◆" + "" + "◆★◆" + $('#reqSampleGrid').getRowData(rowId).test_sample_seq 
				+ "◆★◆" + $('#reqDetailForm').find('#dept_cd').val()
				+ "◆★◆" + $('#reqItemForm').find('#prdlst_cd').val()
				+ "◆★◆" + $('#reqDetailForm').find('#test_req_seq').val();
		
		fnpop_stdItemChoicePop("reqItemForm", "1000", "867", param);
		
		//fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
		// 최종수정
//			fn_Item_Count();
//			fn_Fee_Calculate();						
		fnBasicStartLoading();
	}
}





//항목수 변경
function fn_Item_Count() {
	var test_req_seq = $('#reqDetailForm').find('#test_req_seq').val();
	var data = 'test_req_seq=' + test_req_seq;
	if (test_req_seq != '') {
		var url = 'accept/itemCalculate.lims';
		var json = fnAjaxAction(url, data);
		var sampleCnt = json.sampleCnt;
		var itemCnt = json.itemCnt;
		var feeTotal = json.feeTotal;
		if (sampleCnt == '') {
			sampleCnt = 0;
		}
		if (itemCnt == '') {
			itemCnt = 0;
		}
		if (feeTotal == '') {
			feeTotal = 0;
		}
		$('#reqDetailForm').find('#sampleCnt').text(sampleCnt);
		$('#reqDetailForm').find('#itemCnt').text(itemCnt);
		$('#reqDetailForm').find('#fee_tot_item').text(feeTotal); // 항목수수료
	} else {
		$('#reqDetailForm').find('#sampleCnt').text(0);
		$('#reqDetailForm').find('#itemCnt').text(0);
		$('#reqDetailForm').find('#fee_tot_item').text(0);
	}
}

function fn_Fee_Calculate() {
	var test_req_seq = $('#reqDetailForm').find('#test_req_seq').val();
	var data = 'test_req_seq=' + test_req_seq;
	if (test_req_seq != '') {
		var url = 'accept/selectFeeTotal.lims';
		var json = fnAjaxAction(url, data);
		
		// 수수료 선택
		if($(":input:radio[name=fee_auto_flag]:checked").val()== 'Y'){
			$('#reqDetailForm').find('#fee_tot_item').val(json.fee_tot_item);
		} else {
			$('#reqDetailForm').find('#fee_tot').val(json.fee_tot_est);
		}
		$('#reqDetailForm').find('#fee_tot_precost').val(json.fee_tot_precost);
	}
}

// 수수료 총액
function fn_Tot_Calculate(rate_flag) {

		var fee_tot = 0;
		var fee_tot_est = $('#reqDetailForm').find('#fee_tot_est').val().replace(/[,]/g, '');
		var fee_tot_item = $('#reqDetailForm').find('#fee_tot_item').val().replace(/[,]/g, '');
		var fee_tot_precost = $('#reqDetailForm').find('#fee_tot_precost').val().replace(/[,]/g, '');
		
		fee_tot_est = fee_tot_est.replace( /(\s*)/g, "");
		fee_tot_item = fee_tot_item.replace( /(\s*)/g, "");
		fee_tot_precost = fee_tot_precost.replace( /(\s*)/g, "");
		
		if (fee_tot_est == undefined) {
			fee_tot_est = '0';
		}
		if (fee_tot_item == undefined) {
			fee_tot_item = '0';
		}
		if (fee_tot_precost == undefined) {
			fee_tot_precost = '0';
		}
		
		var travel_exp = $('#reqDetailForm').find('#travel_exp').val();
		if (travel_exp == undefined) {
			travel_exp = '0';
		}
		var discount_rate = $('#reqDetailForm').find('#discount_rate').val();
		if (discount_rate == undefined) {
			discount_rate = '0';
		}			
		
		// 항목수수료/견적수수료
		if($(":input:radio[name=fee_auto_flag]:checked").val() == 'Y'){
			if( fee_tot_item == '0' || fee_tot_item == '' ){
				fee_tot = fee_tot_item;
			}else{
				fee_tot = Number(fee_tot_item) * 1.1;
			}
		} else {
//			fee_tot = fee_tot_est;
			fee_tot = Number(fee_tot_est) * 1.1;			
		}
		
		var tot = 0;

		// 할인 적용
		if( rate_flag == 'Y' ){
			if( discount_rate == '0' || discount_rate == '' ){
				fee_tot = fee_tot.replace(/[,]/g, '');
				travel_exp = travel_exp.replace(/[,]/g, '');
				tot = Number(fee_tot) + Number(travel_exp);
			} else {				
				if(travel_exp.replace(/[,]/g, '') == "" || travel_exp.replace(/[,]/g, '') == null){
					travel_exp = '0';
				} else {
					travel_exp = travel_exp.replace(/[,]/g, '');
				}
				
				if(discount_rate.replace(/[,]/g, '') == "" || discount_rate.replace(/[,]/g, '') == null){
					discount_rate = '0';
				} else {
					discount_rate = discount_rate.replace(/[,]/g, '');
				}
				// 할인율 계산
				tot = Number(fee_tot) + Number(travel_exp) + ((Number(fee_tot) + Number(travel_exp)) * (discount_rate * 0.01));
			}
		// 자동 수수료 계산 적용안함
		} else {			
			//fee_tot = fee_tot.replace(/[,]/g, '');
			
			travel_exp = travel_exp.replace(/[,]/g, '');
			
			tot = Number(fee_tot) + Number(travel_exp);
			
		}
		// 회원사 할인적용 
		var member_flag = $(":input:radio[name=member_flag]:checked").val();
		if(member_flag == 'Y'){
			tot = tot - (tot / 100 * 30);
		}
		
		// RAWDATA 발급비용적용 
		var rawdata_flag = $(":input:radio[name=rawdata_flag]:checked").val();
//		if(rawdata_flag == 'Y'){
//			tot = tot + (tot / 100 * 5);
//		}
		// 원단위 절삭
		tot = (Math.round(tot/10) * 10);
		//결과 값 넣기
		//전처리비용
		tot = tot + Number(fee_tot_precost)
		$('#reqDetailForm').find('#tot').text(commaNum(tot));
		$('#reqDetailForm').find('#fee_tot').val(commaNum(tot));
		if($(":input:radio[name=fee_auto_flag]:checked").val()== 'Y'){
			$('#reqDetailForm').find('#fee_tot_item').text(commaNum(tot));
		} else {
			$('#reqDetailForm').find('#fee_tot_est').text(commaNum(tot));
		}
}


//검체 폐기 여부
function fn_Return_Flag(return_flag, grid) {
	if ($('#reqDetailForm').find('#state').val() == 'Z'){
		var ids = $('#' + grid).jqGrid("getDataIDs");
		if (ids.length > 0){
			for ( var i in ids) {
				//var row = $('#' + grid).getRowData(ids[i]);
					$('#' + grid).jqGrid('setCell', ids[i], 'crud', 'u');
					$('#' + grid).jqGrid('setCell', ids[i], 'disuse_flag', return_flag);
			}
			btn_Save_Sub_onclick(grid); // 검체 폐기 여부 저장
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//RAWDATA 발급 여부
function fn_Rawdata_Flag(rawdata_flag, grid) {
	fn_Tot_Calculate($(":input:radio[name=discount_flag]:checked").val());
}

// 검체 복사 하기
function btn_CopyLine_onclick(){
	var rowId = 0;
	var c = 0;
	var grid = 'reqSampleGrid';
	fnEditRelease(grid);
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		for ( var i in ids) {
			var row = $('#' + grid).getRowData(ids[i]);
			if (row.chk == 'Yes') {
				c++;
				rowId = ids[i];
			}
		}
		if (c != 1) {
			$.showAlert('한개의 검체를 선택해 주세요.');
		} else {
			fn_Div_Block('itemDiv', itemMsg, false);
			fnBasicStartLoading();
			alert("선택하신 검체를 복사하시겠습니까? \n복사 후 새로 생성된 검체를 체크하시고 저장 버튼을 누르셔야 반영됩니다.");
			var row = $('#' + grid).getRowData(rowId);
			for (var i = 0; i < $('#copyNum').val(); i++) {
				rowId = fnNextRowId(grid);
				$('#' + grid).jqGrid('addRowData', rowId, row, 'last');
				if (row.sample_temp_cd == '') {
					$('#' + grid).setCell(rowId, 'crud', 'r');
				} else {
					$('#' + grid).setCell(rowId, 'crud', 'c');
				}
				$('#' + grid).setCell(rowId, 'sample_temp_cd', row.test_sample_seq);
				$('#' + grid).setCell(rowId, 'test_sample_seq', null);
				$('#' + grid).setCell(rowId, 'test_sample_no', null);
				$('#' + grid).setCell(rowId, 'chk', 'Yes');
				$('#' + grid).setCell(rowId, 'icon', gridC);
			}
			$('#copyNum').val('1');
			fnBasicEndLoading();
		}
	} else {
		$.showAlert('선택된 검체가 없습니다.');
	}
}

// 템플릿 가져오기
function fnpop_tem(mode) {
	var grid = 'reqSampleGrid';
	var rowId = $('#' + grid).getGridParam('selrow');	
	var row = $('#' + grid).getRowData(rowId);
	fnpop_temPop(mode, "1100", "950", $("#saveType").val(), row.sample_temp_cd, row.test_sample_seq, row.prdlst_cd, row.prdlst_nm);
	fnBasicStartLoading();
}


function btn_Reset_Sub_onclick(grid) {
	if (grid == 'reqItemGrid') {
		fnStopLoading('sampleDiv');
		$('#' + grid).trigger('reloadGrid');
	} else {
		fnStopLoading('itemDiv');
		lastRowId = null;
		var grid = 'reqSampleGrid';
		fnEditRelease(grid);
		$('#' + grid).trigger('reloadGrid');
		$('#reqItemForm').find('#test_sample_seq').val('');
		$('#reqItemForm').find('#test_std_no').val('');
		$('#reqItemGrid').clearGridData();
	}
}

//버튼 설정
function fn_Btn_Visible() {
	var state = $('#reqDetailForm').find('#state').val() == undefined ? "" : $('#reqDetailForm').find('#state').val();
	// 의뢰 페이지	
	if ($("#saveType").val() == 'receipt') {		
		if (state == 'A'){
			$('#detailBtn').show();
			$('#sampleBtn').show();
			$('#itemBtn').show();
			$('#btn_Req_Org').hide();
			$('#btn_Accept').hide();
			$('#btn_Return').hide();
			editChange = true;	
		} else if ((state != '' || state != undefined) && state != 'Z') {
			$('#detailBtn').hide();
			$('#sampleBtn').hide();
			$('#itemBtn').hide();
			$('#btn_Req_Org').hide();
			$('#btn_Accept').hide();
			$('#btn_Return').hide();
			editChange = true;
			$('.ui-sortable').sortable("disable");
		} else if (state == 'Z') {
			$('#detailBtn').show();
			$('#sampleBtn').show();
			$('#itemBtn').show();
			$('#btn_Req_Org').show();
			$('#btn_Accept').show();
			$('#btn_Return').hide();
			editChange = true;
			$('.ui-sortable').sortable("enable");
		} else if(state > 'B' && state < 'Z'){
			$('#detailBtn').hide();
			$('#sampleBtn').hide();
			$('#itemBtn').hide();
			$('#btn_Req_Org').hide();
			$('#btn_Accept').hide();
			$('#btn_Return').hide();
			$('#sampleFile').hide();
			$('#itemFile').hide();
			editChange = false;
			$('.ui-sortable').sortable("disable");
		}
		//접수페이지 -현재 대덕엔 접수만 존재함
	} else {
		if (state != '') {
			if(state == 'A'){
				$('#detailBtn').show();
				$('#sampleBtn').show();
				$('#itemBtn').show();
				$('#itemBtnSub').show();
				$('#btn_Req_Org').show();
				$('#btn_Accept').show();
				if (state == 'A') {
					$('#btn_Return').show();
				}
				$('#reqFile').show();
				$('#sampleFile').show();
				$('#itemFile').show();
				$('#sampleSaveBtn').show(); //검체 저장버튼
				editChange = true;
				$('.ui-sortable').sortable("enable");
			//첨부파일 및 비고  - 성적서 결과승인완료 전까지 저장 가능하도록
			}else if(state == 'G'||state == 'H'||state == 'I'){
				console.log("no")
				$('#detailBtn').hide(); //저장버튼
				$('#sampleBtn').hide();
				$('#sampleSaveBtn').hide();
				$('#itemBtn').hide();
				$('#btn_Req_Org').hide();
				$('#btn_Accept').hide();
				$('#itemBtnSub').hide();
				$('#reqFile').hide();
				$('#sampleFile').hide();
				$('#itemFile').hide();
				$('#btn_Return').hide();
				editChange = true;
				$('.ui-sortable').sortable("disable");
			
			}else if(state =='B' || state=='C' || state=='D' || state=='E' || state == 'F'){
				$('#detailBtn').show(); //저장버튼
				$('#sampleBtn').hide();
				$('#sampleSaveBtn').show();
				$('#itemBtn').hide();
       			$('#itemBtnSub').show();
//				$('#btn_mngDeptChange').hide();
//				$('#btn_SelectFee').hide();
//				$('#btn_SaveItemFee').hide();
//				$('#btn_AddItem').hide();
//				$('#btn_Delete_Sub2').hide();
//				$('#btn_SaveItem').hide();
				$('#btn_Req_Org').hide();
				$('#btn_Accept').hide();
				$('#reqFile').show();
				$('#sampleFile').show();
				$('#itemFile').show();
				$('#btn_Return').hide();
				
			}
			
			
		}else{
			$('#detailBtn').show();
			//$('#sampleBtn').hide();
			$('#itemBtn').hide();
			$('#btn_Req_Org').hide();
			$('#btn_Accept').hide();
			$('#btn_Return').hide();
//			$('#reqFile').hide();
//			$('#sampleFile').hide();
//			$('#itemFile').hide();
			editChange = true;
			$('.ui-sortable').sortable("disable");
		}
	}
}

// 라벨출력 이벤트 (현재사용안함)
function btn_Label_onclick() {
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('선택된 의뢰가 없습니다.');
		return false;
	}
	fn_RDViewLabel("Sample_label", rowId, true, true, 800, 720);

}

// 의뢰복사
function btn_Req_Copy_onclick() {
	if (!confirm('의뢰를 복사하시겠습니까?')) {
		return false;
	}
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('선택된 행이 없습니다.');
		return false;
	} else {
		
		
		var row = $('#reqListGrid').getRowData(rowId);
		var json = '';
		//if(row.state == '성적서발행완료'){
			json = fnAjaxAction('accept/copyPieceAccept.lims', 'test_req_seq=' + row.test_req_seq + '&pageType=' +$("#saveType").val());
		//} else {
			//json = fnAjaxAction('accept/copyAccept.lims', 'test_req_seq=' + row.test_req_seq + '&pageType=' +$("#saveType").val());
		//}
		
		
		if (json == null) {
			$.showAlert('복사 실패하였습니다.');
		} else {
			$('#reqListGrid').trigger('reloadGrid');
			alert('복사 완료하였습니다.');
			btn_Choice_onclick(json);
		}
	}
}


//의뢰재시험
function btn_Req_Retest_onclick() {
	if (!confirm('의뢰를 재시험하시겠습니까?')) {
		return false;
	}
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('선택된 행이 없습니다.');
		return false;
	} else {
		var row = $('#reqListGrid').getRowData(rowId);
		var json = fnAjaxAction('accept/retestAccept.lims', 'test_req_seq=' + row.test_req_seq + '&pageType=' +$("#saveType").val());
		if (json == null) {
			$.showAlert('재시험 등록 실패하였습니다.');
		} else {
			$('#reqListGrid').trigger('reloadGrid');
			$.showAlert('재시험 등록 완료하였습니다.');
		}
	}
}

// 검체별 첨부파일 리스트 조회
function btn_Sample_Select_onclick() {
	$('#sampleFileForm').find('#updateItemBtn').hide();
	$('#sampleFileForm').find('#insertItemBtn').show();
	$('#sampleFileForm').find('#att_seq').val('');
	$('#sampleFileGrid').trigger('reloadGrid');
}

// 검체별 첨부파일 등록
function btn_Sample_File_onclick(insertORupdate) {
	var att_seq = $('#sampleFileForm').find('#att_seq').val();
	var sample_seq = $('#sampleFileForm').find('#test_sample_seq').val();
	
	if(insertORupdate == 'insert'){
		att_seq=''				
	}
	if (sample_seq == '' || sample_seq == null) {
		alert("검체를 선택해 주세요.");
		return false;
	} else {	
		fnBasicStartLoading(); //기본 로딩 이미지
		fnpop_filePop('sampleFileGrid', '500', '175', '', sample_seq, att_seq, '');
	}
}

// 항목별 첨부파일 리스트 조회
function btn_Item_Select_onclick() {
	$('#sampleItemFileForm').find('#updateSampleBtn').hide();
	$('#sampleItemFileForm').find('#insertSampleBtn').show();
	$('#sampleItemFileForm').find('#att_seq').val('');
	$('#sampleItemFileGrid').trigger('reloadGrid');
}

// 항목별 첨부파일 등록(수정)
function btn_Item_File_onclick() {
	var att_seq = $('#sampleItemFileForm').find('#att_seq').val();
	var sample_seq = $('#sampleItemFileForm').find('#test_sample_seq').val();
	var test_item_cd = $('#sampleItemFileForm').find('#test_item_cd').val();
	if (test_item_cd == '' || test_item_cd == null) {
		alert("항목을 선택해 주세요.");
		return false;
	} else {
		fnBasicStartLoading();
		fnpop_filePop('sampleItemFileGrid', '500', '175', test_item_cd, sample_seq, att_seq, '');
	}
}

//의뢰별 첨부파일 리스트 조회
function btn_Request_Select_onclick() {
	$('#requestFileForm').find('#updateRequestBtn').hide();
	$('#requestFileForm').find('#insertRequestBtn').show();
	$('#requestFileForm').find('#att_seq').val('');
	$('#requestFileGrid').trigger('reloadGrid');
}

// 의뢰별 첨부파일 등록
function btn_Request_File_onclick() {
	var att_seq = $('#requestFileForm').find('#att_seq').val();
	var test_req_seq = $('#requestFileForm').find('#test_req_seq').val();
	if (test_req_seq == '' || test_req_seq == null) {
		alert("의뢰를 먼저 저장해주세요.");
		return false;
	} else {	
		fnBasicStartLoading(); //기본 로딩 이미지
		fnpop_filePop('requestFileGrid', '500', '175', '', '', att_seq, test_req_seq);
	}
}

//엑셀 다운로드
function btn_Excel_onclick() {
	var data = fn_Excel_Data_Make('reqListGrid');
	fn_Excel_Download(data);
}

//수수료자동선택
function btn_SelectFee_onclick(){
	var change = "N";
	var grid = 'reqItemGrid';
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		for ( var i in ids) {
			change = "N";
			var row = $('#' + grid).getRowData(ids[i]);
			if(row.fee == "0"){
				if(row.prdlst_fee != "0"){
					$('#' + grid).setCell(ids[i], 'fee', row.prdlst_fee);
					change = "Y";
				}else{
					if(row.dept_fee != "0"){
						$('#' + grid).setCell(ids[i], 'fee', row.dept_fee);
						change = "Y";
					}
				}
				if(change == "Y"){
					if($('#' + grid).getCell(ids[i], 'chk') == "No"){
						$('#' + grid).setCell(ids[i], 'icon', gridU);
						$('#' + grid).setCell(ids[i], 'crud', 'u');
						$('#' + grid).setCell(ids[i], 'chk', 'Yes');
					}
				}
			}
		}
	}

}




/*
 * 팝업호출
*/

//의뢰정보 팝업
function fnpop_reqInfo(grid) { //btn_pop_req_info
	var rowId = $('#' + grid).getGridParam('selrow');
	if (rowId == null) {
		alert('선택된 행이 없습니다.');
		return false;
	} else {
		var grid = 'reloadGrid';
		
		fnBasicStartLoading();
		fnpop_reqInfoPop(grid, "900" , "900" , 'reloadGrid', rowId, true);
	}
}

// 진행상황 팝업
function fnpop_stateInfo() { // btn_pop_state_info
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('검체를 선택해주세요.');
	} else {
		var row = $('#reqListGrid').getRowData(rowId);
		//if(row.state == '접수대기' || row.state == '시험중지' || row.state == '의뢰' ){
		//	alert("진행상태 ["+row.state+"]\n시험이 진행되지 않았거나 중지되어 진행상황을 볼 수 없습니다.");
		//	return false;
		//} else {
			fnBasicStartLoading();
			fnpop_stateInfoPop("reqListGrid", "1000", "560", rowId, row.test_req_seq, row.test_req_no, null);
		//}
	}
}


// 결과보기 팝업
function fnpop_reqResultInfo() { // btn_pop_req_result_info
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('선택된 행이 없습니다.');
		return false;
	} else {
		var row = $('#reqListGrid').getRowData(rowId);
		if(row.state == '접수대기' || row.state == '시험중지' || row.state == '의뢰' ){
			alert("진행상태 ["+row.state+"]\n시험이 진행되지 않았거나 중지되어 시험결과를 볼 수 없습니다.");
			return false;
		} else {
			fnBasicStartLoading();
			fnpop_reqResultInfoPop("reqListGrid", "900", "700", row.test_req_seq, row.test_req_no);	
		}
	}
}

//프로토콜 팝업 이벤트
function btn_MFDSitemChoice_onclick() {
	var rowId = $('#reqSampleGrid').getGridParam('selrow');				
	var sampleRow = $('#reqSampleGrid').getRowData(rowId);
	var ids = $('#reqItemGrid').jqGrid("getDataIDs");
	var param = "";
	var arr = new Array();
	for ( var i in ids) {
		var row_ids = $('#reqItemGrid').getRowData(ids[i]);
		arr[i] = row_ids.test_item_cd;
	}
	
	// 의뢰번호, 기준번호 말고 다 필요없음
	//param = $('#reqItemForm').find('#test_sample_seq').val() + "◆★◆" + removeArrayDuplicate(arr) + "◆★◆" +  sampleRow.prdlst_cd + "◆★◆" + $("#saveType").val()
	param = "" + "◆★◆" + removeArrayDuplicate(arr) + "◆★◆" +  sampleRow.prdlst_cd + "◆★◆" + $("#saveType").val()
			+ "◆★◆" + $('#reqSampleForm').find('#test_req_seq').val()+ "◆★◆" + $('#reqDetailForm').find('#test_std_no').val();
	fnpop_mfdsStdItemChoicePop("reqItemForm", "1000", "867", param);
	
	fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
	fnBasicStartLoading();	
}

// 품목등록 팝업 이벤트
function btn_SelfitemChoice_onclick() {
	var rowId = $('#reqSampleGrid').getGridParam('selrow');
	var sampleRow = $('#reqSampleGrid').getRowData(rowId);
	var ids = $('#reqItemGrid').jqGrid("getDataIDs");
	var param = "";
	var arr = new Array();
	for ( var i in ids) {
		var row_ids = $('#reqItemGrid').getRowData(ids[i]);
		arr[i] = row_ids.test_item_cd;
	}
	
	// 의뢰번호, 기준번호 말고 다 필요없음
	param = "" + "◆★◆" + removeArrayDuplicate(arr) 
			+ "◆★◆" +  $('#reqDetailForm').find('#test_std_no').val() + "◆★◆" + $("#saveType").val()
			+ "◆★◆" + $('#reqDetailForm').find('#test_req_seq').val() + "◆★◆" + sampleRow.prdlst_cd
			+ "◆★◆" + $('#reqDetailForm').find('#dept_cd option:selected').val() + "◆★◆" + $('#reqDetailForm').find('#dept_cd option:selected').text();
	fnpop_selfStdItemChoicePop("reqItemForm", "1000", "867", param);
	
	fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
	fnBasicStartLoading();
}

//메일전송
function btn_Send_Mail_onclick(btn_gbn) {
	
	var rowId;
	
	if ($('#tabs').tabs('option', 'active') == 0){
		rowId = $('#reqListGrid').getGridParam('selrow');
	}else{
		rowId = $('#reqDetailForm').find('#test_req_seq').val();
	}
	if (rowId == null || rowId == '') {
		alert('선택된 의뢰가 없습니다.');
		return false;
	}
	
	var gridRow = $('#reqListGrid').getRowData(rowId);
	var state = gridRow.state;
	
	//접수대기는 메일전송 불가
	if (state == "접수대기")
		alert("접수대기는 메일전송이 불가합니다.");
	else
	    fnpop_sendMailPop("reqItemForm", "700", "1500", rowId);
} 


//전처리 비용 팝업
function btn_Pretreatment_onclick(grid){
	var rowId = $('#'+grid).getGridParam('selrow');
	
	if(rowId == null){
		alert('품목을 선택하여 주세요.');
		return;
	}else{
		var sampleRow = $('#'+grid).getRowData(rowId);
		var param = "";
		
		param = sampleRow.test_req_seq + "◆★◆" + rowId + "◆★◆" + sampleRow.prdlst_cd + "◆★◆" + grid;
		fnpop_pretreatmentPop("reqSampleForm", "700", "500", param);
		
		fnBasicStartLoading();
	}
}

//btn_Pretreatment_onclick (전처리비용팝업 콜백)
function fnpop_PretreatmentCallback(rtnParam){
	var grid = rtnParam.grid;
	var test_sample_seq = rtnParam.test_sample_seq;
	var test_req_seq = rtnParam.test_req_seq;
	var pretreatment_cd = rtnParam.pretreatment_cd;
//	var pre_cost = rtnParam.pre_cost;	
	
	var data = 'test_sample_seq=' + test_sample_seq + "&test_req_seq=" + test_req_seq + "&pretreatment_cd=" + pretreatment_cd;
	
	var json = fnAjaxAction('accept/savePretreatment.lims', data);
	
	if (json == null) {
		$.showAlert('저장 실패하였습니다.');
	} else {				
		$.showAlert('저장 완료하였습니다.');
		$('#reqSampleGrid').trigger('reloadGrid');
		$('#reqItemGrid').trigger('reloadGrid');
		
		fn_Fee_Calculate();
		fn_Tot_Calculate($(":input:radio[name=discount_flag]:checked").val());
	}
	
	fnBasicEndLoading();
}

/*
 * 이벤트처리
*/

/**
 * 명칭 
 * 설명
 * @param  
 * @return 
 */
function fn_Row_Click(rowId) {
	var sampling_hour = rowId + "_sampling_hour";
	$('#' + sampling_hour).keyup(function() {
		var hour = $('#' + sampling_hour).val();
		if (hour != '') {
			if (!fnIsNumeric(hour)) {
				$.showAlert('숫자만 입력가능합니다.');
				$('#' + sampling_hour).val(hour.substring(0, hour.length - 1));
			} else {
				if (hour.length > 2) {
					$('#' + sampling_hour).val(hour.substring(0, hour.length - 1));
				} else {
					if (Number(hour) > 23) {
						$.showAlert('0 ~ 23 까지만 입력가능합니다.');
						$('#' + sampling_hour).val('');
					}
				}
			}
		}
		$('#' + sampling_hour).focus();
	});
	$('#' + sampling_hour).blur(function() {
		var hour = $('#' + sampling_hour).val();
		if (hour.length == 1) {
			hour = '0' + hour;
		} else if (hour.length == 0) {
			hour = '00';
		}
		$('#' + sampling_hour).val(hour);
	});
	var sampling_min = rowId + "_sampling_min";
	$('#' + sampling_min).keyup(function() {
		var min = $('#' + sampling_min).val();
		if (min != '') {
			if (!fnIsNumeric(min)) {
				$.showAlert('숫자만 입력가능합니다.');
				$('#' + sampling_min).val(min.substring(0, min.length - 1));
			} else {
				if (min.length > 2) {
					$('#' + sampling_min).val(min.substring(0, min.length - 1));
				} else {
					if (Number(min) > 59) {
						$.showAlert('0 ~ 59 까지만 입력가능합니다.');
						$('#' + sampling_min).val('');
					}
				}
			}
		}
		$('#' + sampling_min).focus();
	});
	$('#' + sampling_min).blur(function() {
		var min = $('#' + sampling_min).val();
		if (min.length == 1) {
			min = '0' + min;
		} else if (min.length == 0) {
			min = '00';
		}
		$('#' + sampling_min).val(min);
	});
}






/*
 * CALLBACK
 */


//재접수후 콜백
function fnpop_req_return_callback(){
	fnBasicEndLoading();
	$('#reqListGrid').trigger('reloadGrid');		
}

// 문서 등록 콜백
function callback(grid, rowId, iCol){
	fnBasicEndLoading();
	if(grid == 'sampleFileGrid'){	
		$('#sampleFileGrid').trigger('reloadGrid');	
	} else if (grid == 'requestFileGrid') {
		$('#requestFileGrid').trigger('reloadGrid');
	} else {
		$('#sampleItemFileGrid').trigger('reloadGrid');			
	}
}

//자식 -> 부모창 함수 호출
function fnpop_callback(returnParam){
	fnBasicEndLoading();
	$('#reqSampleGrid').trigger('reloadGrid');
	$('#reqItemGrid').trigger('reloadGrid');
	fn_Item_Count();
	fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
	fn_Tot_Calculate($(":input:radio[name=discount_flag]:checked").val());	
}

function fnpop_callback2(returnParam){
	fnBasicEndLoading();
	
	$('#reqSampleGrid').trigger('reloadGrid');
	if(returnParam != null){
		$('#reqItemForm').find('#test_sample_seq').val(returnParam.test_sample_seq);	
		$('#reqItemForm').find('#sm_code').val(returnParam.sm_code);
	}
	$('#reqItemGrid').clearGridData();
	fn_Item_Count();
	fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
	fn_Tot_Calculate($(":input:radio[name=discount_flag]:checked").val());	
}

// (식약처 팝업)자식 -> 부모창 함수 호출
function fnpop_callbackMfds(returnParam){
	fnBasicEndLoading();
	$('#reqSampleGrid').trigger('reloadGrid');
	$('#reqItemGrid').trigger('reloadGrid');
	fn_Item_Count();
	fn_show_type($(":input:radio[name=fee_auto_flag]:checked").val());
	fn_Tot_Calculate($(":input:radio[name=discount_flag]:checked").val());	
}

//템플릿 팝업 리스트 선택후 콜백함수
function tem_callback(rst){
	fnBasicEndLoading();
	var arr = rst.split('@');
	var rowId = fnGridAddLine('reqSampleGrid');
	$('#reqSampleGrid').setCell(rowId, 'test_req_seq', $('#reqDetailForm').find('#test_req_seq').val());
	$('#reqSampleGrid').setCell(rowId, 'sample_temp_cd', arr[0]); 
	$('#reqSampleGrid').setCell(rowId, 'sample_reg_nm', arr[1]); 
	$('#reqSampleGrid').setCell(rowId, 'prdlst_cd', arr[2]); 
	$('#reqSampleGrid').setCell(rowId, 'prdlst_nm', arr[3]); 
	//var today = fnGetToday(0,0);
	//$('#reqSampleGrid').setCell(rowId, 'sampling_date', today);
	fn_Div_Block('itemDiv', itemMsg, false);
}


//항목별 첨부문서 삭제 후 이벤트
function callback_del(grid, rowId, iCol){
	if(grid == 'sampleFileGrid'){
		$('#sampleFileGrid').trigger('reloadGrid');
	} else if (grid == 'requestFileGrid') {
		$('#requestFileGrid').trigger('reloadGrid');
	} else {
		$('#sampleItemFileGrid').trigger('reloadGrid');
	}
	fnBasicEndLoading();
}

//성적서 표시 순서 팝업 
function fn_reportOrder(){
	var rowId = $('#reqSampleGrid').getGridParam('selrow');
	var sampleRow = $('#reqSampleGrid').getRowData(rowId);
	var ids = $('#reqItemGrid').jqGrid("getDataIDs");
	var param = "";
	var arr = new Array();
	for ( var i in ids) {
		var row_ids = $('#reqItemGrid').getRowData(ids[i]);
		arr[i] = row_ids.test_item_cd;
	}
	param = $('#reqItemForm').find('#test_sample_seq').val() 
			 + "◆★◆" + removeArrayDuplicate(arr) 
			 + "◆★◆" + $('#reqSampleGrid').getRowData(rowId).test_sample_seq 
			 + "◆★◆" + $('#reqDetailForm').find('#test_req_seq').val();
	
	fnpop_reportOrder("reqItemForm", "800", "600", param);
						
	fnBasicStartLoading();
	
}

