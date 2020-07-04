import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
  flex-direction: column;
  max-width: 1200px;
  margin: 100px auto;

  ul {
    margin: 10px auto;
    img:hover {
      cursor: pointer;
      -webkit-transition: all .9s ease;
      margin-top: 10px;
      padding: 0 20px;
      transform: scale(1.35);
    }
  }
`;
