package com.novel.backend.response;

import lombok.Builder;
import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:57
 * Description:
 */
@Data
public class WatchResponse {
    private Integer workId;
    private String workImg;
    private String workName;
    private String fullName;
    private Integer workRecommend;
    private String workIntro;
}
