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

import com.ahht.project.model.dao.LectureDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Fitness;
import com.ahht.project.model.dto.Lecture;
import com.ahht.project.model.dto.SearchCondition;

@Service
public class LectureServiceImpl implements LectureService {
	@Autowired
	private LectureDao dao;

	private static final Logger logger = LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;

	@Value("${upload.directory}")
	private String uploadDirectory;

	private void fileHandling(Lecture lecture, MultipartFile file) throws IOException {
		Resource res = resLoader.getResource(uploadDirectory);
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize() > 0) {
			lecture.setFileUri(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			lecture.setFileName(file.getOriginalFilename());
			lecture.setFile(file);

			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + lecture.getFileUri()));

		}
	}

	@Override
	public int writeLecture(Lecture lecture, MultipartFile file) throws IOException {
		System.out.println(lecture);
		fileHandling(lecture, file);

		return dao.insert(lecture);
	}

	@Override
	public int modifyLecture(Lecture lecture, MultipartFile file) throws IOException {
		fileHandling(lecture, file);
		return dao.update(lecture);
	}

	@Override
	public List<Lecture> getLectureBySearchcondition(SearchCondition searchCondition) {
		return dao.selectBySearchcondition(searchCondition);
	}

	@Override
	public Lecture getLecture(int id) {
		return dao.select(id);
	}

	@Override
	public int removeLecture(int id) {
		return dao.delete(id);
	}

	@Override
	public List<Lecture> getLectureByExpert(int expert) {
		return dao.selectLectureByExpert(expert);
	}

}
