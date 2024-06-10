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
public class CouponDTO {
	private int c_num;
	private String c_name;
	private String c_div;
	private double c_benefit;
	private int gc_idx;
	private int gc_gidx;
	private int gc_check;
	private String gc_issue;
	private String gc_deadline;
}
