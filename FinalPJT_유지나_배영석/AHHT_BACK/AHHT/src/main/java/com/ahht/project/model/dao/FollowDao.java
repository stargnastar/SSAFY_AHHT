package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Follow;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface FollowDao {
	int insert(Follow follow);

	int update(Follow follow);

	List<Follow> selectByFollower(int id);

	List<Follow> selectByFollowed(int id);

	List<Follow> selectAll();

	Follow select(int id);

	int delete(int id);
	
	Follow selectFollow(Follow follow);
}
