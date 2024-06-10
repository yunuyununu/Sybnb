package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.syFinal.host.model.dto.HotelDTO;

@Repository
public class AhotelDAOImpl implements AhotelDAO {

	@Autowired
	SqlSession sqlSession;

	 @Override
	    public List<HotelDTO> list(Map<String, Object> map) {
		 return sqlSession.selectList("admin.list", map);
	    }
	  
	 	// 호텔  등록 승인
	    @Override
	    public void updateHotelStatus(int ho_idx, int ho_status) {
	        Map<String, Object> paramMap = new HashMap<>();
	        paramMap.put("ho_idx", ho_idx);
	        paramMap.put("ho_status", ho_status);
	        sqlSession.update("admin.updateHotelStatus", paramMap);
	    }
	    
	 // 호텔  영업정지 승인
		@Override
		public void updateHotelClose(int ho_idx, int ho_status) {
			 Map<String, Object> paramMap = new HashMap<>();
		        paramMap.put("ho_idx", ho_idx);
		        paramMap.put("ho_status", ho_status);
		        sqlSession.update("admin.updateHotelClose", paramMap);	
		}    
		    
	    @Override
	    public List<HotelDTO> detail(int ho_idx) {
	    	 List<HotelDTO> dto = sqlSession.selectList("admin.ADetailHotel", ho_idx);
	    	return dto;
	    }
	}