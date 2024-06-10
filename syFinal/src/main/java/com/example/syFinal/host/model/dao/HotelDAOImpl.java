package com.example.syFinal.host.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 */
	public Map<String, Object> hotelList(Map<String, Object> map) {
		return sqlSession.selectOne("hotel.getHotelList", map);
	}

	/* 호텔 이미지 정보 */
	public List<HotelDetailDTO> hotelImg(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelList", ho_idx);
	}

	/* 호텔 객실 정보 */
	@Override
	public List<HotelDetailDTO> hotelRooms(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelRooms", ho_idx);
	}

	/* 호텔 편의시설 */
	@Override
	public Map<String, Object> hotelAmenity(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelAmenity", ho_idx);
	}

	/* 호텔 호스트 정보 */
	@Override
	public Map<String, Object> hostInfo(int ho_idx) {
		return sqlSession.selectOne("hotel.getHostInfo", ho_idx);
	}

	/* 호텔 이용규칙 */
	@Override
	public Map<String, Object> hotelRule(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelRule", ho_idx);
	}

	/* 호텔 예약(1박 가격) */
	@Override
	public Map<String, Object> hotelPrice(int ho_idx) {
		return sqlSession.selectOne("hotel.getPrice", ho_idx);
	}

	/* 호스트 상세페이지(게스트용) */
	@Override
	public Map<String, Object> hostPage(int h_idx) {
		return sqlSession.selectOne("hotel.getHostPage", h_idx);
	}

	/* 호스트의 호텔 리스트 */
	@Override
	public List<Map<String, Object>> hotelSummary(int h_idx) {
		return sqlSession.selectList("hotel.getHotelSummary", h_idx);
	}

	/* 호스트의 모든 호텔 리뷰 */
	@Override
	public List<Map<String, Object>> allReviews(int h_idx) {
		return sqlSession.selectList("hotel.getAllReviews", h_idx);
	}

	/* 호스트의 호텔 현황 */
	@Override
	public Map<String, Object> hotelStatus(int h_idx) {
		return sqlSession.selectOne("hotel.getHotelStatus", h_idx);
	}

	/* 호스트의 호텔 목록 */
	@Override
	public List<Map<String, Object>> hostAllHotel(int h_idx) {
		return sqlSession.selectList("hotel.getHostAllHotel", h_idx);
	}

	@Override
	public List<HotelDetailDTO> imp_date(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectList("hotel.imp_date", map);
	}

	/* 호텔 상세 정보 조회 */
	@Override
	public List<Map<String, Object>> detailMyHotel(int ho_idx) {
		return sqlSession.selectList("hotel.getDetailMyHotel", ho_idx);
	}

	/* 호텔 대표 이미지 조회 */
	@Override
	public Map<String, Object> getHotelImg(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelImg", ho_idx);
	}

	/* 호텔 객실 이미지 조회 */
	@Override
	public Map<String, Object> getHotelDetailImg(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectOne("hotel.getHotelDetailImg", map);
	}

	/* 호텔 이미지 모두 보기 */
	@Override
	public List<HotelDTO> viewHotelImg(int ho_idx) {
		return sqlSession.selectList("hotel.viewHotelImg", ho_idx);
	}

	/* 호텔 신규 등록 전 확인 */
	@Override
	public String beforeRegistCheck(int userIdx) {
		int check = sqlSession.selectOne("hotel.beforeRegistCheck", userIdx);
		String result = "";
		if (check == 0) {
			result = "success";
		} else {
			result = "fail";
		}
		return result;
	}

	/* 이어서 작성하기 */
	@Override
	public Map<String, Object> selectTempHotel(int userIdx) {
		return sqlSession.selectOne("hotel.selectTempHotel", userIdx);
	}

	/* 임시 데이터 삭제 */
	@Override
	public void deleteTempHotel(int userIdx) {
		sqlSession.delete("hotel.deleteTempHotel", userIdx);
	}

	/* 신규 호텔 등록(임시) */
	@Override
	public int registHotelTemp(Map<String, Object> map) {
		if (map.get("temp").toString().equals("undefined")) {
			sqlSession.insert("hotel.registHotelTemp", map);
		} else {
			sqlSession.update("hotel.updateHotelTemp", map);
		}
		int hoIdx = sqlSession.selectOne("hotel.findHtHidx", map.get("ht_h_idx"));
		return hoIdx;
	}

	/* 호텔 최종 등록 상세 */
	@Override
	public void registNewHotel(Map<String, Object> map) {
		Map<String, Object> insertRow = new HashMap<>();
		insertRow.put("ht_idx", map.get("ht_idx"));
		insertRow.put("ht_h_idx", map.get("ht_h_idx"));
		sqlSession.update("hotel.updateTempHotel", insertRow);
		
		int ht_idx = sqlSession.selectOne("hotel.getHotelIdx", map.get("ht_h_idx"));
		
		Map<String, Object> newAmenity = new HashMap<>();
		newAmenity.put("newAmenity", map.get("checkItems"));
		String[] items = map.get("checkItems").toString().split(",");
		sqlSession.insert("hotel.insertNewAmenity", ht_idx);
		for (String item : items) {
			newAmenity.put("ho_idx", ht_idx);
			switch (item) {
			case "0":
				newAmenity.put("option", "mountain_view");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "1":
				newAmenity.put("option", "ocean_view");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "2":
				newAmenity.put("option", "wifi");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "3":
				newAmenity.put("option", "parking_lot");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "4":
				newAmenity.put("option", "breakfast");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "5":
				newAmenity.put("option", "fire_alam");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			case "6":
				newAmenity.put("option", "fire_extinguisher");
				sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			}
		}

		String test = map.get("list").toString();
		JSONParser parser = new JSONParser();
		test = test.replaceAll("'", "\\\"");
		JSONArray jsonArray = null;
		try {
			jsonArray = (JSONArray) parser.parse(test);
			for (Object obj : jsonArray) {
				JSONObject jsObject = (JSONObject) obj;
				Map<String, Object> result = new HashMap<>();
				result.put("ht_idx", ht_idx);
				result.put("roomType", jsObject.get("roomType"));
				result.put("capacity", jsObject.get("capacity"));
				result.put("area", jsObject.get("area"));
				result.put("beds", jsObject.get("beds"));
				result.put("non_smoking", jsObject.get("non_smoking"));
				result.put("price", jsObject.get("price"));
				result.put("d_img1", jsObject.get("dImg1_name"));
				result.put("d_img2", jsObject.get("dImg2_name"));
				result.put("d_img3", jsObject.get("dImg3_name"));
				sqlSession.insert("hotel.insertNewRoom", result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/* 호텔 신규 등록 최종 */
	@Override
	public void insertNewHotel(int ht_idx, int ht_h_idx) {
		int ho_idx = sqlSession.selectOne("hotel.getHotelIdx", ht_h_idx);
		sqlSession.insert("hotel.insertNewHotel", ho_idx);
		sqlSession.update("hotel.changeStatus", ho_idx);
	}

	/* 호텔 기본 정보 수정 */
	@Override
	public void editHotelDefaultInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelDefaultInfo", map);
	}

	/* 호텔 편의시설 초기화 */
	@Override
	public void initHotelAmenity(int ho_idx) {
		sqlSession.update("hotel.initHotelAmenity", ho_idx);
	}

	/* 호텔 편의시설 수정 */
	@Override
	public void editAmenity(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelAmenity", map);
	}

	/* 호텔 객실 정보 수정 */
	@Override
	public void editHotelRoomInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelRoomInfo", map);
	}

	/* 호텔 객실 정보 삭제 */
	@Override
	public void deleteRoomInfo(Map<String , Object> map) {
		String roomType = sqlSession.selectOne("hotel.getDeleteRoomInfo", map);
		if(roomType.equals("더블룸")) {
			roomType = "ho_double";
		} else if(roomType.equals("패밀리룸")) {
			roomType = "ho_family";
		} else if(roomType.equals("스위트룸")) {
			roomType = "ho_suite";
		}
		sqlSession.delete("hotel.deleteRoomInfo", map);
		map.put("roomType", roomType);
		sqlSession.update("hotel.updateRoomCount", map);
	}
	
	/* 호텔 영업 중지 신청 */
	@Override
	public String updateHotelStatus(int ho_idx, String status) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		int reservCnt = sqlSession.selectOne("hotel.reservCnt", ho_idx);
		String result = "";
		switch (status) {
		case "2":
			if (reservCnt > 0) {
				result = "fail";
			} else {
				map.put("status", 3);
				sqlSession.update("hotel.updateHotelStatus", map);
				result = "success";
			}
			break;
		case "3":
			map.put("status", 1);
			sqlSession.update("hotel.updateHotelStatus", map);
			result = "success";
			break;
		}
		return result;
	}

	@Override
	public int room_count(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectOne("hotel.roomCount", map);
	}
}