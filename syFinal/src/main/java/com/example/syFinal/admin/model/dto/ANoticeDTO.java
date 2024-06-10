package com.example.syFinal.admin.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ANoticeDTO {
	private int n_idx;
	private String n_writer;
	private String n_title;
	private String n_content;
	private String n_date;
	private int rownum;
}
