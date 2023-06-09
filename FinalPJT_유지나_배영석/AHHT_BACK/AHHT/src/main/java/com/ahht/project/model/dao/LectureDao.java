package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface LectureDao {

	int insert(Lecture lecture);

	int update(Lecture lecture);

	List<Lecture> selectBySearchcondition(SearchCondition searchCondition);

	Lecture select(int id);

	int delete(int id);

	List<Lecture> selectLectureByExpert(int expert);

}
