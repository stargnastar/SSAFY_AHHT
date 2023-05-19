package com.ahht.project.model.service;

import java.util.List;

import com.ahht.project.model.dto.Fitness;

public interface FitnessService {
	int writeFitness(Fitness fitness);
	int modifyFitness(Fitness fitness);
	List<Fitness> getFitnessByUserId(int userId);
	List<Fitness> getFitnessList();
	Fitness getFitness(int id);
	int removeFitness(int id);

}
