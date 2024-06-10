package com.example.syFinal.global.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.ChatroomDAO;
import com.example.syFinal.global.model.MessageDTO;

@RestController
public class WebSocketController {
	@Autowired

    private SimpMessagingTemplate template;
	
	@Autowired
	ChatroomDAO dao;
	
	@MessageMapping(value = "/message")
    public void message(MessageDTO message){
		System.out.println("메세지"+message);
		String receiver = dao.receive(message.getM_sender(), message.getM_roomId());
		// System.out.println(receiver);
		message.setM_receiver(receiver);
		dao.insert(message);
		
        template.convertAndSend("/sub/chatroom/" + message.getM_roomId(), message);
    }

}
