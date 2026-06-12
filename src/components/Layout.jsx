export default function Layout(props) { {/*with props we are telling the Layout to expect children*/}
   
    const {children} = props

    const header = (
        <header>
            <h1 className="text-gradient">The Brogram</h1>
            <p><strong>The 30 simple Workouts Program</strong></p>
        </header>
    )

    const footer= (
    <footer>
        <p>Built by <a href="https://app.netlify.com/teams/urgem23" target="_blank"> 
        Ursula G. Wandji</a><br />Styled with <a href="https://www.fantacss.smoljames.com/" 
        target="_blank">FantaCSS</a></p>
    </footer>
    )

    return(
        <>
            {header}
            {children}
            {footer}
        </>
    )
}