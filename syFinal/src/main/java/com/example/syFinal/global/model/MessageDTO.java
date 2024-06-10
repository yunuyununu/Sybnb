package com.example.syFinal.global.model;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDTO {
	private int m_idx;
	private int m_test;
	private String m_roomId;
	private String m_message;
	private Set<WebSocketSession> sessions = new HashSet<>();
	private String h_name;
	private String h_profile;
	private String g_name;
	private String g_photo;
	private String m_send_date;
	private String m_sender;
	private String m_receiver;
	private String h_ip;
}
