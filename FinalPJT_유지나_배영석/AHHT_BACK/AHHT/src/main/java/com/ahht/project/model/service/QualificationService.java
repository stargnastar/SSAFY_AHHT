package com.ahht.project.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ahht.project.model.dto.Qualification;

public interface QualificationService {
	int writeQualification(Qualification qualification);
	int modifyQualification(Qualification qualification);
	List<Qualification> getQualificationByUser(int userId);
	List<Qualification> getQualificationList();
	Qualification getQualification(int id);
	int removeQualification(int id);

}
