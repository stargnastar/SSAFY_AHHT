package com.ahht.project.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

public interface UserService {

	User getUserBySearchcondition(SearchCondition searchCondition);
	User getUser(int id);
	int withdraw(int id);
	int signUp(User user, MultipartFile file) throws IOException;
	int modifyUser(User user, MultipartFile file) throws IOException;

}
