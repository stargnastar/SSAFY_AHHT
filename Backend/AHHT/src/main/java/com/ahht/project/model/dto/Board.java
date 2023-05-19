package com.ahht.project.model.dto;

public class Board {
	private int id;
	private String name;
	
	public Board(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "Board [id=" + id + ", name=" + name + "]";
	}
	
	
	
	
	
	
}
