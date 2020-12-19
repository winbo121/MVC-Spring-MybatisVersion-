/**
 * @설명 : 셀 수정여부 설정
 */
function fn_editable(grid, rowId) {
	fnGridEdit(grid, rowId, null);
	var arr = new Array();
	arr.push('std_type');
	arr.push('exceed_reason');
	arr.push('oxide_nm');
	arr.push('base');
	
	//기준
	var row_std_type = $("#" + rowId + "_std_type").val();
	//결과유형
	var row_result_type;
	if ($("#" + grid).jqGrid('getColProp', 'result_type').editable) {
		row_result_type = $("#" + rowId + "_result_type").val();
	} else {
		var row = $('#' + grid).getRowData(rowId);
		row_result_type = row.result_type;
	}
	fnEditRelease(grid);
	switch (row_std_type) {
	//수동기준
	case 'C38002':
		arr.push('result_type');
		//결과유형 
		switch (row_result_type) {
		//선택형
		case 'C31001':
			arr.push('unit');
			arr.push('std_fit_val');
			arr.push('std_unfit_val');
			arr.push('result_val');
			arr.push('jdg_type');
			break;
		//수치형
		case 'C31002':
			arr.push('unit');
			arr.push('valid_position');
			arr.push('std_hval');
			arr.push('hval_type');
			arr.push('std_lval');
			arr.push('lval_type');
			arr.push('result_val');
			arr.push('jdg_type');
			break;
		//서술형
		case 'C31003':
			arr.push('unit');
			arr.push('valid_position');
			arr.push('std_val');
			arr.push('result_val');
			arr.push('jdg_type');
			break;
		//결과없음
		case 'C31004':
			arr.push('jdg_type');
			break;
		//성적서 문서
		case 'C31005':	
			arr.push('jdg_type');
			break;
			//등급형
		case 'C31008': 
			arr.push('grade1');
			arr.push('grade1_range');
			arr.push('grade2');
			arr.push('grade2_range');
			arr.push('grade3');
			arr.push('grade3_range');
			arr.push('grade4');
			arr.push('grade4_range');
			arr.push('result_val');
			arr.push('valid_position');
			arr.push('jdg_type');
			break;
		}		
		break;
	//자동기준
	default:
		switch (row_result_type) {
		//선택형
		case 'C31001':
			arr.push('result_val');
			break;
		//수치형
		case 'C31002':
			arr.push('result_val');
			break;
		//서술형
		case 'C31003': 
			arr.push('std_val');
			arr.push('result_val');
			arr.push('jdg_type');
			break;
		//등급형
		case 'C31008': 
			arr.push('result_val');
			break;
		//결과없음
		case 'C31004':
			arr.push('jdg_type');
			break;
		default:
			arr.push('result_val');
			break;
		}	
		break;
	}
	var row = $('#' + grid).getRowData(rowId);
	for ( var column in row) {
		if ($.inArray(column, arr) != -1) {
			$("#" + grid).jqGrid('setColProp', column, {
				editable : true
			});
		} else {
			$("#" + grid).jqGrid('setColProp', column, {
				editable : false
			});
		}
	}
	switch (row_result_type) {
	//선택형
	case 'C31001':
		fn_make_select(grid, rowId);
		break;
	default:
		fn_set_cell(grid, 'result_val', 'text', null);
		break;
	}
}
/**
 * @설명 : 선택형기준 데이터로 결과값에 셀렉트박스 만들기
 */
function fn_make_select(grid, rowId) {
	var row_std_type = $("#" + rowId + "_std_type").val();
	var std_fit_val;
	var std_unfit_val;
	switch (row_std_type) {
	case 'C38002':
		std_fit_val = $("#" + rowId + "_std_fit_val").val();
		std_unfit_val = $("#" + rowId + "_std_unfit_val").val();
		break;
	//자동기준
	default:
		var row = $('#' + grid).getRowData(rowId);
		std_fit_val = row.std_fit_val;
		std_unfit_val = row.std_unfit_val;
		break;
	}
	fn_set_cell(grid, 'result_val', 'select', fit_val);
	
	var row = $('#' + grid).getRowData(rowId);
	var row_result_val = $('#' + rowId + '_result_val').val();
}
/**
 * @설명 : 그리드 셀의 타입 설정
 */
function fn_set_cell(grid, column, type, value) {
	switch (type) {
	case 'select':
		$("#" + grid).jqGrid('setColProp', column, {
			edittype : "select",
			editoptions : {
				value : value
			},
			formatter : 'select'
		});
		break;
	default:
		$("#" + grid).jqGrid('setColProp', column, {
			edittype : "text",
			formatter : function(value) {
				if (value == undefined) {
					return '';
				} else {
					return value;
				}
			}
		});
		break;
	}
}
/**
 * @설명 : 선택형일때 판정
 */
function fn_optional_result(grid, rowId) {
	var row_std_type = $('#' + rowId + '_std_type').val();
	switch (row_std_type) {
	//수동기준	
	case 'C38002':
		std_fit_val = $("#" + rowId + "_std_fit_val").val();
		std_unfit_val = $("#" + rowId + "_std_unfit_val").val();
		break;
	//자동기준
	default:
		var row = $('#' + grid).getRowData(rowId);
		std_fit_val = row.std_fit_val;
		std_unfit_val = row.std_unfit_val;
		break;
	}
	
	$('#' + rowId + '_std_fit_val').change(function() {
		$('#' + grid).jqGrid('setCell', rowId, 'std_val', $('#' + rowId + '_std_fit_val option:selected').text());
		fn_editable(grid, rowId);
		fnGridEdit(grid, rowId, fn_Result_Row_Click);
	});
	$('#' + rowId + '_std_unfit_val').change(function() {
		fn_editable(grid, rowId);
		fnGridEdit(grid, rowId, fn_Result_Row_Click);
	});
	
	$('#' + rowId + '_result_val').change(function() {
		var row_result_val = $('#' + rowId + '_result_val').val();
		if (row_result_val == std_fit_val) {
			bool = true;
		} else {
			bool = false;
		}
		if (row_result_val != '') {
			var row_result_val = $('#' + rowId + '_result_val option:selected').text();
			if (bool) {
				$('#' + grid).setCell(rowId, 'jdg_type', 'C37001', {
					color : 'blue'
				});
			} else {
				$('#' + grid).setCell(rowId, 'jdg_type', 'C37002', {
					color : 'red'
				});
			}
			
			if (row_result_val == '') {
				$('#' + grid).jqGrid('setCell', rowId, 'result_cd', null);
				$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', null);
			} else {
				$('#' + grid).jqGrid('setCell', rowId, 'result_cd', $('#' + rowId + '_result_val').val());
				$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', row_result_val);
			}
		}
	});
}
/**
 * @설명 : 수치형일때 판정
 */
function fn_numerical_result(grid, rowId) {
	var row = $('#' + grid).getRowData(rowId);
	var bool = false;
	var row_std_hval;
	var row_hval_type;
	var row_std_lval;
	var row_lval_type;
	var row_std_type = $('#' + rowId + '_std_type').val();
	var row_result_val = $('#' + rowId + '_result_val').val();
	var row_valid_position;
	var row_std_val = row.std_val;
	var row_loq_hval = row.loq_hval;
	var row_loq_hval_mark = row.loq_hval_mark;
	var row_loq_lval = row.loq_lval;
	var row_loq_lval_mark = row.loq_lval_mark;
	var loq_result_val;

	switch (row_std_type) {
	//수동기준
	case 'C38002':
		row_valid_position = $('#' + rowId + '_valid_position').val();
		row_std_hval = $('#' + rowId + '_std_hval').val();
		row_hval_type = $('#' + rowId + '_hval_type').val();
		row_std_lval = $('#' + rowId + '_std_lval').val();
		row_lval_type = $('#' + rowId + '_lval_type').val();
		row_std_val = row_std_lval + ' ' + $('#' + rowId + '_lval_type option:selected').text();
		row_std_val += ' ' + row_std_hval + ' ' + $('#' + rowId + '_hval_type option:selected').text();
		if ($.trim(row_std_val) == '') {
			row_std_val = '';
		}
		$('#' + grid).setCell(rowId, 'std_val', row_std_val);
		break;
	//자동기준
	default:
		row_valid_position = row.valid_position;
		row_std_hval = row.std_hval;
		row_hval_type = row.hval_type;
		row_std_lval = row.std_lval;
		row_lval_type = row.lval_type;
		if ($.trim(row_std_val) == '') {
			row_std_val = '';
		}
		row_loq_hval = row.loq_hval;
		row_loq_hval_mark = row.loq_hval_mark;
		row_loq_lval = row.loq_lval;
		row_loq_lval_mark = row.loq_lval_mark;
		break;
	}
	
	//정량한계처리
	var chk_result_val = parseFloat(row_result_val);
	var gbn;
	var loq_chk = false;
	var loq_hval = parseFloat(row_loq_hval);
	var loq_lval = parseFloat(row_loq_lval);
	var loq_hval_mark = row_loq_hval_mark;
	var loq_lval_mark = row_loq_lval_mark;
	
	if(loq_hval != '' && loq_lval != ''){
		gbn = 'A';
	}else if(loq_hval != '' && loq_lval == ''){
		gbn = 'H';
	}else if(loq_hval == '' && loq_lval != ''){
		gbn = 'L';
	}
	
	if(gbn == 'A'){
		if(chk_result_val > loq_hval){
			loq_result_val = loq_hval_mark;
			loq_chk = true;
		}
		if(chk_result_val < loq_lval){
			loq_result_val = loq_lval_mark;
			loq_chk = true;
		}
	}else if(gbn == 'H'){
		if(chk_result_val > loq_hval){
			loq_result_val = loq_hval_mark;
			loq_chk = true;
		}
	}else if(gbn == 'L'){
		if(chk_result_val < loq_lval){
			loq_result_val = loq_lval_mark;
			loq_chk = true;
		}
	}
	
	//결과값 표기자리 이하 버림
	row_result_val = truncateDecimals(row_result_val, row_valid_position);
	
	if (row_std_hval != '' && row_std_lval != '') {
		if (row_lval_type == 'C35001' && row_hval_type == 'C36001') {
			//이상 이하
			if (parseFloat(row_result_val) >= parseFloat(row_std_lval) && parseFloat(row_result_val) <= parseFloat(row_std_hval)) {
				bool = true;
			}
		} else if (row_lval_type == 'C35001' && row_hval_type == 'C36002') {
			//이상 미만
			if (parseFloat(row_result_val) >= parseFloat(row_std_lval) && parseFloat(row_result_val) < parseFloat(row_std_hval)) {
				bool = true;
			}
		} else if (row_lval_type == 'C35002' && row_hval_type == 'C36001') {
			//초과 이하
			if (parseFloat(row_result_val) > parseFloat(row_std_lval) && parseFloat(row_result_val) <= parseFloat(row_std_hval)) {
				bool = true;
			}
		} else if (row_lval_type == 'C35002' && row_hval_type == 'C36002') {
			//초과 미만
			if (parseFloat(row_result_val) > parseFloat(row_std_lval) && parseFloat(row_result_val) < parseFloat(row_std_hval)) {
				bool = true;
			}
		}
	} else if (row_std_lval == '') {
		if (row_hval_type == 'C36001') {
			//이하
			if (parseFloat(row_result_val) <= parseFloat(row_std_hval)) {
				bool = true;
			}
		} else if (row_hval_type == 'C36002') {
			//미만
			if (parseFloat(row_result_val) < parseFloat(row_std_hval)) {
				bool = true;
			}
		}
	} else if (row_std_hval == '') {
		if (row_lval_type == 'C35001') {
			//이상
			if (parseFloat(row_result_val) >= parseFloat(row_std_lval)) {
				bool = true;
			}
		} else if (row_hval_type == 'C35002') {
			//초과
			if (parseFloat(row_result_val) > parseFloat(row_std_lval)) {
				bool = true;
			}
		}
	}
	
	if (row_result_val != '' || row_result_val == '0') {
		
		if (row_std_val != '') {
			if (bool) {
				$('#' + grid).setCell(rowId, 'jdg_type', 'C37001', {
					color : 'blue'
				});
			} else {
				$('#' + grid).setCell(rowId, 'jdg_type', 'C37002', {
					color : 'red'
				});
			}
			$('#' + grid).jqGrid('setCell', rowId, 'result_cd', row_result_val);
		} else {
			$('#' + grid).setCell(rowId, 'jdg_type', 'C37003', {
				color : 'black'
			});
		}
	} else {
		$('#' + grid).setCell(rowId, 'jdg_type', null);
	}
	
	if (row_result_val == '' && row_result_val != '0') {
		
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', null);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', null);
	} else {
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', row_result_val);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', loq_result_val == null ? row_result_val : loq_result_val);
	}
}
/**
 * @설명 : 서술형일때 판정
 */
function fn_descriptive_result(grid, rowId, backspace) {
	var row_result_val = $('#' + rowId + '_result_val').val();
	var row_std_val = $('#' + rowId + '_std_val').val();
	if (!backspace) {
		if (row_result_val != '') {			
			if(row_std_val == row_result_val){
				$('#' + rowId + '_jdg_type').val('C37001');
			}else{
				$('#' + rowId + '_jdg_type').val('C37002');
			}
		} else {
			$('#' + rowId + '_jdg_type').val('C37003');
		}
	}
	if (row_result_val == '') {
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', null);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', null);
	} else {
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', row_result_val);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', row_result_val);
	}
}

/**
 * @설명 : 등급형일때 판정
 */
function fn_grade_result(grid, rowId) {
	var row = $('#' + grid).getRowData(rowId);

	var std_grade1_val;
	var std_grade1_range;
	var std_grade2_val;
	var std_grade2_range;
	var std_grade3_val;
	var std_grade3_range;
	var std_grade4_val;
	var std_grade4_range;
	var row_std_type = $('#' + rowId + '_std_type').val();
	var row_result_val = $('#' + rowId + '_result_val').val();
	var jdg_type = row.jdg_type;
	var row_valid_position;
	var row_loq_hval = row.loq_hval;
	var row_loq_hval_mark = row.loq_hval_mark;
	var row_loq_lval = row.loq_lval;
	var row_loq_lval_mark = row.loq_lval_mark;
	var loq_result_val;
	
	switch (row_std_type) {
	//수동기준
	case 'C38002':
		std_grade1_val = parseFloat($('#' + rowId + '_grade1').val());
		std_grade1_range = $('#' + rowId + '_grade1_range').val();
		std_grade2_val = parseFloat($('#' + rowId + '_grade2').val());
		std_grade2_range = $('#' + rowId + '_grade2_range').val();
		std_grade3_val = parseFloat($('#' + rowId + '_grade3').val());
		std_grade3_range = $('#' + rowId + '_grade3_range').val();
		std_grade4_val = parseFloat($('#' + rowId + '_grade4').val());
		std_grade4_range = $('#' + rowId + '_grade4_range').val();
		row_valid_position = $('#' + rowId + '_valid_position').val();
		break;
	//자동기준
	default:
		std_grade1_val = parseFloat(row.grade1);
		std_grade1_range = row.grade1_range;
		std_grade2_val = parseFloat(row.grade2);
		std_grade2_range = row.grade2_range;
		std_grade3_val = parseFloat(row.grade3);
		std_grade3_range = row.grade3_range;
		std_grade4_val = parseFloat(row.grade4);
		std_grade4_range = row.grade4_range;
		row_valid_position = row.valid_position;
		break;
	}
	
	$('#' + grid).setCell(rowId, 'jdg_type', null);
	
	if (row_result_val != '') {
		//정량한계처리
		var chk_result_val = parseFloat(row_result_val);
		var gbn;
		var loq_chk = false;
		var loq_hval = parseFloat(row_loq_hval);
		var loq_lval = parseFloat(row_loq_lval);
		var loq_hval_mark = row_loq_hval_mark;
		var loq_lval_mark = row_loq_lval_mark;
		
		if(loq_hval != '' && loq_lval != ''){
			gbn = 'A';
		}else if(loq_hval != '' && loq_lval == ''){
			gbn = 'H';
		}else if(loq_hval == '' && loq_lval != ''){
			gbn = 'L';
		}
		
		if(gbn == 'A'){
			if(chk_result_val > loq_hval){
				loq_result_val = loq_hval_mark;
				loq_chk = true;
			}
			if(chk_result_val < loq_lval){
				loq_result_val = loq_lval_mark;
				loq_chk = true;
			}
		}else if(gbn == 'H'){
			if(chk_result_val > loq_hval){
				loq_result_val = loq_hval_mark;
				loq_chk = true;
			}
		}else if(gbn == 'L'){
			if(chk_result_val < loq_lval){
				loq_result_val = loq_lval_mark;
				loq_chk = true;
			}
		}

		//결과값 표기자리 이하 버림
		row_result_val = truncateDecimals(row_result_val, row_valid_position);
		
		//4등급 판정
		if(std_grade4_val != '' && std_grade4_range != ''){
			if(std_grade4_range == 'C81001'){ //4등급 이하
				if(row_result_val <= std_grade4_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76004');
				}
			}else if(std_grade4_range == 'C81002'){ //4등급 미만
				if(row_result_val < std_grade4_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76004');
				}
			}else if(std_grade4_range == 'C81003'){ //4등급 이상
				if(row_result_val >= std_grade4_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76004');
				}
			}else if(std_grade4_range == 'C81004'){ //4등급 초과
				if(row_result_val > std_grade4_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76004');
				}
			}		
		}
		//3등급 판정
		if(std_grade3_val != '' && std_grade3_range != ''){
			if(std_grade3_range == 'C81001'){ //3등급 이하
				if(row_result_val <= std_grade3_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76003');
				}
			}else if(std_grade3_range == 'C81002'){ //3등급 미만
				if(row_result_val < std_grade3_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76003');
				}
			}else if(std_grade3_range == 'C81003'){ //3등급 이상
				if(row_result_val >= std_grade3_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76003');
				}
			}else if(std_grade3_range == 'C81004'){ //3등급 초과
				if(row_result_val > std_grade3_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76003');
				}
			}		
		}
		//2등급 판정
		if(std_grade2_val != '' && std_grade2_range != ''){
			if(std_grade2_range == 'C81001'){ //2등급 이하
				if(row_result_val <= std_grade2_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76002');
				}
			}else if(std_grade2_range == 'C81002'){ //2등급 미만
				if(row_result_val < std_grade2_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76002');
				}
			}else if(std_grade2_range == 'C81003'){ //2등급 이상
				if(row_result_val >= std_grade2_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76002');
				}
			}else if(std_grade2_range == 'C81004'){ //2등급 초과
				if(row_result_val > std_grade2_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76002');
				}
			}
		}
		//1등급 판정
		if(std_grade1_val != '' && std_grade1_range != ''){		
			if(std_grade1_range == 'C81001'){ //1등급 이하
				if(row_result_val <= std_grade1_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76001');
				}
			}else if(std_grade1_range == 'C81002'){ //1등급 미만
				if(row_result_val < std_grade1_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76001');
				}
			}else if(std_grade1_range == 'C81003'){ //1등급 이상
				if(row_result_val >= std_grade1_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76001');
				}
			}else if(std_grade1_range == 'C81004'){ //1등급 초과
				if(row_result_val > std_grade1_val){
					$('#' + grid).setCell(rowId, 'jdg_type', 'C76001');
				}
			}
		}
		
		var row2 = $('#' + grid).getRowData(rowId);
		if(row2.jdg_type == ''){
			$('#' + grid).setCell(rowId, 'jdg_type', 'C76006');
		}
		
	}else{
		$('#' + grid).setCell(rowId, 'jdg_type', null);
	}
	
	if (row_result_val == '') {
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', null);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', null);
	} else {
		$('#' + grid).jqGrid('setCell', rowId, 'result_cd', row_result_val);
		$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', loq_result_val == null ? row_result_val : loq_result_val);
	}
}


/**
 * @설명 : 결과값없음일때 판정
 */
function fn_nothing_result(grid, rowId) {
	$('#' + grid).jqGrid('setCell', rowId, 'report_disp_val', null);
	var row = $('#' + grid).getRowData(rowId);
	$('#' + grid).setCell(rowId, 'result_val', '결과값없음');	
	var row_report_disp_val = row.report_disp_val;
	if (row_report_disp_val == '') {
		if(row.result_type_gbn == "S" || row.result_type_gbn == "I"){
			$('#' + rowId + '_jdg_type').val('C37003');
		}else{
			$('#' + rowId + '_jdg_type').val('C76005');
		}
		var row_jdg_type = $('#' + rowId + '_jdg_type option:selected').text();
		$('#' + grid).setCell(rowId, 'report_disp_val', row_jdg_type);		
	}
	$('#' + grid).jqGrid('setCell', rowId, 'result_cd', '결과값없음');
}
/**
 * @설명 : 결과 그리드 로우 수정시 이벤트처리
 */
var stdChange = false;
var editChange = false;
var beginning = false;
function fn_Result_Row_Click(rowId) {
	editChange = true;
	var grid = 'resultGrid';
	$('#' + grid).setCell(rowId, 'chk', 'Yes');
	//기준 변경
	$('#' + rowId + '_std_type').change(function() {
		var row = $('#' + grid).getRowData(rowId);
		if ($(this).val() == 'C38001') {
			stdChange = true;
		} else {
			stdChange = false;
		}
		if (stdChange) {
			stdChange = false;
		}
		fn_editable(grid, rowId);
		fnGridEdit(grid, rowId, fn_Result_Row_Click);
		
		$('#'+grid).find('#' + rowId + '_jdg_type option[value=C37004]').remove(); // 문서확인함 숨김
		if(row.result_type_gbn == "S" || row.result_type_gbn == "I"){
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31008]').remove(); // 등급형 숨김
		}else{
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31001]').remove(); // 선택형 숨김
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31002]').remove(); // 수치형 숨김
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31003]').remove(); // 서술형 숨김
		}
	});
	//결과유형 변경
	$('#' + rowId + '_result_type').change(function() {
		fn_editable(grid, rowId);
		var arr = new Array();
		arr.push('std_fit_val');
		arr.push('std_unfit_val');
		arr.push('std_hval');
		arr.push('hval_type');
		arr.push('std_lval');
		arr.push('lval_type');
		arr.push('result_val');
		arr.push('jdg_type');
		arr.push('formula_no');
		arr.push('formula_disp');
		arr.push('oxide_nm');
		var row = $('#' + grid).getRowData(rowId);
		
		// 적용된 계산식이 있을경우 계산식값 초기화
		if(!fnIsEmpty(row.formula_no)){
			alert("결과유형 변경으로 적용된 계산식이 초기화 되었습니다.");
		}
		for ( var column in row) {
			if ($.inArray(column, arr) != -1) {
				$('#' + grid).setCell(rowId, column, null);
			}
		}
		fnGridEdit(grid, rowId, fn_Result_Row_Click);
		$('#'+grid).find('#' + rowId + '_jdg_type option[value=C37004]').remove(); // 문서확인함 숨김
		if(row.result_type_gbn == "S" || row.result_type_gbn == "I"){
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31008]').remove(); // 등급형 숨김
		}else{
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31001]').remove(); // 선택형 숨김
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31002]').remove(); // 수치형 숨김
			$('#'+grid).find('#' + rowId + '_result_type option[value=C31003]').remove(); // 서술형 숨김
		}
	});
	//기준
	var row_std_type = $("#" + rowId + "_std_type").val();
	//결과유형
	var row_result_type;
	var row_base;
	if ($("#" + grid).jqGrid('getColProp', 'result_type').editable) {
		row_result_type = $("#" + rowId + "_result_type").val();
	} else {
		var row = $('#' + grid).getRowData(rowId);
		row_result_type = row.result_type;
	}
	
	switch (row_std_type) {
	//수동기준
	case 'C38002':
		//결과유형
		switch (row_result_type) {
		//선택형
		case 'C31001':
			if ($('#' + rowId + '_std_fit_val').val() == '' && $('#' + rowId + '_std_unfit_val').val() == ''){		
				var arr = new Array();
				arr.push('std_fit_val');
				arr.push('std_unfit_val');					
				$('#btn_Choice_Show').find('button').text('선택형기준 숨김');
				$('#' + grid).showCol(arr);					
				return false;
			}
			fn_optional_result(grid, rowId);
			break;
		//수치형
		case 'C31002':
			if ($('#' + rowId + '_valid_position').val() == '') {
				$('#' + rowId + '_valid_position').val('0');
			}
			//표기자리 변경
			$('#' + rowId + '_valid_position').keyup(function() {
				var val = $(this).val();
				if (val != '' && !fnIsNumeric(val)) {
					$(this).val(val.substring(0, val.length - 1));
				} else if (val.indexOf('.') != val.lastIndexOf('.')) {
					$(this).val(val.substring(0, val.length - 1));
				} else {
					var decPos = -1;
					$(window).load(function(){
						decPos = val.indexOf('.');
					});
					if (decPos != -1) {
						$(this).val(val.toFixed(0));
					}
					if ($(this).val() != '') {
						val = $('#' + rowId + '_std_hval').val();
						$('#' + rowId + '_std_hval').val(truncateDecimals(val, $(this).val()));
						val = $('#' + rowId + '_std_lval').val();
						$('#' + rowId + '_std_lval').val(truncateDecimals(val, $(this).val()));
					}
				}
				fn_numerical_result(grid, rowId);
			});
			//상한 변경
			$('#' + rowId + '_std_hval').keyup(function() {
				/*var val = $(this).val();
				if (val != '' && !fnIsNumeric(val)) {
					$(this).val(val.substring(0, val.length - 1));
				} else if (val.indexOf('.') != val.lastIndexOf('.')) {
					$(this).val(val.substring(0, val.length - 1));
				} else {
					$(this).val(truncateDecimals(val, $('#' + rowId + '_valid_position').val()));
				}*/
				fn_numerical_result(grid, rowId);
			});
			//하한 변경
			$('#' + rowId + '_std_lval').keyup(function() {
				/*var val = $(this).val();
				if (val != '' && !fnIsNumeric(val)) {
					$(this).val(val.substring(0, val.length - 1));
				} else if (val.indexOf('.') != val.lastIndexOf('.')) {
					$(this).val(val.substring(0, val.length - 1));
				} else {
					$(this).val(truncateDecimals(val, $('#' + rowId + '_valid_position').val()));
				}*/
				fn_numerical_result(grid, rowId);
			});
			//상한 유형 변경
			$('#' + rowId + '_hval_type').change(function() {
				fn_numerical_result(grid, rowId);
			});
			//하한 유형 변경
			$('#' + rowId + '_lval_type').change(function() {
				fn_numerical_result(grid, rowId);
			});
			//결과값 변경
			$('#' + rowId + '_result_val').keyup(function() {
				// 적용된 계산식이 있을경우 초기화
				var formula_no = $('#' + grid).jqGrid('getCell', rowId, 'formula_no');
				if(!fnIsEmpty(formula_no)){/*
					$('#' + grid).jqGrid('setCell', rowId, 'formula_no',null);
					$('#' + grid).jqGrid('setCell', rowId, 'formula_disp',null);*/
				}
			
				
				/*
				if ($('#' + rowId + '_lval_type').val() == '' && $('#' + rowId + '_hval_type').val() == ''){					
					var arr = new Array();
					arr.push('std_hval');
					arr.push('hval_type');
					arr.push('std_lval');
					arr.push('lval_type');
					$('#btn_Num_Show').find('button').text('수치형기준 숨김');
					$('#' + grid).showCol(arr);					
				}
				*/
				fn_numerical_result(grid, rowId);
				
			});
			/*if (!beginning) {
				fn_numerical_result(grid, rowId);
			}*/
			break;
		//서술형
		case 'C31003':
			if (beginning) {
				fn_descriptive_result(grid, rowId, false);
			}
			//결과값 변경
			$('#' + rowId + '_result_val').keyup(function(e) {
				var backspace = false;
				if (e.keyCode == 8 && $('#' + rowId + '_result_val').val().length == 0) {
					backspace = true;
				}
				fn_descriptive_result(grid, rowId, backspace);
			});
			break;
		//결과없음
		case 'C31004':
			if (beginning) {
				fn_nothing_result(grid, rowId);
			}
			break;
		//성적서 문서
		case 'C31005':
			//if (beginning) {
				$('#' + grid).jqGrid('setCell', rowId, 'jdg_type', 'C37004');
				$('#' + grid).jqGrid('setCell', rowId, 'result_cd', 'C31005');
				$('#' + grid).setCell(rowId, 'report_disp_val', '첨부문서참조');
				$('#' + grid).setCell(rowId, 'result_val', '첨부문서참조');
				$('#' + grid).setCell(rowId, 'std_val', null);
				$('#' + grid).setCell(rowId, 'unit', 'C08001');
				$('#' + grid).setCell(rowId, 'valid_position', null);
			//}
			break;
		//등급형
		case 'C31008':
			//표기자리 변경
			$('#' + rowId + '_valid_position').keyup(function() {
				var val = $(this).val();
				if (val != '' && !fnIsNumeric(val)) {
					$(this).val(val.substring(0, val.length - 1));
				} else if (val.indexOf('.') != val.lastIndexOf('.')) {
					$(this).val(val.substring(0, val.length - 1));
				} else {
					var decPos = -1;
					$(window).load(function(){
						decPos = val.indexOf('.');
					});
					if (decPos != -1) {
						$(this).val(val.toFixed(0));
					}
					if ($(this).val() != '') {
						val = $('#' + rowId + '_std_hval').val();
						$('#' + rowId + '_std_hval').val(truncateDecimals(val, $(this).val()));
						val = $('#' + rowId + '_std_lval').val();
						$('#' + rowId + '_std_lval').val(truncateDecimals(val, $(this).val()));
					}
				}
				fn_grade_result(grid, rowId);
			});
			//등급1값 변경
			$('#' + rowId + '_grade1').keyup(function() {
				var row_grade = $('#' + rowId + '_grade1').val() + ' ' + $('#' + rowId + '_grade1_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade1_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급1범위 변경
			$('#' + rowId + '_grade1_range').change(function() {
				var row_grade = $('#' + rowId + '_grade1').val() + ' ' + $('#' + rowId + '_grade1_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade1_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급2값 변경
			$('#' + rowId + '_grade2').keyup(function() {
				var row_grade = $('#' + rowId + '_grade2').val() + ' ' + $('#' + rowId + '_grade2_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade2_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급2범위 변경
			$('#' + rowId + '_grade2_range').change(function() {
				var row_grade = $('#' + rowId + '_grade2').val() + ' ' + $('#' + rowId + '_grade2_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade2_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급3값 변경
			$('#' + rowId + '_grade3').keyup(function() {
				var row_grade = $('#' + rowId + '_grade3').val() + ' ' + $('#' + rowId + '_grade3_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade3_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급3범위 변경
			$('#' + rowId + '_grade3_range').change(function() {
				var row_grade = $('#' + rowId + '_grade3').val() + ' ' + $('#' + rowId + '_grade3_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade3_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급4값 변경
			$('#' + rowId + '_grade4').keyup(function() {
				var row_grade = $('#' + rowId + '_grade4').val() + ' ' + $('#' + rowId + '_grade4_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade4_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//등급4범위 변경
			$('#' + rowId + '_grade4_range').change(function() {
				var row_grade = $('#' + rowId + '_grade4').val() + ' ' + $('#' + rowId + '_grade4_range option:selected').text();
				$('#' + grid).setCell(rowId, 'grade4_nm', row_grade);
				fn_grade_result(grid, rowId);
			});
			//결과값 변경
			$('#' + rowId + '_result_val').keyup(function() {
				fn_grade_result(grid, rowId);	
			});
			break;
		}
		break;
	//자동기준
	default:
		//결과유형
		switch (row_result_type) {
		//선택형
		case 'C31001':
			fn_optional_result(grid, rowId);
			break;
		//수치형
		case 'C31002':
			//결과값 변경
			$('#' + rowId + '_result_val').keyup(function() {
				// 적용된 계산식이 있을경우 초기화
				var formula_no = $('#' + grid).jqGrid('getCell', rowId, 'formula_no');
				if(!fnIsEmpty(formula_no)){
					$('#' + grid).jqGrid('setCell', rowId, 'formula_no',null);
					$('#' + grid).jqGrid('setCell', rowId, 'formula_disp',null);
				}
				var val = $(this).val();
				if (val.length == 2 && val.indexOf('.') != 1 && parseFloat(val) == 0) {
					$('#' + rowId + '_result_val').val(parseFloat(val));
				}
				if (val != '' && !fnIsNumeric(val)) {
					$(this).val(val.substring(0, val.length - 1));
				} else if (val.indexOf('.') != val.lastIndexOf('.')) {
					$(this).val(val.substring(0, val.length - 1));
				}
				fn_numerical_result(grid, rowId);
			});
			break;
		//서술형
		case 'C31003':
			if (beginning) {
				fn_descriptive_result(grid, rowId, false);
			}
			$('#' + rowId + '_result_val').keyup(function(e) {
				var backspace = false;
				if (e.keyCode == 8 && $('#' + rowId + '_result_val').val().length == 0) {
					backspace = true;
				}
				fn_descriptive_result(grid, rowId, backspace);
			});
			break;
		//등급형
		case 'C31008':
			$('#' + rowId + '_result_val').keyup(function() {
				fn_grade_result(grid, rowId);	
			});
			break;
		//결과없음
		case 'C31004':
			if (beginning) {
				fn_nothing_result(grid, rowId);
			}
			break;
		}
		break;
	}
}
/**
 * @설명 : 결과 그리드 onCellSelect 이벤트처리
 */
function fn_Result_onCellSelect(grid, rowId, iCol, test_std_no) {
	fnEditRelease(grid);
	
	var row = $('#' + grid).getRowData(rowId);
	var colArr = $('#' + grid).jqGrid('getGridParam', 'colModel');
	var col = colArr[iCol].name;
	// 시험 방법
	if (col == 'test_method_pop' && row.result_val != '첨부문서참조') {
		if(select_state == 'B'){
			fnBasicStartLoading();
			fnpop_methodPop(grid, '900', '500', row.test_item_cd, test_std_no, rowId);
		} else {
			return false;
		}
	} else if (col == 'test_method_del' && row.result_val != '첨부문서참조') {
		$('#' + grid).jqGrid('setCell', rowId, 'test_method_nm', null);
		$('#' + grid).jqGrid('setCell', rowId, 'test_method_no', null);
	} else if (col == 'formula_pop' && row.result_val != '첨부문서참조') {
		if(row.result_type != 'C31002' && row.result_type != 'C31008'){
			alert("수치형 혹은 등급형으로 선택해주세요.");
			return false;
		}

		fnBasicStartLoading();
		fnpop_formulaPop(grid, "900", "500", rowId, row.test_item_cd, "T", row.formula_no);
	} else if (col == 'formula_del' && row.result_val != '첨부문서참조') {
		
		$('#' + grid).jqGrid('setCell', rowId, 'formula_no', null);
		$('#' + grid).jqGrid('setCell', rowId, 'formula_disp', null);
		$('#' + grid).jqGrid('setCell', rowId, 'account_tot_cal_disp', null);
	// 시험 기기
	} else if (col == 'inst_kor_pop' && row.result_val != '첨부문서참조') {
		if(select_state == 'B'){
			fnBasicStartLoading();
			fnpop_machinePop(grid, '900', '500', row.test_item_cd, test_std_no, rowId);
		} else {
			return false;
		}
	} else if (col == 'inst_kor_del' && row.result_val != '첨부문서참조') {
		$('#' + grid).jqGrid('setCell', rowId, 'inst_kor_nm', null);
		$('#' + grid).jqGrid('setCell', rowId, 'inst_no', null);
	} else if (col == 'rawdata') {
		var row = $('#resultGrid').getRowData(rowId);
		if (row.rawdata == 'Y') {
			var data = 'test_item_seq=' + row.test_sample_seq + '&test_item_seq=\'' + row.test_item_seq + '\'';
			btn_RDMS_Viewer(2, data);
		}
	}// 성적서 문서
	 else if (col == 'report_pop') {
		if (select_state == 'B') {				
			fnBasicStartLoading();
			fnpop_filePop(grid, '500', '175', row.test_item_cd, row.test_sample_seq, rowId, '');
		} else {
			alert("결과입력가능 상태가 아닙니다.");
			return false;
		}
	} else if (col == 'report_del') {
		// 파일 삭제
		//alert(row.att_seq);
		var param;
		var json;
		if(row.att_seq != '' && row.att_seq != null){
			if(confirm("삭제하시겠습니까?")){			
				param = 'att_seq=' + row.att_seq + '&test_sample_seq=' +  row.test_sample_seq + '&test_item_cd=' +  row.test_item_cd;
				json = fnAjaxAction('analysis/deleteReportFile.lims', param);
				
				if (json == null) {
					alert('error');
					return false;
				} else {
					alert('삭제되었습니다.');
					callback_del(grid, rowId, iCol);
				}
			}
		} else {
			alert('삭제 할 문서가 없습니다.');
			return false;
		}
	}
}
/**
 * @설명 : 결과 그리드 onSelectRow 이벤트처리
 */
function fn_Result_onSelectRow(grid, lastRowId) {
	fnEditRelease(grid);
	var row = $('#' + grid).getRowData(lastRowId);
	var row_result_val = row.result_val;
	if (row_result_val == '') {
		row_result_val = null;
	}
	fn_change_color(grid, lastRowId);
	editChange = false;
}
/**
 * @설명 : 결과 그리드 ondblClickRow 이벤트처리
 */
function fn_Result_ondblClickRow(grid, rowId, iCol) {
	fn_editable(grid, rowId);
	fnGridEdit(grid, rowId, fn_Result_Row_Click);
	
	var row_result_val = $('#' + rowId + '_result_val').val();
	if (row_result_val == '') {
		var row = $('#' + grid).getRowData(lastRowId);
	}

	var colArr = $('#' + grid).jqGrid('getGridParam', 'colModel');
	$('#' + rowId + '_' + colArr[iCol].name).focus();
}
/**
 * @설명 : 결과 그리드 afterInsertRow 이벤트처리
 */
function fn_Result_afterInsertRow(grid, rowId) {
	beginning = false;
	fn_editable(grid, rowId);
	fnGridEdit(grid, rowId, fn_Result_Row_Click);
	fnEditRelease(grid);

	fn_change_color(grid, rowId);
	fn_set_cell(grid, 'result_val', 'text', null);
	editChange = false;
	beginning = true;
	$('#' + grid).jqGrid('setCell', rowId, 'chk', 'No');
}
/**
 * @설명 : 결과 그리드 setGroupHeaders 이벤트처리
 */
function fn_Result_setGroupHeaders(grid) {
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
			numberOfColumns : 3,
			titleText : '결과'
		}, {
			startColumnName : 'test_method_no',
			numberOfColumns : 4,
			titleText : '시험방법'
		}, {
			startColumnName : 'formula_no',
			numberOfColumns : 5,
			titleText : '적용계산식'
		}, {
			startColumnName : 'inst_no',
			numberOfColumns : 4,
			titleText : '시험기기'
		}, {
			startColumnName : 'file_nm',
			numberOfColumns : 4,
			titleText : '첨부문서'
		} ]
	});
}
function commonReqGrid(url, form, grid, multi) {
	$('#' + grid).jqGrid({
		datatype : function(json) {
			fnGridInit ? fn_GridData(url, form, grid) : fnGridInit = true;
		},
		height : '200',
		autowidth : false,
		loadonce : true,
		mtype : "POST",
		gridview : false,
		shrinkToFit : false,
		rowNum : -1,
		rownumbers : true,
		colModel : [ {
			label : '의뢰구분',
			name : 'req_type',
			align : 'center',
			width : '100%'
		}, {
			label : '접수번호',
			name : 'test_req_no',
			align : 'center',
			width : '100%'
		}, {
			label : 'test_req_seq',
			name : 'test_req_seq',
			align : 'center',
			key : true,
			hidden : true
		}, {
			label : '제목',
			name : 'title',
			width : '100%'
		}, {
			label : '접수일자',
			name : 'sample_arrival_date',
			width : '100%',
			align : 'center'
		}, {
			label : '처리기한',
			name : 'deadline_date',
			width : '100%',
			align : 'center'
		}, {
			label : '의뢰업체명',
			name : 'req_org_nm'
		}, {
			label : '의뢰자',
			name : 'req_nm',
			width : '100%',
			align : 'center'
		}, {
			label : '접수부서',
			name : 'dept_nm',
			width : '100%'
		}, {
			label : 'dept_cd',
			name : 'dept_cd',
			hidden : true
		}, {
			label : 'supv_dept_cd',
			name : 'supv_dept_cd',
			hidden : true
		}, {
			label : '단위업무',
			name : 'unit_work_cd'
		}, {
			label : '검사목적',
			name : 'test_goal'
		}, {
			label : '지연사유',
			editable : false,
			hidden : true,
			name : 'exceed_reason',
			classes : 'exceed_reason',
			width : '80',
			align : 'left'
		}, {
			label : '접수자',
			name : 'user_nm',
			width : '100%',
			align : 'center'
		}, {
			label : '생성자',
			name : 'creater_nm',
			width : '100%',
			align : 'center'
		}, {
			label : '상태',
			name : 'state',
			hidden : true
		}, {
			label : '백업상태',
			name : 'backup_state',
			hidden : true
		}, {
			label : 'temp_min',
			name : 'temp_min',
			hidden : true
		}, {
			label : 'temp_max',
			name : 'temp_max',
			hidden : true
		}, {
			label : 'hum_min',
			name : 'hum_min',
			hidden : true
		}, {
			label : 'hum_max',
			name : 'hum_max',
			hidden : true
		}, {
			label : 'return_flag',
			name : 'return_flag',
			hidden : true
		}, {
			label : '반려사유',
			name : 'return_comment',
			width : '100%'
		} ],
		gridComplete : function() {
		},
		onSortCol : function(index, iCol, sortorder) {
			if(!com_auth_select){return 'stop';}else{fnSortCol(form, index, sortorder);}
		},
		onSelectRow : function(rowId, status, e) {
			commonReqGrid_rowClick(rowId);
		},
		afterInsertRow : function(rowId, rowdata, rowelem) {
			fn_return_change_color(grid, rowId);
		}
	});
	$('#' + grid).jqGrid('setGroupHeaders', {
		useColSpanStyle : true,
		groupHeaders : [ {
			startColumnName : 'req_type',
			numberOfColumns : 7,
			titleText : '의뢰정보'
		}, {
			startColumnName : 'dept_nm',
			numberOfColumns : 5,
			titleText : '검사정보'
		} ]
	});
}

// 시료 정보
function fn_getSample(test_req_seq) {
	$('#inputSampleForm').find('#test_req_seq').val(test_req_seq);
	$('#resultForm').find('#test_sample_seq').val($('#inputSampleForm').find('#test_sample_seq').val());
	$('#resultForm').find('#test_req_seq').val(test_req_seq);
	$('#resultGrid').trigger('reloadGrid');
	$.ajax({
		url : 'analysis/selectSampleDetail.lims',
		type : 'post',
		dataType : 'json',
		async : false,
		data : $('#inputSampleForm').serialize(),
		success : function(json) {
			$(json).each(function(index, entry) {
				var sampling_date = entry["sampling_date"];
				sampling_date = sampling_date == undefined ? '' : sampling_date;
				var sampling_hour = entry["sampling_hour"];
				sampling_hour = sampling_hour == undefined ? '' : sampling_hour;
				var sampling_min = entry["sampling_min"];
				sampling_min = sampling_min == undefined ? '' : sampling_min;

				$('#inputSampleForm').find('#vw_test_sample_no').text(entry["test_sample_no"]);
				$('#inputSampleForm').find('#sample_reg_nm').text(entry["sample_reg_nm"]);
				$('#inputSampleForm').find('#sampling_date').text(sampling_date + ' [ ' + sampling_hour + '시 ' + sampling_min + '분 ]');
				$('#inputSampleForm').find('#sampling_point_nm').text(entry["sampling_point_nm"]);
				$('#inputSampleForm').find('#sampling_method').text(entry["sampling_method"]);
				$('#inputSampleForm').find('#sampling_id').text(entry["sampling_id"]);
				$('#inputSampleForm').find('#sample_nm').text(entry["sample_nm"]);
				$('#inputSampleForm').find('#etc_desc').text(entry["etc_desc"]);
				$('#inputSampleForm').find('#test_std_nm').text(entry["test_std_nm"]);
				$('#inputSampleForm').find('#test_std_no').val(entry["test_std_no"]);
				$('#inputSampleForm').find('#test_cmt').val(entry["test_cmt"]);
				$('#inputSampleForm').find('#req_message').val(entry["req_message"]);
				$('#inputSampleForm').find('#test_sample_result').text(entry["test_sample_result"]);
				
				// 시료 판정 수정 팝업
				ajaxComboForm("jdg_type", "C37", entry['jdg_type'], "", "inputSampleForm");
				$('#inputSampleForm').find('#test_sample_result_reason').text('');
				$('#inputSampleForm').find('#test_sample_result_reason').text(entry["test_sample_result_reason"]);
				$('#inputSampleForm').find('#jdg_etc').text('');
				$('#inputSampleForm').find('#jdg_etc').text(entry["jdg_etc"]);
				
				// 시료별 첨부 문서
				//$('#inputSampleForm').find('#file_link').prop('href', 'analysis/reportDown.lims?att_seq='+ entry["att_seq"]);
				//$('#inputSampleForm').find('#file_nm').text(entry["file_nm"]);			
				//$('#inputSampleForm').find('#att_seq').val(entry["att_seq"]);
				
				if (entry["rawdata"] == 'Y') {
					$('#inputSampleForm').find('#rawdataBtn').show();
				} else {
					$('#inputSampleForm').find('#rawdataBtn').hide();
				}

			});
		},
		error : function() {
			alert('error');
		}
	});
}

// 의뢰정보팝업
//function btn_pop_req_info() {
//	var rowId = $('#reqListGrid').getGridParam('selrow');
//	if (rowId == null) {
//		alert('의뢰를 선택해주세요.');
//	} else {
//		var ret = fn_pop_req_info(rowId, false);
//		if (ret == 'reloadGrid') {
//			$('#reqListGrid').trigger('reloadGrid');
//		}
//	}
//}

function btn_pop_state_info() {
	var rowId = $('#reqListGrid').getGridParam('selrow');
	if (rowId == null) {
		alert('의뢰를 선택해주세요.');
	} else {
		fn_pop_state_info(rowId, '');
	}
}

function btn_RDMS_Viewer(mode, param) {
	if (mode == 2) {
		fn_RDMS_Viewer(param);
	} else if (mode == 3) {
		var rowId = $('#reqListGrid').getGridParam('selrow');
		var data = 'test_req_seq=' + rowId;
		fn_RDMS_Viewer(data);		
	} else {
		var test_sample_seq = $('#resultForm').find('#test_sample_seq').val();
		if (test_sample_seq == '') {
			alert('시료를 선택해주세요.');
		} else {
			var data = 'test_sample_seq=' + test_sample_seq;
			if (mode == 1) {
				var rowArr = $('#resultGrid').getGridParam('selarrrow');
				if (rowArr != '') {
					data += '&test_item_seq=';
					for (var i = 0; i < rowArr.length; i++) {
						var row = $('#resultGrid').getRowData(rowArr[i]);
						data += '\'' + row.test_item_seq + '\',';
					}
					data = data.substring(0, data.length - 1);
				}
			}
			fn_RDMS_Viewer(data);
		}
	}
	
}
function fnSelectSampleComboForm(form, obj, test_req_seq, type) {
	var url = fn_getConTextPath();
	url += '/commonCode/selectCommonCodeSample.lims';
	$.ajax({
		url : url,
		type : 'POST',
		async : false,
		dataType : 'json',
		data : "test_req_seq=" + test_req_seq + '&pageType=' + type,
		timeout : 5000,
		error : function() {
			alert('공통Script 조회시 오류가 발생하였습니다.\n위치 : fnSelectSampleComboForm');
		},
		success : function(json) {
			var select = $("#" + form).find("#" + obj);
			select.empty();
			$(json).each(function(index, entry) {
				select.append("<option value='" + entry["code"] + "'>" + entry["code_Name"] + "</option>");
			});
			select.trigger('change');// 강제로 이벤트 시키기
		}
	});
}

function btn_insertItemVal_onclick(gbn) {
	var grid = 'resultGrid';
	var ids = $('#' + grid).jqGrid("getDataIDs");
	var rowCnt = 0;

	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		if (row.chk == 'Yes') {
			rowCnt++;
		}
	}
	
	if (rowCnt == 0) {
		alert("선택된 항목이 없습니다.");
		return;
	} else {
		var result_val = $('#resultDetailForm').find('#result_val').val();
		var report_disp_val = $('#resultDetailForm').find('#report_disp_val').val();
		var unit = $('#resultDetailForm').find('#unit').val();		
		var jdg_type = $('#resultDetailForm').find('#jdg_type').val();
		var test_method_nm =$('#resultDetailForm').find('#test_method_nm').val()
		var valid_position =$('#resultDetailForm').find('#valid_position').val()
		var exceed_reason =$('#resultDetailForm').find('#exceed_reason').val()
		if(gbn == 1){
			if (result_val == null || result_val == "") {
				alert("입력된 결과값이 없습니다.");
			} else {
				var nids = $('#' + grid).jqGrid("getDataIDs");
				for ( var j in nids) {
					var nrow = $('#' + grid).getRowData(nids[j]);
					if (nrow.chk == 'Yes') {
						$('#' + grid).jqGrid('setCell', ids[j], 'result_cd', result_val);
						$('#' + grid).jqGrid('setCell', ids[j], 'result_val', result_val);
						$('#' + grid).jqGrid('setCell', ids[j], 'report_disp_val', report_disp_val);
						$('#' + grid).jqGrid('setCell', ids[j], 'jdg_type', jdg_type);
					}
				}
			}
		}else if(gbn == 2){
			var nids = $('#' + grid).jqGrid("getDataIDs");
			for ( var j in nids) {
				var nrow = $('#' + grid).getRowData(nids[j]);
				if (nrow.chk == 'Yes') {
					if (unit != null && unit != "") {
						$('#' + grid).jqGrid('setCell', ids[j], 'unit', unit);
					}
				}
			}
		}
		else if(gbn == 3){
			var nids = $('#' + grid).jqGrid("getDataIDs");
			for ( var j in nids) {
				var nrow = $('#' + grid).getRowData(nids[j]);
				if (nrow.chk == 'Yes') {
					if (test_method_nm != null && test_method_nm != "") {
						$('#' + grid).jqGrid('setCell', ids[j], 'test_method_nm', test_method_nm);
						$('#' + grid).jqGrid('setCell', ids[j], 'test_method_no',$('#test_method_no').val());
					}
				}
			}
		}
		else if(gbn == 4){
			var nids = $('#' + grid).jqGrid("getDataIDs");
			for ( var j in nids) {
				var nrow = $('#' + grid).getRowData(nids[j]);
				if (nrow.chk == 'Yes') {
					if (valid_position != null && valid_position != "") {
						$('#' + grid).jqGrid('setCell', ids[j], 'valid_position', valid_position);
					}
				}
			}
		}
		else if(gbn == 5){
			var nids = $('#' + grid).jqGrid("getDataIDs");
			for ( var j in nids) {
				var nrow = $('#' + grid).getRowData(nids[j]);
				if (nrow.chk == 'Yes') {
					if (exceed_reason != null && exceed_reason != "") {
						$('#' + grid).jqGrid('setCell', ids[j], 'exceed_reason', exceed_reason);
					}
				}
			}
		}
		
	}
}

function btn_NoResult_onclick(gbn){
	var grid = 'resultGrid';
	var ids = $('#' + grid).jqGrid("getDataIDs");
	var jdg_type;
	
	if(gbn == 1){
		jdg_type = "C37003";
	}else{
		jdg_type = "C76005";
	}
	
	if(ids.length == 0){
		alert("항목리스트가 없습니다.");
		return;
	}
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		if(row.result_type == 'C31004'){
			$('#' + grid).jqGrid('setCell', ids[i], 'chk', 'Yes');
			$('#' + grid).jqGrid('setCell', ids[i], 'jdg_type', jdg_type);
			$('#' + grid).jqGrid('setCell', ids[i], 'report_disp_val', '시험을확인함');
			$('#' + grid).jqGrid('setCell', ids[i], 'result_cd', '결과값없음');
			$('#' + grid).jqGrid('setCell', ids[i], 'result_val', '결과값없음');			
		}		
	}
}

function btn_insertMultiItemVal_onclick() {
	var grid = 'resultGrid';
	var ids = $('#' + grid).getGridParam('selarrrow');

	if (ids.length < 1) {
		alert("선택된 항목이 없습니다.");
		return;
	} else {
		var std_type = $('#resultDetailForm').find('#std_type').val();
		var result_type = $('#resultDetailForm').find('#result_type').val();
		var unit = $('#resultDetailForm').find('#unit').val();
		var result_val = $('#resultDetailForm').find('#result_val').val();
		var report_disp_val = $('#resultDetailForm').find('#report_disp_val').val();
		var jdg_type = $('#resultDetailForm').find('#jdg_type').val();

		if (result_val == null || result_val == "") {
			alert("입력된 결과값이 없습니다.");
			$('#resultDetailForm').find('#result_val').focus();
		} else if (result_val == null || result_val == "") {
			alert("입력된 결과값이 없습니다.");
			$('#resultDetailForm').find('#result_val').focus();
		} else {
			for ( var j in ids) {
				$('#' + grid).jqGrid('setCell', ids[j], 'std_type', std_type);
				$('#' + grid).jqGrid('setCell', ids[j], 'result_type', result_type);
				$('#' + grid).jqGrid('setCell', ids[j], 'unit', unit);
				$('#' + grid).jqGrid('setCell', ids[j], 'result_cd', result_val);
				$('#' + grid).jqGrid('setCell', ids[j], 'result_val', result_val);
				$('#' + grid).jqGrid('setCell', ids[j], 'report_disp_val', report_disp_val);
				$('#' + grid).jqGrid('setCell', ids[j], 'jdg_type', jdg_type);
				//fn_change_color(grid, ids[j]);
			}
		}
	}
}

function fn_return_change_color(grid, rowId){
	var row = $('#' + grid).getRowData(rowId);
	if (row.return_flag == 'Y') {
		$('#' + grid).jqGrid('setCell', rowId, 'title', '[반려]' + row.title, {
			color : 'red'
		});
	}
}

//정량한계 처리
function fn_loq_result(loq_hval,loq_hval_mark,loq_lval,loq_lval_mark,result_val){
	
	var rtn_val = result_val;
	var gbn;
	
	if(loq_hval != '' && loq_lval != ''){
		gbn = 'A';
	}else if(loq_hval != '' && loq_lval == ''){
		gbn = 'H';
	}else if(loq_hval == '' && loq_lval != ''){
		gbn = 'L';
	}
	
	loq_hval = parseFloat(loq_hval);
	loq_lval = parseFloat(loq_lval);
	
	if(gbn == 'A'){
		if(result_val > loq_hval){
			rtn_val = loq_hval_mark;
		}
		if(result_val < loq_lval){
			rtn_val = loq_lval_mark;
		}
	}else if(gbn == 'H'){
		if(result_val > loq_hval){
			rtn_val = loq_hval_mark;
		}
		
	}else if(gbn == 'L'){
		if(result_val < loq_lval){
			rtn_val = loq_lval_mark;
		}
	}
	
	return rtn_val;
}
