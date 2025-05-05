import { useLocation } from 'react-router';
import { CommunityModify } from '../components/Community/CommunityModify';

export const CommunityModifyView = () => {
  const location = useLocation();

  return (
    <div>
      <CommunityModify info={location.state.info} />
    </div>
  );
};
