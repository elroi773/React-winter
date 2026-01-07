import { useState } from "react"
export default function Tabs(){
    const [activeTab, setActiveTab] = useState("home")
    return( 
       <>
       <div style={{backgroundColor: "yellow"}}></div>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("about")}>About us</button>
        {activeTab === "home" && <p>Welcome Home!</p>}
        {activeTab === "about" && <p>About us!</p>}
       </>
    )
}