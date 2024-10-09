package com.novel.backend.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 11:46
 * Description:
 */
@Data
public class WatchDelRequest {
    private Integer uid;
    private Integer wid;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date deleteDate;

}
