package com.example.syFinal.guest.model.dao;

import java.util.List;

import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

public interface InfoDAO {
	int checkId(String g_email);
	
	String join(String g_email, String g_passwd, String g_name, String g_phone);
	
	GuestDTO detail(int g_idx);
	int checkOrder(int g_idx);
	String update(GuestDTO dto);
	String delete(int g_idx, String delete_id);

	
}
