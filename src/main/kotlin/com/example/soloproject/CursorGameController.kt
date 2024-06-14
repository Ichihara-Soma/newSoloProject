package com.example.soloproject

import org.apache.logging.log4j.message.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api")
class CursorGameController(@Autowired val cursorGameRepository: CursorGameRepository) {


    @GetMapping("/games")
    fun getGames(): Array<CursorGames> {
        return cursorGameRepository.fetchGames()
    }

    @PostMapping("/games")
    fun saveGames(@RequestBody cursorGamesRequest: CursorGameRequest): String {
        cursorGameRepository.saveGames(cursorGamesRequest)
        return "game"
    }

    //ぼつ
    @PostMapping("/name")
    fun saveName(@RequestBody cursorGamesRequest: CursorGameRequest): String {
        cursorGameRepository.saveName(cursorGamesRequest)
        return "name"
    }

    @GetMapping("/score")
    fun getScore(): Array<CursorGames> {
        return cursorGameRepository.fetchScore()
    }

    @GetMapping("/highScore")
    fun getNameScore(@RequestParam name: String): Array<CursorGames> {
        return cursorGameRepository.fetchNameScore(name)
    }

    @PutMapping("/update")
    fun putScore(@RequestParam name: String, @RequestBody putCursorGames: PutCursorGames) {
        cursorGameRepository.updateScore(name, putCursorGames)
        return
    }

}