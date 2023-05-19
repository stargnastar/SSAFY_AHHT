package com.ahht.project.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.ArticleDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

public class ArticleServieImpl implements ArticleServie{
	
	@Autowired
	private ArticleDao dao;

	@Override
	public List<Article> getArticleList() {
		return dao.selectAll();
	}

	@Override
	public Article getArticleById(int id) {
		return dao.select(id);
	}

	@Override
	public List<Article> getArticleByConditionWithPaging(SearchCondition searchCondition) {
		return dao.getArticleByConditionWithPaging(searchCondition);
	}

	@Override
	public int writeArticle(Article article) {
		return dao.insert(article);
	}

	@Override
	public int modifyAritlce(Article article) {
		return dao.update(article);
	}

	@Override
	public int removeArticle(int id) {
		return dao.delete(id);
	}

	@Override
	public int getTotalArticleBySearchCondition(SearchCondition searchCondition) {
		return dao.getTotalArticleBySearchCondition(searchCondition);
	}	

	@Override
	public List<Article> selectByPage(int page, int pageSize) {
		  int startRow = (page - 1) * pageSize;

		    Map<String, Object> parameters = new HashMap<>();
		    parameters.put("startRow", startRow);
		    parameters.put("pageSize", pageSize);

		    return dao.selectByPage(parameters);
	}
	

}
