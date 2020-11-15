// 그리드 추가/수정/삭제시 보여줄 이미지
var gridC = '<img style="width: 16px;" src="images/common/icon_insert.png" >';
var gridU = '<img style="width: 16px;" src="images/common/icon_update.png" >';
var gridD = '<img style="width: 16px;" src="images/common/icon_delete.png" >';
var popImg = '<img style="width: 16px;" src="images/common/icon_search.png" class="auth_select">';
var popImgCal = '<img style="width: 15px;" src="images/common/calendar_img.gif" >';
var deleteImg = '<img style="width: 16px;" src="images/common/icon_stop.png" >';
var rawdataImg = '<img style="width: 16px;" src="images/common/add_file.png" >';

/**
 * @설명 : grid에 보여줄 데이터를 가져온다
 * @파라미터 : url - 주소 , form - 서버로 보낼 데이터를 가진 폼 , grid - 데이터를 보여줄 grid id
 */
function fnGridData(url, form, grid) {

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'POST',
		async : false,
		data : $('#' + form).serialize(),
		success : function(json) {	
			$('#' + grid).clearGridData();
			$('#' + grid)[0].addJSONData(json);
			$('.loading').css('display','none');
		},
		error : function() {
			alert('서버에 접속할 수 없습니다.');
		}
	});
}
function fnAjaxAction(url, data) {
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
		error : function() {
			$.showAlert('[002]서버에 접속할 수 없습니다.');
		}
	});
	return ret;
}

/**
 * @설명 : grid 페이지 번호를 보여준다
 * @파라미터 : url - 주소 , form - 서버로 보낼 데이터를 가진 폼
 */
function fnGridPager(url, form) {
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'html',
		async : false,
		data : $('#' + form).serialize(),
		success : function(html) {
			$('#pager').html(html);
		},
		error : function() {
			alert('[006]서버에 접속할 수 없습니다.');
		}
	});
}
/**
 * @설명 : 정렬할 컬럼 값을 폼에 설정한다.
 * @파라미터 : form url - 주소 , form - 서버로 보낼 데이터를 가진 폼, index - 컬럼명, sortorder - 정렬조건
 */
function fnSortCol(form, index, sortorder) {
	$('#' + form).find('#sortName').val(index);
	$('#' + form).find('#sortType').val(sortorder);
}
/**
 * @설명 : sortByKey 함수는 자바스크립트에서 제공하는 sort를 이용하여 구현한다.
 * @파라미터 : array - 정렬 하려는 grid의 모든 rowData, key - 컬럼명
 * @return : 정렬된 gridData반환
 */
function fnSortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key];
		var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
/**
 * @설명 : 그리드 데이터 변경완료 후 처리
 * @파라미터 : response - 에러여부
 */
function successfunc(response) {
	if (response.responseText = 1) {
		return true;
	} else {
		alert("error");
		return false;
	}
}
/**
 * @설명 : grid 의 첫번쨰 행을 선택한다.
 * @파라미터 : grid - 그리드 id
 */
function fnSelectFirst(grid) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		$('#' + grid).jqGrid("setSelection", ids[0]);
	}
}
/**
 * 설명 : grid 의 rowId 행을 선택한다. 파라미터 : grid - 그리드 id, rowId - 기존에 선택되어 있던 rowId
 */
function fnSelectRowId(grid, rowId) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		$('#' + grid).jqGrid("setSelection", rowId, true);
	}
}
/**
 * @설명 : grid 각 로우의 사용여부를 체크하여 멀티체크한다
 * @파라미터 : grid - 그리드 id
 */
function fnCheckAction(grid) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		if (row.use_flag == 'Yes') {
			$('#' + grid).jqGrid('setSelection', ids[i], true);
		}
	}
}
/**
 * @설명 : 오른쪽 grid rowData와 동일한 key값을 가진 왼쪽 rowData의 사용여부를 체크한다.
 * @파라미터 : lGrid - 왼쪽그리드, rGrid - 오른쪽그리드
 */
function fnReSelection(lGrid, rGrid) {
	var ids = $('#' + rGrid).jqGrid("getDataIDs");
	$('#' + lGrid).jqGrid('resetSelection'); //선택된 셀 지우기
	for ( var i in ids) {
		$('#' + lGrid).jqGrid('setSelection', ids[i], false);
	}
}
/**
 * @설명 : grid 행추가
 * @파라미터 : grid - 그리드 id
 */
function fnGridAddLine(grid, fnRowClick) {
	var rowId = fnNextRowId(grid);
	$('#' + grid).jqGrid('addRow', {
		rowID : rowId,
		position : 'last',
		addRowParams : {
			oneditfunc : fnRowClick
		},
		initdata : {
			'icon' : gridC,
			'crud' : 'c'
		}
	});
	fnEditRelease(grid);
	return rowId;
}
function fnGridDellLine(grid, rowId, fnRowClick) {
	$('#' + grid).setCell(rowId, 'icon', gridD);
	$('#' + grid).setCell(rowId, 'crud', 'd');
	fnEditRelease(grid);
}
/**
 * @설명 : grid rowID 최대값을 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnNextRowId(grid) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	var rowId;
	if (ids != '') {
		rowId = Math.max.apply(null, ids) + 1; // 최대값	
	} else {
		rowId = 1;
	}
	return rowId;
}
/**
 * @설명 : grid 선택된 행 모두 삭제
 * @파라미터 : grid - 그리드 id
 */
function fnGridDeleteMultiLine(grid) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		for ( var i in ids) {
			var row = $('#' + grid).getRowData(ids[i]);
			if (row.chk == 'Yes') {
				if (row.crud != 'c') {
					$('#' + grid).setCell(ids[i], 'icon', gridD);
					$('#' + grid).setCell(ids[i], 'crud', 'd');
					//$('#' + grid).setCell(ids[i], 'chk', 'No');
				} else {
					$('#' + grid).jqGrid('delRowData', ids[i]);
				}
			}
		}
	}
}
/**
 * @설명 : grid 선택된 행 수정모드
 * @파라미터 : grid - 그리드 id, rowId - 로우id , fnRowClick - 로우클릭시 작동할 함수명
 */
function fnGridEdit(grid, rowId, fnRowClick) {
	var row = $('#' + grid).getRowData(rowId);
	if (row.crud != 'c' && row.crud != 'r') {
		$('#' + grid).setCell(rowId, 'icon', gridU);
	}
	$('#' + grid).setCell(rowId, 'crud', 'u');
	$('#' + grid).jqGrid('editRow', rowId, true, fnRowClick, null, 'clientArray');
}
/**
 * @설명 : grid 선택된 행의 데이터 스트링형태로 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnGetGridData(grid, rowId) {
	var data = '';
	var row = $('#' + grid).getRowData(rowId);
	for ( var column in row) {
		var val = row[column];
		var cell = $('#' + grid).getColProp(column);
		if (cell.type != 'not') {
			data += column + '=' + val + '&';
		}
	}
	data = data.substring(0, data.length - 1);
	return data;
}
/**
 * @설명 : grid 모든 데이터 스트링형태로 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnGetGridAllData(grid) {
	var data = '';
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		for ( var column in row) {
			var val = row[column];
			var cell = $('#' + grid).getColProp(column);
			if (cell.type != 'not') {
				data += column + '●★●' + val + '■★■';
			}
		}
		data += 'disp_order●★●' + i + '■★■';
		data += '◆★◆';
	}
	return 'gridData=' + encodeURI(data);
}

/**
 * @설명 : grid 모든 데이터 스트링형태로 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnGetGridAllData2(grid) {
	var param = [];
	
	
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		
		var data = {};	
		for ( var column in row) {
			var val = row[column];
			var cell = $('#' + grid).getColProp(column);
			if (cell.type != 'not') {
				data[column] = val;
			}
		}
		param.push(data);
	}
	
	return param;
}

/**
 * @설명 : grid 선택된 모든 행의 데이터 스트링형태로 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnGetGridCheckData(grid) {
	var data = '';
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		if (row.chk == 'Yes') {
			for ( var column in row) {
				var val = row[column];
				var cell = $('#' + grid).getColProp(column);
				if (cell.type != 'not') {
					data += column + '●★●' + val + '■★■';
				}
			}
			data += 'disp_order●★●' + i + '■★■';
			data += '◆★◆';
		}
	}
	console.log(data);
	return 'gridData=' + encodeURIComponent(data);
}

/**
 * @설명 : grid 선택된 모든 행의 데이터 스트링형태로 가져온다
 * @파라미터 : grid - 그리드 id
 */
function fnGetGridMultiCheckData(grid) {
	var data = '';
	var ids = $('#' + grid).getGridParam('selarrrow');
	for ( var i in ids) {
		var row = $('#' + grid).getRowData(ids[i]);
		for ( var column in row) {
			var val = row[column];
			var cell = $('#' + grid).getColProp(column);
			if (cell.type != 'not') {
				if (cell.edittype == 'select' && column == 'result_val') {
					fnGridEdit(grid, ids[i], null);
					val = $('#' + ids[i] + '_result_val option:selected').text();
					fnEditRelease(grid);
				}
				data += column + '●★●' + val + '■★■';
			}
		}
		data += 'disp_order●★●' + i + '■★■';
		data += '◆★◆';
	}
	return 'gridData=' + encodeURIComponent(data);
}
/**
 * @설명 : grid 모든행 수정모드 해제
 * @파라미터 : grid - 그리드 id
 */
function fnEditRelease(grid) {
	var ids = $('#' + grid).jqGrid("getDataIDs");
	for ( var i in ids) {
		$('#' + grid).jqGrid('saveRow', ids[i], null, 'clientArray');
	}
}
/**
 * @설명 : grid 콤보박스
 * @파라미터 : type - 데이터 선택 , all - 전체
 */
function fnGridCombo(type, all, code) {
	var ret;
	if (all == 'ALL') {
		ret = ':전체;';
	} else if (all == 'NON') {
		ret = '';
	} else if (all == 'CHOICE') {
		ret = ':선택;';
	} else {
		ret = ':;';
	}
	var url = fn_getConTextPath();
	switch (type) {
	case 'test_std':
		url += '/commonCode/selectCommonCodeStd.lims';
		break;
	case 'dept':
		url += '/commonCode/selectCommonCodeDept.lims';
		break;
	case 'method':
		url += '/commonCode/selectCommonCodeMethod.lims';
		break;
	case 'machine':
		url += '/commonCode/selectCommonCodeMachine.lims';
		break;
	case 'est_fee':
		url += '/commonCode/selectEstFeeGubun.lims';
		break;
	case 'form_type':
		url += '/commonCode/selectCommonFormType.lims';
		break;
	}

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'POST',
		async : false,
		data : 'code=' + code,
		success : function(json) {
			$(json).each(function(index, entry) {
				ret += entry['code'] + ':' + entry["code_Name"] + ';';
			});
			ret = ret.substring(0, ret.length - 1);
		},
		error : function() {
			alert('[007]서버에 접속할 수 없습니다.');
		}
	});
	return ret;
}
/**
 * @설명 : grid 콤보박스
 * @파라미터 : type - 데이터 선택 , all - 전체
 */
function fnGridCommonCombo(code, all) {
	var ret;
	if (all == 'ALL') {
		ret = ':전체;';
	} else if (all == 'NON') {
		ret = '';
	} else if (all == 'SELECT') {
		ret = ':선택;';
	} else {
		ret = ':;';
	}
	if (code == 'oxide_cd') {
		code ='${testPrdStdRevGridForm.oxide_cd}'
		var url = '/commonCode/selectItemOxideMarkList.lims'
	} else {

		var url = '/commonCode/selectCommonCodeCombo.lims';
	}
	$.ajax({
		url : url,
		dataType : 'json',
		type : 'POST',
		async : false,
		data : 'code=' + code,
		success : function(json) {
			$(json).each(function(index, entry) {
				ret += entry['code'] + ':' + entry["code_Name"] + ';';
			});
			ret = ret.substring(0, ret.length - 1);
		},
		error : function() {
			alert('[008]서버에 접속할 수 없습니다.');
		}
	});
	return ret;
}

/**
 * @설명 : grid에 팝업 이미지
 */
function imageFormat(cellvalue, options, rowObject) {
	return popImg;
}
/**
 * @설명 : grid에 팝업 이미지(달력)
 */
function calImageFormat(cellvalue, options, rowObject) {
	return popImgCal;
}
/**
 * @설명 : grid에 팝업 데이터 삭제
 */
function deleteImageFormat(cellvalue, options, rowObject) {
	return deleteImg;
}
/**
 * @설명 : grid 이미지 rawdata
 */
function rawdataImageFormat(cellvalue, options, rowObject) {
	if (cellvalue == 'Y') {
		return rawdataImg;
	} else {
		return '';
	}
}
/**
 * @설명 : grid 팝업 이미지_서브
 */
function imageFormat_sub(cellvalue, options, rowObject) {
	if (cellvalue == 'Z' || cellvalue == 'B') {
		return popImg;
	} else {
		return '';
	}
}
/**
 * @설명 : 판정 색상변경
 */
function fn_change_color(grid, rowId) {
	var row = $('#' + grid).getRowData(rowId);
	switch (row.jdg_type) {
	case 'C37002':
		$('#' + grid).jqGrid('setCell', rowId, 'jdg_type', '', {
			color : 'red'
		});
		break;
	case 'C37001':
		$('#' + grid).jqGrid('setCell', rowId, 'jdg_type', '', {
			color : 'blue'
		});
		break;
	default:
		$('#' + grid).jqGrid('setCell', rowId, 'jdg_type', '', {
			color : 'black'
		});
		break;
	}
}
/**
 * @설명 : 그리드 체크박스 전체선택/해제
 */
function fn_chk(grid, form) {
	var check = $('#' + form).find('#chk');
	if (check.is(":checked")) {
		var ids = $('#' + grid).jqGrid("getDataIDs");
		if (ids.length > 0) {
			for ( var i in ids) {
				$('#' + grid).setCell(ids[i], 'chk', 'Yes');
			}
		}
		$('#' + grid).jqGrid('setLabel', 'chk', '<input type="checkbox" id="chk" onclick="fn_chk(\'' + grid + '\' , \'' + form + '\');" checked="checked" />');
	} else {
		var ids = $('#' + grid).jqGrid("getDataIDs");
		if (ids.length > 0) {
			for ( var i in ids) {
				$('#' + grid).setCell(ids[i], 'chk', 'No');
			}
		}
		$('#' + grid).jqGrid('setLabel', 'chk', '<input type="checkbox" id="chk" onclick="fn_chk(\'' + grid + '\' , \'' + form + '\');" />');
	}
}
function Excel_download(){
	alert("123456")
}

function fn_Excel_Data_Make(grid) {
	var label = "";
	var label2 = "";
	var data = "";
	var foot = "";
	var ids = $('#' + grid).jqGrid("getDataIDs");
	

	if (ids.length > 0) {
		var row = $('#' + grid).getRowData(ids[0]);
		var groupHeaders = $('#' + grid).getGridParam('groupHeader');
		console.log("---"+$('#' + grid).jqGrid('getGridParam', 'colNames'));
		
		if (groupHeaders != null) {
			groupHeaders = groupHeaders.groupHeaders;
			var g = 0;
			var gHeader;
			var startColumnName = null;
			var numberOfColumns = 0;
			var titleText = null;
			var cnt = 0;
			var zz = 0;
			for ( var column in row) {
				if (zz == 0) {
					gHeader = groupHeaders[g];
					if (gHeader != undefined) {
						startColumnName = gHeader['startColumnName'];
						numberOfColumns = gHeader['numberOfColumns'];
						titleText = gHeader['titleText'];
						cnt = numberOfColumns;
						if (cnt == 1) {
							cnt = 0;
						}
					}
					g++;
				}
				if (zz <= 0) {
					if (startColumnName == column) {
						label += titleText + '■★■';
						var n = $('#' + grid).getCol(column).length;
						for (; n < numberOfColumns; n++) {
							var colArr = $('#' + grid).jqGrid('getGridParam', 'colModel');
							var col = colArr[n].name;
							var cell = $('#' + grid).getColProp(col);
							if (cell.hidden) {// numberOfColumns가 2 이상이면 안탐
								cnt--;
							}
						}
						label += cnt + '●★●';
						zz = numberOfColumns;

						var cell = $('#' + grid).getColProp(column);
						if (!cell.hidden && cell.name != 'chk' && cell.name != 'icon'  && cell.label != ' ') {
							label2 += cell.label + '■★■' + 1 + '●★●';
						}
					} else {
						var cell = $('#' + grid).getColProp(column);
						if (!cell.hidden && cell.name != 'chk' && cell.name != 'icon'  && cell.label != ' ') {
							label += cell.label + '■★■' + 1 + '●★●';
						}
					}
				} else {
					var cell = $('#' + grid).getColProp(column);
					if (!cell.hidden && cell.name != 'chk' && cell.name != 'icon'  && cell.label != ' ') {
						label2 += cell.label + '■★■' + 1 + '●★●';
					}
				}
				zz--;
			}
			label2 = label2.substring(0, label2.length - 3);
		} else {
			
			for ( var column in row) {
				var cell = $('#' + grid).getColProp(column);				
				if (!cell.hidden) {	
					if(cell.name != 'chk' && cell.name != 'icon'  && cell.label != ' '){						
						label += cell.label + '■★■' + 1 + '●★●';
					}
				}
			}
		}
		label = label.substring(0, label.length - 3);
		for ( var i in ids) {
			var row = $('#' + grid).getRowData(ids[i]);
			for ( var column in row) {
				var val = row[column];
				var cell = $('#' + grid).getColProp(column);
				if (!cell.hidden) {
					if(cell.name != 'chk' && cell.name != 'icon' && cell.label != ' '){
						if (cell.formatter == 'select') {
							var selectArr = cell.editoptions.value.split(';');
							for (var i = 0; i < selectArr.length; i++) {
								var select = selectArr[i].split(':');
								if (select[0] == val) {
									val = select[1];
								}
							}
						}
						data += val + '■★■';
					}					
				}
			}
			data = data.substring(0, data.length - 3);
			data += '●★●';
		}
		data = data.substring(0, data.length - 3);

		var footerData = $('#' + grid).footerData('get');
		var fCnt = 0;
		for ( var column in footerData) {
			var cell = $('#' + grid).getColProp(column);
			if (!cell.hidden) {
				if (footerData[column] != '&nbsp;' || column == 'etc') {
					foot += footerData[column] + '■★■' + fCnt + '●★●';
					fCnt = 0;
				}
				fCnt++;
			}
		}
		foot = foot.substring(0, foot.length - 3);
		data = label + '◆★◆' + label2 + '◆★◆' + data + '◆★◆' + foot;
	}
	return data;
}

function fn_Excel_Data_Make2(grid, bigDivName, bigDivData) {
	var label = bigDivName + '■★■' + 1 + '●★●';
	var label2 = "";
	var data = "";
	var foot = "";
	var ids = $('#' + grid).jqGrid("getDataIDs");
	if (ids.length > 0) {
		var row = $('#' + grid).getRowData(ids[0]);

		var groupHeaders = $('#' + grid).getGridParam('groupHeader');
		if (groupHeaders != null) {
			groupHeaders = groupHeaders.groupHeaders;
			var g = 0;
			var gHeader;
			var startColumnName = null;
			var numberOfColumns = 0;
			var titleText = null;
			var cnt = 0;
			var zz = 0;
			for ( var column in row) {
				if (zz == 0) {
					gHeader = groupHeaders[g];
					if (gHeader != undefined) {
						startColumnName = gHeader['startColumnName'];
						numberOfColumns = gHeader['numberOfColumns'];
						titleText = gHeader['titleText'];
						cnt = numberOfColumns;
						if (cnt == 1) {
							cnt = 0;
						}
					}
					g++;
				}
				if (zz <= 0) {
					if (startColumnName == column) {
						label += titleText + '■★■';
						var n = $('#' + grid).getCol(column).length;
						for (; n < numberOfColumns; n++) {
							var colArr = $('#' + grid).jqGrid('getGridParam', 'colModel');
							var col = colArr[n].name;
							var cell = $('#' + grid).getColProp(col);
							if (cell.hidden) {
								cnt--;
							}
						}
						label += cnt + '●★●';
						zz = numberOfColumns;

						var cell = $('#' + grid).getColProp(column);
						if (!cell.hidden) {
							label2 += cell.label + '■★■' + 1 + '●★●';
						}
					} else {
						var cell = $('#' + grid).getColProp(column);
						if (!cell.hidden) {
							label += cell.label + '■★■' + 1 + '●★●';
						}
					}
				} else {
					var cell = $('#' + grid).getColProp(column);
					if (!cell.hidden) {
						label2 += cell.label + '■★■' + 1 + '●★●';
					}
				}
				zz--;
			}
			label2 = label2.substring(0, label2.length - 3);
		} else {
			for ( var column in row) {
				var cell = $('#' + grid).getColProp(column);
				if (!cell.hidden) {
					if(cell.name != 'chk' && cell.name != 'icon' && cell.label != ' '){				
						label += cell.label + '■★■' + 1 + '●★●';
					}
				}
			}
		}
		label = label.substring(0, label.length - 3);
		for ( var i in ids) {
			if(data == ""){
				data = bigDivData + '■★■';				
			}else{
				data += bigDivData + '■★■';
			}
			var row = $('#' + grid).getRowData(ids[i]);
			for ( var column in row) {				
				var val =row[column];
				var cell = $('#' + grid).getColProp(column);
				if (!cell.hidden) {
					if(cell.name != 'chk' && cell.name != 'icon' && cell.label != ' '){
						if (cell.formatter == 'select') {
							var selectArr = cell.editoptions.value.split(';');
							for (var i = 0; i < selectArr.length; i++) {
								var select = selectArr[i].split(':');
								if (select[0] == val) {
									val = select[1];
								}
							}
						}
						data += val + '■★■';
					}					
				}
			}
			data = data.substring(0, data.length - 3);
			data += '●★●';
		}
		data = data.substring(0, data.length - 3);

		var footerData = $('#' + grid).footerData('get');
		var fCnt = 0;
		for ( var column in footerData) {
			var cell = $('#' + grid).getColProp(column);
			if (!cell.hidden) {
				if (footerData[column] != '&nbsp;' || column == 'etc') {
					foot += footerData[column] + '■★■' + fCnt + '●★●';
					fCnt = 0;
				}
				fCnt++;
			}
		}
		foot = foot.substring(0, foot.length - 3);
		data = label + '◆★◆' + label2 + '◆★◆' + data + '◆★◆' + foot;
	}
	return data;
}

function fn_Excel_Download(data) {
	document.getElementById("gridData").value = data;
	var frm = document.getElementById("frmBinder");
	frm.target = "ifrmexcel";// 새창X
	frm.action = 'excelDownload.lims';
	frm.method = "post";
	frm.submit();
}







/**
 *  그리드 공통 영역 
 *  추후 적용
 */


/*
*
*
*
**/
function fn_gridInit(url, form, grid, girdDiv, colModel, gridH, rowNum) {
	
	
	$('#' + grid).jqGrid({
		datatype : function(jsonData) {
			fn_GridData(url, form, grid);
		},
		colModel : colModel,
		height : gridH,
		rowNum : rowNum,
		rownumbers : true,
		autowidth : true,
		gridview : false,
		shrinkToFit : false,
		multiselect: true,
		pager : "#"+grid+"Pager",
		viewrecords : true,
		rowList:[10,20,30],
		//caption:"SampleGrid",
		prmNames : {
			id : 'KEY',
			page : 'pageNum',
			rows : 'pageSize',
			sort : 'sortTarget',
			order : 'sortValue'
		},
			jsonReader : {        
			root : 'rows',        
			page : 'pageNum',        
			rowNum : 'pageSize',        
			records : 'total',        
			total : 'totalPage',        
			id : 'row_num',     
			repeatitems : false        
		},    
		gridComplete: function(){
			window[grid+"Complete"](grid, girdDiv);
		},
		onSortCol : function(index, iCol, sortorder) {
		},
		onSelectRow : function(rowId, status, e) {

		},
		ondblClickRow : function(rowId, iRow, iCol, e) {

		}
	});
	
}

function fn_gridDataSetting(form, grid){
	
	var thisGrid = $('#' + grid);  
	var pageNum = thisGrid.getGridParam('page');  
	var pageSize = thisGrid.getGridParam('rowNum');   
	var sortTarget = thisGrid.getGridParam('sortname');        
	var sortValue = thisGrid.getGridParam('sortorder');        
	
	$('#'+form+ ' #pageNum').val(pageNum);
	$('#'+form+ ' #pageSize').val(pageSize);        
	$('#'+form+ ' #sortTarget').val(sortTarget);        
	$('#'+form+ ' #sortValue').val(sortValue);
	
}


function fn_GridData(url, form, grid){
	fn_gridDataSetting(form, grid);
	
	$.ajax({
		url : url,
		dataType : 'json',
		type : 'POST',
		async : true,
		data : $('#' + form).serialize(),
		success : function(result) {
			//fnSessionCheck(json);
			//$('#' + form).find('#totalCount').val(result.totalCount);
			$('#' + grid).clearGridData();
			$('#' + grid)[0].addJSONData(result);
			$('.loading').css('display','none');
		},
		error : function(request,status,error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			alert('grid 데이터 조회 실패.');
			$('.loading').css('display','none');
		}
	});
}



