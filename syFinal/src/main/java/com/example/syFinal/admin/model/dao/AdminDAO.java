package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.admin.model.dto.AdminDTO;

public interface AdminDAO {
	Map<String, Object> alogin(String a_id, String a_passwd);

	List<AdminDTO> chart(String strToday);
}