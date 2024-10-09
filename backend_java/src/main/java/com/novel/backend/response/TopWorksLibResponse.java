package com.novel.backend.response;

import lombok.Data;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 11:11
 * Description:
 */
@Data
public class TopWorksLibResponse {
    private Integer workId;
    private String fullName;
    private String workName;
    private String workLib;
    private String workIntro;
    private String workImg;
    private String workType;
}
