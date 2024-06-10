package com.example.syFinal.guest.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
	private int rv_idx;
	private String rv_writer;
	private String rv_content;
	private String rv_date;
	private int rv_re_index;
	private float rv_star;
	private int rv_hd_idx;
	private int rv_deleted;
	private int g_idx;
	private String g_email;
	private int h_idx;
	private int d_idx;
	private int ho_idx;
	private String h_profile;
	private String h_name;
	private String ho_name;
	private String d_img1;
	private String rp_date;
	private String rp_content;
	private String rp_deleted;
	private String reviewcount;
}
