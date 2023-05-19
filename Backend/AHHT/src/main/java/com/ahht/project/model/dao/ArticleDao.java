package com.ahht.project.model.dao;

import java.util.List;
import java.util.Map;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

public interface ArticleDao {
	
	
	
	List<Article> selectAll();
	Article select(int id);
	
	int insert(Article article);
	
	int update(Article article);
	
	int delete(int id);
	
	List<Article> selectByCondition(SearchCondition con);
	int getTotalArticleBySearchCondition(SearchCondition searchCondition);

	
}
