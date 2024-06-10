package com.example.syFinal.host.model.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyDTO {
	private int rp_idx;
	private int rp_rv_idx;
	private String rp_writer;
	private String rp_content;
	private Date rp_date;
}
