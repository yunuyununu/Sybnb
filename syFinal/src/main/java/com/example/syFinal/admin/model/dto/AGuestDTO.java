package com.example.syFinal.admin.model.dto;


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
public class AGuestDTO {
	private int g_idx;
	private String g_email;
	private String g_passwd;
	private String g_name;
	private String g_phone;
	private String g_url;
	private String g_profile;
	private String g_join_date;
	private int g_level;
	private String g_photo;
	private String g_card;
	private String g_date;
	private int g_cvc;
	private int g_point;
	private String a_id;
	private int l_level;
}
