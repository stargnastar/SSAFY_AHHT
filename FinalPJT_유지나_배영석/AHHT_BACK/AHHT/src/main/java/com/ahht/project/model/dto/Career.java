package com.ahht.project.model.dto;

public class Career {

	private int id, userId;
	private String content;

	public Career(int userId, String content) {
		this.userId = userId;
		this.content = content;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "Career [id=" + id + ", userId=" + userId + ", content=" + content + "]";
	}

}
