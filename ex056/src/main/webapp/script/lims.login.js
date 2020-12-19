
function fn_saveValidation() {
	if ($('#user_id').val() == "" || $('#user_id').val() == null) {
		alert("사용자ID를 입력하십시오.");
		$('#user_id').focus();
		return false;
	}
	if ($('#user_pw').val() == "" || $('#user_pw').val() == null) {
		alert("패스워드를 입력하십시오.");
		$('#user_pw').focus();
		return false;
	}
	return true;
}

//Cookie를 생성하는 Function
function newCookie(name, value, days) { 
	var days = 10; // 쿠키저장 일수
	var expires = "";
	if (days) {
		var date = new Date(); //날짜 객체 생성
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); //10일로 설정된 시간을 밀리세컨드로 변환
		expires = "; expires=" + date.toGMTString(); //쿠키 만료일을 변수 expires에 설정함
	} else
		expires = ""; //days 변수가 초기화 안될 경우 expires를 NULL로 초기화

	document.cookie = name + "=" + value + expires + "; path=/"; //쿠키생성 
}

//name의 Cookie값을 검색하여서 값을 가져오는데 없으면  NULL을 반환
function readCookie(name) {
	var nameSG = name + "=";
	var nuller = '';
	if (document.cookie.indexOf(nameSG) == -1){ //Cookie를 검색
		return nuller;
	}
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameSG) == 0){
			return c.substring(nameSG.length, c.length);
		}
	}
	return null;
}

//checkbox의 에 따라서 Cookie를 설정(체크이벤트를 잡아서 동작)
function changeCB() {
	if (!$("#idsave").is(":checked")){
		delMem();
	}else{
		toMem();
	}
}

//Cookie에 값을 넣는다.
function toMem() {
	newCookie('theName', $("#user_id").val());
}

//Cookie에 값을 ""로 초기화 한다.
function delMem() {
	newCookie('theName', "", 1);
	$("#user_id").val('');// add a line for every field
}

//window.load 이벤트에 호출하는 function으로 페이지가 로딩 되면서 값을 세팅하는 부분
function remCookie() {
	if (readCookie("theName") == " " || readCookie("theName") == "")
		$("#idsave").attr("checked", false);
	else {
		$("#user_id").val(readCookie("theName"));
		$("#idsave").attr("checked", true);
	}
	//document.form.email.value = readCookie("theEmail");
}

//window.load이벤트 호출부
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {oldonload();}
			func();
		};
	}
}

addLoadEvent(function() {
	remCookie();
});


function loginChk(){
	if (!fn_saveValidation()) {return;}
	$.ajax({url : 'loginCheck.lims',dataType : 'json',type : 'POST',async : false,data : $('#form').serialize(),
		success : function(json) {
			if (json.message == 'LOGIN_SUCESS') {
				changeCB();
				location.href = "main.lims";
			} else if (json.message == 'LOGIN_NOT_ID') {
				alert("등록된 아이디가 없습니다.");
			} else if (json.message == 'LOGIN_NOT_PW') {
				alert("등록된 패스워드가 틀립니다.");
			} else if (json.message == 'LOGIN_NOT_IP') {
				alert("접근이 불가능한 사용자 입니다.");
			} else if (json.message == 'LOGIN_NOT_FLAG') {
				alert("미사용 사용자 입니다.");
			}
		},
		error : function() {
			alert('login error');
		}
	});
}


function imsiLogin(user_id, user_pw){
	//$("#imsiLogin").click(function(){
		$.ajax({url : 'loginCheck.lims?user_id='+user_id+'&user_pw='+user_pw, dataType : 'json', type : 'POST', async : false,
			success : function(json) {
				if (json.message == 'LOGIN_SUCESS') {
					changeCB();
					location.href = "main.lims";
				} else if (json.message == 'LOGIN_NOT_ID') {
					alert("등록된 아이디가 없습니다.");
				} else if (json.message == 'LOGIN_NOT_PW') {
					alert("등록된 패스워드가 틀립니다.");
				} else if (json.message == 'LOGIN_NOT_IP') {
					alert("접근이 불가능한 사용자 입니다.");
				} else if (json.message == 'LOGIN_NOT_FLAG') {
					alert("미사용 사용자 입니다.");
				}
			},
			error : function() {
				alert('login error');
			}
		});
	//});
}