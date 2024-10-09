package com.novel.backend.service.impl;

import com.novel.backend.mapper.WatchMapper;
import com.novel.backend.request.WatchAddRequest;
import com.novel.backend.request.WatchDelRequest;
import com.novel.backend.response.HistoryAllDateResponse;
import com.novel.backend.response.HistoryAllInfoResponse;
import com.novel.backend.response.HotWorksResponse;
import com.novel.backend.response.WatchResponse;
import com.novel.backend.service.WatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:46
 * Description:
 */
@Service
@RequiredArgsConstructor
public class WatchServiceImpl implements WatchService {

    private final WatchMapper watchMapper;

    @Override
    public Map<String, Object> watchHistory(Integer uid) {
        List<WatchResponse> watchResponses = watchMapper.findWatchHistoryByUserId(uid);
        Map<String, Object> resp = new HashMap<>();
        resp.put("watchHistory", watchResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public Map<String, Object> watchNext(Integer uid) {
        List<WatchResponse> watchResponses = watchMapper.findWatchNextByUserId(uid);
        Map<String, Object> resp = new HashMap<>();
        resp.put("watchNext", watchResponses);
        resp.put("error_message", "success");
        return resp;
    }

    @Override
    public void watchAddHistory(WatchAddRequest watchAddRequest) {

        Integer uid = watchAddRequest.getUid();
        Integer wid = watchAddRequest.getWid();
        Date createDate = watchAddRequest.getCreateDate();

        watchMapper.addWatchHistory(uid,wid,createDate);
    }

    @Override
    public void watchAddNext(WatchAddRequest watchAddRequest) {

        Integer uid = watchAddRequest.getUid();
        Integer wid = watchAddRequest.getWid();

        Integer exists = watchMapper.existsWatchNext(uid, wid);

        if (exists == 1) {
            return ;
        }
        Date createDate = watchAddRequest.getCreateDate();
        watchMapper.addWatchNext(uid,wid,createDate);
    }

    @Override
    public void watchDelHistory(WatchDelRequest watchDelRequest) {

        Integer uid = watchDelRequest.getUid();
        Integer wid = watchDelRequest.getWid();
        Date deleteDate = watchDelRequest.getDeleteDate();

        watchMapper.updateWatchHistory(uid,wid,deleteDate);
    }

    @Override
    public void watchDelNext(WatchDelRequest watchDelRequest) {

        Integer uid = watchDelRequest.getUid();
        Integer wid = watchDelRequest.getWid();
        Date deleteDate = watchDelRequest.getDeleteDate();

        watchMapper.updateWatchNext(uid,wid,deleteDate);
    }

    @Override
    public Map<String, Object> watchALlHistory(Integer id) {
        List<HistoryAllDateResponse> historyAllDateResponses = watchMapper.findHistoryAllDateByUserId(id);
        List<HistoryAllInfoResponse> historyAllInfoResponses = new ArrayList<>();

        historyAllDateResponses.stream()
                .distinct()
                .collect(Collectors.toList()).forEach(date -> {
                    historyAllInfoResponses.add(
                        HistoryAllInfoResponse.builder()
                            .date(date.getCreateDate())
                            .list(watchMapper.findHistoryAllINfoByUserId(id, date.getCreateDate()))
                            .build()
            );
        });



        Map<String, Object> resp = new HashMap<>();
        resp.put("historys", historyAllInfoResponses);
        resp.put("error_message", "success");
        return resp;

    }

    @Override
    public Map<String, Object> watchALlNext(Integer id) {
        List<HistoryAllDateResponse> historyAllDateResponses = watchMapper.findNextAllDateByUserId(id);
        List<HistoryAllInfoResponse> historyAllInfoResponses = new ArrayList<>();

        historyAllDateResponses.stream()
                .distinct()
                .collect(Collectors.toList()).forEach(date -> {
                    historyAllInfoResponses.add(
                            HistoryAllInfoResponse.builder()
                                    .date(date.getCreateDate())
                                    .list(watchMapper.findNextAllINfoByUserId(id, date.getCreateDate()))
                                    .build()
                    );
                });



        Map<String, Object> resp = new HashMap<>();
        resp.put("nexts", historyAllInfoResponses);
        resp.put("error_message", "success");
        return resp;

    }
}
