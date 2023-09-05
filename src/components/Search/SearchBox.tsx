import { SearchWordType } from "../../types";

type SearchBoxProps = {
  data: SearchWordType[] | null;
};
export default function SearchBox({ data }: SearchBoxProps) {
  
  return (
    <div>
      <p>추천 검색어</p>
      <ul>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>{item.sickNm}</li>
          ))
        ) : (
          <li>검색어 없음</li>
        )}
      </ul>
    </div>
  );
}