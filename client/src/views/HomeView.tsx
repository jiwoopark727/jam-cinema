import { forwardRef, useRef } from 'react';
import { BannerSection } from '../components/Home/BannerSection';
import { RecentMovieSection } from '../components/Home/RecentMovieSection';
import { RecentNewsSection } from '../components/Home/RecentNewsSection';
import { CommunitySection } from '../components/Home/CommunitySection';
import { GenreSection } from '../components/Home/GenreSection';
import { EditorPickSection } from '../components/Home/EditorPickSection';
import styled from 'styled-components';

const HomeViewWrapper = styled.div``;

export const HomeView = forwardRef<HTMLDivElement>((_, GSRef) => {
  const EPSRef = useRef<HTMLDivElement>(null); // 에디터 픽 섹션 컴포넌트의 위치를 참조

  const onScrollToEPS = () => {
    if (EPSRef.current) {
      EPSRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HomeViewWrapper>
      <BannerSection />
      <RecentMovieSection onScrollToEPS={onScrollToEPS} />
      <RecentNewsSection />
      <CommunitySection />
      <GenreSection ref={GSRef} />
      <EditorPickSection ref={EPSRef} />
    </HomeViewWrapper>
  );
});
