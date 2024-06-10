package com.example.syFinal.guest.model.dto;

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
public class ReservDTO {
	private int d_ho_idx;
	private String ho_name;
	private String ho_img;
	private String o_ckin;
	private String o_ckout;
	private String h_name;
	private int o_idx;
	private int h_idx;
	private int ho_idx;
	private String ho_address;
	
	private String o_orderdate;
	private int o_price;
	private int o_discount;
	private int o_finalprice;
	private int o_benefit;
	private int o_payment;
	private int o_reser;
	private int o_didx;
	private String paymentId;
	
	private int o_adult;
	private int o_child;
	private int o_baby;
	
	private String h_phone;
	private String h_profile;
	private String ho_check_in;
	private String ho_check_out;
	private double ho_x;
	private double ho_y;
	
	private int o_state;
	
	private int d_area;
	private String d_room_type;
	private int d_beds;
	private String d_non_smoking;
	
	private int d_capacity;
	
	private int ru_idx;
	private String ru_startDate;
	private String ru_endDate;
	private int ru_adult;
	private int ru_child;
	private int ru_baby;
}
