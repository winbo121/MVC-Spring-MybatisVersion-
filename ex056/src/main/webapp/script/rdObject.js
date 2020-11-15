// codebase 내 cab 파일의 경로는 시스템(장비)내 파일의 위치(URL)로 수정해서 사용.
// cab 파일은 납품되는 제품 CD내 CAB 폴더에 있으며, 동일 폴더에 있는 rdviewer.htm 파일 내의 버전을 확인하고 수정하여 사용할 것.
// rdviewer50.cab은 필수이며, 다른 control은 필요 여부에 따라 옵션으로 사용
// OBJECT 정의는 반드시 rdviewer50.cab이 마지막이어야 함.

// MS XML Parser - XML 데이터를 출력하는 경우 (Windows 기본 업데이트. 미설치된 PC 배포용)
document.write('<object id=msxml4');
document.write('   classid="clsid:88d969c0-f192-11d4-a65f-0040963251e5"');
document.write('   codebase="../../cab/msxml4.cab#version=4,20,9818,0"');
document.write('   name=msxml4 width=0% height=0%>');
document.write('</OBJECT>');

// PDF Export Module
document.write('<object id=rdpdf50');
document.write('   classid="clsid:0D0862D3-F678-48B5-876B-456457E668BC"');
document.write('   codebase="../../cab/rdpdf50.cab#version=2,1,0,18"');
document.write('   width=0% height=0%>');
document.write('</OBJECT>');

// Barcode Control
document.write('<object id=rdbarcode5');
document.write('   classid="CLSID:AA30E61C-DBC4-4DF6-B2CC-FAE39282CF56"');
document.write('   codebase="../../cab/rdbarcode5.cab#version=5,5,0,50"');
document.write('   name=rdbarcode width=0% height=0%>');
document.write('</object>');

// Chart Control
document.write('<object id=TChart');
document.write('   classid="CLSID:FAB9B41C-87D6-474D-AB7E-F07D78F2422E"');
document.write('   codebase="../../cab/teechart7.cab#version=7,0,1,4"');
document.write('   name=TChart width=0% height=0%>');
document.write('</object>');

// Report Designer ActiveX Control (width, height는 화면 크기에 맞게 조정)
document.write('<OBJECT id=rdViewer ');
document.write('   classid="clsid:5A7B56B3-603D-4953-9909-1247D41967F8"');
document.write('  codebase="../../cab/rdviewer50u.cab#version=5,0,0,100"');
document.write('      name=rdViewer width=100% height=100%>');
document.write('</OBJECT>');