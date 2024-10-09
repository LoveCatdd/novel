package com.novel.backend.request;

import lombok.Data;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:54
 * Description:
 */
@Data
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String password;
    private String email;

    private String confirmedPassword;
}
