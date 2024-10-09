package com.novel.backend.service.impl;

import com.novel.backend.pojo.User;
import com.novel.backend.service.InfoService;
import com.novel.backend.service.impl.utils.UserUtilImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/15
 * Time: 8:45
 * Description:
 */
@Service
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final UserUtilImpl userUtil;
    @Override
    public Map<String, String> getInfo() {
        User user = userUtil.getUser();

        Map<String,String> resp = new HashMap<>();
        resp.put("error_message", "success");
        resp.put("first_name", user.getFirstName());
        resp.put("last_name", user.getLastName());
        resp.put("uid", String.valueOf(user.getId()));
        resp.put("email", user.getEmail());

        System.out.println(resp);
        return resp;
    }

}
