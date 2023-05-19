package com.ahht.project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
//mybatis의 매퍼 스캔: <mybatis:scan base-package="com.ssafy.ws.model.dao"/>를 대체한다.
@MapperScan(basePackages = "com.ahht.project.model.dao")
//Swagger 사용을 위해 추가한다.
@EnableSwagger2
public class AhhtApplication {

	public static void main(String[] args) {
		SpringApplication.run(AhhtApplication.class, args);
	}

}
