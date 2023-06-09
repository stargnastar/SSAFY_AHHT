drop database ahht;
CREATE DATABASE if not exists AHHT;

USE AHHT;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) not null,
    `age` INT not null,
    `tel` VARCHAR(20) ,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `expert` INT NOT NULL DEFAULT 0,
     `fileName` VARCHAR(255) default NULL,
	`fileUri` VARCHAR(255) default NULL,
    `regDate`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;



insert into `user`(`username`, `nickname`, `age`, `tel`, `email`, `password`, `expert`)
values("유지나", "지나ahs", 23, "010-5861-3604", "wlskb@naver.com","ginapwpw", 1),
('배영석', '영석몬', 25, '010-7777-7777', 'byoung@naver.com','youngpwpw', 2),
('김미미', '미미몬', 22, '010-2222-2222', 'mimi@naver.com','mimipwpw', 0),
('김철수', '철수몬', 24, '010-3333-3333', 'chulsu@naver.com','chulsupwpw', 0),
('박영희', '영희몬', 26, '010-4444-4444', 'younghee@naver.com','youngheepwpw', 1),
('이순신', '이순신몬', 28, '010-5555-5555', 'leesunsin@naver.com','leesunsinpwpw', 2),
('김구', '김구몬', 30, '010-6666-6666', 'kimgu@naver.com','kimgupwpw', 0),
('안중근', '안중근몬', 32, '010-7777-7777', 'anjunggun@naver.com','anjunggunpwpw', 1),
('윤봉길', '윤봉길몬', 34, '010-8888-8888', 'yoonbonggil@naver.com','yoonbonggilpwpw', 2);

select * from user;


DROP TABLE IF EXISTS `diet`;
CREATE TABLE IF NOT EXISTS `diet`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `photo` VARCHAR(255) ,
    `content` TEXT NOT NULL,
	`rate` INT NOT NULL DEFAULT 0,
    `when` VARCHAR(30) NOT NULL,
    `cal` INT,
    `regDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userId` INT ,
      `fileName` VARCHAR(255) NULL,
	`fileUri` VARCHAR(255) NULL,
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innoDB;

-- ALTER TABLE diet ADD CONSTRAINT pk_diet_id
-- PRIMARY KEY (id);

insert into `diet`(`content`, `rate`, `when`, `cal`, `userId`)
values('햄버거', 4, '점심', 12, 1),
('훠궈', 5, '점심', 13, 2),
('냉면', 3, '아침', 82, 3),
('코다리정식', 5, '저녁', 72, 3),
('계란', 4, '아침', 78, 1),
('바나나', 3, '간식', 100, 1),
('오트밀', 5, '아침', 150, 2),
('닭가슴살', 4, '점심', 200, 2),
('연어', 5, '저녁', 250, 3),
('브로콜리', 3, '간식', 30, 3),
('당근', 4, '간식', 20, 3),
('토마토', 5, '저녁', 25, 3),
('감자', 4, '점심', 120, 3),
('고구마', 5, '아침', 150, 3);

select * from diet;

DROP TABLE IF EXISTS `fitness`;
CREATE TABLE `fitness`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `part` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255),
	`content` VARCHAR(255),
    `time` INT,
    `strength` INT,
    `cal` INT,
    `userId` INT,
     `fileName` VARCHAR(255) NULL,
	`fileUri` VARCHAR(255) NULL,
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)engine=InnoDB;

insert into `fitness`(`part`, `content`, `time`, `strength`, `cal`,`userId`)
values('어깨', '어깨 삼두 조짐', 30,3, 120, 1),
('등', '승모근 강화',20, 2, 50, 2),
('허벅지', '근력 운동', 20,3,80, 3),
('엉덩이', '근력 운동', 10,5, 60, 3),
('가슴', '가슴 근력 운동', 30, 3, 150, 1),
('복근', '복근 운동', 20, 2, 100, 2),
('종아리', '종아리 근력 운동', 10, 3, 50, 3),
('어깨', '삼두근 운동', 20, 2, 100, 1),
('등', '이두근 운동', 10, 3, 50, 2);
select * from fitness;





DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
	`id`INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`follower` INT ,
    `followed` INT,
    FOREIGN KEY(`follower`) REFERENCES `user`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(`followed`) REFERENCES `user`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB;

insert into `follow`(`follower`, `followed`)
values
(3,1),
(3,2),
(2,1),
(1, 2),
(1, 3),
(2, 3),
(4, 1),
(4, 2),
(5, 1),
(5, 2);

select * from follow;


DROP TABLE IF EXISTS `board`;
CREATE TABLE `board`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
)engine=InnoDB;

insert into `board`(`name`)
values('성공스토리'),('식단'),('운동'),('꿀팁'),('질문');

select * from board;

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `boardId` INT NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `writerId` INT NOT NULL,
  `regDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` DATETIME NULL,
  `photo` VARCHAR(255),
  `viewCnt` INT DEFAULT 0,
   `fileName` VARCHAR(255) NULL,
	`fileUri` VARCHAR(255) NULL,
  FOREIGN KEY(`boardId`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  FOREIGN KEY(`writerId`) REFERENCES `user`(`id`)  ON DELETE CASCADE
)engine=InnoDB;

insert into `article`(`boardId`,`title`,`content`, `writerId`)
values
(1,'65->10kg 성공신화','물만 먹으니까 빠지던데요', 1),
(2,'다이어트 식단 추천','다이어트 할 때 어떤 음식을 먹어야 할까요?', 1),
(3,'운동 방법','집에서 할 수 있는 운동은 어떤 것이 있나요?', 2),
(4,'건강한 식습관','건강한 식습관을 위해 꼭 해야 할 일은 무엇인가요?', 3),
(5,'숙면을 취하는 방법','잠을 잘 못 자는 이유는 무엇일까요?', 3),
(4, '여드름 없애는 법', '여드름을 없애는 가장 좋은 방법은 무엇인가요?', 1),
(4, '피부 미백', '피부를 미백하는 방법에는 어떤 것이 있나요?', 2),
(5, '탈모 치료', '탈모를 치료하는 방법에는 어떤 것이 있나요?', 3),
(5, '다이어트 보조제', '다이어트 보조제는 정말 효과가 있나요?', 4),
(5, '건강기능식품', '건강기능식품은 어떻게 선택해야 할까요?', 5);

select * from article;

DROP TABLE IF EXISTS `career`;
CREATE TABLE `career`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
)engine=InnoDB;

insert into `career`(`userId`,`content`)
values
(1,'대한의사협회 정회원'),
(1,'서울대학교 의과대학 졸업'),
(1,'서울대학교병원 전임의'),
(1,'강남 세브란스병원 진료과장'),
(2,'대한트레이너협회 정회원'),
(2,'한국체육대학교 체육학과 졸업'),
(2,'국가대표 체조 선수'),
(2,'강남 휘트니스센터 트레이너'),
(2,'자신의 헬스장 오픈'),
(2,'헬스 잡지 칼럼니스트');


select * from `career`;


DROP TABLE IF EXISTS `qualification`;
CREATE TABLE `qualification`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
)engine=InnoDB;

insert into `qualification`(`userId`, `content`)
values
(1, '의사면허자격증'),
(5, '의사면허자격증'),
(8, '의사면허자격증'),
(2, '스포츠지도사 1급'),
(6, '스포츠지도사 1급'),
(9, '스포츠지도사 1급'),
(1, '치과의사면허자격증'),
(5, '치과의사면허자격증'),
(8, '치과의사면허자격증'),
(2, '한의사면허자격증'),
(6, '한의사면허자격증'),
(9, '한의사면허자격증'),
(1, '약사면허자격증'),
(5, '약사면허자격증'),
(8, '약사면허자격증'),
(2, '간호사면허자격증'),
(6, '간호사면허자격증'),
(9, '간호사면허자격증'),
(1, '영양사면허자격증'),
(5, '영양사면허자격증'),
(8, '영양사면허자격증'),
(2, '물리치료사면허자격증'),
(6, '물리치료사면허자격증'),
(9, '물리치료사면허자격증'),
(1, '작업치료사면허자격증'),
(5, '작업치료사면허자격증'),
(8, '작업치료사면허자격증');

select * from qualification;


CREATE TABLE `lecture` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `major` VARCHAR(255) NOT NULL,
    `bio` TEXT NOT NULL,
     `fileName` VARCHAR(255) NULL,
	`fileUri` VARCHAR(255) NULL,
    FOREIGN KEY(`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
)engine=InnoDB;

INSERT INTO `lecture`(`userId`, `major`, `bio`)
values(1, '서울대학교 가정의학과','안녕하세요 건강한 생활을 위한 상담을 진행할 유지나의사입니다'),
(2, '연세대학교 체육학과','안녕하세요 체계적인 운동을 도와드릴 박성민 트레이너입니다'),
(5, '한양대학교 의과대학','안녕하세요 질병 치료를 위한 상담을 진행할 이정신의사입니다'),
(6, '경희대학교 체육교육과','안녕하세요 재활 운동을 도와드릴 김은미 트레이너입니다'),
(8, '중앙대학교 의과대학','안녕하세요 질병 치료를 위한 상담을 진행할 이정우 의사입니다'),
(9, '서울시립대학교 스포츠과학과','안녕하세요 안전한 스포츠생활을 도와드릴 김민지 교수님입니다');

