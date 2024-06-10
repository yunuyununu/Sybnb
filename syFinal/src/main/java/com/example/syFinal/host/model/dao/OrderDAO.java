package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.GuestDTO;

public interface OrderDAO {
	// 체크인 완료(o_state 업데이트 및 호스트, 게스트 레벨 체크 프로시저 호출)
	void confirm(Map<String, Object> params);

	// 예약확정(o_state 업데이트)
	boolean update(int o_idx);

	// orders 목록 가져오기
	List<Map<String, Object>> getList(Map<String, Object> map);

	// host의 hotel 목록 가져오기
	List<Map<String, Object>> getHotelList(int h_idx);

	// hotel 예약건수 - 페이지나누기
	int countRecord(Map<String, Object> map);

	GuestDTO getGuestInfo(int g_idx);

	// 예약 확정 시 게스트 레벨 업데이트
	int guestLevelUpate(Map<String, Object> param);

	// 게스트가 예약 변경 요청한 목록 가져오기
	List<Map<String, Object>> requestList(int h_idx);

	// 예약 변경사항 업데이트
	void modify(Map<String, Object> params);

	// 변경 업데이트 전, 동일 룸타입의 예약현황 확인
	boolean countOrders(Map<String, Object> params);

	// 예약 변경요청 거부 처리
	boolean requestReject(int o_idx);

	// 체크인, 체크아웃 스케쥴
	List<Map<String, String>> schedule(int h_idx, String column, int pending);

	// 바우처 발송 내용
	Map<String, Object> voucher(int o_idx);

	// 달력 클릭 시, 체크인/체크아웃 별 상세 스케쥴목록 보기
	List<Map<String, Object>> detailSchedule(int h_idx, String column, String date);

	// 예약 대기 건수
	int countPendings(int h_idx);

}