package com.ahht.project.model.dao;

import com.ahht.project.model.dto.User;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.SearchCondition;

public interface UserDao {
	int insert(User user);

	int update(User user);

	List<User> selectBySearchcondition(SearchCondition searchCondition);

	User select(int id);

	int delete(int id);
	
	User getUserByEmail(String email);

}
