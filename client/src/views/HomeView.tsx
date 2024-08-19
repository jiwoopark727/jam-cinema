import React from 'react';
import { BannerSection } from '../components/Home/BannerSection';
import { RecentMovieSection } from '../components/Home/RecentMovieSection';
import { RecentNewsSection } from '../components/Home/RecentNewsSection';
import { CommunitySection } from '../components/Home/CommunitySection';
import { GenreSection } from '../components/Home/GenreSection';
import { EditorPickSection } from '../components/Home/EditorPickSection';
import styled from 'styled-components';

const HomeViewWrapper = styled.div``;

export const HomeView = () => {
  return (
    <HomeViewWrapper>
      <BannerSection />
      <RecentMovieSection />
      <RecentNewsSection />
      <CommunitySection />
      <GenreSection />
      <EditorPickSection />
    </HomeViewWrapper>
  );
};
