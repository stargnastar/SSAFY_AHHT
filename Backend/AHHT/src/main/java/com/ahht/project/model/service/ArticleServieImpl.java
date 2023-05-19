package com.ahht.project.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dao.ArticleDao;
import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.util.PageNavigation;

public class ArticleServieImpl implements ArticleServie{
	
	@Autowired
	private ArticleDao dao;
	
	private static final Logger logger=LoggerFactory.getLogger(ArticleServieImpl.class);
	@Autowired
	ResourceLoader resLoader;
	
	private void fileHandling(Article article, MultipartFile file) throws IOException {
		//파일을 저장할 폴더 지정
		Resource res=resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if(file!=null && file.getSize()>0) {
			//prefix를 포함한 전체이름
			article.setFileUri(System.currentTimeMillis()+"_"+file.getOriginalFilename());
			article.setFileName(file.getOriginalFilename());
			article.setFile(file);
			
			//변경된 파일 이름이 적용된 restaurant를 RestaurantService를 통해 DB에 저장한다
			file.transferTo(new File(res.getFile().getCanonicalPath()+"/"+article.getFileUri()));
			
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



	@Override
	public int writeArticle(Article article, MultipartFile file) throws IOException {
		fileHandling(article, file);
		return dao.insert(article);
	}

	@Override
	public int modifyAritlce(Article article, MultipartFile file) throws IOException {
		fileHandling(article, file);
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
	public Map<String, Object>  getArticleByConditionWithPaging(SearchCondition con) {
		Map<String, Object> map=new HashMap<String, Object>();
		List<Article> list=dao.selectByCondition(con);
		map.put("articles", list);
		
		int totalCount=dao.getTotalArticleBySearchCondition(con);
		PageNavigation navigation=new PageNavigation(con.getCurrentPage(), totalCount);
		map.put("navigation", navigation);
		
		return map;
		
	}


	

}
