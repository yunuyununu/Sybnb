package com.example.syFinal.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HotelAmenityDTO {
	private int ha_idx;
	private int ha_d_idx;
	private String mountain_view;
	private String ocean_view;
	private String wifi;
	private String parking_lot;
	private String breakfast;
	private String fire_alam;
	private String fire_extinguisher;
}
