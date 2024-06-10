package com.example.syFinal.global.model;

import java.util.List;
import java.util.Map;

public interface ReputationDAO {
	// 게스트 리뷰수정 → 세부 데이터 가져오기(리뷰글)
	Map<String, Object> reviewDetail(int rv_idx);

	// hotel 별 리뷰글 목록
	List<Map<String, Object>> getHotelReviews(int ho_idx);

	// hotel 리뷰 별 답글 목록
	Map<String, Object> getReply(int rp_idx);

	// 평점/개수 요약
	String calcAvgRate(int ho_idx);

	// 후기관리 : 호텔별 평점 가져오기
	List<Map<String, Object>> getAvgRate(int h_idx);

	// host → 후기관리(호스트가 등록한 호텔의 전체 리뷰목록 가져오기)
	List<Map<String, Object>> getAllReviews(int h_idx, int start);

	// 페이징 적용 : h_idx 기준 전체 review 개수
	int countRecord(int h_idx);

	int count(Map<String, Object> map);

	// 후기 검색
	List<Map<String, Object>> reviewSearch(Map<String, Object> map);

	// 호텔 별점 리스트
	List<Map<String, Object>> avgStarList(int h_idx);

}