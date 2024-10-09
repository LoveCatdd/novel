package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 8:49
 * Description:
 */
@Data
public class WorksResponse {
    private Integer workId;
    private String fullName;
    private String workName;
    private String workType;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date workLastDate;
    private String workIntro;
    private String workImg;
}
