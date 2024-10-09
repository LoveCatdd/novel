package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 9:00
 * Description:
 */
@Data
public class SearchResponse {

    private Integer workId;
    private String fullName;
    private String workName;
    private String workLib;

    private String workImg;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date workLastDate;
    private String workIntro;
}
