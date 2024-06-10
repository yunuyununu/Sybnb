package com.example.syFinal.host.model.dao;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.GuestDTO;

@Repository
public class OrderDAOImpl implements OrderDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public void confirm(Map<String, Object> params) {
		sqlSession.selectOne("order.confirm", params);
	}

	@Override
	public boolean update(int o_idx) {
		try {
			sqlSession.update("order.update", o_idx);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Map<String, Object>> getList(Map<String, Object> map) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("order.getList", map);
			if (list != null) {
				DecimalFormat df = new DecimalFormat("###,###");
				for (Map<String, Object> m : list) {
					int o_state = (int) m.get("o_state");
					// 상태 처리
					switch (o_state) {
					case 1:
						m.put("status", "예약대기");
						break;
					case 2:
						m.put("status", "예약취소");
						break;
					case 3:
						m.put("status", "예약확정");
						break;
					case 4:
						m.put("status", "체크인완료");
						break;
					}
					// 금액 1000단위 포맷
					String o_price = df.format(m.get("o_price"));
					String o_finalprice = df.format(m.get("o_finalprice"));
					m.replace("o_price", o_price);
					m.replace("o_finalprice", o_finalprice);

					String o_payment = (String) m.get("o_payment");

					switch (o_payment) {
					case "1":
						m.replace("o_payment", "Card");
						break;
					case "2":
						m.replace("o_payment", "KakaoPay");
						break;
					case "3":
						m.replace("o_payment", "Point");
						break;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> getHotelList(int h_idx) {
		List<Map<String, Object>> hotels = null;
		try {
			hotels = sqlSession.selectList("order.getHotelList", h_idx);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotels;
	}

	@Override
	public int countRecord(Map<String, Object> map) {
		return sqlSession.selectOne("order.countRecord", map);
	}

	@Override
	public GuestDTO getGuestInfo(int g_idx) {
		return sqlSession.selectOne("order.getGuestProfile", g_idx);
	}

	@Override
	public int guestLevelUpate(Map<String, Object> param) {
		int result = 0;
		String opt = (String) param.get("opt");
		try {
			if (opt.equals("1")) {
				sqlSession.selectOne("order.levelUp", param);
			} else {
				sqlSession.selectOne("order.levelDown", param);
			}
			result = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> requestList(int h_idx) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("order.modifyRequest", h_idx);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public void modify(Map<String, Object> params) {
		sqlSession.selectOne("order.modify", params);
	}

	@Override
	public boolean countOrders(Map<String, Object> params) {
		// 변경 업데이트 전, 동일 룸타입의 예약현황 확인
		int cnt = sqlSession.selectOne("order.countOrders", params);
		int room = sqlSession.selectOne("order.roomCount", params);
		if (cnt < room) {
			return true;
		}
		return false;
	}

	@Override
	public boolean requestReject(int o_idx) {
		try {
			sqlSession.update("order.requestReject", o_idx);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Map<String, String>> schedule(int h_idx, String column, int pending) {
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("column", column);
		map.put("pending", pending);
		List<Map<String, String>> list = sqlSession.selectList("order.schedule", map);
		return list;
	}

	@Override
	public Map<String, Object> voucher(int o_idx) {
		Map<String, Object> item = sqlSession.selectOne("order.voucher", o_idx);
		DecimalFormat df = new DecimalFormat("###,###");
		// 금액 1000단위 포맷
		String o_price = df.format(item.get("o_price"));
		String discount = df.format(item.get("discount"));
		String o_finalprice = df.format(item.get("o_finalprice"));
		item.replace("o_price", o_price);
		item.replace("discount", discount);
		item.replace("o_finalprice", o_finalprice);

		// 결제수단 코드 변환
		String o_payment = (String) item.get("o_payment");
		switch (o_payment) {
		case "1":
			item.replace("o_payment", "Card");
			break;
		case "2":
			item.replace("o_payment", "KakaoPay");
			break;
		case "3":
			item.replace("o_payment", "Point");
			break;
		}
		return item;
	}

	@Override
	public List<Map<String, Object>> detailSchedule(int h_idx, String column, String date) {
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("column", column);
		map.put("date", date);
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("order.detailSchedule", map);
			if (list != null) {
				DecimalFormat df = new DecimalFormat("###,###");
				for (Map<String, Object> item : list) {
					// 금액 1000단위 포맷
					String o_price = df.format(item.get("o_price"));
					String discount = df.format(item.get("discount"));
					String o_finalprice = df.format(item.get("o_finalprice"));
					item.replace("o_price", o_price);
					item.replace("discount", discount);
					item.replace("o_finalprice", o_finalprice);
					// 결제수단 코드 변환
					String o_payment = (String) item.get("o_payment");
					switch (o_payment) {
					case "1":
						item.replace("o_payment", "Card");
						break;
					case "2":
						item.replace("o_payment", "KakaoPay");
						break;
					case "3":
						item.replace("o_payment", "Point");
						break;
					}
					// 예약상태 코드 변환
					int o_state = (int) item.get("o_state");
					switch (o_state) {
					case 1:
						item.put("status", "예약대기");
						break;
					case 3:
						item.put("status", "예약확정");
						break;
					case 4:
						item.put("status", "체크인완료");
						break;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int countPendings(int h_idx) {
		return sqlSession.selectOne("order.cntPendings", h_idx);
	}

}
