package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.CareerDao;
import com.ahht.project.model.dto.Career;

public class CareerServiceImpl implements CareerService{
	@Autowired
	private CareerDao dao;

	@Override
	public int addCareer(Career career) {
		return dao.insert(career);
	}

	@Override
	public int modifyCareeer(Career career) {
		return dao.update(career);
	}

	@Override
	public List<Career> getCareerByUser(int userId) {
		return dao.selectByUser(userId);
	}

	@Override
	public Career getCareer(int id) {
		return dao.select(id);
	}

	@Override
	public int removeCareer(int id) {
		return dao.delete(id);
	}
	
	
	

}
