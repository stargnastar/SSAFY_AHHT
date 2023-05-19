package com.ahht.project.model.service;

import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

public interface UserService {
	
	int signUp(User user);
	int modifyUser(User user);
	User getUserBySearchcondition(SearchCondition searchCondition);
	User getUser(int id);
	int withdraw(int id);

}
