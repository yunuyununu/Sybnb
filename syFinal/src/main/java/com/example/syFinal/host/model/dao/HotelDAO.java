package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

public interface HotelDAO {

	/* 호텔 상세 정보 */
	Map<String, Object> hotelList(Map<String, Object> map);
	
	/* 호텔 객실 정보 */
	List<HotelDetailDTO> hotelRooms(int ho_idx);
	
	/* 호텔 편의시설 */
	Map<String, Object> hotelAmenity(int ho_idx);
	
	/* 호스트 정보 */
	Map<String, Object> hostInfo(int ho_idx);
	
	/* 호텔 이용규칙 */
	Map<String, Object> hotelRule(int ho_idx);
	
	/* 호텔 예약(1박 가격) */
	Map<String, Object> hotelPrice(int ho_idx);
	
	/* 호스트 상세페이지(게스트용) */
	Map<String, Object> hostPage(int h_idx);
	
	/* 호스트의 호텔 리스트 */
	List<Map<String, Object>> hotelSummary(int h_idx);
	
	/* 호스트의 모든 호텔 리뷰 */
	List<Map<String, Object>> allReviews(int h_idx);
	
	/* 호스트의 호텔 현황 */
	Map<String, Object> hotelStatus(int h_idx);
	
	/* 호스트의 호텔 목록 */
	List<Map<String, Object>> hostAllHotel(int h_idx);
	
	List<HotelDetailDTO> imp_date(int ho_idx, int d_idx);
	
	/* 호텔 상세 정보 조회 */
	List<Map<String, Object>> detailMyHotel(int ho_idx);
	
	/* 호텔 대표 이미지 조회 */
	Map<String, Object> getHotelImg(int ho_idx);

	/* 호텔 대표 이미지 조회 */
	Map<String, Object> getHotelDetailImg(int ho_idx, int d_idx);

	/* 호텔 이미지 모두 보기 */
	List<HotelDTO> viewHotelImg(int ho_idx);
	
	/* 호텔 신규 등록 전 확인 */
	String beforeRegistCheck(int userIdx);

	/* 이어서 작성하기 */
	Map<String, Object> selectTempHotel (int userIdx);

	/* 임시 데이터 삭제 */
	void deleteTempHotel(int userIdx);

	/* 신규 호텔 등록(임시) */
	int registHotelTemp(Map<String, Object> map);

	/* 호텔 신규 등록 상세 */
	void registNewHotel(Map<String, Object> map);

	/* 호텔 신규 등록 최종  */
	void insertNewHotel(int ht_idx, int ht_h_idx);
	
	/* 호텔 기본 정보 수정 */
	void editHotelDefaultInfo(Map<String, Object> map);
	
	/* 호텔 편의 시설 초기화 */
	void initHotelAmenity(int ho_idx);

	/* 호텔 편의 시설 수정 */
	void editAmenity(Map<String, Object> map);

	/* 호텔 객실정보 수정 */
	void editHotelRoomInfo(Map<String, Object> map);
	
	/* 호텔 객실정보 수정 */
	void deleteRoomInfo(Map<String, Object> map);

	/* 호텔 영업 중지 신청 */
	String updateHotelStatus(int ho_idx, String status);

	int room_count(int ho_idx, int d_idx);
}