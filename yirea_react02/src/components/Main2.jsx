import './Main.css';
import Button from './Button.jsx';



export default function Main() {
    const btnProps = {
        text: "메일",
        color: "red"
    }
  return (
    <>
        <Button text = "메일" color = "red"/>
        <Button text = "카페" color = "blue"/>
        <Button text = "블로그" color = "green"/>
        <Button text = "길찾기" color = "orange"/>
        <Button text = "쇼핑" color = "purple"/>
    </>
  )
}


