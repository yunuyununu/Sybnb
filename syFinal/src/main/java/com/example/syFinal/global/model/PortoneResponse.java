package com.example.syFinal.global.model;

import org.json.simple.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PortoneResponse {
	private String code;
	private String accessToken;
	private String refreshToken;
	private String type;
	private String message;
	private JSONObject response = new JSONObject();
}
