package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.DietDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

public class DietServiceImpl implements DietService {
	@Autowired DietDao dao;
	
	private static final Logger logger=LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;
	
	private void fileHandling(Diet diet, MultipartFile file) throws IOException {
		//파일을 저장할 폴더 지정
		Resource res=resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if(file!=null && file.getSize()>0) {
			//prefix를 포함한 전체이름
			diet.setFileUri(System.currentTimeMillis()+"_"+file.getOriginalFilename());
			diet.setFileName(file.getOriginalFilename());
			diet.setFile(file);
			
			//변경된 파일 이름이 적용된 restaurant를 RestaurantService를 통해 DB에 저장한다
			file.transferTo(new File(res.getFile().getCanonicalPath()+"/"+diet.getFileUri()));
			
		}
	}

	@Override
	public int writetDiet(Diet diet, MultipartFile file) throws IOException {
		fileHandling(diet, file);
		return dao.insert(diet);
	}

	@Override
	public int modifyDiet(Diet diet, MultipartFile file) throws IOException {
		fileHandling(diet, file);
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
