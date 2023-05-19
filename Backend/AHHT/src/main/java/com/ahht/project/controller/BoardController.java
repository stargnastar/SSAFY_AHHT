package com.ahht.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ahht.project.model.dto.Article;
import com.ahht.project.model.dto.Board;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;
import com.ahht.project.model.service.ArticleServie;
import com.ahht.project.model.service.BoardServie;
import com.ahht.project.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/gatherapi")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class BoardController {

	@Autowired
	private ArticleServie articleServie;
	@Autowired
	private BoardServie boardServie;
	@Autowired
	private UserService userService;

	
	//////////////////////////////////////////////////////////////////
	///GET
	//////////////////////////////////////////////////////////////////
	@GetMapping("/gather")
	@ApiOperation(value = "모든 객체들을 반환한다", response = Article.class)
	public ResponseEntity<?> selectArticleByCondidionWithPaginf(@ModelAttribute SearchCondition searchCondition) {

		Map<String, Object> list = articleServie.getArticleByConditionWithPaging(searchCondition);
		
		
		if (list.isEmpty())
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Map<String, Object>>(list, HttpStatus.OK);
	}

	
	@GetMapping("/gather/{boardName}")
	@ApiOperation(value = "{boardName}게시차판에 해당하는 객체들을 반환한다", response = Article.class)
	public ResponseEntity<?> getArticleByBoard(@PathVariable String name) {
		Board b = boardServie.getBoardIdByName(name);

		SearchCondition searchCondition = new SearchCondition("boardId", String.valueOf(b.getId()), "id", "Desc");
		searchCondition.setLimit(true);
		searchCondition.setCurrentPage(1);

		Map<String, Object> articleList = articleServie.getArticleByConditionWithPaging(searchCondition);

		if (articleList.isEmpty())
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Map<String, Object>>(articleList, HttpStatus.OK);

	}
	
	@GetMapping("/gather/{boardName}/{id}")
	@ApiOperation(value = "{boardName}게시차판의 {id}에 해당하는 객체를 반환한다", response = Article.class)
	public ResponseEntity<?> getArticles(HttpSession session, @PathVariable int id) {
	
		Article a=articleServie.getArticleById(id);

		if (a==null)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Article>(a, HttpStatus.OK);

	}
	

	
	//////////////////////////////////////////////////////////////////
	//Post
	//////////////////////////////////////////////////////////////////
	
	@PostMapping("/gather/{boardName}")
	@ApiOperation(value = "{boardName}게시판에 객체를 등록한다", response = Article.class)
	public ResponseEntity<?> getArticle(HttpSession session, @RequestParam Article article, @PathVariable String boardName, @RequestPart(required = false)MultipartFile file) {
		//로그인 한 사용자의 정보를 받아와 article에 set
		User user=(User)session.getAttribute("loginUser");
		article.setWriterId(user.getId());
		
		//게시판 정보 확인
		Board b=boardServie.getBoardIdByName(boardName);
		if(b==null) return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		article.setBoardId(b.getId());
		
		int a=0;
		try {
			a = articleServie.writeArticle(article, file);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (a==0)
			return new ResponseEntity<Void>(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
		return new ResponseEntity<Void>( HttpStatus.OK);

	}
	
	@PutMapping("/{boardName}/{id}")
	@ApiOperation(value = "{boardName}게시차판의 {id}에 해당하는 객체를 반환한다", response = Article.class)
	public ResponseEntity<?> getArticle(@PathVariable int id) {

		Article a=articleServie.getArticleById(id);

		if (a==null)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Article>(a, HttpStatus.OK);

	}
	


}
