package com.ahht.project.model.service;

import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

public interface LectureService {

	
	int writeLecture(Lecture lecture);
	int modifyLecture(Lecture lecture);
	Lecture getLectureBySearchcondition(SearchCondition searchCondition);
	Lecture getLecture(int id);
	int removeLecture(int id);
}
