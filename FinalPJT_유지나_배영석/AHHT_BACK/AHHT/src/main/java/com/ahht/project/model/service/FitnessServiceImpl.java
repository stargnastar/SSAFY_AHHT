package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.FitnessDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Fitness;

@Service
public class FitnessServiceImpl implements FitnessService {

	@Autowired
	private FitnessDao dao;

	private static final Logger logger = LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;

	@Value("${upload.directory}")
	private String uploadDirectory;

	private void fileHandling(Fitness fitness, MultipartFile file) throws IOException {
		Resource res = resLoader.getResource(uploadDirectory);
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize() > 0) {
			fitness.setFileUri(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			fitness.setFileName(file.getOriginalFilename());
			fitness.setFile(file);

			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + fitness.getFileUri()));

		}
	}

	@Override
	public int writeFitness(Fitness fitness, MultipartFile file) throws IOException {
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
