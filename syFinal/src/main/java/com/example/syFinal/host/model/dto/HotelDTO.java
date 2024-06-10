package com.example.syFinal.host.model.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HotelDTO {
	private int ho_idx;
	private String ho_name;
	private String ho_address;
	private int ho_level;
	private int ho_floor;
	private String ho_business;
	private int ho_single;
	private int ho_double;
	private int ho_family;
	private int ho_suite;
	private String ho_img;
	private double ho_x;
	private double ho_y;
	private int ho_status;
	private String ho_description;
	private String chk_in;
	private String chk_out;
	
	private String ho_check_in;
	private String ho_check_out;
	private int roomCount;  
	
	private int d_idx;
	private int d_status;
	private String d_room_type;
	private int d_capacity;
	private int d_area;
	private int d_beds;
	private String d_non_smoking;
	private int d_price;
	private String d_img1;
	private String d_img2;
	private String d_img3;
	
	private String h_email;
	private String h_name;
	private String h_phone;
	private String h_business;
	private int h_level;
	private String h_status;
	private Date h_regdate;
	private String h_profile;
	private String h_file;
	private String h_bankbook;
	private String h_accountnum;
	
	private String mountain_view;
	private String ocean_view;
	private String wifi;
	private String parking_lot;
	private String breakfast;
	private String fire_alam;
	private String fire_extinguisher;

}
