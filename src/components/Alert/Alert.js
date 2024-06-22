import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./Alert.css";

const Alert = ({ alertText }) => {
  return (
    <>
      <div class="alert-box">
        <WarningAmberIcon />
        <p>
          <strong> Error:</strong> {alertText}
        </p>
      </div>
    </>
  );
};

export default Alert;
