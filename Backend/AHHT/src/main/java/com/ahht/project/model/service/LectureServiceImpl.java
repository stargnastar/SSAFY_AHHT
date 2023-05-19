package com.ahht.project.model.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.LectureDao;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

public class LectureServiceImpl implements LectureService{
	@Autowired
	private LectureDao dao;

	@Override
	public int writeLecture(Lecture lecture) {
		return dao.insert(lecture);
	}

	@Override
	public int modifyLecture(Lecture lecture) {
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
