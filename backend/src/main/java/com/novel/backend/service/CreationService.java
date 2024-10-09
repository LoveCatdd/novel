package com.novel.backend.service;

import java.util.Map;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 17:01
 * Description:
 */
public interface CreationService {
    public Map<String, String> registerAuthor();

    public Map<String, Object> getInfoByDate(Integer id);

    public Map<String, Object> getInfo();
}
