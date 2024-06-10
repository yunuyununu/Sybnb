package com.example.syFinal.guest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.GuestDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.CouponDTO;
import com.example.syFinal.guest.model.dto.ReviewDTO;

@RestController
public class GuestController {
	
	@Autowired
	GuestDAO dao;
	
	//게스트 정보
	@RequestMapping("/guest/my")
	public Map<String, Object> my(@RequestParam(name="g_idx") int g_idx) {
		GuestDTO mypage = dao.my(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", mypage);
		return map;
	}
	
	//게스트 결제리스트
	@RequestMapping("/guest/pay")
	public List<Map<String, Object>> paylist(@RequestParam(name="g_idx") int g_idx) {
		List<GuestDTO> dto = dao.paylist(g_idx);
		List<Map<String, Object>> paylist = new ArrayList<>();
		for(int i=0; i<dto.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("O_idx", dto.get(i).getO_idx());
			map.put("Ho_idx", dto.get(i).getHo_idx());
			map.put("D_idx", dto.get(i).getD_idx());
			map.put("G_idx", dto.get(i).getG_idx());
			map.put("D_img1", dto.get(i).getD_img1());
			map.put("O_state", dto.get(i).getO_state());
			map.put("O_orderdate", dto.get(i).getO_orderdate());
			map.put("O_payment", dto.get(i).getO_payment());
			map.put("O_ckin", dto.get(i).getO_ckin());
			map.put("O_ckout", dto.get(i).getO_ckout());
			map.put("O_finalprice", dto.get(i).getO_finalprice());
			map.put("O_refunddate", dto.get(i).getO_refunddate());
			paylist.add(map);
		}
		return paylist;
	}
	
	//영수증내역
	@RequestMapping("/guest/receipt/{gidx}/{didx}/{hoidx}/{oidx}")
	public Map<String, Object> receipt(@PathVariable(name="gidx") int g_idx,@PathVariable(name="didx") int d_idx,
			@PathVariable(name="hoidx") int ho_idx,@PathVariable(name="oidx") int o_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("gidx", g_idx);
		map.put("didx", d_idx);
		map.put("hoidx", ho_idx);
		map.put("oidx", o_idx);
		Map<String, Object> map2 = new HashMap<>();
		map2 = dao.receipt(map);
		return map2;
	}
	
	//게스트 보유쿠폰리스트
	@RequestMapping("/guest/coupon")
	public List<Map<String, Object>> couponlist(@RequestParam(name="g_idx") int g_idx) {
		List<CouponDTO> coupon = dao.couponlist(g_idx);
		List<Map<String, Object>> couponlist = new ArrayList<>();
		for(int i=0; i<coupon.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("Cnum", coupon.get(i).getC_num());
			map.put("Cname", coupon.get(i).getC_name());
			map.put("Cdiv", coupon.get(i).getC_div());
			map.put("Cbenefit", coupon.get(i).getC_benefit());
			map.put("Gcidx", coupon.get(i).getGc_idx());
			map.put("Gcgidx", coupon.get(i).getGc_gidx());
			map.put("Gccheck", coupon.get(i).getGc_check());
			map.put("Gcissue", coupon.get(i).getGc_issue());
			map.put("Gcdeadline", coupon.get(i).getGc_deadline());
			couponlist.add(map);
		}
		return couponlist;
	}
	//게스트 쿠폰보유갯수
	@RequestMapping("/guest/c_count")
	public Map<String, Object> c_coupon(@RequestParam(name="g_idx") int g_idx) {
		int c_count = dao.c_count(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("c_count", c_count);
		return map;
	}
	
	//예약요청
	@PostMapping("/guest/order")
	public void order(@RequestParam(name="idx") int idx,@RequestParam(name="dIdx") int didx,
			@RequestParam(name="ckin") String ckin, @RequestParam(name="ckout") String ckout,
			@RequestParam(name="adult") int adult, @RequestParam(name="pay") String pay,
			@RequestParam(name="child") int child, @RequestParam(name="baby") String baby,
			@RequestParam(name="dprice") int dprice, @RequestParam(name="fprice") int fprice,
			@RequestParam(name="paymentId") String paymentId,@RequestParam(name="usePoint") int point,
			@RequestParam(name="rePoint") int gpoint,@RequestParam(name="useCoupon") int coupon,
			@RequestParam(name="gcidx",defaultValue="") String gc_idx) {
		Map<String, Object> map1 = new HashMap<>();
		map1.put("idx", idx);
		map1.put("didx", didx);
		map1.put("ckin", ckin);
		map1.put("ckout", ckout);
		map1.put("adult", adult);
		map1.put("child", child);
		map1.put("baby", baby);
		map1.put("pay", pay);
		map1.put("dprice", dprice);
		map1.put("fprice", fprice);
		map1.put("usePoint", point);
		map1.put("useCoupon", coupon);
		map1.put("paymentId", paymentId);
		Map<String, Object> map2 = new HashMap<>();
		map2.put("idx", idx);
		map2.put("rePoint", gpoint);
		dao.order(map1);
		dao.pointupdate(map2);
		if(coupon != 0) { //쿠폰사용시 g_coupon DB 상태변경
			int gcIdx = Integer.valueOf(gc_idx);
			Map<String, Object> map3 = new HashMap<>();
			map3.put("gcidx", gcIdx);
			dao.couponupdate(map3);
		}
	}
	//게스트 후기목록
	@RequestMapping("/guest/review")
	public List<Map<String, Object>> reviewlist(@RequestParam(name="g_idx") int gidx) {
		List<ReviewDTO> dto1 = dao.review(gidx);
		List<Map<String, Object>> reviewlist = new ArrayList<>();
		
		for(int i=0; i<dto1.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("G_idx", dto1.get(i).getG_idx());
			map.put("H_idx", dto1.get(i).getH_idx());
			map.put("D_idx", dto1.get(i).getD_idx());
			map.put("Ho_idx", dto1.get(i).getHo_idx());
			map.put("Rv_idx", dto1.get(i).getRv_idx());
			map.put("H_profile", dto1.get(i).getH_profile());
			map.put("H_name", dto1.get(i).getH_name());
			map.put("Ho_name", dto1.get(i).getHo_name());
			map.put("D_img1", dto1.get(i).getD_img1());
			map.put("Rv_date", dto1.get(i).getRv_date());
			map.put("Rv_content", dto1.get(i).getRv_content());
			reviewlist.add(map);
		}
		return reviewlist;
	}
	//게스트 후기의 호스트 답변목록
	@RequestMapping("/guest/reply")
	public List<Map<String, Object>> replylist(@RequestParam(name="g_idx") int gidx) {
		List<ReviewDTO> dto2 = dao.reply(gidx);
		List<Map<String, Object>> replylist = new ArrayList<>();
		
		for(int i=0; i<dto2.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("G_idx", dto2.get(i).getG_idx());
			map.put("H_idx", dto2.get(i).getH_idx());
			map.put("H_profile", dto2.get(i).getH_profile());
			map.put("H_name", dto2.get(i).getH_name());
			map.put("Rp_date", dto2.get(i).getRp_date());
			map.put("Rp_content", dto2.get(i).getRp_content());
			replylist.add(map);
		}
		return replylist;
	}
	//후기갯수
	@RequestMapping("/guest/reviewcount")
	public Map<String, Object> reviewcount(@RequestParam(name="g_idx") int gidx) {
		ReviewDTO reviewcount = dao.reviewcount(gidx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", reviewcount);
		return map;
	}
	//가입기간
	@RequestMapping("/guest/joindate")
	public Map<String, Object> joindate(@RequestParam(name="g_idx") int gidx) {
		GuestDTO joindate = dao.joindate(gidx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", joindate);
		return map;
	}
}
