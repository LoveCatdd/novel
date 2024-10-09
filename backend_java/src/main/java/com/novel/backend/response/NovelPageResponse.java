package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2024/1/1
 * Time: 22:37
 * Description:
 */
@Data
public class NovelPageResponse {

    private String fullName;
    private String firstName;
    private String authorIntro;

    private Integer workId;
    private String workName;
    private String workLib;
    private Integer workRecommend;
    private String workImg;
    private String path;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date workLastDate;
    private String workIntro;

    private Integer workCount;

}
