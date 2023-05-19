package com.ahht.project.model.dao;

import java.util.List;
import java.util.Map;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

public interface ArticleDao {
	
	
	
	List<Article> selectAll();
	Article select(int id);
	List<Article> getArticleByConditionWithPaging(SearchCondition searchCondition);
	
	int insert(Article article);
	
	int update(Article article);
	
	int delete(int id);
	
	int getTotalArticleBySearchCondition(SearchCondition searchCondition);

	
	List<Article> selectByPage(Map map);
}
