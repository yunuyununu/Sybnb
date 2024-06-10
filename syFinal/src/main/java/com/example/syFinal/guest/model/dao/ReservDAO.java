package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.ReservDTO;

public interface ReservDAO {

	List<ReservDTO> list(int g_idx);

	ReservDTO lastDetail(int o_idx);

	List<ReservDTO> reservReview(int g_idx);

	ReservDTO delDetail(int o_idx);

	String cancel(int o_idx, int g_idx);
	
	void gPoint(Map<String,Object> map);

	ReservDTO upDetail(int o_idx);

	String insert(int g_idx, int ru_idx, String ru_startDate, String ru_endDate, int ru_adult, int ru_child, int ru_baby);

	int check(int ru_idx);

	String update(int g_idx, int ru_idx, String ru_startDate, String ru_endDate, int ru_adult, int ru_child, int ru_baby);

	ReservDTO confirm(int ru_idx);

	List<ReservDTO> date(int o_idx, int ho_idx, int o_didx);

	int room_count(int o_idx);
	

}
