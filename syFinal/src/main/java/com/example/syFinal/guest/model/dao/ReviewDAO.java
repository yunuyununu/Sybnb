package com.example.syFinal.guest.model.dao;

import java.util.Map;

public interface ReviewDAO {

	// 리뷰 작성
	void insertReview(Map<String, Object> map);

	// guest → 작성한 리뷰 수정
	void editReview(Map<String, Object> map);

	// guest → 작성한 리뷰 삭제
	void updateDeleted(int rv_idx);
}
