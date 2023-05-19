package com.ahht.project.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

public interface DietService {
	List<Diet> getDietBySearchCondition(SearchCondition con);
	List<Diet> getDietList();
	Diet getDiet(int id);
	int removeDiet(int id);
	int writetDiet(Diet diet, MultipartFile file) throws IOException;
	int modifyDiet(Diet diet, MultipartFile file) throws IOException;


}
