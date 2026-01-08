import {useState, useRef} from "react";
export default function Register(){

    let useRefCountry = useRef();
    const setcountry = (country) => {
        setInput({
            ...input,
            country
        });
        useRefCountry.current.focus();
    }
    const setbio = (bio) => {
        setInput({
            ...input,
            bio
        });
    }

    const onSubmit = () => {
        if(input.name === ""){
            inputRef.current.focus();
        }
    }

    const countRef = useRef(0);
    const inputRef = useRef();

    countRef.current++;
    console.log("렌더링 수 : " + countRef.current);

    const [input, setInput] = useState({
        name: "",
        birthday: "",
        country: "대한민국",
        bio: ""
    });
    const {name, birthday, country, bio} = input;
    const setbirthday = (birthday) => setInput({
        ...input,
        birthday   
    })

    const on_Submit = () => {
        if(input.name === ""){
            inputRef.current.focus();
            return;
        }
        alert(`
            이름 : ${name}
            생일 : ${birthday}
            국적 : ${country}
            자기소개 : ${bio}
        `); 
        
    };
    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const onBirthdayChange = (e) => {
        setbirthday(e.target.value);
    }
    return (
        <div>
            <h1>회원가입</h1>
            <div>
                이름 : <input type="text" name="name" value={name} onChange={onChange} ref={inputRef}/><br/>
            </div>
            <div>
                생일 : <input type="date" name="birthday" value={birthday} onChange={onBirthdayChange}/><br/>
            </div>
            <div>
                국적 :
                <select name="country" value = {country} onChange={(e) => setcountry(e.target.value)}>
                    <option>대한민국</option>
                    <option>미국</option>
                    <option>일본</option>
                </select>
            </div>
            <div>
                자기소개 :
                <textarea name="bio" value={bio} onChange={(e) => setbio(e.target.value)}></textarea>
            </div>
            <button onClick={onSubmit}>제출</button>
        </div>
    )
}

