package com.novel.backend.pojo;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 22:43
 * Description:
 */
@Data
@Builder
public class WorksInfo {
    private Integer id;
    private Integer wid;
    private String type;
    private String lib;
    private Integer recommendation;
    private String img;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date lastDate;
    private Integer popularity;
    private Integer isEnd;
    private String Intro;
    private Integer collect;
}
