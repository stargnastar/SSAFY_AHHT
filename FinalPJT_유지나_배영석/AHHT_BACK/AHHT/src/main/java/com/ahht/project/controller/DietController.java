package com.ahht.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Board;
import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.DietService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/dietapi")
@Api(tags = "식단 컨트롤러")
//@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
//		RequestMethod.DELETE })
public class DietController {
	@Autowired
	private DietService dietService;
	@Autowired
	private UserController userService;

	//////////////////////////////////////////////////////////////////
	/// GET
	//////////////////////////////////////////////////////////////////
	@GetMapping("/diet")
	@ApiOperation(value = "로그인 한 사용자의 모든 객체들을 반환한다", response = Diet.class)
	public ResponseEntity<?> selectDietByCondidionWithPaginf(HttpSession session) {
//		//현재 로그인 한 사용자 정보를 받아온다
		User user = (User) session.getAttribute("loginUser");
		if (user == null) {
			System.out.println("사용자 없음");
			return new ResponseEntity<>("There is no loginUser", HttpStatus.NO_CONTENT);
		}
//		
		// 사용자가 존재한다면 식단 목록을 가져온다
		List<Diet> list = dietService.getDietByUserId(user.getId());
		System.out.println("식단을 출력합니다");

		for (Diet d : list) {

			System.out.println(d);
		}
		if (list == null || list.size() == 0)
			return new ResponseEntity<>("There is no content", HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<Diet>>(list, HttpStatus.OK);
	}

	@GetMapping("/diet/{id}")
	@ApiOperation(value = "{id}에 해당하는 객체를 반환한다", response = Diet.class)
	public ResponseEntity<?> getDietById(@PathVariable int id) {

		System.out.println(id + "번 식단을 찾자");
		Diet diet = dietService.getDiet(id);
		System.out.println(diet);
		if (diet == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);
		return new ResponseEntity<Diet>(diet, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Post
	//////////////////////////////////////////////////////////////////

	@PostMapping("/diet")
	@ApiOperation(value = "Diet 객체를 등록한다")
	public ResponseEntity<?> addDiet(HttpSession session, @RequestBody Diet diet,
			@RequestPart(required = false) MultipartFile file) {
		// 로그인 한 사용자의 정보를 받아와
		User user = (User) session.getAttribute("loginUser");
		diet.setUserId(user.getId());

		int a = 0;
		try {
			a = dietService.writetDiet(diet, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
		return new ResponseEntity<Diet>(diet, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Put
	//////////////////////////////////////////////////////////////////

	@PutMapping("/diet")
	@ApiOperation(value = " 게시글을 수정한다")
	public ResponseEntity<?> modifyDiet(HttpSession session, @RequestBody Diet diet,
			@RequestPart(required = false) MultipartFile file) {

		// 로그인 한 사용자의 정보를 받아와 작성자와 일치하는지 확인
		User user = (User) session.getAttribute("loginUser");
		if (user.getId() != diet.getUserId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = 0;
		try {
			a = dietService.modifyDiet(diet, file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (a == 0)
			return new ResponseEntity<Integer>(-2, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Diet>(diet, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Delete
	//////////////////////////////////////////////////////////////////

	@DeleteMapping("/diet/{id}")
	@ApiOperation(value = "{id}번 식단을 삭제한다")
	public ResponseEntity<?> removeDiet(HttpSession session, @PathVariable int id) {

		User user = (User) session.getAttribute("loginUser");
		if (user == null)
			return new ResponseEntity<Integer>(-2, HttpStatus.UNAUTHORIZED);
		Diet diet = dietService.getDiet(id);

		System.out.println(user);
		System.out.println(diet);
		// 게시글의 작성자와 동일한지 확인
		if (diet == null || diet.getUserId() != user.getId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = dietService.removeDiet(id);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Diet>(diet, HttpStatus.OK);

	}

}
