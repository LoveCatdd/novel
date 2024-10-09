package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 22:51
 * Description:
 */
@Data
public class HistoryAllDateResponse {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date CreateDate;

}
