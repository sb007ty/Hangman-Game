import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Life({ life }) {
  return (
    <div className="life-container">
      {new Array(8).fill(0).map((item, index) => {
        if (index < life) return <FontAwesomeIcon icon={faHeart} key={index} />;
        return <FontAwesomeIcon icon={faHeartCrack} key={index} />;
      })}
    </div>
  );
}

export default Life;
