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

import com.ahht.project.model.dao.FitnessDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Fitness;

public class FitnessServiceImpl implements FitnessService{
	
	@Autowired
	private FitnessDao dao;
	
	private static final Logger logger=LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;
	
	private void fileHandling(Fitness fitness, MultipartFile file) throws IOException {
		//파일을 저장할 폴더 지정
		Resource res=resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if(file!=null && file.getSize()>0) {
			//prefix를 포함한 전체이름
			fitness.setFileUri(System.currentTimeMillis()+"_"+file.getOriginalFilename());
			fitness.setFileName(file.getOriginalFilename());
			fitness.setFile(file);
			
			//변경된 파일 이름이 적용된 restaurant를 RestaurantService를 통해 DB에 저장한다
			file.transferTo(new File(res.getFile().getCanonicalPath()+"/"+fitness.getFileUri()));
			
		}
	}

	@Override
	public int writeFitness(Fitness fitness, MultipartFile file) throws IOException{
		fileHandling(fitness, file);
		return dao.insert(fitness);
	}

	@Override
	public int modifyFitness(Fitness fitness, MultipartFile file) throws IOException {
		fileHandling(fitness, file);
		return dao.update(fitness);
	}

	@Override
	public List<Fitness> getFitnessByUserId(int userId) {
		return dao.selectByUserId(userId);
	}

	@Override
	public List<Fitness> getFitnessList() {
		return dao.selectAll();
				
	}

	@Override
	public Fitness getFitness(int id) {
		return dao.select(id);
	}

	@Override
	public int removeFitness(int id) {
		return dao.delete(id);
	}

}
