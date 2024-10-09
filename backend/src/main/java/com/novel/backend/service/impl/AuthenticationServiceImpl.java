package com.novel.backend.service.impl;

import com.novel.backend.config.utils.JwtUtil;
import com.novel.backend.mapper.UserMapper;
import com.novel.backend.pojo.User;
import com.novel.backend.request.AuthenticationRequest;
import com.novel.backend.request.RegisterRequest;
import com.novel.backend.service.AuthenticationService;
import com.novel.backend.service.impl.utils.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:39
 * Description:
 */
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {


    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final  UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> login(AuthenticationRequest request) {

        String email = request.getEmail().trim();
        String password = request.getPassword().trim();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails);
        Map<String, String> resp = new HashMap<>();
        resp.put("error_message", "success");
        resp.put("jwtToken", jwt);
        return resp;
    }

    @Override
    public Map<String, String> register(RegisterRequest request) {
        String email = request.getEmail().trim();
        String firstName = request.getFirstName().trim();
        String lastName = request.getLastName().trim();
        String password = request.getPassword().trim();
        String confirmedPassword = request.getConfirmedPassword().trim();

        Map<String, String> resp = new HashMap<>();

        if (userMapper.existsByEmail(email) != 0) {
            resp.put("error_message", "failed");
            resp.put("error_code", "邮箱已存在");
            return resp;
        }
        if (!password.equals(confirmedPassword)) {
            resp.put("error_message", "failed");
            resp.put("error_code", "密码不一致");
            return resp;
        }

        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();

        userMapper.save(user);
        resp.put("error_message", "success");

        return resp;
    }
}
