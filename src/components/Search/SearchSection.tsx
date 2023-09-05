import apiClient from '../../services/apiClient';
import React, { useEffect, useState } from 'react';
import { SearchWordType } from '../../types';
import SearchBox from './SearchBox';
import SearchBar from './SearchBar';
import { styled } from 'styled-components';

export default function SearchSection() {
  const [data, setData] = useState<SearchWordType[] | null>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/sick?q=${inputText}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (inputText.length > 0) {
      fetchData(); // inputText가 비어있지 않을 때만 fetchData 호출
    } 
  }, [inputText]);

  return (
    <StyledSearch>
      <h2>국내 모든 임상시험 검색하고 <br/> 온라인으로 참여하기</h2>
      <SearchBar inputText={inputText} setInputText={setInputText} data={data} />
      {inputText.length > 0 && (  // 비어있지 않을 때만 렌더링
        <SearchBox data={data} />
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;

  h2 {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;