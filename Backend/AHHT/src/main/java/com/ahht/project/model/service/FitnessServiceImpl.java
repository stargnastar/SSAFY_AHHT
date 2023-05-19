package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.FitnessDao;
import com.ahht.project.model.dto.Fitness;

public class FitnessServiceImpl implements FitnessService{
	
	@Autowired
	private FitnessDao dao;

	@Override
	public int writeFitness(Fitness fitness) {
		return dao.insert(fitness);
	}

	@Override
	public int modifyFitness(Fitness fitness) {
		return dao.update(fitness);
	}

	@Override
	public List<Fitness> getFitnessByUserId(int userId) {
		return dao.selectByUserId(userId);
	}

	@Override
	public List<Fitness> getFitnessList() {
		return dao.selectAll();
				
	}

	@Override
	public Fitness getFitness(int id) {
		return dao.select(id);
	}

	@Override
	public int removeFitness(int id) {
		return dao.delete(id);
	}

}
