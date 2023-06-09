package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Qualification;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface QualificationDao {

	int insert(Qualification qualification);

	int update(Qualification qualification);

	List<Qualification> selectByUser(int userId);

	List<Qualification> selectAll();

	Qualification select(int id);

	int delete(int id);

}
