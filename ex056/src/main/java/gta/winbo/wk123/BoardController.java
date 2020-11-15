package gta.winbo.wk123;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import org.apache.poi.ss.usermodel.Cell;


import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.json.JSONObject;



@Controller
public class BoardController {
	
	@Inject
	private BoardService service;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="/select.lims",method=RequestMethod.POST)
	public ModelAndView list(HttpServletRequest request,BoardVO V, Model M) throws Exception {	
		
		M.addAttribute("resultData", service.selectUser(V));

		return new ModelAndView(new JsonView());		
	}
	
	@RequestMapping(value="/insert.lims",method=RequestMethod.POST)
	public String insert(HttpServletRequest request,BoardVO V, Model M) throws Exception {	
		 
		service.insert(V);	
		
		return "home";
	}
	
	@RequestMapping(value="/update.lims",method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView update(HttpServletRequest request,BoardVO V, Model M) throws Exception {	

		service.update(V);		
		M.addAttribute("resultData", service.selectUser(V));
		return new ModelAndView(new JsonView());
	}
	
	@RequestMapping(value="/delete.lims",method=RequestMethod.POST)
	public ModelAndView delete(HttpServletRequest request,BoardVO V, Model M) throws Exception {	
		 
		service.delete(V);
		
		M.addAttribute("resultData", service.selectUser(V));

		return new ModelAndView(new JsonView());
	}
	
	@RequestMapping(value="/excel.lims",method=RequestMethod.GET)
	public void excel(HttpServletRequest request, HttpServletResponse response,BoardVO V, Model M)throws Exception{
		
	    List<BoardVO> list = service.selectUser(V);
	    	   
	    // 워크북 생성
	    Workbook wb = new HSSFWorkbook();    
	    Sheet sheet = wb.createSheet("게시판");	
	    
	    Row row = null;
	    Cell cell = null;
	    int rowNo = 0;
	    
	    // 테이블 헤더용 스타일
	    row = sheet.createRow(rowNo++);

	    cell = row.createCell(0);
	    cell.setCellValue("번호");
	    cell = row.createCell(1);
	    cell.setCellValue("이름");
	    cell = row.createCell(2);
	    
	    // 데이터 부분 생성
	    for(BoardVO vo : list) {

	        row = sheet.createRow(rowNo++);
	        cell = row.createCell(0);
	        cell.setCellValue(vo.getName());
	        cell = row.createCell(1);
	        cell.setCellValue(vo.getPassword());

	    }

	    // 컨텐츠 타입과 파일명 지정
	    response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment; filename=excel.xls");

	    // 엑셀 출력
		wb.write(response.getOutputStream());
		

	}
	
	
	
	
	@ResponseBody
	@RequestMapping(value="/jsonTest",method=RequestMethod.POST)
	public JSONObject list1(HttpServletRequest request,HttpServletRequest response,BoardVO V, Model M) throws Exception {	
	    
		List<BoardVO> list = service.selectUser(V);
		System.out.println();
		System.out.println("리스트값: "+list);
		
		//JSONObject 사용
	    JSONObject json=new JSONObject();
	    json.put("data", list);
	    System.out.println();
	    System.out.println("JSONObject json 값 : "+json);
	    
	    //ObjectMapper 사용
	    ObjectMapper mapper =new ObjectMapper();
	    Map <String,Object> map=new HashMap<String,Object>();
	        
	    map.put("map key","map value");
	    map.put("data",list);
	    System.out.println("map 형식 값:"+map);
	    
	    String jsonMap = mapper.writeValueAsString(map);
	    System.out.println( "ObjectMapper(Map) 값: "+jsonMap);
 
		return  json;		
	}
	
	
	@RequestMapping(value="/mailsend", method=RequestMethod.POST)
	public String mailsend(HttpServletRequest request, HttpServletResponse response,BoardVO V) throws Exception{
		
		String realFileName="";
		
		MultipartHttpServletRequest M=(MultipartHttpServletRequest)request;
		Iterator<String> fileNames = M.getFileNames();
		
		while(fileNames.hasNext()) {
			String fileName=fileNames.next();
			
			MultipartFile mFile =  M.getFile(fileName);
			
			
			realFileName=new String(mFile.getOriginalFilename().getBytes("UTF-8"), "ISO-8859-1");
			File file =new File("C:/Users/winbo121/Documents/workspace-sts-3.9.7.RELEASE/ex056/src/main/webapp/WEB-INF/upload/" +realFileName);
			
			if(mFile.getSize()!=0) {
				
				file.createNewFile();
				mFile.transferTo(file);
							
			}
			
		}
		String setfrom = "winbo121@naver.com";
		String tomail = V.getReceiver();
		String title = "test"; 
		String content ="test"; 

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,true, "UTF-8");

			messageHelper.setFrom(setfrom); 
			messageHelper.setTo(tomail);
			messageHelper.setSubject(title);
			messageHelper.setText(content);
	



			 FileSystemResource fsr = new FileSystemResource("C:/Users/winbo121/Documents/workspace-sts-3.9.7.RELEASE/ex056/src/main/webapp/WEB-INF/upload/"+realFileName);
			 messageHelper.addAttachment(realFileName, fsr);
		

			mailSender.send(message);
			
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return null;		
	}
	
	

}
