package com.ahht.project.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

public interface ArticleServie {



		List<Article> getArticleList();
		Article getArticleById(int id);
		Map<String, Object> getArticleByConditionWithPaging(SearchCondition searchCondition);
		
		int writeArticle(Article article, MultipartFile file) throws IOException;
		
		int modifyAritlce(Article article, MultipartFile file) throws IOException;
		
		int removeArticle(int id);
		
		int getTotalArticleBySearchCondition(SearchCondition searchCondition);



}
