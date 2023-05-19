package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.LectureDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

public class LectureServiceImpl implements LectureService{
	@Autowired
	private LectureDao dao;
	
	private static final Logger logger=LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;
	
	private void fileHandling(Lecture lecture, MultipartFile file) throws IOException {
		//파일을 저장할 폴더 지정
		Resource res=resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if(file!=null && file.getSize()>0) {
			//prefix를 포함한 전체이름
			lecture.setFileUri(System.currentTimeMillis()+"_"+file.getOriginalFilename());
			lecture.setFileName(file.getOriginalFilename());
			lecture.setFile(file);
			
			//변경된 파일 이름이 적용된 restaurant를 RestaurantService를 통해 DB에 저장한다
			file.transferTo(new File(res.getFile().getCanonicalPath()+"/"+lecture.getFileUri()));
			
		}
	}

	@Override
	public int writeLecture(Lecture lecture, MultipartFile file) throws IOException {
		fileHandling(lecture, file);
		return dao.insert(lecture);
	}

	@Override
	public int modifyLecture(Lecture lecture, MultipartFile file) throws IOException{
		fileHandling(lecture, file);
		return dao.update(lecture);
	}

	@Override
	public Lecture getLectureBySearchcondition(SearchCondition searchCondition) {
		return dao.selectBySearchcondition(searchCondition);
	}

	@Override
	public Lecture getLecture(int id) {
		return dao.select(id);
	}

	@Override
	public int removeLecture(int id) {
		return dao.delete(id);
	}
	
	

}
