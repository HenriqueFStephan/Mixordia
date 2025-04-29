import "../styles/Logo.css"
const Logo = ({href, src, alt, addClass}) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={alt} 
                className={addClass ? addClass + " logo" : "logo"}/>
        </a>
    )
}

export default Logo