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
public class PortoneCancel {
	private String code;
	private String message;
	private String status;
	private String id;
	private String pgCancellationId;
	private int totalAmount;
	private int taxFreeAmount;
	private int vatAmount;
	private int easyPayDiscountAmount;
	private String reason;
	private String requestedAt;
	private int returnPrice;
}
