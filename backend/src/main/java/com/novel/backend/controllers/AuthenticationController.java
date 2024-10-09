package com.novel.backend.controllers;

import com.novel.backend.request.AuthenticationRequest;
import com.novel.backend.request.RegisterRequest;
import com.novel.backend.service.AuthenticationService;
import com.novel.backend.service.InfoService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:27
 * Description:
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public Map<String, String> login (
            @RequestBody AuthenticationRequest request
    ) {
        return authenticationService.login(request);
    }

    @PostMapping("/register")
    public Map<String, String> register(
           @RequestBody RegisterRequest request
    ) {
        return authenticationService.register(request);
    }

}
