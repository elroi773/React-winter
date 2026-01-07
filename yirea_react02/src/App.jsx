import { useState } from "react";
import Light from "./components/Light";
import Counter from "./components/Counter";
import LikeButton from "./components/LikeButton";
import SearchForm from "./components/SearchForm";
import Tabs from "./components/Tabs";
function App() {
   return (
    <>
      <h1>useState() hook 함수 예제 (1)</h1>
      <Light />
      <hr />
      <Counter />
      <hr />
      <LikeButton />
      <hr />
      <Tabs />
      <hr />
      <SearchForm />
      <hr />
    </>
  )
}

export default App
