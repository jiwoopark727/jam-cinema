import React from 'react';
import styled from 'styled-components';
import { IProductionCompany } from './MovieDetail';

interface ICompanyProps {
  company: IProductionCompany[] | undefined;
}

const CompanyWrapper = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  /* & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */
`;

const CompanyImg = styled.div<{ bg_img: string }>`
  background-color: white;
  background-image: url(${(props) => props.bg_img});
  /* background-size: cover; */
  background-position: center center;
  background-repeat: no-repeat;
  width: 200px;
  height: 100px;
  border-radius: 10px;
`;

const ProductionCompany = ({ company }: ICompanyProps) => {
  console.log(company);
  return (
    <CompanyWrapper>
      {company?.map((data) => (
        <div>
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
