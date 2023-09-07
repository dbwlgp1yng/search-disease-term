import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { SearchWordType } from '../../../types';
import SearchBox from '../SearchBox/SearchBox';
import SearchBar from '../SearchBar/SearchBar';
import { styled } from 'styled-components';
import { setSessionStorageWithExpiry, 
  getSessionStorageWithExpiry } from '../../../utils/cacheUtils';
import { useDebounce } from '../../../hooks/useDebounce';

export default function SearchSection() {
  const [data, setData] = useState<SearchWordType[] | null>(null);
  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText, 300); // 300ms 뒤에 api 요청

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchDataWithDebounce = async (text: string) => {
      const cachedDataFromStorage = getSessionStorageWithExpiry(text);

      if (cachedDataFromStorage) {
        const parsedData = JSON.parse(cachedDataFromStorage);
        setData(parsedData);
      } else {
        try {
          console.info("calling api");
          const response = await apiClient.get(`/sick?q=${text}`);
          const responseData = response.data;
          setData(responseData);

          setSessionStorageWithExpiry(text, JSON.stringify(responseData), 60);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (debouncedInputText.length > 0) {
      fetchDataWithDebounce(debouncedInputText);
    }
  }, [debouncedInputText]);

  return (
    <StyledSearch>
      <h2>국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기</h2>
      <SearchBar 
        inputText={inputText} 
        setInputText={setInputText} 
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
        suggestions={data ? data.map(item => item.sickNm) : []} 
      />
      {inputText.length > 0 && (  // 비어있지 않을 때만 렌더링
        <SearchBox 
          data={data} 
          selectedIndex={selectedIndex}
        />
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;

  h2 {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;