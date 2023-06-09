package com.ahht.project.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ahht.project.model.dto.Career;

public interface CareerService {
	
	int addCareer(Career career);
	int modifyCareeer(Career career);
	List<Career> getCareerByUser(int userId);
	Career getCareer(int id);
	int removeCareer(int id);

}
