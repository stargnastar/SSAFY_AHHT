package com.ahht.project.model.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface ArticleDao {

	List<Article> selectAll();

	Article select(int id);

	int insert(Article article);

	int update(Article article);

	int delete(int id);

	List<Article> selectByBoardId(int id);

	int getTotalArticleBySearchCondition(SearchCondition searchCondition);

}
