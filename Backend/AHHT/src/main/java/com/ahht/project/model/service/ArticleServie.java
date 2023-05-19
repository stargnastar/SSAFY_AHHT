package com.ahht.project.model.service;

import java.util.List;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

public interface ArticleServie {



		List<Article> getArticleList();
		Article getArticleById(int id);
		List<Article> getArticleByConditionWithPaging(SearchCondition searchCondition);
		
		int writeArticle(Article article);
		
		int modifyAritlce(Article article);
		
		int removeArticle(int id);
		
		int getTotalArticleBySearchCondition(SearchCondition searchCondition);

		
		List<Article> selectByPage(int page, int pageSize);
	
	


}
