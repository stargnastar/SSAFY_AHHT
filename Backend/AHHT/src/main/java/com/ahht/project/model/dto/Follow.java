package com.ahht.project.model.dto;

public class Follow {
	
	private int id, follower, followed;

	public Follow(int id, int follower, int followed) {
		super();
		this.id = id;
		this.follower = follower;
		this.followed = followed;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFollower() {
		return follower;
	}

	public void setFollower(int follower) {
		this.follower = follower;
	}

	public int getFollowed() {
		return followed;
	}

	public void setFollowed(int followed) {
		this.followed = followed;
	}

	@Override
	public String toString() {
		return "Follow [id=" + id + ", follower=" + follower + ", followed=" + followed + "]";
	}
	

}
