package com.novel.backend.service.impl;

import com.novel.backend.mapper.AuthorMapper;
import com.novel.backend.mapper.UserMapper;
import com.novel.backend.mapper.WorksMapper;
import com.novel.backend.pojo.Author;
import com.novel.backend.pojo.User;
import com.novel.backend.response.CreationInfoResponse;
import com.novel.backend.service.CreationService;
import com.novel.backend.service.impl.utils.UserUtilImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 17:01
 * Description:
 */
@Service
@RequiredArgsConstructor
public class CreationServiceImpl implements CreationService {

    private final AuthorMapper authorMapper;
    private final UserUtilImpl userUtil;
    private final WorksMapper worksMapper;
    @Override
    public Map<String, String> registerAuthor() {
        User user = userUtil.getUser();
        Map<String,String> resp = new HashMap<>();

        Integer count = authorMapper.existsAuthor(user.getId());
        if (count == 1) {
            resp.put("error_message", "success");
            return resp;
        }

        if (user != null) {
            int i =  authorMapper.save(
                    Author
                            .builder()
                            .uid(user.getId())
                            .workQuantity(0)
                            .build()
            );
            if (i == 1) {
                resp.put("error_message", "success");
                return resp;
            }
        }
        resp.put("error_message", "failed");
        return resp;
    }

    @Override
    public Map<String, Object> getInfoByDate(Integer id) {
        CreationInfoResponse creationInfoResponseList = worksMapper.findCreationInfo(id);
        Map<String, Object> resp = new HashMap<>();
        resp.put("creationInfo", creationInfoResponseList);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> getInfo() {
        User user = userUtil.getUser();
        Integer count = authorMapper.existsAuthor(user.getId());
        Map<String, Object> resp = new HashMap<>();
        if (count == 1) {
            resp.put("error_message", "success");
        } else resp.put("error_message", "failed");
        return resp;
    }
}
