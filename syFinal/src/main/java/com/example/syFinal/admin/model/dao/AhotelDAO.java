package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.host.model.dto.HotelDTO;

public interface AhotelDAO {
	List<HotelDTO> list(Map<String, Object> map);
    void updateHotelStatus(int ho_idx, int ho_status);
    void updateHotelClose(int ho_idx, int ho_status);
    List<HotelDTO> detail(int ho_idx);
}