package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.ArticleDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

@Service
public class ArticleServieImpl implements ArticleServie {

	@Autowired
	private ArticleDao dao;

	private static final Logger logger = LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;

	@Value("${upload.directory}")
	private String uploadDirectory;

	private void fileHandling(Article article, MultipartFile file) throws IOException {

		Resource res = resLoader.getResource(uploadDirectory);
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize() > 0) {

			article.setFileUri(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			article.setFileName(file.getOriginalFilename());
			article.setFile(file);

			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + article.getFileUri()));

		}
	}

	@Override
	public List<Article> getArticleList() {
		return dao.selectAll();
	}

	@Override
	public Article getArticleById(int id) {
		return dao.select(id);
	}

	@Transactional
	@Override
	public int writeArticle(Article article, MultipartFile file) throws IOException {
		fileHandling(article, file);
		return dao.insert(article);
	}

	@Transactional
	@Override
	public int modifyAritlce(Article article, MultipartFile file) throws IOException {
		fileHandling(article, file);
		return dao.update(article);
	}

	@Transactional
	@Override
	public int removeArticle(int id) {
		return dao.delete(id);
	}

	@Override
	public List<Article> getArticleByBoardId(int boardId) {
		return dao.selectByBoardId(boardId);
	}

}
