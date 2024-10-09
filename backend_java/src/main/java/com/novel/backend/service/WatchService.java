package com.novel.backend.service;

import com.novel.backend.request.WatchAddRequest;
import com.novel.backend.request.WatchDelRequest;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:46
 * Description:
 */
public interface WatchService {
    public Map<String, Object> watchHistory(Integer uid);

    public Map<String, Object> watchNext(Integer uid);

    public void watchAddHistory(WatchAddRequest watchAddRequest);

    public void watchAddNext(WatchAddRequest watchAddRequest);

    public void watchDelHistory(WatchDelRequest watchDelRequest);

    public void watchDelNext(WatchDelRequest watchDelRequest);

    public Map<String, Object> watchALlHistory(Integer id);

    public Map<String, Object> watchALlNext(Integer id);
}
