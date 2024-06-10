package com.example.syFinal.global.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReputationDAOImpl implements ReputationDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public Map<String, Object> reviewDetail(int rv_idx) {
		// 리뷰글 상세 가져오기
		return sqlSession.selectOne("reputation.reviewDetail", rv_idx);
	}

	@Override
	public List<Map<String, Object>> getHotelReviews(int ho_idx) {
		// hotel 별 리뷰글 목록
		List<Map<String, Object>> list = sqlSession.selectList("reputation.getHotelReviews", ho_idx);
		return list;
	}

	@Override
	public Map<String, Object> getReply(int rp_idx) {
		// hotel 리뷰 별 답글 목록
		return sqlSession.selectOne("reputation.getReply", rp_idx);
	}

	@Override
	public String calcAvgRate(int ho_idx) {
		// 호텔별 평점계산
		float result = sqlSession.selectOne("reputation.calcAvgRate", ho_idx);
		String avg = String.format("%.2f", result);
		return avg;
	}

	@Override
	public List<Map<String, Object>> getAllReviews(int h_idx, int start) {
		// host → 후기관리(호스트가 등록한 호텔의 전체 리뷰목록 가져오기)
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("start", start);
		List<Map<String, Object>> list = sqlSession.selectList("reputation.getAllReviews", map);
		return list;
	}

	@Override
	public List<Map<String, Object>> getAvgRate(int h_idx) {
		List<Map<String, Object>> list = sqlSession.selectList("reputation.getAvgRate", h_idx);
		for (Map<String, Object> m : list) {
			String avg = String.format("%.2f", m.get("avg"));
			m.replace("avg", avg);
		}
		return list;
	}

	@Override
	public int countRecord(int h_idx) {
		return sqlSession.selectOne("reputation.countRecord", h_idx);
	}

	@Override
	public int count(Map<String, Object> map) {
		return sqlSession.selectOne("reputation.count", map);
	}

	@Override
	public List<Map<String, Object>> reviewSearch(Map<String, Object> map) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("reputation.reviewSearch", map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> avgStarList(int h_idx) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("reputation.avgStarList", h_idx);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
