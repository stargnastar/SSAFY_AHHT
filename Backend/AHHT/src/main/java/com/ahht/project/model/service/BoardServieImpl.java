package com.ahht.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ahht.project.model.dao.BoardDao;
import com.ahht.project.model.dto.Board;

public class BoardServieImpl implements BoardServie{
	@Autowired
	private BoardDao dao;

	@Override
	public List<Board> getBoList() {
		return dao.selectAll();
	}

	@Override
	public Board getBoard(int id) {
		return dao.select(id);
	}

	@Override
	public int addBoard(Board Board) {
		return dao.insert(Board);
	}

	@Override
	public int modifyBoard(Board Board) {
		return dao.update(Board);
	}

	@Override
	public int removeBoard(int id) {
		return dao.delete(id);
	}

	@Override
	public Board getBoardIdByName(String name) {
		return dao.getBoardIdByName(name);
	}






	
	
}
