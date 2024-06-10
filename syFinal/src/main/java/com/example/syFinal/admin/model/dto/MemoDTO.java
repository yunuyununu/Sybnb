package com.example.syFinal.admin.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemoDTO {
	private int me_idx;
	private String me_writer;
	private String me_content;
	private String me_date;
}