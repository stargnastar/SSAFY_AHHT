package com.ahht.project.model.dao;

import java.util.List;

import com.ahht.project.model.dto.Board;
import com.ahht.project.model.dto.SearchCondition;

public interface BoardDao {
	List<Board> selectAll();
	Board select(int id);
	Board getBoardIdByName(String name);
	int insert(Board Board);
	int update(Board Board);
	int delete(int id);
}
