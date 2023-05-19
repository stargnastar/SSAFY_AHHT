package com.ahht.project.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

public interface LectureService {

	

	Lecture getLectureBySearchcondition(SearchCondition searchCondition);
	Lecture getLecture(int id);
	int removeLecture(int id);
	int writeLecture(Lecture lecture, MultipartFile file) throws IOException;
	int modifyLecture(Lecture lecture, MultipartFile file) throws IOException;
}
