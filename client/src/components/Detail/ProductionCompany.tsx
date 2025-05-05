import styled from 'styled-components';
import { IProductionCompany } from './MovieDetail';

interface ICompanyProps {
  company: IProductionCompany[] | undefined;
}

const CompanyWrapper = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
`;

const CompanyImg = styled.div<{ bg_img: string }>`
  background-color: gray;
  background-image: url(${(props) => props.bg_img});
  background-position: center center;
  background-repeat: no-repeat;
  width: 200px;
  height: 100px;
  border-radius: 10px;
`;

const ProductionCompany = ({ company }: ICompanyProps) => {
  return (
    <CompanyWrapper>
      {company?.map((data) => (
        <div key={data.name}>
          <CompanyImg
            bg_img={
              data.logo_path
                ? `https://image.tmdb.org/t/p/w200/${data.logo_path}`
                : '/images/noImage.png'
            }
          />
          <div>{data.name}</div>
        </div>
      ))}
    </CompanyWrapper>
  );
};

export default ProductionCompany;
