import { useParams } from "react-router-dom";
export default function ShowItem(){
    const params = useParams();
    console.log(params);
    return (
        <div>
            상품 {params.id} 번의 상세 내용 페이지 입니다
        </div>
    )
}