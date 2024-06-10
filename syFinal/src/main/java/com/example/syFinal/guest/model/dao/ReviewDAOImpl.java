package com.example.syFinal.guest.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAOImpl implements ReviewDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public void insertReview(Map<String, Object> map) {
		sqlSession.insert("review.insert", map);
	}

	@Override
	public void editReview(Map<String, Object> map) {
		sqlSession.update("review.editReview", map);
	}

	@Override
	public void updateDeleted(int rv_idx) {
		sqlSession.update("review.updateDeleted", rv_idx);
	}
}
