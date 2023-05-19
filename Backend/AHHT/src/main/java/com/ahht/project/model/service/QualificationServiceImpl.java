package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.QualificationDao;
import com.ahht.project.model.dto.Qualification;

public class QualificationServiceImpl implements QualificationService{
	@Autowired
	private QualificationDao dao;

	@Override
	public int writeQualification(Qualification qualification) {
		return dao.insert(qualification);
	}

	@Override
	public int modifyQualification(Qualification qualification) {
		return dao.update(qualification);
	}

	@Override
	public List<Qualification> getQualificationByUser(int userId) {
		return dao.selectByUser(userId);
	}

	@Override
	public List<Qualification> getQualificationList() {
		return dao.selectAll();
				
	}

	@Override
	public Qualification getQualification(int id) {
		return dao.select(id);
	}

	@Override
	public int removeQualification(int id) {
		return dao.delete(id);
	}

}
