package com.example.syFinal.global.model;

import java.util.List;

public interface ChatroomDAO {

	// List<MessageDTO> entrance(int g_idx, int h_idx);
	
	List<MessageDTO> entrance(String m_roomId);

	List<MessageDTO> g_list(String sender);

	List<MessageDTO> h_list(String sender);

	MessageDTO last_message(String m_roomId);

	void insert(MessageDTO message);

	String receive(String m_sender, String m_roomId);

	String check(String g_email, String h_email);

	void create(String room, String g_email, String h_email);

	// List<MessageDTO> list(String sender);
	
}
