package com.novel.backend.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * User: popo
 * Date: 2024/1/2
 * Time: 9:36
 */
@Data
public class AuthorInfoResponse {

    private String fullName;
    private String firstName;
    private String authorIntro;
    private String email;

}
