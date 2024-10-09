package com.novel.backend.pojo;

import lombok.Builder;
import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 22:07
 * Description:
 */
@Data
@Builder
public class Works {
    private Integer id;
    private Integer aid;
    private String path;
    private Integer count;
    private String name;
}
