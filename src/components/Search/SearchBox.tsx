import { SearchWordType } from "../../types";

type SearchBoxProps = {
  data: SearchWordType[] | null;
};
export default function SearchBox({ data }: SearchBoxProps) {
  if (!data || data.length === 0) {
    return <p>검색어 없음</p>;
  }
  return (
    <div>
      <p>추천 검색어</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.sickNm}</li>
        ))}
      </ul>
    </div>
  );
}