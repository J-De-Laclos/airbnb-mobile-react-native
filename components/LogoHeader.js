import { Image } from "react-native";

const LogoHeader = () => {
  return (
    <Image
      style={{ height: 30, width: 30 }}
      source={require("../assets/images/logo.png")}
    />
  );
};

export default LogoHeader;
