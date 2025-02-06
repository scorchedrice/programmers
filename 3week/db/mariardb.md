프로그래머스의 코드가 다소 레거시한 부분이 있어 이를 수정하고자 작성.

# docker 명령어

`docker ps` : 기존 컨테이너 확인

`docker rm ~` : ~라는 컨테이너 제거

# mariaDB

1. mariadb 설치
```shell
docker run --name mariadb -d -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD=root mariadb 
```

2. 실행
```shell
docker exec -it mariadb mariadb -u root -p 
```

# SQL문

## DB 생성 => 조회 => 데이터베이스 진입

```mariadb
CREATE DATABASE Tennis;
```

```mariadb
SHOW DATABASES;
```

```mariadb
USE Tennis;
```

## Table 생성 / 데이터 주입 및 수정

### 테이블 생성

```mariadb
CREATE TABLE member
(
    id VARCHAR(30),
    name VARCHAR(30),
    pwd VARCHAR(30)
);
```

### 테이블 데이터 조회 / 삽입

```
MariaDB [Tennis]> INSERT INTO member
    -> VALUES ('programmers', 'hjw', 'aaaaa');
Query OK, 1 row affected (0.006 sec)

MariaDB [Tennis]> SELECT * FROM member;
+-------------+------+-------+
| id          | name | pwd   |
+-------------+------+-------+
| programmers | hjw  | aaaaa |
+-------------+------+-------+
1 row in set (0.002 sec)
```

조건, 특정 칼럼만 출력하고 싶은 경우

```mariadb
SELECT * FROM member
WHERE id = 'programmers';
```

### 데이터 수정

```mariadb
UPDATE member SET pwd = 'zzzz' WHERE id='programmers';
```

어떤 테이블을 업데이트 할거에요. pwd는 'zzzz'로 바꿀거에요. id가 'programmers'인 것으로요.

### 데이터 삭제

```mariadb
DELETE FROM member
WHERE id = 'tennisqueen'
```


