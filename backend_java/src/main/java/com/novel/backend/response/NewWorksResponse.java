package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 9:11
 * Description:
 */
@Data
public class NewWorksResponse {
    private Integer workId;
    private String fullName;
    private String workName;
    private String workLib;
    private String workIntro;
    private String workImg;

}

