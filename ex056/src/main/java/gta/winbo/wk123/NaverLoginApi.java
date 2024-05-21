package gta.winbo.wk123;

import com.github.scribejava.core.builder.api.DefaultApi20;

public class NaverLoginApi extends DefaultApi20{

	   protected NaverLoginApi(){
	    }
	 
	    private static class InstanceHolder{
	        private static final NaverLoginApi INSTANCE = new NaverLoginApi();
	    }
	 
	 
	    public static NaverLoginApi instance(){
	        return InstanceHolder.INSTANCE;
	    }
	 
	    @Override
	    public String getAccessTokenEndpoint() {
	        return "https://oauth2.googleapis.com/token";
	    }                   
	 
	    @Override
	    protected String getAuthorizationBaseUrl() {
	        return "https://accounts.google.com/o/oauth2/v2/auth";
	    }  

}
