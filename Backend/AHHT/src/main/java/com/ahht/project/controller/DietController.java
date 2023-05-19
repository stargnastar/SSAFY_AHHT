package com.ahht.project.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.service.DietService;

public class DietController {
	@Autowired
	private DietService dietService;
	@Autowired
	private UserService userService;

}
