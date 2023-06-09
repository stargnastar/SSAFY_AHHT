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

import com.ahht.project.model.dto.Fitness;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.CareerService;
import com.ahht.project.model.service.FitnessService;
import com.ahht.project.model.service.LectureService;
import com.ahht.project.model.service.QualificationService;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/lectureapi")
@Api(tags = "상담 컨트롤러")
public class LectureController {

	@Autowired
	private LectureService lectureService;

	@Autowired
	private UserService userService;

	//////////////////////////////////////////////////////////////////
	/// GET
	//////////////////////////////////////////////////////////////////
	@GetMapping("/lecture")
	@ApiOperation(value = "의사 및 트레이너의 강의를 모두 조회한다", response = Lecture.class)
	public ResponseEntity<?> getLectures() {

		List<Lecture> list = lectureService.getLectureBySearchcondition(new SearchCondition());

		if (list == null || list.size() == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<Lecture>>(list, HttpStatus.OK);
	}

	@GetMapping("/lecture/{expert}")
	@ApiOperation(value = "전문직 분류코드{expert}에 해당하는 강의를 모두 조회한다", response = Lecture.class)
	public ResponseEntity<?> getLectures(@PathVariable int expert) {

		List<Lecture> list = lectureService.getLectureByExpert(expert);

		if (list == null || list.size() == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<Lecture>>(list, HttpStatus.OK);
	}

	@GetMapping("/lecture/expert/{id}")
	@ApiOperation(value = "{id}에 해당하는 객체를 반환한다", response = Lecture.class)
	public ResponseEntity<?> getLectureById(@PathVariable int id) {

		Lecture l = lectureService.getLecture(id);
		if (l == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.NO_CONTENT);
		return new ResponseEntity<Lecture>(l, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Post
	//////////////////////////////////////////////////////////////////

	@PostMapping("/Lecture")
	@ApiOperation(value = "Lecture 객체를 등록한다")
	public ResponseEntity<?> addLecture(@RequestParam int userId, HttpSession session, @RequestBody Lecture lecture,
			@RequestPart(required = false) MultipartFile file) {

		lecture.setUserId(userId);

		int a = 0;
		try {
			a = lectureService.writeLecture(lecture, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<Void>(HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Put
	//////////////////////////////////////////////////////////////////

	@PutMapping("/Lecture")
	@ApiOperation(value = " 게시글을 수정한다")
	public ResponseEntity<?> modifyLecture(HttpSession session, @RequestBody Lecture lecture,
			@RequestPart(required = false) MultipartFile file) {

		User user = (User) session.getAttribute("loginUser");
		if (user.getId() != lecture.getUserId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = 0;
		try {
			a = lectureService.modifyLecture(lecture, file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Integer>(lecture.getId(), HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Delete
	//////////////////////////////////////////////////////////////////

	@DeleteMapping("/lecture/{id}")
	@ApiOperation(value = "{id}번 객체를 삭제한다")
	public ResponseEntity<?> deleteLecture(HttpSession session, int id) {

		User user = (User) session.getAttribute("loginUser");
		Lecture lecture = lectureService.getLecture(id);
		// 운동기록 작성자와 동일한지 확인
		if (lecture.getUserId() != user.getId()) {
			return new ResponseEntity<Integer>(-1, HttpStatus.UNAUTHORIZED);
		}

		int a = lectureService.removeLecture(id);

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Integer>(id, HttpStatus.OK);

	}

}
