
// 계산식 공통 스크립트
// 공통변수

//var account_type =":선택;+:더하기;－:빼기;×:곱하기;÷:나누기;AVG:평균;REF:변수참조"; //MOD:나머지";
var account_type =":선택;+:더하기;－:빼기;×:곱하기;÷:나누기;AVG:평균"; //MOD:나머지";
var	account_base_type =":없음;+:더하기;－:빼기;×:곱하기;÷:나누기";



/**
 * @설명 : 
 * @파라미터 :
 */


/**
 * @설명 : grid에 보여줄 공통 헤더를 셋팅한다
 * @파라미터 : 
 */
function setColModel(){
	/**
	 * 2019-09-26 정언구
	 * 변수 코드(항목일 때) 부분들을 추가했습니다. (계산식 관리에서 항목 선택 기능에 사용)
	 * 위 컬럼은 반드시 현재 순서를 유지하여야 합니다. (변수컬럼 바로 앞)
	 */
	var colModel = [{type : 'not',label : ' ',name : 'icon',width : '20',sortable : false,align : 'center'},
	                {label : 'crud',name : 'crud',hidden : true}, 
	                {label : '계산식번호', name :'account_no',width : '80', hidden : false, hidden : true},
	                {label: "순번", name:"account_detail_no",width : '50',align : 'center', hidden : true},
	                {label: "계산구분",name:"account_type",width : '80',align : 'center',editable : true ,edittype : "select",editoptions : {value : account_type},formatter : 'select'},
	                {label: "변수코드(항목일 때)",name:"x1_cd",width : '50', hidden: true},
	                {label: "변수",name:"x1",width : '50',align : 'center',editable : true, selectItemTarget: true},
	                {label: "변수설명",name:"x1_nm",width : '80',align : 'center',editable : true},
	                {label: "변수값",name:"x1_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x2_cd",width : '50', hidden: true},
	                {label: "변수",name:"x2",width : '50',align : 'center',editable : true, selectItemTarget: true},
	                {label: "변수설명",name:"x2_nm",width : '80',align : 'center',editable : true},
	                {label: "변수값",name:"x2_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x3_cd",width : '50', hidden: true},
	                {label: "변수",name:"x3",width : '50',align : 'center',editable : true, selectItemTarget: true},
	                {label: "변수설명",name:"x3_nm",width : '80',align : 'center',editable : true},
	                {label: "변수값",name:"x3_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x4_cd",width : '50', hidden: true},
	                {label: "변수",name:"x4",width : '50',align : 'center',editable : true, selectItemTarget: true},
	                {label: "변수설명",name:"x4_nm",width : '80',align : 'center',editable : true},
	                {label: "변수값",name:"x4_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x5_cd",width : '50', hidden: true},
	                {label: "변수",name:"x5",width : '50',align : 'center',editable : true, selectItemTarget: true},
	                {label: "변수설명",name:"x5_nm",width : '80',align : 'center',editable : true},
	                {label: "변수값",name:"x5_val",width : '50',align : 'center',editable : true},
	                {label: "변수",name:"x6",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수설명",name:"x6_nm",width : '80',align : 'center',editable : true, hidden : true},
	                {label: "변수값",name:"x6_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x7",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수설명",name:"x7_nm",width : '80',align : 'center',editable : true, hidden : true},
	                {label: "변수값",name:"x7_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x8",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수설명",name:"x8_nm",width : '80',align : 'center',editable : true, hidden : true},
	                {label: "변수값",name:"x8_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x9",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수설명",name:"x9_nm",width : '80',align : 'center',editable : true, hidden : true},
	                {label: "변수값",name:"x9_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x10",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수설명",name:"x10_nm",width : '80',align : 'center',editable : true, hidden : true},
	                {label: "변수값",name:"x10_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "선연산자",name:"account_s_oper",width : '70',editable : true, edittype : "select",editoptions : {value : account_base_type},formatter : 'select'},
	                {label: "후연산자",name:"account_e_oper",width : '70',hidden : true, editable : true, edittype : "select",editoptions : {value : account_base_type},formatter : 'select'},
	                {label: "표현식",name:"account_disp",width : '200',align : 'center'},
	                {label: "연산식",name:"account_cal_disp",width : '200',align : 'center'},
	                {label: "결과유효자리",name:"account_valid_position",width : '80',editable : true},
	                {label: "결과값",name:"account_result",width : '100',align : 'center'}
	                ];
	return colModel;
}


function setColModelApply(){
	/**
	 * 2019-09-26 정언구
	 * 변수 코드(항목일 때) 부분들을 추가했습니다. (결과 입력에서 결과식 적용 팝업의 결과값 저장 기능에 사용)
	 */
	var colModel = [{type : 'not',label : ' ',name : 'icon',width : '20',sortable : false,align : 'center'},
	                {label : 'crud',name : 'crud',hidden : true}, 
	                {label : '시료접수번호', name :'test_sample_seq',width : '80', hidden : false},
	                {label : '항목번호', name :'test_item_cd',width : '80', hidden : false},
	                {label : '계산식번호', name :'account_no',width : '80', hidden : true, hidden : true},
	                {label: "순번", name:"account_detail_no",width : '50',align : 'center', hidden : true},
	                {label: "계산구분",name:"account_type",width : '80',align : 'center',editable : false ,edittype : "select",editoptions : {value : account_type},formatter : 'select'},
	                {label: "변수코드(항목일 때)",name:"x1_cd",width : '50', hidden: true},
	                {label: "변수",name:"x1",width : '50',align : 'center',editable : false},
	                {label: "변수설명",name:"x1_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x1_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x2_cd",width : '50', hidden: true},
	                {label: "변수",name:"x2",width : '50',align : 'center',editable : false},
	                {label: "변수설명",name:"x2_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x2_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x3_cd",width : '50', hidden: true},
	                {label: "변수",name:"x3",width : '50',align : 'center',editable : false},
	                {label: "변수설명",name:"x3_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x3_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x4_cd",width : '50', hidden: true},
	                {label: "변수",name:"x4",width : '50',align : 'center',editable : false},
	                {label: "변수설명",name:"x4_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x4_val",width : '50',align : 'center',editable : true},
	                {label: "변수코드(항목일 때)",name:"x5_cd",width : '50', hidden: true},
	                {label: "변수",name:"x5",width : '50',align : 'center',editable : false},
	                {label: "변수설명",name:"x5_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x5_val",width : '50',align : 'center',editable : true},
	                {label: "변수",name:"x6",width : '50',align : 'center',editable : false, hidden : true},
	                {label: "변수설명",name:"x6_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x6_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x7",width : '50',align : 'center',editable : false, hidden : true},
	                {label: "변수설명",name:"x7_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x7_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x8",width : '50',align : 'center',editable : false, hidden : true},
	                {label: "변수설명",name:"x8_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x8_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x9",width : '50',align : 'center',editable : false, hidden : true},
	                {label: "변수설명",name:"x9_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x9_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "변수",name:"x10",width : '50',align : 'center',editable : false, hidden : true},
	                {label: "변수설명",name:"x10_nm",width : '80',align : 'center',editable : false, hidden : true},
	                {label: "변수값",name:"x10_val",width : '50',align : 'center',editable : true, hidden : true},
	                {label: "선연산자",name:"account_s_oper",width : '70',editable : false, edittype : "select",editoptions : {value : account_base_type},formatter : 'select'},
	                {label: "후연산자",name:"account_e_oper",width : '70', hidden : true, editable : false, edittype : "select",editoptions : {value : account_base_type},formatter : 'select'},
	                {label: "표현식",name:"account_disp",width : '200',align : 'center'},
	                {label: "연산식",name:"account_cal_disp",width : '200',align : 'center'},
	                {label: "결과유효자리",name:"account_valid_position",width : '80',editable : false},
	                {label: "결과값",name:"account_result",width : '100',align : 'center'}
	                ];
	return colModel;
}


/**
 * @설명 : grid에 그룹헤더를 셋팅한다
 * @파라미터 : 
 */
function fn_account_setGroupHeaders(grid) {
	$('#' + grid).jqGrid('setGroupHeaders', {
		useColSpanStyle : true,
		groupHeaders : [ 
           {startColumnName : 'x1',numberOfColumns : 3, titleText : '[X1]'}
			,{startColumnName : 'x2',numberOfColumns : 3, titleText : '[X2]'}
			,{startColumnName : 'x3',numberOfColumns : 3, titleText : '[X3]'}
			,{startColumnName : 'x4',numberOfColumns : 3, titleText : '[X4]'}
			,{startColumnName : 'x5',numberOfColumns : 3, titleText : '[X5]'}
			,{startColumnName : 'x6',numberOfColumns : 3, titleText : '[X6]'}
			,{startColumnName : 'x7',numberOfColumns : 3, titleText : '[X7]'}
			,{startColumnName : 'x8',numberOfColumns : 3, titleText : '[X8]'}
			,{startColumnName : 'x9',numberOfColumns : 3, titleText : '[X9]'}
			,{startColumnName : 'x10',numberOfColumns : 3, titleText : '[X10]'}
		]
	});
}

//변수보기설정
function fn_Show_account(grid){
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if(fnIsEmpty(ids)){return;}
	
	var arr = new Array();
	arr.push('x6');
	arr.push('x7');
	arr.push('x8');
	arr.push('x9');
	arr.push('x10');
	arr.push('x6_nm');
	arr.push('x7_nm');
	arr.push('x8_nm');
	arr.push('x9_nm');
	arr.push('x10_nm');
	arr.push('x6_val');
	arr.push('x7_val');
	arr.push('x8_val');
	arr.push('x9_val');
	arr.push('x10_val');
	if ($('#' + grid).jqGrid('getColProp', 'x6').hidden) {
		$('#btn_Show_'+grid).find('button').text('기본변수보기');
		$('#' + grid).showCol(arr);
	} else {
		$('#btn_Show_'+grid).find('button').text('변수추가보기');
		$('#' + grid).hideCol(arr);
	}
}
//변수설명보기설정
function fn_Show_desc_account(grid){
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if(fnIsEmpty(ids)){return;}
	
	var arr = new Array();
	arr.push('x1_nm');
	arr.push('x2_nm');
	arr.push('x3_nm');
	arr.push('x4_nm');
	arr.push('x5_nm');
	arr.push('x6_nm');
	arr.push('x7_nm');
	arr.push('x8_nm');
	arr.push('x9_nm');
	arr.push('x10_nm');
	if ($('#' + grid).jqGrid('getColProp', 'x1_nm').hidden) {
		$('#btn_Show_desc_'+grid).find('button').text('변수설명숨김');
		$('#' + grid).showCol(arr);
	} else {
		$('#btn_Show_desc_'+grid).find('button').text('변수설명보기');
		$('#' + grid).hideCol(arr);
	}
}

// 결과값보기설정
function fn_Show_val_account(grid){
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if(fnIsEmpty(ids)){return;}
	
	var arr = new Array();
	arr.push('x1_val');
	arr.push('x2_val');
	arr.push('x3_val');
	arr.push('x4_val');
	arr.push('x5_val');
	arr.push('x6_val');
	arr.push('x7_val');
	arr.push('x8_val');
	arr.push('x9_val');
	arr.push('x10_val');
	arr.push('account_cal_disp');
	arr.push('account_result');
	if ($('#' + grid).jqGrid('getColProp', 'x1_val').hidden) {
		$('#btn_Show_val_'+grid).find('button').text('결과값숨김');
		$('#' + grid).showCol(arr);
	} else {
		$('#btn_Show_val_'+grid).find('button').text('결과값보기');
		$('#' + grid).hideCol(arr);
	}
}

// 변수설명 및 결과값
function fn_account_valDesc(grid){
	var val_desc = "";
	var tot_disp = "";
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		fnGridEdit(grid, ids[i], null);
		var row = $('#' + grid).getRowData(ids[i]);
		for(var j = 1;j< 11; j++){
			var key = $("#" + ids[i] + "_x"+ j).val();
			var val = $("#" + ids[i] + "_x"+ j +"_nm").val();
			if(!fnIsEmpty(val)){
				val_desc += key + " : " + val + "  ";
			}
		}
		tot_disp += row.account_disp;
		val_desc += "\n";
	}
	$("#account_val_desc").val(val_desc);
	$("#account_tot_disp").val(tot_disp);
	fnEditRelease(grid);
}

//변수 입력값
function fn_account_valDescTot(grid){
	var val_desc_tot = "";
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		fnGridEdit(grid, ids[i], null);
		var row = $('#' + grid).getRowData(ids[i]);
		for(var j = 1;j< 11; j++){
			//var key = $("#" + ids[i] + "_x"+ j).val();
			var key = $('#' + grid).getCell(ids[i], "x"+j); 
			var val = $("#" + ids[i] + "_x"+ j +"_val").val();
			if(!fnIsEmpty(val)){
				val_desc_tot += key + " : " + val + "  ";
			}
		}
		val_desc_tot += "\n";
	}
	$("#account_val_desc_tot").val(val_desc_tot);
	fnEditRelease(grid);
}
