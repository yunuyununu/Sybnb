package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.ANoticeDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

@Repository
public class MainDAOImpl implements MainDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	
	@Override
	public List<MainDTO> list(String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		return sqlSession.selectList("main.mainList",search);
	}
	
	@Override
	public int star(int ho_idx) {
		return sqlSession.selectOne("main.star", ho_idx);
	}
	

	@Override
	public int check(int ho_idx, int g_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("g_idx", g_idx);
		return sqlSession.selectOne("main.check", map);
	}
	
	@Override
	public List<ANoticeDTO> noticelist() {
		return sqlSession.selectList("main.mainNotice");
	}
	@Override
	public ANoticeDTO noticedetail(int n_idx) {
		return sqlSession.selectOne("main.mainDetail",n_idx);
	}
}
