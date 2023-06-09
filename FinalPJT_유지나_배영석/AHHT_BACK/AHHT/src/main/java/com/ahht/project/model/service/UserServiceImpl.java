package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.UserDao;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao dao;

	private static final Logger logger = LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;

	@Value("${upload.directory}")
	private String uploadDirectory;

	private void fileHandling(User user, MultipartFile file) throws IOException {
		Resource res = resLoader.getResource(uploadDirectory);
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize() > 0) {
			user.setFileUri(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			user.setFileName(file.getOriginalFilename());
			user.setFile(file);

			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + user.getFileUri()));

		}
	}

	@Override
	public int signUp(User user, MultipartFile file) throws IOException {
		fileHandling(user, file);

		return dao.insert(user);
	}

	@Override
	public int modifyUser(User user, MultipartFile file) throws IOException {
		fileHandling(user, file);
		return dao.update(user);
	}

	@Override
	public User getUser(int id) {
		return dao.select(id);
	}

	@Override
	public int withdraw(int id) {
		return dao.delete(id);
	}

	@Override
	public List<User> getUserBySearchcondition(SearchCondition searchCondition) {
		return dao.selectBySearchcondition(searchCondition);
	}

	@Override
	public User getUserByEmail(String email) {
		return dao.getUserByEmail(email);
	}

}
