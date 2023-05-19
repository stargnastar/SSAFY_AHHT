package com.ahht.project.model.dao;

import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

public interface LectureDao {
	
	int insert(Lecture lecture);
	int update(Lecture lecture);
	Lecture selectBySearchcondition(SearchCondition searchCondition);
	Lecture select(int id);
	int delete(int id);

}
