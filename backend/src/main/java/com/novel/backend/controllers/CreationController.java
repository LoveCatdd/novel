package com.novel.backend.controllers;

import com.novel.backend.service.CreationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 16:59
 * Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/create")
public class CreationController {
    private final CreationService creationService;

    @PostMapping("/register")
    public Map<String, String> registerAuthor() {
        return creationService.registerAuthor();
    }

    @GetMapping("/info")
    public Map<String, Object> getInfoByData(Integer id) {
        return creationService.getInfoByDate(id);
    }

    @PostMapping("/info")
    public Map<String, Object> getInfo() {
        return creationService.getInfo();
    }

}
