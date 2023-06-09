package com.ahht.project.model.dto;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

public class Article {

	private int id, writerId;
	private String title, content, photo;
	private Date regDate, updateDate;
	private int viewCnt, boardId;

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

	public int getWriterId() {
		return writerId;
	}

	public void setWriterId(int writerId) {
		this.writerId = writerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public int getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}

	public int getBoardId() {
		return boardId;
	}

	public void setBoardId(int boardId) {
		this.boardId = boardId;
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
		return "Article [id=" + id + ", writerId=" + writerId + ", title=" + title + ", content=" + content + ", photo="
				+ photo + ", regDate=" + regDate + ", updateDate=" + updateDate + ", viewCnt=" + viewCnt + ", boardId="
				+ boardId + ", fileName=" + fileName + ", fileUri=" + fileUri + ", file=" + file + "]";
	}

}
