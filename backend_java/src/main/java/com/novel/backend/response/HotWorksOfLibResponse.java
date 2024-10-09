package com.novel.backend.response;

import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 9:39
 * Description:
 */
@Data
public class HotWorksOfLibResponse {
    private Integer workId;
    private String libName;
    private String workName;
}
