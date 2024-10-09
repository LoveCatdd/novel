package com.novel.backend.service;

import java.util.Map;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 8:52
 * Description:
 */
public interface SearchService {
    public Map<String, Object> getInfoBySearch(java.lang.String search);

    public Map<String, Object> getAuthorInfo(String author);

    public Map<String, Object> getLibInfo(java.lang.String lib);

    public Map<String, Object> getLibRanksInfo(String lib, String type, Integer page, Integer limit);

    public Map<String, Object> getLibRankCount(String type, String lib);
}
