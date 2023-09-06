import styled from "styled-components";
import { SearchWordType } from "../../../types";

type SearchBoxProps = {
  data: SearchWordType[] | null;
};
export default function SearchBox({ data }: SearchBoxProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <StyledSearchBox>
          <p>추천 검색어</p>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.sickNm}</li>
            ))}
          </ul>
        </StyledSearchBox>
      ) : (
        <StyledSearchBox>
          <p>검색어 없음</p>
        </StyledSearchBox>
      )}
    </>
  );
}

const StyledSearchBox = styled.div`
  background-color: #fff;
  width: 500px;
  height: 300px;
  padding: 2rem 0;
  border-radius: 2rem;

  p {
    font-weight: bold;
    font-size: 0.8rem;
    color: #999;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }
  li {
    padding: 0.5rem 0 0.5rem 1rem;
    cursor: pointer;
    
    &:hover {
      background-color: #3284c7;
      color: #fff;
      font-weight: bold;
    }
  }
`;