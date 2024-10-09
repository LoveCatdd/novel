package com.novel.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.novel.backend.mapper.WorksMapper;
import com.novel.backend.pojo.Libs;
import com.novel.backend.response.*;
import com.novel.backend.service.PageInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 21:21
 * Description:
 */
@Service
@RequiredArgsConstructor
public class PageInfoServiceImpl implements PageInfoService {

    private final WorksMapper worksMapper;
    @Override
    public Map<String, Object> frontCarouselPageInfo() {
        List<WorksResponse> worksResponses =  worksMapper.findTopWorksInfo();
        Map<String, Object> resp = new HashMap<>();
        resp.put("works", worksResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> frontNewBookPageInfo() {
        List<NewWorksResponse> newWorksResponses = worksMapper.findTopNewWorksInfo();
        Map<String,Object> resp = new HashMap<>();
        resp.put("newWorks", newWorksResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> frontHotBookPageInfo() {

        List<Libs> libs = worksMapper.findTopLibrary();

        List<HotWorksResponse> hotWorksResponses = new ArrayList<>();
        libs.forEach(lib -> {
            hotWorksResponses.add(
                    HotWorksResponse.builder()
                            .lib(lib.getName())
                            .list(worksMapper.findTopWorksPerLibrary(lib.getName()))
                            .build()
            );
        });

        Map<String, Object> resp = new HashMap<>();
        resp.put("hotWorks", hotWorksResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> frontEndBookPageInfo() {
        List<NewWorksResponse> popularityWorksResponses = worksMapper.findCompletedTopWorksByPopularity();
        List<HotWorksOfLibResponse> collectWorksResponses = worksMapper.findCompletedTopWorksByCollect();
        Map<String, Object> resp = new HashMap<>();
        resp.put("popularityEndWorks", popularityWorksResponses);
        resp.put("collectEndWorks", collectWorksResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankNewBookPageInfo() {
        List<RankBookResponse> rankNewBookResponses = worksMapper.findTopRankNewBookByRecommendation();
        Map<String, Object> resp = new HashMap<>();
        resp.put("rankNewBook", rankNewBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankCollectBookPageInfo() {
        List<RankBookResponse> rankBookResponses = worksMapper.findTopTenByRecommendationAndCollect();
        Map<String, Object> resp = new HashMap<>();
        resp.put("rankCollectBook", rankBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankEndBookPageInfo() {
        List<RankBookResponse> rankBookResponses = worksMapper.findTopTenCompletedByCollect();
        Map<String,  Object> resp = new HashMap<>();
        resp.put("rankCompleteBook", rankBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankOfNewBookPageInfo(Integer page, Integer limit) {
        List<RankBookResponse> rankBookResponses = worksMapper.findRnkOfNewBookByRecommendation((page - 1) * limit, limit);

        Map<String, Object> resp = new HashMap<>();
        resp.put("rankNewBook", rankBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankOfCollectBookPageInfo(Integer page, Integer limit) {
        List<RankBookResponse> rankBookResponses = worksMapper.findRankOfCollectByRecommendationAndCollect((page - 1) * limit, limit);
        Map<String, Object> resp = new HashMap<>();
        resp.put("rankCollectBook", rankBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankOfEndBookPageInfo(Integer page, Integer limit) {
        List<RankBookResponse> rankBookResponses = worksMapper.findRankOfCompletedByCollect((page - 1) * limit, limit);
        Map<String, Object> resp = new HashMap<>();
        resp.put("rankCompleteBook", rankBookResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> rankCountOfType(String type) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        switch (type) {
            case "1" :
                resp.put("count", worksMapper.findRankCountByRecommendation() / 20 + 1);
                break;
            case "2" :
                resp.put("count", worksMapper.findRankCountByRecommendationAndCollect() / 20 + 1);
                break;
            case "3" :
                resp.put("count", worksMapper.findRankCountByCollect() / 20 + 1);
                break;
            default:
                resp.put("count", 1);
        }
        return resp;
    }
}
