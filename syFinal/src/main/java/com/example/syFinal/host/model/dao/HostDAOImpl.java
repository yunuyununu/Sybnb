package com.example.syFinal.host.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HostDTO;

@Repository
public class HostDAOImpl implements HostDAO {
	@Autowired
	SqlSession sqlSession;

	@Override // Host(사업자) 회원가입
	public void insert(Map<String, Object> map) {
		sqlSession.insert("host.insert", map);
	}

	@Override // 아이디 중복체크
	public int idCheck(String userEmail) {
		return sqlSession.selectOne("host.idCheck", userEmail);
	}

	@Override // 암호화된 h_passwd
	public String pwdCheck(String userEmail) {
		return sqlSession.selectOne("host.pwdCheck", userEmail);
	}

	@Override // 로그인 성공 시 계정정보(쿠키) 가져오기
	public HostDTO makeCookie(String userEmail) {
		return sqlSession.selectOne("host.makeCookie", userEmail);
	}

	@Override // host 회원정보 가져오기
	public Map<String, Object> getAccount(int h_idx) {
		Map<String, Object> data = sqlSession.selectOne("host.getAccount", h_idx);
		return data;
	}

	@Override // host 계정아이디 찾기
	public String findId(Map<String, Object> map) {
		return sqlSession.selectOne("host.findId", map);
	}

	@Override // 비밀번호 찾기(이메일)
	public int findPwd(Map<String, Object> map) {
		return sqlSession.selectOne("host.findPwd", map);
	}

	@Override // 임시비밀번호로 업데이트
	public void setTempPwd(Map<String, Object> map) {
		sqlSession.update("host.setTempPwd", map);
	}

	@Override // Host 정보수정
	public void updateInfo(Map<String, Object> map) {
		sqlSession.update("host.update", map);
	}

	@Override // Host 회원탈퇴
	public void deleteAccount(int h_idx, String deletedEmail) {
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("deletedEmail", deletedEmail);
		sqlSession.update("host.delete", map);
	}

	@Override
	public String getFile(int h_idx, String type) {
		Map<String, Object> params = new HashMap<>();
		params.put("h_idx", h_idx);
		params.put("type", type);
		String fileName = sqlSession.selectOne("host.getFile", params);
		return fileName;
	}

	@Override // Host 승인신청(가입완료 > 승인대기로 업데이트)
	public void levelUp(int h_idx) {
		sqlSession.update("host.levelUp", h_idx);
	}

	@Override
	public boolean checkOrders(int h_idx) {
		int cnt = sqlSession.selectOne("host.checkOrders", h_idx);
		if (cnt > 0) {
			return false;
		} else {
			return true;
		}
	}

}
