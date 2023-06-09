package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.DietDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Diet;
import com.ahht.project.model.dto.SearchCondition;

@Service
public class DietServiceImpl implements DietService {
	@Autowired
	DietDao dao;

	private static final Logger logger = LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;

	private void fileHandling(Diet diet, MultipartFile file) throws IOException {

		Resource res = resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize() > 0) {
			diet.setFileUri(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			diet.setFileName(file.getOriginalFilename());
			diet.setFile(file);

			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + diet.getFileUri()));

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

	@Override
	public List<Diet> getDietByUserId(int id) {
		return dao.selectByUserId(id);
	}

}
