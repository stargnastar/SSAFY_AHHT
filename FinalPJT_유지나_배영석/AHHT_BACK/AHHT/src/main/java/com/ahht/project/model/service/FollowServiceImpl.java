package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahht.project.model.dao.FollowDao;
import com.ahht.project.model.dto.Follow;

@Service
public class FollowServiceImpl implements FollowService{
	@Autowired
	private FollowDao dao;

	@Override
	public int addFollow(Follow follow) {
		return  dao.insert(follow);
	}

	@Override
	public int modifyFollow(Follow follow) {
		return dao.update(follow);
	}

	@Override
	public List<Follow> getFollowByFollower(int id) {
		return dao.selectByFollower(id);
	}

	@Override
	public List<Follow> getFollowByFollowed(int id) {
		return dao.selectByFollowed(id);
	}

	@Override
	public List<Follow> getFollowList() {
		return dao.selectAll();
				
	}

	@Override
	public Follow getFollow(int id) {
		return dao.select(id);
				
	}

	@Override
	public int removeFollow(int id) {
		return dao.delete(id);
	}

	@Override
	public Follow getFollowByff(Follow f) {
		return dao.selectFollow(f);
	}
	
	
	
}
