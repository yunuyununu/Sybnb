package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.admin.model.dto.ANoticeDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

public interface MainDAO {
	List<MainDTO> list(String search);
	int star(int ho_idx);

	int check(int ho_idx, int g_idx);
	
	List<ANoticeDTO> noticelist();
	ANoticeDTO noticedetail(int n_idx);

}
