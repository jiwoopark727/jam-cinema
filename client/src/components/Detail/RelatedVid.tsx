import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IUrl {
  vidUrl: string | undefined;
}

interface IVideoKey {
  key: string;
}

const RelateVidWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const RelatedVid = ({ vidUrl }: IUrl) => {
  const [video, setVideo] = useState<IVideoKey[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${vidUrl}/videos?api_key=878ff909e9f63d6bb3b857c0479816e5&language=ko-KR`
      )
      .then((res) => {
        setVideo(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RelateVidWrapper>
      {video?.map((key) => (
        <iframe
          key={key.key}
          width='400'
          height='220'
          src={`https://www.youtube.com/embed/${key.key}?si=rvzsBOIeyvLvno02`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      ))}
    </RelateVidWrapper>
  );
};

export default RelatedVid;
