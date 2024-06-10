
package com.example.syFinal.global.model;

import java.util.Map;

public interface EmailService {
	String sendMail(EmailDTO dto);

	String getTempPassword();

	EmailDTO prepareTempPwdEmail(String email, String randomPw);

	String sendTemplateMail(Map<String, Object> map, EmailDTO dto);

	EmailDTO prepareVoucher(String g_email, String ho_name, int o_idx);

	EmailDTO rejectionNotice(String g_email, String ho_name, int o_idx);

}
