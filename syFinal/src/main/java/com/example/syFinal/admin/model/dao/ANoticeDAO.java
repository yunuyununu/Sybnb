package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.admin.model.dto.ANoticeDTO;

public interface ANoticeDAO {
	List<ANoticeDTO> list(String searchkey, String search);
	String delete(int n_idx); 
	ANoticeDTO detail(int n_idx);
	void insert(Map<String, Object> map);
	int update(int n_idx, String n_writer, String n_title, String n_content, String n_date);

}