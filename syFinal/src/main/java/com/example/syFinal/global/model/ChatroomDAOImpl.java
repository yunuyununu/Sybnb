package com.example.syFinal.global.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatroomDAOImpl implements ChatroomDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<MessageDTO> g_list(String sender) {
		return sqlSession.selectList("message.g_list", sender);
	}
	
	
	@Override
	public List<MessageDTO> h_list(String sender) {
		return sqlSession.selectList("message.h_list", sender);
	}
	
	@Override
	public MessageDTO last_message(String m_roomId) {
//		Map<String, Object> map = new HashMap<>();
//		map.put("h_idx", m_h_idx);
//		map.put("g_idx", g_idx);
		return sqlSession.selectOne("message.last_message", m_roomId);
	}
	
	@Override
	public void insert(MessageDTO message) {
		sqlSession.insert("message.insert", message);
	}
	
	@Override
	public String receive(String m_sender, String m_roomId) {
		Map<String, Object> map = new HashMap<>();
		map.put("m_sender", m_sender);
		map.put("m_roomId", m_roomId);
		return sqlSession.selectOne("message.receive", map);
	}
	
	@Override
	public String check(String g_email, String h_email) {
		Map<String, Object> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("h_email", h_email);
		return sqlSession.selectOne("message.check", map);
	}

	@Override
	public void create(String room, String g_email, String h_email) {
		Map<String, Object> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("h_email", h_email);
		map.put("room", room);
		sqlSession.insert("message.create", map);
	}

//	@Override
//	public List<MessageDTO> entrance(int g_idx, int h_idx) {
//		Map<String, Object> map = new HashMap<>();
//		map.put("h_idx", h_idx);
//		map.put("g_idx", g_idx);
//		return sqlSession.selectList("message.entrance", map);
//	}

	@Override
	public List<MessageDTO> entrance(String m_roomId) {
//		Map<String, Object> map = new HashMap<>();
//		map.put("h_idx", h_idx);
//		map.put("g_idx", g_idx);
		return sqlSession.selectList("message.entrance", m_roomId);
	}
}
