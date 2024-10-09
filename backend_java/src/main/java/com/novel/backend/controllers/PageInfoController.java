package com.novel.backend.controllers;

import com.novel.backend.service.PageInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 21:21
 * Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/page")
public class PageInfoController {
    private final PageInfoService pageInfoService;

    @PostMapping("/front-carousel")
    public Map<String, Object> frontCarouselPageInfo() {
        return pageInfoService.frontCarouselPageInfo();
    }

    @PostMapping("/front-newbook")
    public Map<String, Object> frontNewBookPageInfo() {
        return pageInfoService.frontNewBookPageInfo();
    }

    @PostMapping("/front-hotbook")
    public Map<String, Object> frontHotBookPageInfo() {
        return pageInfoService.frontHotBookPageInfo();
    }

    @PostMapping("/front-endbook")
    public Map<String,Object> frontEndBookPageInfo() {
        return pageInfoService.frontEndBookPageInfo();
    }

    @PostMapping("/rank-newbook")
    public Map<String, Object> rankNewBookPageInfo() {
        return pageInfoService.rankNewBookPageInfo();
    }

    @GetMapping("/rank-newbook")
    public Map<String, Object> rankOfNewBookPageInfo(Integer page, Integer limit) {
        return pageInfoService.rankOfNewBookPageInfo(page,limit);
    }

    @PostMapping("/rank-collect")
    public Map<String, Object> rankCollectBookPageInfo() {
        return pageInfoService.rankCollectBookPageInfo();
    }
    @GetMapping("/rank-collect")
    public Map<String, Object> rankOfCollectBookPageInfo(Integer page, Integer limit) {
        return pageInfoService.rankOfCollectBookPageInfo(page,limit);
    }

    @PostMapping("/rank-endbook")
    public Map<String, Object>  rankEndBookPageInfo() {
        return pageInfoService.rankEndBookPageInfo();
    }

    @GetMapping("/rank-endbook")
    public Map<String, Object>  rankOfEndBookPageInfo(Integer page, Integer limit) {
        return pageInfoService.rankOfEndBookPageInfo(page,limit);
    }
    @GetMapping("/rank-count")
    public Map<String, Object> rankCountOfType(String type) {
        return pageInfoService.rankCountOfType(type);
    }
}
