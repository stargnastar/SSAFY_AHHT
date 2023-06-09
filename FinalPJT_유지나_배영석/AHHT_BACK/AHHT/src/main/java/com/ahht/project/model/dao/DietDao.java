package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Career;
import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface DietDao {
	int insert(Diet diet);

	int update(Diet diet);

	List<Diet> selectByUserId(int id);

	List<Diet> selectAll();

	Diet select(int id);

	int delete(int id);

}
