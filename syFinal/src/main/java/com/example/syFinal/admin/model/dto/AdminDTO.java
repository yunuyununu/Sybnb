package com.example.syFinal.admin.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminDTO {
	private String a_name;
	private String a_id;
	private String a_passwd;
	private String a_tel;
	private String a_email;
	
	//매출차트 
	private String month; 
	private Double sum; 
	private String ho_name; 
	private String ho_idx;
}
