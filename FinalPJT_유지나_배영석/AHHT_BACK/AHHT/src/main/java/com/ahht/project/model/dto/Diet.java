package com.ahht.project.model.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class Diet {

	private int id, rate, cal, userId;
	private String photo, content, when;
	private Date regDate;

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

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
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

	public String getWhen() {
		return when;
	}

	public void setWhen(String when) {
		this.when = when;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
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
		return "Diet [id=" + id + ", rate=" + rate + ", cal=" + cal + ", userId=" + userId + ", photo=" + photo
				+ ", content=" + content + ", when=" + when + ", regDate=" + regDate + ", fileName=" + fileName
				+ ", fileUri=" + fileUri + ", file=" + file + "]";
	}

}
