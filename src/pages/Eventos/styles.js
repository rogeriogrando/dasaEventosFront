import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

    strong {
      display: block;
      color: ${props => (props.available ? '#999' : '#7159c1')};
      font-size: 12px;
      font-weight: normal;
    }
    span {
      display: block;
      margin-top: 3px;
      color: ${props => (props.available ? '#999' : '#666')};
    }
    button {
      font-family: 'Robo', Arial, Helvetica, sans-serif;
      font-size: 12px;
    }
  
    button.btn-desmarcar {
      border: 0;
      border-radius: 2px;
      width: 100%;
      height: 42px;
      padding: 0 20px;
      font-size: 12px;
      font-weight: bold;
      background: #f05a5b;
      color: #fff;
      cursor: pointer;
    }
  
    button.btn-confirmacao {
      border: 0;
      border-radius: 5px;
      width: 100%;
      height: 42px;
      padding: 0 20px;
      font-size: 12px;
      font-weight: bold;
      background: #009512;
      color: #fff;
      cursor: pointer;
    }
  
  }


`;
