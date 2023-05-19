package com.ahht.project.interceptor;

import java.time.LocalTime;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 오전 2시부터 3시까지 (서버시간 기준)
 * 메인화면, 리스트, 상세보기 요청을 제외한 요청이 들어오면
 * 서버 점검 안내페이지로 보내는 인터셉터
 */
public class CheckingTheServerInterceptor implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		LocalTime time = LocalTime.now();
		
		int hour = time.getHour();

		
		// 서버 점검 시간(오전 12시-오전 1시)인 경우 진행을 멈추고 안내페이지로 보내기
		if(hour == 03) {
			
			response.sendRedirect(request.getContextPath() + "/info");
			return false;
		}
		
		// 서버 점검 시간이 아닌 경우 계속 진행
		return true;
	}
}
