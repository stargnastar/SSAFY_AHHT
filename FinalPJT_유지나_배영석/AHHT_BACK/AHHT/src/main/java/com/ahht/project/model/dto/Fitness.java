package com.ahht.project.model.dto;

import org.springframework.web.multipart.MultipartFile;

public class Fitness {

	private int id, time, strength, cal, userId;
	private String part, photo, content;

	/** 파일 원래 이름 */
	private String fileName;
	/** 파일 저장 경로 */
	private String fileUri;

	private MultipartFile file;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

	public int getCal() {
		return cal;
	}

	public void setCal(int cal) {
		this.cal = cal;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getPart() {
		return part;
	}

	public void setPart(String part) {
		this.part = part;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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
		return "Fitness [id=" + id + ", time=" + time + ", strength=" + strength + ", cal=" + cal + ", userId=" + userId
				+ ", part=" + part + ", photo=" + photo + ", content=" + content + ", fileName=" + fileName
				+ ", fileUri=" + fileUri + ", file=" + file + "]";
	}

}
