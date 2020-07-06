import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;

  .novocertificado {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
  }

  .box {
    display: flex;
    margin-top: 25px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 10px;
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
