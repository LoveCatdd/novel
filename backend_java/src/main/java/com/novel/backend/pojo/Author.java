package com.novel.backend.pojo;

import lombok.Builder;
import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 17:10
 * Description:
 */
@Data
@Builder
public class Author {
    private Integer id;
    private Integer uid;
    private Integer workQuantity;

}