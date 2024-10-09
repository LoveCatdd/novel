package com.novel.backend.mapper;

import com.novel.backend.response.HistoryAllDateResponse;
import com.novel.backend.response.WatchResponse;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

/**
 * User: popo
 * Date: 2023/12/27
 * Time: 10:52
 * Description:
 */
@Mapper
public interface WatchMapper {



    @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName, " +
            "wi.img AS workImg, " +
            "w.id AS workId, " +
            "wi.recommendation AS workRecommend, " +
            "w.name AS workName " +
            "FROM watch_history wh " +
            "JOIN works_info wi ON wh.wid = wi.wid " +
            "JOIN works w ON wi.wid = w.id " +
            "JOIN author a ON w.aid = a.id " +
            "JOIN user u ON a.uid = u.id " +
            "WHERE wh.uid = #{uid} AND wh.delete_date IS NULL " +
            "ORDER BY wh.create_date DESC " +
            "LIMIT 50")
    public List<WatchResponse> findWatchHistoryByUserId(@Param("uid") Integer uid);


    @Select("SELECT wh.create_date AS createDate " +
            "FROM watch_history wh " +
            "WHERE wh.uid = #{uid} AND wh.delete_date IS NULL " +
            "LIMIT 50")
    public List<HistoryAllDateResponse> findHistoryAllDateByUserId(@Param("uid") Integer uid);

    @Select("SELECT wn.create_date AS createDate " +
            "FROM watch_next wn " +
            "WHERE wn.uid = #{uid} AND wn.delete_date IS NULL " +
            "LIMIT 50")
    public List<HistoryAllDateResponse> findNextAllDateByUserId(@Param("uid") Integer uid);

    @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName, " +
            "wi.img AS workImg, " +
            "w.id AS workId, " +
            "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
            "w.name AS workName " +
            "FROM watch_history wh " +
            "JOIN works_info wi ON wh.wid = wi.wid " +
            "JOIN works w ON wi.wid = w.id " +
            "JOIN author a ON w.aid = a.id " +
            "JOIN user u ON a.uid = u.id " +
            "WHERE wh.uid = #{uid} AND wh.delete_date IS NULL and wh.create_date = #{create_date} " +
            "ORDER BY wh.create_date DESC " +
            "LIMIT 50")
    public List<WatchResponse> findHistoryAllINfoByUserId(@Param("uid") Integer uid, @Param("create_date") Date create_date);

    @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName, " +
            "wi.img AS workImg, " +
            "w.id AS workId, " +
            "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
            "w.name AS workName " +
            "FROM watch_next wn " +
            "JOIN works_info wi ON wn.wid = wi.wid " +
            "JOIN works w ON wi.wid = w.id " +
            "JOIN author a ON w.aid = a.id " +
            "JOIN user u ON a.uid = u.id " +
            "WHERE wn.uid = #{uid} AND wn.delete_date IS NULL and wn.create_date = #{create_date} " +
            "ORDER BY wn.create_date DESC " +
            "LIMIT 50")
    public List<WatchResponse> findNextAllINfoByUserId(@Param("uid") Integer uid, @Param("create_date") Date create_date);


    @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName, " +
            "wi.recommendation AS workRecommend, " +
            "w.id AS workId, " +
            "wi.img AS workImg, " +
            "w.name AS workName " +
            "FROM watch_next wn " +
            "JOIN works_info wi ON wn.wid = wi.wid " +
            "JOIN works w ON wi.wid = w.id " +
            "JOIN author a ON w.aid = a.id " +
            "JOIN user u ON a.uid = u.id " +
            "WHERE wn.uid = #{uid} AND wn.delete_date IS NULL " +
            "ORDER BY wn.create_date DESC " +
            "LIMIT 10")
    public List<WatchResponse> findWatchNextByUserId(@Param("uid") Integer uid);

    @Insert("INSERT INTO watch_history(uid, wid, create_date) VALUES(#{uid}, #{wid}, #{create_date})")
    public void addWatchHistory(@Param("uid") Integer uid, @Param("wid") Integer wid, @Param("create_date") Date create_date);

    @Update("UPDATE watch_history SET delete_date = #{delete_date} WHERE uid = #{uid} AND wid = #{wid}")
    public void updateWatchHistory(@Param("uid") Integer uid, @Param("wid") Integer wid, @Param("delete_date") Date delete_date);

    @Select("SELECT count(*) from watch_next where uid = #{uid} and wid = #{wid}")
    public Integer existsWatchNext(@Param("uid") Integer uid, @Param("wid") Integer wid);

    @Insert("INSERT INTO watch_next(uid, wid, create_date) VALUES(#{uid}, #{wid}, #{create_date})")
    public void addWatchNext(@Param("uid") Integer uid, @Param("wid") Integer wid, @Param("create_date") Date create_date);

    @Update("UPDATE watch_next SET delete_date = #{delete_date} WHERE uid = #{uid} AND wid = #{wid}")
    public void updateWatchNext(@Param("uid") Integer uid, @Param("wid") Integer wid, @Param("delete_date") Date delete_date);

}
