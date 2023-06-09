package com.ahht.project.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.Fitness;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.FitnessService;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/fitnessapi")
@Api(tags = "운동기록 컨트롤러")
public class FitnessController {

	@Autowired
	private FitnessService fitnessService;

	@Autowired
	private UserService userService;

	//////////////////////////////////////////////////////////////////
	/// GET
	//////////////////////////////////////////////////////////////////

	@GetMapping("/fitness/{userid}")
	@ApiOperation(value = "{userid}에 해당하는 객체를 반환한다", response = Fitness.class)
	public ResponseEntity<?> getDietById(HttpSession session, @PathVariable int userid) {

		List<Fitness> fitness = fitnessService.getFitnessByUserId(userid);

		return new ResponseEntity<List<Fitness>>(fitness, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Post
	//////////////////////////////////////////////////////////////////

	@PostMapping("/fitness")
	@ApiOperation(value = "Fitness 객체를 등록한다")
	public ResponseEntity<?> addArticle(HttpSession session, @RequestParam int userid, @RequestBody Fitness fitness,
			@RequestPart(required = false) MultipartFile file) {

		fitness.setUserId(userid);

		int a = 0;
		try {
			a = fitnessService.writeFitness(fitness, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
		return new ResponseEntity<Integer>(fitness.getId(), HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Put
	//////////////////////////////////////////////////////////////////

	@PutMapping("/fitness")
	@ApiOperation(value = " 게시글을 수정한다")
	public ResponseEntity<?> modifyArticle(HttpSession session, @RequestBody Fitness fitness,
			@RequestPart(required = false) MultipartFile file) {

		User user = (User) session.getAttribute("loginUser");
		if (user.getId() != fitness.getUserId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = 0;
		try {
			a = fitnessService.modifyFitness(fitness, file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Integer>(fitness.getId(), HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Delete
	//////////////////////////////////////////////////////////////////

	@DeleteMapping("/fitness/{id}")
	@ApiOperation(value = "{id}번 식단을 삭제한다")
	public ResponseEntity<?> deleteFitness(HttpSession session, @PathVariable int id) {

		int a = fitnessService.removeFitness(id);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Void>(HttpStatus.OK);

	}

}
