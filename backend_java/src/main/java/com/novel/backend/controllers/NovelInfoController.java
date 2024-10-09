package com.novel.backend.controllers;

import com.novel.backend.service.NovelInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * User: popo
 * Date: 2024/1/1
 * Time: 22:40
 * Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/novel")
public class NovelInfoController {
    private final NovelInfoService novelInfoService;

    @GetMapping("/info")
    public Map<String, Object> getInfo(Integer id) {
        return novelInfoService.getInfo(id);
    }

}
