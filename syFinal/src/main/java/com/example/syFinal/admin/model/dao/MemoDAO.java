package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.admin.model.dto.MemoDTO;

public interface MemoDAO {
	List<MemoDTO> list(int start, int end);
	void insert(Map<String, Object> map);
	String delete(int me_idx);
	void update(MemoDTO dto);
	int count();
}
