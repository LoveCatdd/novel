package com.novel.backend.request;

import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:44
 * Description:
 */
@Data
public class AuthenticationRequest {

    private String email;
    private String password;

}
