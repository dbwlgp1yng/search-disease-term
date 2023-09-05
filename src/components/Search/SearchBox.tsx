import { SearchWordType } from "../../types";

type SearchBoxProps = {
  inputText: string;
  data: SearchWordType[] | null;
};
export default function SearchBox({ inputText, data }: SearchBoxProps) {
  return (
    <div>
      <p>추천 검색어</p>
      <ul>
        {data && data.map((item, index) => (
          <li key={index}>{item.sickNm}</li>
        ))}
      </ul>
    </div>
  );
}