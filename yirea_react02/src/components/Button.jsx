export default function Button({color="red", text,children}) {
    console.log({color, text});

    const btnClick = (e) => {
        console.log(e);
        console.log("x값 : ",e.clentX);
        alert("클릭!");
    }
    return (
        <button style={{color: color}} onClick={btnClick}>{text}{children}</button>
    );
} 