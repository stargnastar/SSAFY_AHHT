package com.ahht.project.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RestController;

import com.ahht.project.model.dto.Follow;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.FollowService;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/followapi")
@Api(tags = "팔로우 컨트롤러")
public class FollowController {

	@Autowired
	private FollowService followService;

	@Autowired
	private UserService userService;

	@GetMapping("/follower/{id}")
	@ApiOperation(value = "{id}에 해당하는 유저가 팔로우 하는 사람들을 반환", response = User.class)
	public ResponseEntity<?> getFollowers(@PathVariable int id) {
		List<Follow> list = followService.getFollowByFollower(id);
		if (list == null || list.size() == 0)
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

		List<User> followers = new ArrayList<User>();
		for (int i = 0; i < list.size(); i++) {
			followers.add(userService.getUser(list.get(i).getFollowed()));
		}

		return new ResponseEntity<List<User>>(followers, HttpStatus.OK);

	}

	@GetMapping("/followed/{id}")
	@ApiOperation(value = "{id}에 해당하는 유저를 팔로우 하는 사람들을 반환", response = User.class)
	public ResponseEntity<?> getFollowingPeople(@PathVariable int id) {
		List<Follow> list = followService.getFollowByFollowed(id);
		if (list == null || list.size() == 0)
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

		List<User> followed = new ArrayList<User>();
		for (int i = 0; i < list.size(); i++) {
			followed.add(userService.getUser(list.get(i).getFollower()));
		}

		return new ResponseEntity<List<User>>(followed, HttpStatus.OK);

	}

	@PostMapping("/follow/{id}")
	@ApiOperation(value = "{id}번 유저 팔로우 하기", response = User.class)
	public ResponseEntity<?> doFollow(HttpSession session, @PathVariable int id) {

		User u = (User) session.getAttribute("loginUser");
		if (u == null)
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);

		int a = followService.addFollow(new Follow(u.getId(), id));
		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);

		return new ResponseEntity<Void>(HttpStatus.OK);

	}

	@DeleteMapping("/follow/{id}")
	@ApiOperation(value = "{id}번 유저 팔로우 취소")
	public ResponseEntity<?> dounFollow(HttpSession session, @PathVariable int id) {

		User u = (User) session.getAttribute("loginUser");
		if (u == null)
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		Follow f = followService.getFollowByff(new Follow(u.getId(), id));

		if (f == null)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);

		int a = followService.removeFollow(f.getId());
		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);

		return new ResponseEntity<Void>(HttpStatus.OK);

	}

}
