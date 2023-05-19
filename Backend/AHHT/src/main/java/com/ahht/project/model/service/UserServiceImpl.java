package com.ahht.project.model.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.UserDao;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao dao;

	@Override
	public int signUp(User user) {
		return dao.insert(user);
	}

	@Override
	public int modifyUser(User user) {
		return dao.update(user);
	}

	@Override
	public User getUserBySearchcondition(SearchCondition searchCondition) {
		return dao.selectBySearchcondition(searchCondition);
	}

	@Override
	public User getUser(int id) {
		return dao.select(id);
	}

	@Override
	public int withdraw(int id) {
		return dao.delete(id);
	}

}
