package com.novel.backend.mapper;

import com.novel.backend.pojo.Author;
import com.novel.backend.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

/**
 * User: popo
 * Date: 2023/12/26
 * Time: 17:08
 * Description:
 */
@Mapper
public interface AuthorMapper {
    @Results(id="AuthorDiyMapper",value = {
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "uid",column = "uid"),
            @Result(property = "workQuantity",column = "work_quantity")
    })

    @Select("select * from author where uid = #{uid}")
    public Optional<Author> findByUid(@Param("uid") Integer uid);
    @Select("select count(*) from author where uid = #{uid}")
    public Integer existsByUid(@Param("uid") Integer uid);

    @ResultMap("AuthorDiyMapper")
    @Insert("insert into author(uid, work_quantity) values(#{uid}, #{workQuantity})")
    public int save(Author author);
    @Select("SELECT count(*) from author where uid = #{uid}")
    public Integer existsAuthor(@Param("uid") Integer uid);


}
