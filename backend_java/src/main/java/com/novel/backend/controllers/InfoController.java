package com.novel.backend.controllers;

import com.novel.backend.service.InfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/15
 * Time: 8:47
 * Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class InfoController {

    private final InfoService infoService;

    @PostMapping("/get-info")
    public Map<String, String> getInfo() {
        return infoService.getInfo();
    }


}
