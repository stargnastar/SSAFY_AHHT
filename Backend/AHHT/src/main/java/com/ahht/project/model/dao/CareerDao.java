package com.ahht.project.model.dao;

import java.util.List;

import com.ahht.project.model.dto.Career;
import com.ahht.project.model.dto.SearchCondition;

public interface CareerDao {
	
	int insert(Career career);
	int update(Career career);
	List<Career> selectByUser(int userId);
	Career select(int id);
	int delete(int id);
	
	

}
