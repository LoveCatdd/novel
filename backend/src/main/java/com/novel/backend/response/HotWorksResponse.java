package com.novel.backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * User: popo
 * Date: 2023/12/31
 * Time: 20:57
 * Description:
 */
@Data
@Builder
public class HotWorksResponse {
    private String lib;
    private List<HotWorksOfLibResponse> list;
}
