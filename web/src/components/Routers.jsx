import React from 'react'
import { Front } from '../page/Front'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Rank } from '../page/Rank';
import { LoginIn } from '../page/LoginIn';
import { Register } from '../page/Register';
import { Space } from '../page/Space';
import { HistoryPage } from '../page/HistoryPage';
import { CreationPage } from '../page/CreationPage';
import NavBar from './NavBar';
import { NextPage } from '../page/NextPage';
import { NovelPage } from '../page/NovelPage';
import { ReadPage } from '../page/ReadPage';
import { RankSingle } from './RankSingle';
import { SearchPage } from '../page/SearchPage';
import { AuthorSpace } from '../page/AuthorSpace';
import { LibPage } from '../page/LibPage';
import { NotFound } from '../page/NotFound';


export const Routers = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
            <NavBar children={<Front /> } />
          }
          />
          <Route 
            path="ranking" 
            element={
              <NavBar children={<Rank />} />
            } 
          />
          <Route 
            path="ranking/:id" 
            element={
              <NavBar children={<RankSingle />} />
            } 
          />
          <Route 
            path="myspace"
            element={
              <NavBar children={<Space />} />
            }
          />
          <Route 
            path="login" 
            element={
                <LoginIn />
            }
          />
          <Route 
            path="register" 
            element={
                <Register />
            }
          />
          <Route 
            path="history" 
            element={
              <NavBar children={<HistoryPage />} />
            }
          />
          <Route 
            path="next" 
            element={
              <NavBar children={<NextPage />} />
            }
          />
          <Route 
            path="create" 
            element={
              <NavBar children={<CreationPage />} />
            }
          />
          <Route 
            path="page/:wid" 
            element={
              <NavBar children={<NovelPage />} />
            }
          />
          <Route 
            path="page/:wid/:page" 
            element={
              <NavBar children={<ReadPage />} />
            }
          />
          <Route 
            path="search"
            element={
              <NavBar children={<SearchPage />} />
            }
          />
          <Route 
            path="author_space"
            element={
              <NavBar children={<AuthorSpace />} />
            }
          />
          <Route 
            path="novel_lib"
            element={
              <NavBar children={<LibPage />} />
            }
          />
        </Route>
        <Route 
          path="*"
          element={
            <NavBar children={<NotFound />} />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}
