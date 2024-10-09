package com.novel.backend.mapper;

import com.novel.backend.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

/**
 * User: popo
 * Date: 2023/12/14
 * Time: 11:10
 * Description:
 */
@Mapper
public interface UserMapper {
    @Results(id="userDiyMapper",value = {
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "firstName",column = "first_name"),
            @Result(property = "lastName",column = "last_name"),
            @Result(property = "password",column = "password"),
            @Result(property = "email", column = "email")
    })

    @Select("select * from user where email = #{email}")
    public Optional<User> findByEmail(@Param("email") String email);
    @Select("select count(*) from user where email = #{email}")
    public Integer existsByEmail(@Param("email") String email);

    @ResultMap("userDiyMapper")
    @Insert("insert into user(first_name,last_name, password, email) values(#{firstName}, #{lastName}, #{password}, #{email})")
    public int save(User user);
}
