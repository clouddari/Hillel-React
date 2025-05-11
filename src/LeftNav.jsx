import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart, faMagnifyingGlass, faArrowRightFromBracket, faHammer } from "@fortawesome/free-solid-svg-icons";
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const heart = <FontAwesomeIcon icon={faHeart} />
const envelope = <FontAwesomeIcon icon = {faEnvelope} />
const logOut = <FontAwesomeIcon icon={faArrowRightFromBracket} />
const settings = <FontAwesomeIcon icon={faHammer} />

export default function LeftNav() {
  return (
    <div className="left-nav">
      <div className="search-container">
        {searchIcon}
        <input type="text" placeholder="Search" />
      </div>

      <div className="likes">
        <p>{heart} Likes</p>
      </div>

      <div className="messages">
         <p>{envelope} Messages</p>
      </div>


    <div className="logout">
         <p>{logOut} Messages</p>
    </div>

    <div className="settings">
        <p>{settings} Settings</p>
    </div>
    </div>
  );
}
