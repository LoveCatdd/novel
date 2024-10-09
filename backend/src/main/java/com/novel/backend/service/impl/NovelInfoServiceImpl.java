package com.novel.backend.service.impl;

import com.novel.backend.mapper.WorksMapper;
import com.novel.backend.response.NovelPageResponse;
import com.novel.backend.service.NovelInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: popo
 * Date: 2024/1/1
 * Time: 22:41
 * Description:
 */
@Service
@RequiredArgsConstructor
public class NovelInfoServiceImpl implements NovelInfoService {

    private final WorksMapper worksMapper;

    @Override
    public Map<String, Object> getInfo(Integer id) {
        NovelPageResponse novelPageResponses = worksMapper.findNovelPageByWid(id);
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message", "success");
        resp.put("novel", novelPageResponses);

        return resp;
    }
}
