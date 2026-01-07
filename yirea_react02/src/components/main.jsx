import './Main.css';
export default function Main() {
    let cssVar = {
        backgroundColor: 'red',
        marginTop: '20px',
    }
    
  return (
    <main>
      <h2 style={{backgroundColor: 'lightblue', fontSize: '24px'}}> Welcome to React</h2>
      <p>This is the main content area.</p>
      <span style={cssVar}>css 적용</span>
      <span className="logout"> 외부 css </span>
    </main>
  )
}


