import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;

  .formGridCursoCad {
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      justify-content: center;
      margin-bottom: 30px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }

    input {
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      font-size: 14px;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
    }
    button {
      height: 44px;
      margin-bottom: 50px;
      width: 100%;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }
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
      width: 15%;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }
  }
`;

export const FormModal = styled.div`
  .body {
    font-size: 55px;
    input {
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      font-size: 14px;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
    }
  }
`;
