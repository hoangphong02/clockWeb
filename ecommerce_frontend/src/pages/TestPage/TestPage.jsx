import React from "react";
import {
  ResponsiveWrapperHeader,
  ResponsiveWrapperHeaderContent,
  ResponsiveWrapperHeaderColumn,
  ResponsiveWrapperHeaderActions,
} from "./style";
import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";
import { WrapperTextHeader } from "./style";

const TestPage = ({
  isScrolled,
  adminPath,
  logo,
  navigate,
  listening,
  startListening,
  stopListening,
  transcript,
  typeProductContant,
  typeProduct,
  onSearch,
  user,
  userAvatar,
  username,
  handleNavigateLogin,
  order,
  loading,
  isHiddenSearch,
  isHiddenCart,
}) => {
  return (
    <ResponsiveWrapperHeader isScrolled={isScrolled} adminPath={adminPath}>
      <ResponsiveWrapperHeaderContent>
        <ResponsiveWrapperHeaderColumn>
          <WrapperTextHeader
            style={{ cursor: "pointer", color: isScrolled ? "black" : "#fff" }}
            onClick={() => navigate("/")}
          >
            <img
              style={{ height: "65px", position: "absolute", top: "-23px" }}
              src={logo}
            />
          </WrapperTextHeader>

          <div style={{ position: "relative" }}>
            <span
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: isScrolled
                  ? "black"
                  : adminPath === "admin"
                  ? "#000"
                  : "#fff",
                display: "flex",
              }}
              onClick={listening === false ? startListening : stopListening}
            >
              {listening === false ? <AudioMutedOutlined /> : <AudioOutlined />}
            </span>
            <div
              style={{
                width: "400px",
                height: "30px",
                overflow: "auto",
                display: listening === true ? "block" : "none",
                position: "absolute",
                zIndex: "5",
                background: "#fff",
                top: isScrolled ? "40px" : "52px",
                textAlign: "center",
                left: "-100px",
                borderRadius: "15px",
              }}
            >
              <span>{transcript}</span>
            </div>
          </div>
        </ResponsiveWrapperHeaderColumn>

        {!isHiddenSearch && (
          <ResponsiveWrapperHeaderColumn>
            {/* Your search and menu dropdown here */}
          </ResponsiveWrapperHeaderColumn>
        )}

        <ResponsiveWrapperHeaderActions>
          {/* Your user account and cart icons here */}
        </ResponsiveWrapperHeaderActions>
      </ResponsiveWrapperHeaderContent>
    </ResponsiveWrapperHeader>
  );
};

export default TestPage;
