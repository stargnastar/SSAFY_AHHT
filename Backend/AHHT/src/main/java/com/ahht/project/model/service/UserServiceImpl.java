package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.UserDao;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao dao;
	
	private static final Logger logger=LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;
	
	private void fileHandling(User user, MultipartFile file) throws IOException {
		//파일을 저장할 폴더 지정
		Resource res=resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if(file!=null && file.getSize()>0) {
			//prefix를 포함한 전체이름
			user.setFileUri(System.currentTimeMillis()+"_"+file.getOriginalFilename());
			user.setFileName(file.getOriginalFilename());
			user.setFile(file);
			
			//변경된 파일 이름이 적용된 restaurant를 RestaurantService를 통해 DB에 저장한다
			file.transferTo(new File(res.getFile().getCanonicalPath()+"/"+user.getFileUri()));
			
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
