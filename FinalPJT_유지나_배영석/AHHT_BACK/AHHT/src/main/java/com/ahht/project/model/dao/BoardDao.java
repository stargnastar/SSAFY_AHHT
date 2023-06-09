package com.ahht.project.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ahht.project.model.dto.Board;
import com.ahht.project.model.dto.SearchCondition;

@Repository
public interface BoardDao {
	List<Board> selectAll();

	Board select(int id);

	Board getBoardIdByName(String name);

	int insert(Board Board);

	int update(Board Board);

	int delete(int id);
}
