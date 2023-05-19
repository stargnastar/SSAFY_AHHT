package com.ahht.project.model.service;

import java.util.List;

import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

public interface DietService {
	int writetDiet(Diet diet);
	int modifyDiet(Diet diet);
	List<Diet> getDietBySearchCondition(SearchCondition con);
	List<Diet> getDietList();
	Diet getDiet(int id);
	int removeDiet(int id);


}
