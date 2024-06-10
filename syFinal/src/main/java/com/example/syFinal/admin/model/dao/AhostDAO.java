package com.example.syFinal.admin.model.dao;

import java.util.List;

import com.example.syFinal.admin.model.dto.AHostDTO;

public interface AhostDAO {
	List<AHostDTO> list(String searchkey, String search);
	String delete(int h_idx);
	AHostDTO detail(int g_idx);
	void a_approve(int h_idx); 
	AHostDTO check_file(int h_idx);
} 