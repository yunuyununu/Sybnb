package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.CouponDTO;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.ReviewDTO;

@Repository
public class GuestDAOImpl implements GuestDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public GuestDTO my(int g_idx) {
		return sqlSession.selectOne("guest.myguest", g_idx);
	}
	
	@Override
	public List<GuestDTO> paylist(int g_idx) {
		return sqlSession.selectList("guest.paylist", g_idx);
	}
	
	@Override
	public Map<String,Object> receipt(Map<String,Object> map) {
		return sqlSession.selectOne("guest.receipt", map);
	}
	
	@Override
	public List<CouponDTO> couponlist(int g_idx) {
		return sqlSession.selectList("guest.couponlist", g_idx);
	}
	
	@Override
	public int c_count(int g_idx) {
		return sqlSession.selectOne("guest.c_count", g_idx);
	}
	
	@Override
	public void order(Map<String,Object> map){
		sqlSession.insert("guest.order",map);
	}
	@Override
	public void pointupdate(Map<String,Object> map){
		sqlSession.update("guest.pointupdate",map);
	}

	@Override
	public void couponupdate(Map<String,Object> map){
		sqlSession.update("guest.couponupdate",map);
	}
	
	@Override
	public List<ReviewDTO> review(int g_idx) {
		return sqlSession.selectList("guest.reviewlist", g_idx);
	}
	
	@Override
	public List<ReviewDTO> reply(int g_idx) {
		return sqlSession.selectList("guest.replylist", g_idx);
	}
	
	@Override
	public ReviewDTO reviewcount(int g_idx) {
		return sqlSession.selectOne("guest.reviewcount", g_idx);
	}
	
	@Override
	public GuestDTO joindate(int g_idx) {
		return sqlSession.selectOne("guest.joindate", g_idx);
	}
}