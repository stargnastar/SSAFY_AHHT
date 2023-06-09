package com.ahht.project.interceptor;

import java.time.LocalTime;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class CheckingTheServerInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		LocalTime time = LocalTime.now();

		int hour = time.getHour();

		if (hour == 03) {

			response.sendRedirect(request.getContextPath() + "/info");
			return false;
		}

		return true;
	}
}
