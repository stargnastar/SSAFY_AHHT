package com.ahht.project.model.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class User {
	
	private int id, age, expert;
	private Date regDate;
	private String name, nickname, tel, password, profile, email;
	
	/** 파일 원래 이름*/
	private String fileName;
	/** 파일 저장 경로*/
	private String fileUri;
	
	private MultipartFile file;

	public User(int id, int age, int expert, Date regDate, String name, String nickname, String tel, String password,
			String profile, String email, String fileName, String fileUri, MultipartFile file) {
		super();
		this.id = id;
		this.age = age;
		this.expert = expert;
		this.regDate = regDate;
		this.name = name;
		this.nickname = nickname;
		this.tel = tel;
		this.password = password;
		this.profile = profile;
		this.email = email;
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

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getExpert() {
		return expert;
	}

	public void setExpert(int expert) {
		this.expert = expert;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
		return "User [id=" + id + ", age=" + age + ", expert=" + expert + ", regDate=" + regDate + ", name=" + name
				+ ", nickname=" + nickname + ", tel=" + tel + ", password=" + password + ", profile=" + profile
				+ ", email=" + email + ", fileName=" + fileName + ", fileUri=" + fileUri + ", file=" + file + "]";
	}
	
	

}
