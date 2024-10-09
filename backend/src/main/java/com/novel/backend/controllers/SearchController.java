package com.novel.backend.controllers;

import com.novel.backend.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 8:50
 * Description:
 */


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/info")
    public Map<String, Object> getInfoBySearch(String search) {
        return searchService.getInfoBySearch(search);
    }
    @GetMapping("/get-author-info")
    public Map<String, Object> getAuthorInfo(String author) {
        return searchService.getAuthorInfo(author);
    }

    @GetMapping("/get-lib-info")
    public Map<String, Object> getLibInfo(String lib) {
        return searchService.getLibInfo(lib);
    }

    @GetMapping("/get-lib-ranksinfo")
    public Map<String, Object> getLibRanksInfo(String lib, String type, Integer page, Integer limit) {
        return searchService.getLibRanksInfo(lib, type, page, limit);
    }

    @GetMapping("/get-lib-rankcount")
    public Map<String, Object> getLibRankCount(String type, String lib) {
        return searchService.getLibRankCount(type, lib);
    }
}
