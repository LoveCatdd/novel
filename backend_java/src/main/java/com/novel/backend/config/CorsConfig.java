package com.novel.backend.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class CorsConfig implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;


        //Origin（来源）信息
        String origin = request.getHeader("Origin");
        if(origin!=null) {
            //允许指定的 Origin 发起跨域请求
            response.setHeader("Access-Control-Allow-Origin", origin);
        }
        //请求的 Access-Control-Request-Headers 头部字段
        String headers = request.getHeader("Access-Control-Request-Headers");

        
        if(headers!=null) {
            //header设置
            response.setHeader("Access-Control-Allow-Headers", headers);
            //header设置
            response.setHeader("Access-Control-Expose-Headers", headers);
        }
        //允许所有的 HTTP 方法进行跨域请求。
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        //预检请求的结果可以被缓存的最大时间，单位为秒。
        response.setHeader("Access-Control-Max-Age", "3600");
        //允许浏览器发送包含凭证信息（如 Cookie、HTTP 认证等）的请求。
        response.setHeader("Access-Control-Allow-Credentials", "true");

        //将请求传递给下一个过滤器或目标资源进行处理。
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}
