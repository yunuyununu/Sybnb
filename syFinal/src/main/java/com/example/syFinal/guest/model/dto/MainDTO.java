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
public class MainDTO {
	private int ho_idx;
	private String ho_name;
	private String ho_img;
	private int d_price;
	private String d_img1;
	private String d_img2;
	private String d_img3;
	
	private double star;
	
	private int w_idx; 
	private int d_idx;
}
