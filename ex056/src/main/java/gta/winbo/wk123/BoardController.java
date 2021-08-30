package gta.winbo.wk123;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletOutputStream;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
		File file=null;
		while(fileNames.hasNext()) {
			String fileName=fileNames.next();
			
			MultipartFile mFile =  M.getFile(fileName);
			
			
			realFileName=new String(mFile.getOriginalFilename().getBytes("UTF-8"), "ISO-8859-1");
			file =new File(request.getRealPath("WEB-INF/upload/" +realFileName));
			
	
			
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
	



			 FileSystemResource fsr = new FileSystemResource(request.getRealPath("WEB-INF/upload/" +realFileName));
			 messageHelper.addAttachment(realFileName, fsr);
		

			mailSender.send(message);
			
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return null;		
	}
	
	@RequestMapping("/download.lims")
	public void getFile( HttpServletRequest request,HttpServletResponse response) throws Exception {
	     
	 
	    File file = new File(request.getRealPath("WEB-INF/upload/" +"install.txt"));
	 
	    FileInputStream fileInputStream = null;
	    ServletOutputStream servletOutputStream = null;
	 
	    try{
	        String downName = null;
	        String browser = request.getHeader("User-Agent");
	        //파일 인코딩
	        if(browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")){//브라우저 확인 파일명 encode  
	            
	            downName = URLEncoder.encode("install.txt","UTF-8").replaceAll("\\+", "%20");
	            
	        }else{
	            
	            downName = new String("install.txt".getBytes("UTF-8"), "ISO-8859-1");
	            
	        }
	        
	        response.setHeader("Content-Disposition","attachment;filename=\"" + downName+"\"");             
	        response.setContentType("application/octer-stream");
	        response.setHeader("Content-Transfer-Encoding", "binary;");
	 
	        fileInputStream = new FileInputStream(file);
	        servletOutputStream = response.getOutputStream();
	 
	        byte b [] = new byte[1024];
	        int data = 0;
	 
	        while((data=(fileInputStream.read(b, 0, b.length))) != -1){
	            
	            servletOutputStream.write(b, 0, data);
	            
	        }
	 
	        servletOutputStream.flush();//출력
	        
	    }catch (Exception e) {
	        e.printStackTrace();
	    }finally{
	        if(servletOutputStream!=null){
	            try{
	                servletOutputStream.close();
	            }catch (IOException e){
	                e.printStackTrace();
	            }
	        }
	        if(fileInputStream!=null){
	            try{
	                fileInputStream.close();
	            }catch (IOException e){
	                e.printStackTrace();
	            }
	        }
	    }
	 
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login (Locale locale, Model model,@RequestParam(value = "code", required = false) String code) {
	
		
		System.out.println("#########" + code);
		
		String access_Token = getAccessToken(code);
		System.out.println("###access_Token#### : " + access_Token);
        HashMap<String, Object> userInfo =getUserInfo(access_Token);
        System.out.println("###userInfo#### : " + userInfo.get("email"));
        System.out.println("###nickname#### : " + userInfo.get("nickname"));
        System.out.println("###profile_image#### : " + userInfo.get("profile_image"));
        model.addAttribute("email", userInfo.get("email"));
        model.addAttribute("nick", userInfo.get("nickname"));
        model.addAttribute("img", userInfo.get("profile_image"));
        
        return "login";
		
	}
	
	
	
    public String getAccessToken (String authorize_code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //    POST 요청을 위해 기본값이 false인 setDoOutput을 true로

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //    POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=fc9d44f039c5679c7c9416b16aa54977");  //본인이 발급받은 key
            sb.append("&redirect_uri=http://localhost:8181/wk123/login");     // 본인이 설정해 놓은 경로
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
            bw.flush();

            //    결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //    요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //    Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return access_Token;
    }
    
    public HashMap<String, Object> getUserInfo (String access_Token) {

        //    요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.get("nickname").toString();
            String profile_image = properties.getAsJsonObject().get("profile_image").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
            userInfo.put("profile_image", profile_image);


        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return userInfo;
    }
	
	

}
