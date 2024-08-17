import React from 'react';
import { BannerSection } from '../components/Home/BannerSection';
import { RecentMovieSection } from '../components/Home/RecentMovieSection';
import { RecentNewsSection } from '../components/Home/RecentNewsSection';
import { CommunitySection } from '../components/Home/CommunitySection';
import { GenreSection } from '../components/Home/GenreSection';
import { EditorPickSection } from '../components/Home/EditorPickSection';

export const HomeView = () => {
  return <div>
    <BannerSection/>
    <RecentMovieSection/>
    <RecentNewsSection/>
    <CommunitySection/>
    <GenreSection/>
    <EditorPickSection/>    
  </div>;
};
