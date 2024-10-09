package com.novel.backend.service.impl.utils;


import com.novel.backend.mapper.UserMapper;
import com.novel.backend.pojo.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userMapper.findByEmail(email);
        return user.map(UserDetailsImpl::new)
                .orElseThrow(() -> new RuntimeException("user was not found"));
    }
}
