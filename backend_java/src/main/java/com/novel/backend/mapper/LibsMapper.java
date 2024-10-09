package com.novel.backend.mapper;

import com.novel.backend.pojo.Libs;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 9:27
 * Description:
 */
@Mapper
public interface LibsMapper {
    @Select("SELECT * FROM libs")
    public List<Libs> findAll();
    @Insert("insert libs(name) values(#{name})")
    public void insert(@Param("name") String name);
}
