import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 500px;
  margin: 30px auto;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 10px;
  }
  ul {
    display: flex;
    flex-direction: row;

    padding: 0 15px;
    border: 0;
    margin: 1 0 0px;
    justify-content: center;
    height: 44px;
    border-radius: 4px;

    h1 {
      display: flex;
      background: rgba(0, 0, 0, 0.6);
      align-items: center;
      width: 100%;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
    }
    button {
      height: 44px;
      width: 30%;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }
  }
`;
