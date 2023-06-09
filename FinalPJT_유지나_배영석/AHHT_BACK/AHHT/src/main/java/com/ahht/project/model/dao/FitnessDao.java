package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Career;
import com.ahht.project.model.dto.Fitness;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface FitnessDao {
	int insert(Fitness fitness);

	int update(Fitness fitness);

	List<Fitness> selectByUserId(int userId);

	List<Fitness> selectAll();

	Fitness select(int id);

	int delete(int id);

}
