package com.novel.backend.controllers;

import com.novel.backend.request.WatchAddRequest;
import com.novel.backend.request.WatchDelRequest;
import com.novel.backend.service.WatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:45
 * Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/watch")
public class WatchController {
    private final WatchService watchService;

    @PostMapping("/watch-history")
    public Map<String,Object> watchHistory(@RequestBody Map<String, Integer> requestBody) {

        return watchService.watchHistory(requestBody.get("id"));
    }

    @GetMapping("/watch-history")
    public Map<String,Object> watchAllHistory(Integer id) {

        return watchService.watchALlHistory(id);
    }


    @GetMapping("/watch-next")
    public Map<String,Object> watchAllNext(Integer id) {

        return watchService.watchALlNext(id);
    }

    @PostMapping("/watch-next")
    public Map<String, Object> watchNext(@RequestBody Map<String, Integer> requestBody) {

        return watchService.watchNext(requestBody.get("id"));
    }

    @PostMapping("/watch-addnext")
    public void watchAddNext(@RequestBody WatchAddRequest watchAddRequest) {
        watchService.watchAddNext(watchAddRequest);
    }

    @PostMapping("/watch-delhistory")
    public void watchDelHistory(@RequestBody WatchDelRequest watchDelRequest) {
        watchService.watchDelHistory(watchDelRequest);
    }

    @PostMapping("/watch-addhistory")
    public void watchAddHistory(@RequestBody WatchAddRequest watchAddRequest) {
        watchService.watchAddHistory(watchAddRequest);
    }

    @PostMapping("/watch-delnext")
    public void watchDelNext(@RequestBody WatchDelRequest watchDelRequest) {
        watchService.watchDelNext(watchDelRequest);
    }

}
