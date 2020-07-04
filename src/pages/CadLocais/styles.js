import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;

  .titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 0 30px;
    font-size: 18px;
    font-weight: bold;
  }

  label {
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  input {
    width: 100%;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    align-items: center;
    font-size: 16px;
    border: 0;
    border-radius: 4px;
    height: 44px;
    color: #fff;
  }

  textarea {
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
  }

  button {
    height: 44px;
    width: 100%;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
  }
  ul {
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    padding: 0 15px;
    border: 0;

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
