package com.novel.backend.service;

import com.novel.backend.request.AuthenticationRequest;
import com.novel.backend.request.RegisterRequest;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:38
 * Description:
 */


public interface AuthenticationService {

    public Map<String, String> login(AuthenticationRequest request);
    public Map<String, String> register(RegisterRequest request);
}
