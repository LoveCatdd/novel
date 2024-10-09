package com.novel.backend.pojo;

import lombok.Builder;
import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 10:56
 * Description:
 */
@Data
@Builder
public class User {

    private Integer id;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
}
