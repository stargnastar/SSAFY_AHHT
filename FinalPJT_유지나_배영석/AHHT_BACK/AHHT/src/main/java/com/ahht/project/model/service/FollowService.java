package com.ahht.project.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ahht.project.model.dto.Follow;

public interface FollowService {
	
	int addFollow(Follow follow);
	int modifyFollow(Follow follow);
	List<Follow> getFollowByFollower(int id);
	List<Follow> getFollowByFollowed(int id);
	List<Follow> getFollowList();
	Follow getFollow(int id);
	int removeFollow(int id);
	
	Follow getFollowByff(Follow f);

}
