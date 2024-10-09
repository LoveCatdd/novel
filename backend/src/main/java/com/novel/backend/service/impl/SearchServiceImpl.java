package com.novel.backend.service.impl;

import com.novel.backend.mapper.WorksMapper;
import com.novel.backend.response.*;
import com.novel.backend.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 8:52
 * Description:
 */

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final WorksMapper worksMapper;
    @Override
    public Map<String, Object> getInfoBySearch(String search) {
        List<SearchResponse> searchResponses = worksMapper.findInfoBySearch(search);
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        resp.put("searchResponses", searchResponses);

        return resp;
    }

    @Override
    public Map<String, Object> getAuthorInfo(String author) {
        AuthorInfoResponse authorInfoResponses = worksMapper.findInfoByAuthor(author);
        List<AuthorWorksListResponse> authorWorksListResponses = worksMapper.findWorksListInfoByAuthor(author);
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        resp.put("authorInfoResponses", authorInfoResponses);
        resp.put("authorWorksListResponses", authorWorksListResponses);
        return resp;
    }

    @Override
    public Map<String, Object> getLibInfo(String lib) {
        List<TopWorksLibResponse> topWorksLibResponses = worksMapper.findWorksInfoByLib(lib);
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        resp.put("topWorksLibResponses", topWorksLibResponses);
        return resp;
    }

    @Override
    public Map<String, Object> getLibRanksInfo(String lib, String type, Integer page, Integer limit) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        switch (type) {
            case "1" :
                resp.put("newWorks", worksMapper.findLibRanksByRecommendation(lib,(page - 1) * limit , limit));
                break;
            case "2" :
                resp.put("collectWorks", worksMapper.findLibRanksByRecommendationAndCollect(lib, (page - 1) * limit , limit));
                break;
            case "3" :
                resp.put("endWorks", worksMapper.findLibRanksByCollect(lib, (page - 1) * limit , limit));
                break;
            default:
                resp.put("newWorks", worksMapper.findLibRanksByRecommendation(lib,(page - 1) * limit , limit));
                resp.put("collectWorks", worksMapper.findLibRanksByRecommendationAndCollect(lib, (page - 1) * limit , limit));
                resp.put("endWorks", worksMapper.findLibRanksByCollect(lib, (page - 1) * limit , limit));
        }
        return resp;
    }

    @Override
    public Map<String, Object> getLibRankCount(String type, String lib) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("error_message","success");
        switch (type) {
            case "1" :
                resp.put("count", worksMapper.findLibRankCountByRecommendation(lib) / 10 + 1);
                break;
            case "2" :
                resp.put("count", worksMapper.findLibRankCountByRecommendationAndCollect(lib) / 10 + 1);
                break;
            case "3" :
                resp.put("count", worksMapper.findLibRankCountByCollect(lib) / 10 + 1);
                break;
            default:
                resp.put("count", 1);

        }
        return resp;
    }
}
