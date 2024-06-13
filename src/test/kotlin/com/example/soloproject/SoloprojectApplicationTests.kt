package com.example.soloproject

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.jdbc.Sql

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class SoloprojectApplicationTests(
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
) {

	@Test
	fun contextLoads() {
	}

	@Test
	fun `最初のテスト`() {
		assertThat(1+2, equalTo(3))
	}

	@Test
	fun `GETリクエストにはOKステータスを返す`()  {
		val response = restTemplate.getForEntity("http://localhost:$port/api/games", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `GETリクエストはCursorGamesオブジェクトのリストを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/games", Array<CursorGames>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val games = response.body!!
		assertThat(games.size, equalTo(2))
		assertThat(games[0].id, equalTo(1))
		assertThat(games[0].name, equalTo("test"))
		assertThat(games[1].id, equalTo(2))
		assertThat(games[1].name, equalTo("hoge"))
	}

	@Test
	fun `POSTリクエストはOKステータスを返す`() {
		val request = CursorGameRequest("test-san", 280, 1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/games", request, String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `POSTリクエストはCursorGameオブジェクトを格納する`() {
		// GETリクエストで変更前の状態を取得する
		val oldResponse = restTemplate.getForEntity("http://localhost:$port/api/games", Array<CursorGames>::class.java)
		val oldGamesData = oldResponse.body!!
		val oldGamesDataNum = oldGamesData.size
		// POSTリクエストで変更させる
		val request = CursorGameRequest("test4", 190, 3)
		val response = restTemplate.postForEntity("http://localhost:$port/api/games", request, String::class.java)
		// GETリクエストで変更後の状態を取得する
		val newResponse = restTemplate.getForEntity("http://localhost:$port/api/games", Array<CursorGames>::class.java)
		val newGamesData = newResponse.body!!
		val newGamesDataNum = newGamesData.size
		// POSTリクエストでsizeが一つ増えているかの確認
		assertThat(newGamesDataNum, equalTo(oldGamesDataNum + 1))
	}

	@Test
	fun `WHERE句を指定したGETリクエストはOKステータスを返す` () {
		val response = restTemplate.getForEntity("http://localhost:$port/api/score", Array<CursorGames>::class.java)
		val gameScore = response.body!!
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `queryを指定したGETリクエストはCursorGamesオブジェクトのリストを返す` () {
		val name = "test"
		val response = restTemplate.getForEntity("http://localhost:$port/api/highScore?name=$name", Array<CursorGames>::class.java)
		val gameData = response.body!!
		assertThat(gameData[0].name, equalTo("test"))
		assertThat(gameData[0].score, equalTo(200))
	}

	@Test
	fun `PUTリクエストでCursorGamesのオブジェクトを更新する`() {
		// PUTリクエストでCursorGamesのオズジェクトを更新する
		val name = "test"
		val request = PutCursorGames(250)
		restTemplate.put("http://localhost:$port/api/update?name=$name", request, String::class.java)
		// 更新後の状態を取得する
		val getResponse = restTemplate.getForEntity("http://localhost:$port/api/highScore?name=$name", Array<CursorGames>::class.java)
		val gameData = getResponse.body!!
		assertThat(gameData[0].score, equalTo(250))
	}

}
