import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 13px;
`;

export const WrapperCartHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(10, 104, 255);
  }
`;

export const WrapperImgAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  height: 44px;
`;

export const WrapperButtonDropdown = styled.div`
  &:hover {
    button {
      color: rgb(189, 24, 24) !important;
    }
    border-radius: 10px;
    .menu {
      display: block;
      transform: translate(-30px, 0px);
    }
  }
`;

export const WrapperMenuItem = styled.div`
  &:hover {
    color: rgb(189, 24, 24) !important;
    border-radius: 10px;
  }
  cursor: pointer;
`;

// Responsive Styles
export const ResponsiveWrapperHeader = styled.div`
  width: 100%;
  padding: ${({ isScrolled }) => (isScrolled ? "10px 30px" : "20px 30px")};
  position: ${({ isScrolled }) => (isScrolled ? "fixed" : "")};
  z-index: 10;
  transition: all 0.5s;
  background: ${({ isScrolled, adminPath }) =>
    isScrolled
      ? "rgb(255,255,255,0.6)"
      : adminPath === "admin"
      ? "none"
      : "rgb(32, 33, 38)"};

  @media (max-width: 768px) {
    padding: ${({ isScrolled }) => (isScrolled ? "10px 20px" : "20px 20px")};
  }
`;

export const ResponsiveWrapperHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ResponsiveWrapperHeaderColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ResponsiveWrapperHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 54px;
  flex: 0 0 20%;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;
