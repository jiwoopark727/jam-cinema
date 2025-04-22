import { ICrew } from './MovieDetail';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

interface IProductionCrew {
  crew: ICrew[] | undefined;
}

const CrewWrapper = styled.div`
  display: grid;
  gap: 15px;
  row-gap: 30px;
  grid-template-columns: repeat(5, 1fr);
  .card {
    border: 1px solid #c2c2c2;
    border-radius: 10px;
    padding: 10px;
    .card-title {
      margin-bottom: 10px;
    }
  }
`;

const ProductionCrew = ({ crew }: IProductionCrew) => {
  return (
    <CrewWrapper>
      {crew?.map((data, idx) => (
        <Card key={idx} style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>{data.original_name}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>{data.job}</Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </CrewWrapper>
  );
};

export default ProductionCrew;
