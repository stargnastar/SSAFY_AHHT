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
import org.springframework.web.bind.annotation.DeleteMapping;
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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/gatherapi")
@Api(tags = "커뮤니티 컨트롤러")
public class BoardController {

	@Autowired
	private ArticleServie articleServie;
	@Autowired
	private BoardServie boardServie;
	@Autowired
	private UserService userService;

	//////////////////////////////////////////////////////////////////
	/// GET
	//////////////////////////////////////////////////////////////////
	@GetMapping("/gather")
	@ApiOperation(value = "모든 객체들을 반환한다", response = Article.class)
	public ResponseEntity<?> getArticles() {

		List<Article> list = articleServie.getArticleList();

		if (list == null || list.size() == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<List<Article>>(list, HttpStatus.OK);
	}

	@GetMapping("/gather/{id}")
	@ApiOperation(value = "{id}에 해당하는 객체를 반환한다", response = Article.class)
	public ResponseEntity<?> getArticles(HttpSession session, @PathVariable int id) {

		Article a = articleServie.getArticleById(id);

		if (a == null)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Article>(a, HttpStatus.OK);

	}

	@GetMapping("/gather/board/{boardName}")
	@ApiOperation(value = "{boardName}게시차판의 {id}에 해당하는 객체를 반환한다", response = Article.class)
	public ResponseEntity<?> getBoard(@PathVariable String boardName) {

		Board b = boardServie.getBoardIdByName(boardName);
		List<Article> a = articleServie.getArticleByBoardId(b.getId());

		if (a == null || a.size() == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_FOUND);
		return new ResponseEntity<List<Article>>(a, HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Post
	//////////////////////////////////////////////////////////////////

	@PostMapping("/gather")
	@ApiOperation(value = "객체를 등록한다")
	public ResponseEntity<?> addArticle(@RequestBody Article article,
			@RequestPart(required = false) MultipartFile file) {

		System.out.println(article);
		int a = 0;
		try {
			a = articleServie.writeArticle(article, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Integer>(-1, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
		return new ResponseEntity<Integer>(article.getId(), HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Put
	//////////////////////////////////////////////////////////////////

	@PutMapping("/gather")
	@ApiOperation(value = " 게시글을 수정한다")
	public ResponseEntity<?> modifyArticle(@RequestBody Article article,
			@RequestPart(required = false) MultipartFile file) {

		int a = 0;
		try {
			a = articleServie.modifyAritlce(article, file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Void>(HttpStatus.OK);

	}

	//////////////////////////////////////////////////////////////////
	// Delete
	//////////////////////////////////////////////////////////////////

	@DeleteMapping("/gather/{id}")
	@ApiOperation(value = "{id}번게시글을 삭제한다")
	public ResponseEntity<?> getArticle(@PathVariable int id) {

		int a = articleServie.removeArticle(id);

		if (a == 0)
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<Void>(HttpStatus.OK);

	}

}
