import styled from 'styled-components';
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 15px;
  flex-direction: column;
  max-width: 600px;
  margin: 50px auto;

  ul {
    display: grid;
    background: #fff;
    margin-top: 10px;
    padding: 0 20px;
    border-radius: 5px;
    img {
      position: absolute;
    }
  }
`;
