package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

public interface ChartDAO {
	List lastSales(int h_idx);

	List thisSales(int h_idx);

	List<Map<String, Object>> getHotelList(int h_idx);

}
