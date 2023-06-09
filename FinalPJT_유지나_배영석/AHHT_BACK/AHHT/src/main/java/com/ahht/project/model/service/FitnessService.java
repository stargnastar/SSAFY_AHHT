package com.ahht.project.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Fitness;

public interface FitnessService {
	List<Fitness> getFitnessByUserId(int userId);
	List<Fitness> getFitnessList();
	Fitness getFitness(int id);
	int removeFitness(int id);
	int writeFitness(Fitness fitness, MultipartFile file) throws IOException;
	int modifyFitness(Fitness fitness, MultipartFile file) throws IOException;

}
