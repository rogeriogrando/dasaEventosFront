import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;
  align-items: center;

  thead {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }
  tbody {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
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
