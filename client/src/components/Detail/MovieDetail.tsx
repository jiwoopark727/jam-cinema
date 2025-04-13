import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ProductionCompany from './ProductionCompany';
import RelatedVid from './RelatedVid';
import Actor from './Actor';
import ProductionCrew from './ProductionCrew';

interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  logo_path: string;
  name: string;
}

export interface ICast {
  character: string;
  name: string;
  original_name: string;
  profile_path: string;
}

export interface ICrew {
  job: string;
  name: string;
  original_name: string;
}

interface ICredits {
  cast: ICast[];
  crew: ICrew[];
}

interface IDetailData {
  budget: number;
  genres: IGenre[];
  id: number;
  title: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
  credits: ICredits;
}

const DetailWrapper = styled.div`
  min-height: 100vh;
  width: 1200px;
  margin-top: 50px;
  color: ${(props) => props.theme.textColor};
`;

const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Poster = styled.div<{ bg_photo: string }>`
  background-color: gray;
  background-image: url(${(props) => props.bg_photo});
  background-size: cover;
  background-position: center center;
  width: 300px;
  height: 430px;
  border-radius: 10px;
  margin-right: 70px;
`;

const Info = styled.div`
  flex: 0 0 60%;
  div {
    margin-bottom: 10px;
    font-size: 18px;
    & > span {
      &:first-child {
        font-weight: bold;
      }
    }
    &:last-child {
      & > span {
        &:last-child {
          &:last-child {
            &:last-child {
              span {
                &:last-child {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const AddInfo = styled.div`
  margin-top: 80px;
`;

const InfoMenu = styled.div`
  margin-bottom: 12px;
  & > span {
    & > span {
      &:first-child {
        cursor: pointer;
        &.clicked {
          color: ${(props) => props.theme.SignatureColor};
        }
      }
    }
    &:last-child {
      & > span {
        &:last-child {
          display: none;
        }
      }
    }
  }
`;

const MovieDetail = () => {
  const params = useParams();
  console.log(params.id);

  const allMenu = ['관련 영상', '제작사', '배우', '제작진'];

  const [detailData, setDetailData] = useState<IDetailData>();
  const [menuName, setMenuName] = useState('관련 영상');

  const changeMenu = (menu: string) => {
    setMenuName(menu);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=878ff909e9f63d6bb3b857c0479816e5&append_to_response=credits&language=ko-KR`
      )
      .then((res) => {
        setDetailData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <DetailWrapper>
      <BasicInfo>
        <Poster bg_photo={`https://image.tmdb.org/t/p/w300${detailData?.poster_path}`}></Poster>
        <Info>
          <div>
            <span>영화 제목: </span>
            <span>{detailData?.title}</span>
          </div>
          <div>
            <span>장르: </span>
            <span>{detailData?.genres.map((data) => `${data.name} `)}</span>
          </div>
          <div>
            <span>개봉일: </span>
            <span>{detailData?.release_date}</span>
          </div>
          <div>
            <span>상영 시간: </span>
            <span>{detailData?.runtime}분</span>
          </div>
          <div>
            <span>줄거리: </span>
            <span>{detailData?.overview}</span>
          </div>
          <div>
            <span>배우: </span>
            <span>
              {detailData?.credits.cast.slice(0, 5).map((data) => (
                <>
                  <span>{data.name}</span>
                  <span>, </span>
                </>
              ))}
            </span>
          </div>
        </Info>
      </BasicInfo>
      <AddInfo>
        <InfoMenu>
          {allMenu.map((menu) => (
            <span>
              <span onClick={() => changeMenu(menu)} className={menuName === menu ? 'clicked' : ''}>
                {menu}
              </span>
              <span> | </span>
            </span>
          ))}
        </InfoMenu>
        <div>
          {menuName === '관련 영상' ? (
            <RelatedVid vidUrl={params.id} />
          ) : menuName === '제작사' ? (
            <ProductionCompany company={detailData?.production_companies} />
          ) : menuName === '배우' ? (
            <Actor actor={detailData?.credits.cast} />
          ) : menuName === '제작진' ? (
            <ProductionCrew crew={detailData?.credits.crew} />
          ) : (
            ''
          )}
        </div>
      </AddInfo>
    </DetailWrapper>
  );
};

export default MovieDetail;
