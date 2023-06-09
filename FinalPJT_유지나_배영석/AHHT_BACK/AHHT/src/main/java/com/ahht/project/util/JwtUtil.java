package com.ahht.project.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil {
	private static final String SALT = "AHHT";

	// 토큰 생성
	public String createToken(String claimId, String data) throws UnsupportedEncodingException {
		return Jwts.builder().setHeaderParam("alg", "HS256").setHeaderParam("typ", "JWT").claim(claimId, data)
				.setExpiration(new Date(System.currentTimeMillis() + 3000 * 20 * 30))
				.signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8")).compact();

	}

	// 유효성 검사
	public void valid(String token) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException,
			SignatureException, IllegalArgumentException, UnsupportedEncodingException {
		Jwts.parser().setSigningKey("AHHT".getBytes("UTF-8")).parseClaimsJws(token);
	}

}
