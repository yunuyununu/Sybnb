package com.example.syFinal.host.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostDTO {
	private int h_idx;
	private String h_email;
	private String h_passwd;
	private String h_name;
	private String h_phone;
	private String h_business;
	private int h_level;
	private String h_status;
	private String h_regdate;
	private String h_profile;
	private String h_file;
	private String h_description;
	private String h_accountnum;
	private String h_bankbook;
}
