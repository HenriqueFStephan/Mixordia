import "../styles/Logo.css"
const Logo = ({href, src, alt, className}) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={alt} 
                className={className ? className : "logo"}/>
        </a>
    )
}

export default Logo