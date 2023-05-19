package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.DietDao;
import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

public class DietServiceImpl implements DietService {
	@Autowired DietDao dao;

	@Override
	public int writetDiet(Diet diet) {
		return dao.insert(diet);
	}

	@Override
	public int modifyDiet(Diet diet) {
		return dao.update(diet);
	}

	@Override
	public List<Diet> getDietBySearchCondition(SearchCondition con) {
		return dao.selectBySearchCondition(con);
	}

	@Override
	public List<Diet> getDietList() {
		return dao.selectAll();
	}

	@Override
	public Diet getDiet(int id) {
		return dao.select(id);
	}

	@Override
	public int removeDiet(int id) {
		return dao.delete(id);
	}

}
