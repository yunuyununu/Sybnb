package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

public interface ReplyDAO {

	// 답글 작성
	void insertReply(Map<String, Object> map);

	// host → 작성한 답글 수정
	void editReply(Map<String, Object> map);

	// host → 작성한 답글 삭제
	void delete(int rp_idx);

	// host → 후기관리, 리뷰 검색 결과
	List<Map<String, Object>> searchReviews(Map<String, Object> map);

	int count(Map<String, Object> map);
}
