package com.ahht.project.model.service;

import java.util.List;

import com.ahht.project.model.dto.Board;
import com.ahht.project.model.dto.SearchCondition;
import com.ahht.project.model.dto.User;

public interface BoardServie {
	List<Board> getBoList();
	Board getBoard(int id);
	int addBoard(Board Board);
	int modifyBoard(Board Board);
	int removeBoard(int id);
	Board getBoardIdByName(String name);

}
