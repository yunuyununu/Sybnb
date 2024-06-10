package com.example.syFinal.global.model;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;

@Service
public class EmailServiceImpl implements EmailService {
	@Autowired
	JavaMailSender mailSender;

	@Autowired
	SpringTemplateEngine templateEngine;

	@Override
	public String sendMail(EmailDTO dto) {
		String result = "";
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			msg.addRecipient(RecipientType.TO, new InternetAddress(dto.getReceiveMail()));
			msg.addFrom(new InternetAddress[] { new InternetAddress(dto.getSenderMail(), dto.getSenderName()) });
			msg.setSubject(dto.getSubject(), "utf-8");
			msg.setText(dto.getMessage(), "utf-8");
			mailSender.send(msg);
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
			result = "fail";
		}
		return result;
	}

	@Override
	public String getTempPassword() {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

		String str = "";
		int idx = 0;
		for (int i = 0; i < 10; i++) {
			idx = (int) (charSet.length * Math.random());
			str += charSet[idx];
		}
		return str;
	}

	@Override
	public EmailDTO prepareTempPwdEmail(String email, String randomPw) {
		EmailDTO emailPw = new EmailDTO();
		emailPw.setSubject("임시 비밀번호 안내");
		emailPw.setMessage(
				"안녕하세요. 임시 비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 " + randomPw + " 입니다." + " 로그인 후 비밀번호를 변경해 주세요.");
		emailPw.setReceiveMail(email);
		emailPw.setSenderName("Notice");
		emailPw.setSenderMail("notice@gmail.com");
		return emailPw;
	}

	@Override
	public String sendTemplateMail(Map<String, Object> map, EmailDTO dto) {
		String result = "";
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
			helper.setSubject(dto.getSubject());
			helper.setTo(dto.getReceiveMail());
			helper.setFrom("notice@gmail.com", "Notice");
			map.put("message", dto.getMessage());

			// 템플릿에 전달할 데이터 설정
			Context context = new Context();
			map.forEach((key, value) -> {
				context.setVariable(key, value);
			});

			// 메일 내용 설정:템플릿 프로세스
			String html = templateEngine.process((String) map.get("template"), context);
			helper.setText(html, true);
			mailSender.send(msg);
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
			result = "fail";
		}
		return result;
	}

	@Override
	public EmailDTO prepareVoucher(String g_email, String ho_name, int o_idx) {
		EmailDTO voucher = new EmailDTO();
		voucher.setSubject("[" + ho_name + "] 예약확정 안내");
		voucher.setMessage("안녕하세요. 고객님의 예약이 확정되어 바우처를 발송해드립니다.<br/>변경사항이 있을 경우, 웹페이지를 통해 접수해주시기 바랍니다.");
		voucher.setReceiveMail(g_email);
		voucher.setSenderName("Notice");
		voucher.setSenderMail("notice@gmail.com");
		return voucher;
	}

	@Override
	public EmailDTO rejectionNotice(String g_email, String ho_name, int o_idx) {
		EmailDTO voucher = new EmailDTO();
		voucher.setSubject("[" + ho_name + "] 예약 변경불가 안내");
		voucher.setMessage(
				"안녕하세요. 고객님의 예약변경 요청 건은 변경된 내역으로 확정이 불가함을 알려드립니다.<br/>해당 건은 기존 예약으로 자동 확정처리 되었으며, 자세한 사항은 아래 바우처를 참조해주시기 바랍니다.");
		voucher.setReceiveMail(g_email);
		voucher.setSenderName("Notice");
		voucher.setSenderMail("notice@gmail.com");
		return voucher;
	}

}
