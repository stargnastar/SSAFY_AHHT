package com.ahht.project.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
	
	private static Logger logger = LoggerFactory.getLogger(ExceptionController.class);
	
	// 예외를 어떻게 처리할지 정의
	@ExceptionHandler(Exception.class)
	public String handleException(Model model, Exception e) {
		logger.error("예외 발생" , e.getCause());
		e.printStackTrace();
		
		// 파라미터 바인딩 예외 발생시
		if(e instanceof BindException) {			
			model.addAttribute("errmsg", "파라미터가 잘 등록되지 않았습니다." );
		}
		
		return "error/errorpage";
	}
}
