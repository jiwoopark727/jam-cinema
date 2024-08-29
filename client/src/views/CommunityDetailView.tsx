import React from 'react';
import { CommunityDetail } from '../components/Community/CommunityDetail';
import { useLocation } from 'react-router';

export const CommunityDetailView = () => {
  const location = useLocation();

  return (
    <div>
      <CommunityDetail info={location.state.info} />
    </div>
  );
};
