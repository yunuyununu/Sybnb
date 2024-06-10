package com.example.syFinal.admin.model.dao;

import java.util.List;

import com.example.syFinal.admin.model.dto.AGuestDTO;

public interface AGuestDAO {
	List<AGuestDTO> list(String searchkey, String search);
	String delete(int g_idx);
	AGuestDTO detail(int g_idx);
	String update(AGuestDTO dto);
//	void creditPoints(int g_idx, int inPoints);
}