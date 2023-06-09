package com.ahht.project.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ahht.project.model.dto.Qualification;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.QualificationService;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/qualificationapi")
@Api(tags = "자격 컨트롤러")
public class QualificationController {

	@Autowired
	private QualificationService qualificationService;

	@Autowired
	private UserService usrService;

	@GetMapping("/qualification/{userId}")
	@ApiOperation(value = "{userId}번 사용자의 자격조회", response = Qualification.class)
	public ResponseEntity<?> getQualification(@PathVariable int userId) {

		List<Qualification> qq = qualificationService.getQualificationByUser(userId);
		if (qq == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Qualification>>(qq, HttpStatus.OK);
	}

	@PostMapping("/qualification")
	@ApiOperation(value = "자격 추가", response = Qualification.class)
	public ResponseEntity<?> addQualification(HttpSession session, @RequestParam String content) {

		User user = (User) session.getAttribute("loginUser");
		if (user == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		Qualification q = new Qualification(user.getId(), content);
		int a = qualificationService.writeQualification(q);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);

		return new ResponseEntity<Integer>(a, HttpStatus.OK);
	}

	@DeleteMapping("/qualification/{id}")
	@ApiOperation(value = "{id}번 자격 삭제")
	public ResponseEntity<?> removeQualification(HttpSession session, @PathVariable("id") int id) {

		User user = (User) session.getAttribute("loginUser");
		if (user == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);

		Qualification q = qualificationService.getQualification(id);
		if (q == null || q.getUserId() != user.getId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = qualificationService.removeQualification(id);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);

		return new ResponseEntity<Integer>(id, HttpStatus.OK);
	}

}
