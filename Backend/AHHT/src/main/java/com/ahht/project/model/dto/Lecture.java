package com.ahht.project.model.dto;

import org.springframework.web.multipart.MultipartFile;

public class Lecture {
	
	private int id, userId;
	private String major, bio;
	
	
	/** 파일 원래 이름*/
	private String fileName;
	/** 파일 저장 경로*/
	private String fileUri;
	
	private MultipartFile file;

	public Lecture(int id, int userId, String major, String bio, String fileName, String fileUri, MultipartFile file) {
		super();
		this.id = id;
		this.userId = userId;
		this.major = major;
		this.bio = bio;
		this.fileName = fileName;
		this.fileUri = fileUri;
		this.file = file;
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

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileUri() {
		return fileUri;
	}

	public void setFileUri(String fileUri) {
		this.fileUri = fileUri;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	@Override
	public String toString() {
		return "Lecture [id=" + id + ", userId=" + userId + ", major=" + major + ", bio=" + bio + ", fileName="
				+ fileName + ", fileUri=" + fileUri + ", file=" + file + "]";
	}
	
	
	
	
	

}
