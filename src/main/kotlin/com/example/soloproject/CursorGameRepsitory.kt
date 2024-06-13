package com.example.soloproject

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet

class GamesRowMapper : RowMapper<CursorGames> {
    override fun mapRow(rs: ResultSet, rowNum: Int): CursorGames {
        return CursorGames(rs.getLong(1), rs.getString(2), rs.getInt(3), rs.getInt(4))
    }
}

@Repository
class CursorGameRepository(@Autowired val jdbcTemplate: JdbcTemplate) {

    val gamesRowMapper = GamesRowMapper()

    fun fetchGames(): Array<CursorGames> {
        val games = jdbcTemplate.query("SELECT id, name, score, rank FROM cursorgames", gamesRowMapper)
        return games.toTypedArray()
    }

    fun saveGames(@Autowired cursorGameRequest: CursorGameRequest) {
        val name = cursorGameRequest.name;
        val score = cursorGameRequest.score;
        val rank = cursorGameRequest.rank;
        jdbcTemplate.update("INSERT INTO cursorgames (name, score, rank) VALUES (?, ?, ?)" , name, score, rank)
    }

    fun saveName(@Autowired cursorGameRequest: CursorGameRequest) {
        jdbcTemplate.update("INSERT INTO cursorgames (name) VALUES (?)", cursorGameRequest)
    }

    fun fetchScore(): Array<CursorGames> {
        val games = jdbcTemplate.query("SELECT id, name, score, rank FROM cursorgames WHERE name='test'", gamesRowMapper)
        return games.toTypedArray()
    }

    fun fetchNameScore(name: String): Array<CursorGames> {
        val games = jdbcTemplate.query("SELECT id, name, score, rank From cursorgames WHERE name='$name'", gamesRowMapper)
        return games.toTypedArray()
    }

    fun updateScore(name: String, @Autowired putCursorGames: PutCursorGames) {
        println(name)
        println(putCursorGames.score)
        jdbcTemplate.update("UPDATE cursorgames SET score= ? WHERE name='$name'", putCursorGames.score)
    }

}