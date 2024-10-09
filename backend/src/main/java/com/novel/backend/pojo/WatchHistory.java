package com.novel.backend.pojo;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:51
 * Description:
 */
@Data
@Builder
public class WatchHistory {
    public static final Integer MaxNum = 50;

    private Integer id;
    private Integer uid;
    private Integer wid;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date deleteDate;
}
