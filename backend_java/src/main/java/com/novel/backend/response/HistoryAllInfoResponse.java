package com.novel.backend.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 22:54
 * Description:
 */
@Data
@Builder
public class HistoryAllInfoResponse {
    private Date date;
    private List<WatchResponse> list;
}
