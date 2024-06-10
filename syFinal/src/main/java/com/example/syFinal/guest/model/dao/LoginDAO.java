package com.example.syFinal.guest.model.dao;

import java.util.Map;

public interface LoginDAO {
	
	String chkPw(String g_passwd); 
	
	Map<String, Object> login(String g_email, String g_passwd); 
	
	String searchEmail(String g_name, String g_phone); 

	int searchPw(String g_email, String g_name, String g_phone);

	void randomPw(String g_email, String randomPw);
}
