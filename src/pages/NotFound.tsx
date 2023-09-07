import styled from "styled-components";
import Header from "../components/common/Header/Header"


export default function NotFound() {
  return (
    <>
      <Header />
      <StyledNotFound>
        <h2>404 Not Found</h2>
        <p>페이지를 찾을 수 없습니다.</p>
      </StyledNotFound>
    </>
  );
}

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 500px;
  text-align: center;
  background-color: #a0c8e9;
  font-weight: bold;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;