package com.example.syFinal.global.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.global.model.ChatroomDAO;
import com.example.syFinal.global.model.MessageDTO;

@Controller
@RequestMapping("chatroom/*")
public class ChatroomController {

	@Autowired
	ChatroomDAO dao;

//	// 전체 채팅 목록
//	@RequestMapping("g_list")
//	@ResponseBody
//	public Map<String, Object> g_list(@RequestParam(name = "g_idx") int g_idx) {
//		List<MessageDTO> dto = dao.g_list(g_idx);		
//		for (int i=0; i<dto.size(); i++) {
//			String pro = "http://localhost/static/images/host/profile/"+dto.get(i).getH_profile();
//			dto.get(i).setH_profile(pro);
//			MessageDTO date_msg = dao.last_message(g_idx, dto.get(i).getM_h_idx());
//			String msg = date_msg.getM_message();
//			if (msg.length() > 17) {
//				msg = msg.substring(0, 16)+"...";
//			}
//			dto.get(i).setM_message(msg);
//			String date = date_msg.getM_send_date();
//			date = date.substring(5);
//			date = date.replace('-', '.');
//			dto.get(i).setM_send_date(date);	
//		}
//		Map<String, Object> map = new HashMap<>();
//		map.put("dto", dto);
//		return map;
//	}
//	
	@RequestMapping("list")
	@ResponseBody
	public Map<String, Object> list(@RequestParam(name = "sender") String sender,
			@RequestParam(name = "type") String type) {
		// System.out.println(sender);
		List<MessageDTO> dto = new ArrayList<>();
		if (type.equals("guest")) {
			dto = dao.g_list(sender);
			System.out.println(dto);
			for (int i = 0; i < dto.size(); i++) {
				String pro = "http://localhost/static/images/host/profile/" + dto.get(i).getH_profile();
				dto.get(i).setH_profile(pro);
				MessageDTO date_msg = dao.last_message(dto.get(i).getM_roomId());
				String msg = date_msg.getM_message();
				if (msg != null) {
					if (msg.length() > 17) {
						msg = msg.substring(0, 16) + "...";
					}
					dto.get(i).setM_message(msg);
				}
				String date = date_msg.getM_send_date();
				date = date.substring(5);
				date = date.replace('-', '.');
				dto.get(i).setM_send_date(date);
			}
		} else if (type.equals("host")) {
			dto = dao.h_list(sender);
			for (int i = 0; i < dto.size(); i++) {
				String pro = "http://localhost/static/images/guest/photo/" + dto.get(i).getG_photo();
				dto.get(i).setG_photo(pro);
				MessageDTO date_msg = dao.last_message(dto.get(i).getM_roomId());
				String msg = date_msg.getM_message();
				if (msg != null) { 
					if (msg.length() > 17) {
						msg = msg.substring(0, 16) + "...";
					}
					dto.get(i).setM_message(msg);
				}
				String date = date_msg.getM_send_date();
				date = date.substring(5);
				date = date.replace('-', '.');
				dto.get(i).setM_send_date(date);
			}
		}
		InetAddress local = null;
		   try {
		      local = InetAddress.getLocalHost();
		   }
		   catch ( UnknownHostException e ) {
		      e.printStackTrace();
		   }
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		// System.out.println(dto);
		System.out.println("메시지리스트===>"+dto);
		return map;
	}
	
	@PostMapping("check")
	@ResponseBody
	public Map<String, Object> create(@RequestParam(name = "h_email") String h_email, @RequestParam(name = "g_email") String g_email) {
		String room = dao.check(g_email, h_email);
		String result = "";
		if (room.equals("none")) {
			UUID uuid = UUID.randomUUID();
			String roomId = uuid.toString();
			try {
				dao.create(roomId, g_email, h_email);
				result = roomId;
			} catch (Exception e) {
				result = "error";
			}
		} else {
			result = room;
		}
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}

	// 룸아이디 생성 (새 채팅방 개설)
//	@PostMapping("create")
//	@ResponseBody
//	public String create(@RequestParam(name = "h_idx") int h_idx, @RequestParam(name = "g_idx") int g_idx,
//			@RequestParam(name = "message") String message,
//			@RequestParam(name = "roomId", defaultValue = "") String roomId) {
//		UUID uuid = UUID.randomUUID();
//		String room = "";
//		if (roomId == "") {
//			room = uuid.toString();
//		} else {
//			room = roomId;
//		}
//		String result = dao.create(room, g_idx, h_idx, message);
//		return result;
//	}

//	// 게스트 입장 채팅 조회
//	@RequestMapping("entrance")
//	@ResponseBody
//	public Map<String, Object> entrance(@RequestParam(name = "idx") String idx, @RequestParam(name = "g_idx") int g_idx) {
//		List<MessageDTO> dto = dao.entrance(g_idx, Integer.parseInt(idx));
//		Map<String, Object> map = new HashMap<>();
//		// System.out.println(dto);
//		String roomId = dto.get(0).getM_roomId();
//		Map<String, Object> msg = new HashMap<>();
//		List<String> message = new ArrayList<>();
//		List<String> host_message = new ArrayList<>();
//		for (int i=0; i<dto.size(); i++) {
//			String pro = "http://localhost/static/images/host/profile/"+dto.get(i).getH_profile();
//			dto.get(i).setH_profile(pro);
//			if(dto.get(i).getM_sender().equals("g")) {
//				message.add(dto.get(i).getM_message());
//			} else if (dto.get(i).getM_sender().equals("h")) {
//				host_message.add(dto.get(i).getM_message());
//			}
//		}
//		
//		map.put("dto", dto);
//		map.put("sender", "게스트");
//		map.put("roomId", roomId);
//		return map;
//	}
//	
	// 게스트 입장 채팅 조회
	@RequestMapping("entrance")
	@ResponseBody
	public List<Map<String, Object>> entrance(@RequestParam(name = "roomId") String roomId) {
		// System.out.println(roomId);
		List<MessageDTO> dto = dao.entrance(roomId);
		// System.out.println(dto);
		List<Map<String, Object>> list = new ArrayList<>();
		for (int i = 0; i < dto.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("m_roomId", dto.get(i).getM_roomId());
			map.put("m_message", dto.get(i).getM_message());
			map.put("h_name", dto.get(i).getH_name());
			map.put("g_name", dto.get(i).getG_name());
			map.put("m_sender",  dto.get(i).getM_sender());
			map.put("m_receiver",  dto.get(i).getM_receiver());
			String profile = "http://localhost/static/images/host/profile/" + dto.get(i).getH_profile();
			map.put("h_profile", profile);
			String photo = "http://localhost/static/images/guest/photo/" + dto.get(i).getG_photo();
			map.put("g_photo", photo);
			map.put("m_test", dto.get(i).getM_test());
			list.add(map);
		}
		
		return list;
	}

}
