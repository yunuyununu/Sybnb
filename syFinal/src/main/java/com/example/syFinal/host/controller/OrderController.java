package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.PageUtil;
import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.host.model.dao.OrderDAO;

@RestController
@RequestMapping("api/order/*")
public class OrderController {
	@Autowired
	OrderDAO orderDao;

	@Autowired
	EmailService emailService;

	@RequestMapping("manage/list/{userIdx}")
	public Map<String, Object> getOrderList(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "hoIdx", defaultValue = "0") int ho_idx,
			@RequestParam(name = "pageNum", defaultValue = "1") int pageNum,
			@RequestParam(name = "sort", defaultValue = "0") int sort) {
		Map<String, Object> data = new HashMap<>();

		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("ho_idx", ho_idx);
		map.put("sort", sort);
		List<Map<String, Object>> hotels = orderDao.getHotelList(h_idx);
		data.put("hotels", hotels);

		int cnt = orderDao.countRecord(map);
		PageUtil page = new PageUtil(cnt, pageNum);
		int start = page.getPageBegin() - 1;
		data.put("count", cnt);
		data.put("page", page);
		data.put("sort", sort);
		if (hotels == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			if (cnt == 0) {
				data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
			} else {
				map.put("start", start);
				List<Map<String, Object>> list = orderDao.getList(map);
				data.put("list", list);
				data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
			}
		}
		return data;
	}

	@GetMapping("manage/detail/get/{g_idx}")
	public Map<String, Object> getGuestInfo(@PathVariable(name = "g_idx") int g_idx) {
		Map<String, Object> data = new HashMap<>();
		GuestDTO guest = orderDao.getGuestInfo(g_idx);
		data.put("guest", guest);
		return data;
	}

	@Transactional
	@PostMapping("manage/confirm/{o_idx}")
	public Map<String, Object> confirm(@PathVariable(name = "o_idx") int o_idx,
			@RequestParam Map<String, Object> params) {
		Map<String, Object> data = new HashMap<>();
		orderDao.confirm(params);
		if ((int) params.get("result") == 1) { // 체크인 확정이 정상 처리되었을 때, 게스트 레벨 업데이트
			int result = orderDao.guestLevelUpate(params);
			params.replace("result", result);
			data.put("level", params.get("level"));
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		} else {
			data.put("response", new ResponseEntity<>("false", HttpStatus.BAD_REQUEST));
		}
		return data;
	}

	@Transactional
	@GetMapping("manage/update/{o_idx}")
	public Map<String, Object> update(@PathVariable(name = "o_idx") int o_idx) {
		Map<String, Object> data = new HashMap<>();
		if (orderDao.update(o_idx)) {
			Map<String, Object> item = orderDao.voucher(o_idx);
			String g_email = (String) item.get("g_email");
			String ho_name = (String) item.get("ho_name");
			item.put("template", "voucher");
			EmailDTO dto = emailService.prepareVoucher(g_email, ho_name, o_idx);
			String result = emailService.sendTemplateMail(item, dto);
			if (result.equals("success")) {
				data.put("response", new ResponseEntity<>(result, HttpStatus.OK));
			} else {
				data.put("response", new ResponseEntity<>(result, HttpStatus.BAD_REQUEST));
			}
		} else {
			data.put("response", new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST));
		}
		return data;
	}

	@GetMapping("manage/modify/list")
	public List<Map<String, Object>> requestList(@RequestParam(name = "userIdx", defaultValue = "") int h_idx) {
		List<Map<String, Object>> data = orderDao.requestList(h_idx);
		return data;
	}

	@Transactional
	@PostMapping("manage/modify/{o_idx}")
	public Map<String, Object> modify(@PathVariable(name = "o_idx") int o_idx,
			@RequestParam Map<String, Object> params) {
		Map<String, Object> data = new HashMap<>();
		if (orderDao.countOrders(params)) {
			orderDao.modify(params);
			Integer result = (Integer) params.get("result");
			switch (result) {
			case 1:
				data.put("level", params.get("level"));

				Map<String, Object> item = orderDao.voucher(o_idx);
				String g_email = (String) item.get("g_email");
				String ho_name = (String) item.get("ho_name");
				item.put("template", "voucher");
				EmailDTO dto = emailService.prepareVoucher(g_email, ho_name, o_idx);
				String sendEmail = emailService.sendTemplateMail(item, dto);
				if (sendEmail.equals("success")) {
					data.put("response", new ResponseEntity<>(result, HttpStatus.OK));
				}

				break;
			case 0:
				data.put("response", new ResponseEntity<>("false", HttpStatus.BAD_REQUEST));
				break;
			}
		} else {
			data.put("response", new ResponseEntity<>("false", HttpStatus.BAD_REQUEST));
		}
		return data;
	}

	@Transactional
	@GetMapping("manage/reject/{o_idx}")
	public Map<String, Object> requestReject(@PathVariable(name = "o_idx") int o_idx) {
		Map<String, Object> data = new HashMap<>();
		if (orderDao.requestReject(o_idx)) {
			Map<String, Object> item = orderDao.voucher(o_idx);
			String g_email = (String) item.get("g_email");
			String ho_name = (String) item.get("ho_name");
			item.put("template", "voucher");
			EmailDTO dto = emailService.rejectionNotice(g_email, ho_name, o_idx);
			String result = emailService.sendTemplateMail(item, dto);
			if (result.equals("success")) {
				data.put("response", new ResponseEntity<>(result, HttpStatus.OK));
			} else {
				data.put("response", new ResponseEntity<>(result, HttpStatus.BAD_REQUEST));
			}
		} else {
			data.put("response", new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST));
		}
		return data;
	}

	@GetMapping("manage/schedule/{userIdx}")
	public Map<String, Object> reservationSchedule(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "column", defaultValue = "") String column,
			@RequestParam(name = "pending", defaultValue = "0") int pending) {

		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("ho_idx", -1);
		int cnt = orderDao.countRecord(map);

		Map<String, Object> data = new HashMap<>();
		if (cnt == 0) { // 호스트 계정 → 예약내역이 있는 지 확인
			data.put("count", cnt);
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			List<Map<String, String>> list = orderDao.schedule(h_idx, column, pending);
			data.put("list", list);
			data.put("count", cnt);
			data.put("column", column);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		return data;
	}

	@GetMapping("manage/schedule/detail/{userIdx}")
	public List<Map<String, Object>> detailSchedule(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "column", defaultValue = "") String column,
			@RequestParam(name = "date", defaultValue = "") String date) {
		List<Map<String, Object>> list = orderDao.detailSchedule(h_idx, column, date);
		return list;
	}

}