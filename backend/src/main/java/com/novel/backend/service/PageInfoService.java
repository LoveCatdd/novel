package com.novel.backend.service;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 21:21
 * Description:
 */
public interface PageInfoService {
    public Map<String, Object> frontCarouselPageInfo();

    public Map<String, Object> frontNewBookPageInfo();

    public Map<String, Object> frontHotBookPageInfo();

    public Map<String, Object> frontEndBookPageInfo();

    public Map<String, Object> rankNewBookPageInfo();

    public Map<String, Object> rankCollectBookPageInfo();

    public Map<String, Object> rankEndBookPageInfo();

    public Map<String, Object> rankOfNewBookPageInfo(Integer page, Integer limit);

    public Map<String, Object> rankOfCollectBookPageInfo(Integer page, Integer limit);

    public Map<String, Object> rankOfEndBookPageInfo(Integer page, Integer limit);

    public Map<String, Object> rankCountOfType(java.lang.String type);
}
