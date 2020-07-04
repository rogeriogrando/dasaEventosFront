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
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    align-items: center;
    width: 100%;
    font-size: 16px;
    border: 0;
    border-radius: 4px;
    height: 44px;
    color: #fff;
    margin: 0 0 10px;
  }

  select {
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
    margin: 0 0 10px;
  }

  .form-check-input {
    width: 20%;
    margin-left: 40px;
    margin-right: 140px;
    height: 20px;
  }

  .form-check-label {
    font-size: 16px;
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
`;
