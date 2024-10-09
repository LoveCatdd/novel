    package com.novel.backend.mapper;

    import com.novel.backend.pojo.Libs;
    import com.novel.backend.pojo.User;
    import com.novel.backend.pojo.Works;
    import com.novel.backend.response.*;
    import org.apache.ibatis.annotations.*;
    import org.springframework.security.core.parameters.P;

    import java.util.List;
    import java.util.Optional;

    /**
     * User: popo
     * Date: 2023/12/26
     * Time: 22:11
     * Description:
     */
    @Mapper
    public interface WorksMapper {

        @Select("select * from works where name = #{name} and aid = #{aid}")
        public Optional<User> findByNameAndAid(@Param("name") String name, @Param("aid") Integer aid);
        @Select("select count(*) from works where name = #{name} and aid = #{aid}")
        public Integer existsByNameAndAid(@Param("name") String name, @Param("aid") Integer aid);

        @Insert("insert into works(aid, path, count, name) values(#{aid}, #{path}, #{count}, #{name})")
        public int save(Works works);
        @Select("SELECT CONCAT(u.last_name, '', u.first_name) AS fullName, " +
                "wi.img AS workImg, w.name AS workName, " +
                "w.id AS workId, " +
                "wi.type AS workType, wi.last_date AS workLastDate, " +
                "wi.intro AS workIntro, wi.lib AS workLib " +
                "FROM author a " +
                "JOIN user u ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT 6")
        public List<WorksResponse> findTopWorksInfo();

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "wi.img As workImg, w.name As workName," +
                "w.id AS workId, " +
                "wi.intro As workIntro, wi.lib As workLib " +
                "FROM author a " +
                "JOIN user u ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT 9")
        public List<NewWorksResponse> findTopNewWorksInfo();

        @Select("SELECT w.name AS workName, " +
                "w.id As workId " +
                "FROM libs l " +
                "JOIN works_info wi ON l.name = wi.lib " +
                "JOIN works w ON wi.wid = w.id " +
                "where l.name = #{name} " +
                "ORDER BY wi.popularity DESC " +
                "LIMIT 5")
        public List<HotWorksOfLibResponse> findTopWorksPerLibrary(@Param("name") String name);

        @Select("SELECT * " +
                "FROM libs " +
                "LIMIT 8")
        public List<Libs> findTopLibrary();


        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "wi.img As workImg, w.name As workName," +
                "w.id AS workId, " +
                "wi.intro As workIntro, wi.lib As workLib " +
                "FROM author a " +
                "JOIN user u ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT 4")
        public List<NewWorksResponse> findCompletedTopWorksByPopularity();

        @Select("SELECT l.name AS libName, " +
                "w.name AS workName " +
                "FROM libs l " +
                "JOIN works_info wi ON l.id = wi.lib " +
                "JOIN works w ON wi.wid = w.id " +
                "WHERE wi.is_end = 1 " +
                "ORDER BY wi.collect DESC " +
                "LIMIT 6")
        public List<HotWorksOfLibResponse> findCompletedTopWorksByCollect();


        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, " +
                "w.id AS workId, " +
                "wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT 10")
        public List<RankBookResponse> findTopRankNewBookByRecommendation();

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, " +
                "wi.recommendation AS workRecommend, " +
                "wi.intro As workIntro, wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findRnkOfNewBookByRecommendation(@Param("page") Integer page,@Param("limit") Integer limit);

        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH " +
                "ORDER BY wi.recommendation DESC ")
        public Integer findRankCountByRecommendation();

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, wi.type AS workType, " +
                "wi.recommendation AS workRecommend, " +
                "wi.intro As workIntro, wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH and wi.lib = #{lib} " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findLibRanksByRecommendation(@Param("lib") String lib, @Param("page") Integer page,@Param("limit") Integer limit);


        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.create_date >= NOW() - INTERVAL 6 MONTH and wi.lib = #{lib} " +
                "ORDER BY wi.recommendation DESC ")
        public Integer findLibRankCountByRecommendation(@Param("lib") String lib);


        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, " +
                "w.id AS workId, " +
                "wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC " +
                "LIMIT 10")
        public List<RankBookResponse> findTopTenByRecommendationAndCollect();
        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC")
        public Integer findRankCountByRecommendationAndCollect();
        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, " +
                "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findRankOfCollectByRecommendationAndCollect(@Param("page") Integer page,@Param("limit") Integer limit);

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, wi.type AS workType, " +
                "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "where wi.lib = #{lib} " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findLibRanksByRecommendationAndCollect(@Param("lib") String lib, @Param("page") Integer page,@Param("limit") Integer limit);

        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "where wi.lib = #{lib} " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC ")
        public Integer findLibRankCountByRecommendationAndCollect(@Param("lib") String lib);

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, " +
                "w.id AS workId, " +
                "wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 " +
                "ORDER BY wi.collect DESC " +
                "LIMIT 10")
        public List<RankBookResponse> findTopTenCompletedByCollect();

        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 " +
                "ORDER BY wi.collect DESC ")
        public Integer findRankCountByCollect();

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, " +
                "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 " +
                "ORDER BY wi.collect DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findRankOfCompletedByCollect(@Param("page") Integer page,@Param("limit") Integer limit);

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, wi.type AS workType, " +
                "wi.intro As workIntro, wi.recommendation AS workRecommend, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 and wi.lib = #{lib} " +
                "ORDER BY wi.collect DESC " +
                "LIMIT #{page}, #{limit}")
        public List<RankBookResponse> findLibRanksByCollect(@Param("lib") String lib, @Param("page") Integer page,@Param("limit") Integer limit);

        @Select("SELECT count(*) " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.is_end = 1 and wi.lib = #{lib} " +
                "ORDER BY wi.collect DESC ")
        public Integer findLibRankCountByCollect(@Param("lib") String lib);


        @Select("SELECT " +
                "CONCAT(u.last_name, '', u.first_name) AS fullName, " +
                "u.first_name AS firstName, " +
                "a.intro AS authorIntro, " +
                "w.name AS workName, " +
                "wi.lib AS workLib, " +
                "w.path AS path, " +
                "w.id AS workId, " +
                "w.count AS workCount, " +
                "wi.recommendation AS workRecommend, " +
                "wi.img AS workImg, " +
                "wi.last_date AS workLastDate, " +
                "wi.intro AS workIntro " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "where w.id = #{id}"
        )
        NovelPageResponse findNovelPageByWid(@Param("id") Integer id);

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName, " +
                "w.name AS workName, wi.last_date AS workLastDate, " +
                "w.id AS workId, " +
                "wi.intro As workIntro, " +
                "wi.lib AS workLib, " +
                "wi.img AS workImg " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "where w.name LIKE  CONCAT('%', #{search}, '%') " +
                "ORDER BY wi.recommendation DESC, wi.collect DESC " +
                "LIMIT 100")
        public List<SearchResponse> findInfoBySearch (@Param("search") String search);

        @Select("SELECT " +
                "w.name AS workName, " +
                "wi.lib AS workLib, " +
                "w.count AS workCount, " +
                "wi.img AS workImg, " +
                "w.id AS workId, " +
                "wi.last_date AS workLastDate,  wi.type AS workType, " +
                "wi.intro AS workIntro " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "where CONCAT(u.last_name, '', u.first_name) = #{author}"
        )
        List<AuthorWorksListResponse> findWorksListInfoByAuthor(@Param("author") String author);

        @Select("SELECT " +
                "CONCAT(u.last_name, '', u.first_name) AS fullName, " +
                "u.email AS email, " +
                "u.first_name AS firstName," +
                "a.intro AS authorIntro " +
                "FROM user u " +
                "JOIN author a ON u.id = a.uid " +
                "where CONCAT(u.last_name, '', u.first_name) = #{author}"
        )
        AuthorInfoResponse findInfoByAuthor(@Param("author") String author);

        @Select("SELECT CONCAT(u.last_name,'', u.first_name) AS fullName," +
                "wi.img As workImg, w.name As workName," +
                "w.id AS workId, wi.type AS workType, " +
                "wi.intro As workIntro, wi.lib As workLib " +
                "FROM author a " +
                "JOIN user u ON u.id = a.uid " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE wi.lib = #{lib} " +
                "ORDER BY wi.recommendation DESC " +
                "LIMIT 50")
        public List<TopWorksLibResponse> findWorksInfoByLib(@Param("lib") String lib);

        @Select("SELECT COUNT(DISTINCT w.id) AS totalWorks, " +
                "SUM(wi.collect) AS totalCollect, " +
                "SUM(wi.recommendation) AS totalRecommendation " +
                "FROM author a " +
                "JOIN works w ON a.id = w.aid " +
                "JOIN works_info wi ON w.id = wi.wid " +
                "WHERE a.uid = #{id}")
        public  CreationInfoResponse findCreationInfo(@Param("id") Integer id);
    }