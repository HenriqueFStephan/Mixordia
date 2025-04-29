import "../styles/Header.css"
import Logo from "./Logo"

const Header = ({}) => {
    return (
        <header>
            <Logo href={"http://localhost:3000/"} 
                src={'files/logos/Logo.png'} 
                alt={"Logo"} 
                addClass={"mixordia"} />
            <div>
                <Logo href={"https://www.instagram.com/mixordiamusic"} 
                        src={'files/logos/Instagram_logo_2.png'} 
                        alt={"Instagram Logo"}
                        addClass={'instagram'} />
                <Logo href={"https://www.soundcloud.com/mixordiamusic"} 
                        src={'files/logos/SoundCloud.jpg'} 
                        alt={'SoundCloud Logo'} />
                <Logo href={"https://www.ra.co"} 
                        src={'files/logos/Resident_advisor_logo.jpg'} 
                        alt={'RA Logo'} />
            </div>
        </header>
    )
}
export default Header




