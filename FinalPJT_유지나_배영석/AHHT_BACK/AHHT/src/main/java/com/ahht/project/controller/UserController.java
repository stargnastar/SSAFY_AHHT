package com.ahht.project.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Career;
import com.ahht.project.model.dto.Follow;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.LoginRequest;
import com.ahht.project.model.dto.Qualification;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.CareerService;
import com.ahht.project.model.service.FollowService;
import com.ahht.project.model.service.LectureService;
import com.ahht.project.model.service.QualificationService;
import com.ahht.project.model.service.UserService;
import com.ahht.project.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/userapi")
@Api(tags = "사용자 컨트롤러")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private JwtUtil jwtUtil;

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	//////////////////////////////////////////////////////////////////
	/// GET
	//////////////////////////////////////////////////////////////////
	@GetMapping("/user")
	@ApiOperation(value = "전체회원", response = User.class)
	public ResponseEntity<?> getUsers(HttpSession session) {
		User user = (User) session.getAttribute("loginUser");
		System.out.println(user);
		List<User> users = userService.getUserBySearchcondition(new SearchCondition());
		if (users == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);

		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@GetMapping("/user/{id}")
	@ApiOperation(value = "{id}번 회원의 마이페이지", response = User.class)
	public ResponseEntity<?> getMypage(@PathVariable int id) {

		User user = userService.getUser(id);

		if (user == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<Void> logout(HttpSession session) {
		session.invalidate();
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	//////////////////////////////////////////////////////////////////
	// Post
	//////////////////////////////////////////////////////////////////

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest user, HttpSession session) {

		Map<String, Object> result = new HashMap<String, Object>();

		User tmp = userService.getUserByEmail(user.getEmail());
		// 회원가입 한 적 없음
		if (tmp == null || !tmp.getPassword().equals(user.getPassword())) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}
		session.setAttribute("loginUser", tmp);
		return new ResponseEntity<User>(tmp, HttpStatus.OK);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user, @RequestPart(required = false) MultipartFile file) {

		User tmp = userService.getUserByEmail(user.getEmail());

		if (tmp != null) {
			System.out.println(1);
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}

		int a = 0;
		try {
			a = userService.signUp(user, file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (a == 0) {
			System.out.println(2);
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(1, HttpStatus.OK);
	}

	@PostMapping("/check-email/{email}")
	@ApiOperation(value = "{email}을 가진 사용자가 있는지 확인하고 응답해줌")
	public ResponseEntity<?> checkEmailAvailability(@PathVariable String email) {

		System.out.println(email);
		User existingUser = userService.getUserByEmail(email);
		System.out.println(existingUser);
		if (existingUser != null) {
			return new ResponseEntity<User>(existingUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(existingUser, HttpStatus.OK);
		}
	}

	//////////////////////////////////////////////////////////////////
	// Put
	//////////////////////////////////////////////////////////////////

	@PutMapping("/modify")
	public ResponseEntity<?> modi(@RequestBody User user, @RequestPart(required = false) MultipartFile file) {

		int a = 0;
		try {
			a = userService.modifyUser(user, file);
		} catch (IOException e) {

			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Void>(HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Delete
	//////////////////////////////////////////////////////////////////

}
