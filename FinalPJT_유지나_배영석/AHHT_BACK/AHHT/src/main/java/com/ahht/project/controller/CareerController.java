package com.ahht.project.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ahht.project.model.dto.Career;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.CareerService;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/careerapi")
@Api(tags = "이력 컨트롤러")
public class CareerController {

	@Autowired
	private CareerService careerService;

	@Autowired
	private UserService userService;

	@GetMapping("/career/{userId}")
	@ApiOperation(value = "{userId}번 사용자의 이력조회", response = Career.class)
	public ResponseEntity<?> getCarrer(@PathVariable int userId) {

		List<Career> c = careerService.getCareerByUser(userId);
		if (c == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Career>>(c, HttpStatus.OK);
	}

	@PostMapping("/career")
	@ApiOperation(value = "이력 저장")
	public ResponseEntity<?> addCarrer(HttpSession session, @RequestParam String content) {
		User user = (User) session.getAttribute("loginUser");
		if (user == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		Career c = new Career(user.getId(), content);
		int a = careerService.addCareer(c);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);

		return new ResponseEntity<Integer>(a, HttpStatus.OK);
	}

	@DeleteMapping("/career/{id}")
	@ApiOperation(value = "{id}번 이력 삭제")
	public ResponseEntity<?> removeCarrer(HttpSession session, @PathVariable int id) {
		User user = (User) session.getAttribute("loginUser");
		if (user == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);

		Career c = careerService.getCareer(id);
		if (c == null || c.getUserId() != user.getId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}
		careerService.removeCareer(id);

		return new ResponseEntity<Integer>(id, HttpStatus.OK);
	}

}
