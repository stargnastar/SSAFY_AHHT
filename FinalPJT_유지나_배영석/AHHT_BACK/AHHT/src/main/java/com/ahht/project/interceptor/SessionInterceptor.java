package com.ahht.project.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/* 맛집 등록요청이나 상세보기 요청이 들어온 경우 세션에 로그인 정보가 있는지 확인
 * 로그인 정보가 있다면 그대로 진행하고, 없다면 메인 화면으로 돌려보낸다.
 */

import org.springframework.web.servlet.HandlerInterceptor;

public class SessionInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		HttpSession session = request.getSession();
		if (session.getAttribute("loginUser") != null) {
			return true;
		}

		response.sendRedirect(request.getContextPath() + "/login");
		return false;
	}

}
