//PaymentController

package com.example.syFinal.global.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.syFinal.global.model.PortoneCancel;
import com.example.syFinal.global.model.PortoneResponse;
import com.example.syFinal.guest.model.dao.ReservDAO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Service
public class PaymentController {
	
	@Autowired
	ReservDAO dao;
	
	@Transactional
	@RequestMapping("/gettoken")
	private PortoneResponse getToken() {

		HttpHeaders headers = new HttpHeaders();
		RestTemplate restTemplate = new RestTemplate();
        headers.set("Content-Type", "application/json;charset=UTF-8");
        headers.set("Accept", "application/json;charset=UTF-8");
        
        JSONObject body = new JSONObject();
        body.put("apiSecret","8I6gk3CbU6dmSKZ5WDQDclFzYOMq8gnBJbtCRkEm7uloX27PRxKGjqnSYSaKzWJefLssINqMzO7OO35o");
        try {
        	HttpEntity<JSONObject> entity=new HttpEntity<>(body,headers);
        	PortoneResponse token=restTemplate.postForObject("https://api.portone.io/login/api-secret",entity,PortoneResponse.class);
    
            return token;
        } catch (Exception e) {
        	e.printStackTrace();
        } finally {
        	headers.clear();
    		body.clear();
        }
        return null;
    }
	
	//환불요청
	@RequestMapping("/paycancel")
	public Map<String, Object> cancelPay(@RequestParam(name="paymentId") String payId,@RequestParam(name = "o_idx") int o_idx,@RequestParam(name = "g_idx") int gidx,@RequestParam(name = "pointPlus") int point) {
		String result = dao.cancel(o_idx, gidx);
		
		try {
			PortoneResponse portoneresponse=getToken();
			if(portoneresponse==null) {
				throw new Exception();
			}
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization","Bearer "+(String) portoneresponse.getAccessToken());
			headers.set("Content-Type", "application/json;charset=UTF-8");
			JSONObject requestBody  = new JSONObject();
			requestBody.put("apiSecret","8I6gk3CbU6dmSKZ5WDQDclFzYOMq8gnBJbtCRkEm7uloX27PRxKGjqnSYSaKzWJefLssINqMzO7OO35o");
			requestBody.put("reason","..");
			
			HttpEntity<JSONObject> entity=new HttpEntity<>(requestBody,headers);
            RestTemplate restTemplate = new RestTemplate();
        	PortoneCancel cancel=restTemplate.postForObject("https://api.portone.io/payments/"+payId+"/cancel",entity,PortoneCancel.class);
        	Map<String, Object> map2 = new HashMap<>();
        	map2.put("g_idx", gidx);
        	map2.put("pointPlus", point);
        	dao.gPoint(map2);
        	
        	Map<String, Object> map = new HashMap<>();
        	map.put("result", result);
        	return map;
			
		} catch(Exception e) {
			e.printStackTrace();
            throw new RuntimeException("환불에 실패 했습니다 다시시도 바랍니다");
		}
	}
	
	//환불불가, 예약취소
	@RequestMapping("/cancelreser")
	public void cancelreser(@RequestParam(name = "o_idx") int o_idx,@RequestParam(name = "g_idx") int gidx) {
		dao.cancel(o_idx, gidx);
	}
}