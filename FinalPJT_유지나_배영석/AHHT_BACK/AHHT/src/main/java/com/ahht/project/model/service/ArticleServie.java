package com.ahht.project.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;


public interface ArticleServie {
	List<Article> getArticleList();

	Article getArticleById(int id);


	int writeArticle(Article article, MultipartFile file) throws IOException;

	int modifyAritlce(Article article, MultipartFile file) throws IOException;

	int removeArticle(int id);
//	public int getTotalArticleBySearchCondition(SearchCondition searchCondition);
	public List<Article> getArticleByBoardId(int boardId);


}
