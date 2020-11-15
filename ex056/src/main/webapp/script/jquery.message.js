	// jquery keyup event 중복실행 방지
	var _isDoubleEnter = false;
	jQuery.extend({
		/*
		 * ========얼럿모달창========
		 * 파라미터설명
		 * [필수] msg : 얼럿메세지
		 * [옵션] type : 얼럿타입 (notice, warn, error, lock)
		 * [옵션] title : 얼럿창제목
		 * [옵션] icon : 얼럿아이콘이미지경로
		 * [옵션] width : 얼럿창 가로사이즈
		 * [옵션] height : 얼럿창 세로사이즈
		 * 
		 * 예제1 : $.showAlert('알림메세지입니다');
		 * 예제2 : $.showAlert('잠김메세지입니다.', {type:'lock', width:500, height:300}); 
		 */
		showAlert: function(msg,parameters) {
			map = {
				type : "",
				title : "알림",
				icon : "images/icon/icon_notice.png",
				width: 300,
				height: 120,
				callback: function(){}
			};
			if (parameters) {
				map = jQuery.extend(map,parameters);	//변수에 담긴값 셋팅
				
				if (map.type=="notice") {
					if (!parameters.title) {
						map.title = "알림";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_notice.png";
					}
				} else if (map.type=="warn") {
					if (!parameters.title) {
						map.title = "경고";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_warn.png";
					}
				} else if (map.type=="error") {
					if (!parameters.title) {
						map.title = "에러";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_error.png";
					}
				} else if (map.type=="lock") {
					if (!parameters.title) {
						map.title = "권한이 없습니다.";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_lock.png";
					}
				} else if (map.type=="insert") {
					if (!parameters.title) {
						map.title = "알림";
					}
					msg = "저장 완료되었습니다.";
				} else if (map.type=="update") {
					if (!parameters.title) {
						map.title = "알림";
					}
					msg = "수정 완료되었습니다.";
				}else if (map.type=="delete") {
					if (!parameters.title) {
						map.title = "알림";
					}
					msg = "삭제 완료되었습니다.";
				}
			}
			
			var p = document.createElement("p");
			var div = document.createElement("div");
			div.title = map.title;
			div.appendChild(p);
			p.innerHTML = msg;
			//$("body").append(div);
			//$(".nextfocus").unbind("keyup");
			_isDoubleEnter = true;
			
			$(div).dialog({
				bgiframe: true,
				height: map.height,
				width: map.width,
				modal: true,
				buttons: {
					확인: function() {
						map.callback();
						$(this).dialog('destroy');
					}
				}
			});
		},
		
		/*
		 * ========컨펌창========
		 * 파라미터설명
		 * [필수] msg : 얼럿메세지
		 * [필수] callback : yes를 클릭했을경우 실행할 콜백메소드이름 또는 메소드
		 * [옵션] title : 얼럿창제목
		 * [옵션] icon : 얼럿아이콘이미지경로
		 * [옵션] width : 얼럿창 가로사이즈
		 * [옵션] height : 얼럿창 세로사이즈
		 * 
		 * 예제 : $.showConfirm('알림메세지입니다', { callback:function(){alert('예를 클릭하셧네요.');}, width:500 });
		 */
		showConfirm: function(msg, parameters) {
			
			map = {
				title : "확인",
				icon : fn_getConTextPath()+"/images/icon/icon_question.png",
				width: 300,
				height: 120,
				yesCallback: function(){},
				noCallback: function(){}
			};
			if (parameters) {
				map = jQuery.extend(map,parameters);	//변수에 담긴값 셋팅
				
				if (map.type=="notice") {
					if (!parameters.title) {
						map.title = "알림";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_notice.png";
					}
				} else if (map.type=="warn") {
					if (!parameters.title) {
						map.title = "경고";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_warn.png";
					}
				} else if (map.type=="error") {
					if (!parameters.title) {
						map.title = "에러";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_error.png";
					}
				} else if (map.type=="lock") {
					if (!parameters.title) {
						map.title = "권한이 없습니다.";
					}
					if (!parameters.icon) {
						map.icon = fn_getConTextPath()+"/images/icon/icon_lock.png";
					}
				}
			}			
			map = jQuery.extend({},map,parameters);	//변수에 담긴값 셋팅
			
			var p = document.createElement("p");
			var div = document.createElement("div");
			//div.title = "<img src=\""+map.icon+"\" style='float:left'/><div style=\"float:left;margin-top:5px;margin-left:10px\">"+map.title+"</div>";
			div.title = map.title;
			div.appendChild(p);
			p.innerHTML = msg;
			//$("body").append(div);
			//_isDoubleEnter = true;
			
			$(div).dialog({
				bgiframe: true,
				height: map.height,
				width: map.width,
				modal: true,
				//position: "center",
				buttons: {
					"예": function() {
						map.yesCallback();
						$(this).dialog('destroy');
					},
					"아니오": function() {
						map.noCallback();
						$(this).dialog('destroy');
					}
				}
			});
		},
		
		showPasswordConfirm: function(parameters) {
	
			map = {
				title : "비밀번호를 입력해주세요.",
				icon : fn_getConTextPath()+"/images/icon/icon_lock.png",
				width: 320,
				height: 160,
				yesCallback: function(){},
				noCallback: function(){}
			};
			map = jQuery.extend({},map,parameters);	//변수에 담긴값 셋팅
			
			var p = document.createElement("p");
			var div = document.createElement("div");
			div.id = "divCdPassword";
			div.title = "<img src=\""+map.icon+"\" style='float:left'/><div style=\"float:left;margin-top:5px;margin-left:10px\">"+map.title+"</div>";
			div.appendChild(p);
			p.innerHTML = "<br/><label for=\"cdPassword\">비밀번호</label> : <input type=\"password\" name=\"cdPassword\" id=\"cdPassword\" value=\"\" class=\"text ui-widget-content ui-corner-all\" />";
			$("body").append(div);
			$(div).dialog({
				bgiframe: true,
				height: map.height,
				width: map.width,
				modal: true,
				position: "center",
				buttons: {
					'확인': function() {
						if ($("#cdPassword").val()=="") {
							$("#cdPassword").addClass('ui-state-error');
							$("#cdPassword").focus();
						} else {
							map.yesCallback($("#cdPassword").val());
							$("#divCdPassword").remove();
							$(this).dialog('destroy');
						}
					},
					'닫기': function() {
						map.noCallback();
						$("#divCdPassword").remove();
						$(this).dialog('destroy');
					}
				}
			});
		
		}
		
		
	});