import styled, { css } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const wideScreenStyles = css`
  @media screen and (max-width: 340px) {
    .container {
      margin-inline: 1rem;
    }
    .home__title {
      font-size: 1.5rem;
    }
    .home__tree-1 {
      left: -4rem;
    }
    .home__tree-2 {
      right: -4rem;
    }
    .items__container {
      grid-template-columns: 180px;
    }
    .party__img {
      width: 200px;
    }
    .footer__content {
      gap: 2.5rem;
    }
  }

  /* For medium devices */
  @media screen and (min-width: 576px) {
    .home__container,
    .about__container,
    .party__container {
      grid-template-columns: 0.6fr;
      justify-content: center;
    }
    .home__tree-1,
    .home__tree-2 {
      width: 200px;
    }
    .items__container {
      grid-template-columns: repeat(2, 200px);
    }
    .footer__content {
      grid-template-columns: repeat(3, max-content);
    }
  }
  @media screen and (min-width: 767px) {
    .section {
      padding-block: 7rem 1.5rem;
    }
    .section__title {
      margin-bottom: 4rem;
    }
    .nav {
      height: calc(var(--header-height) + 1.5rem);
    }
    .nav__toggle,
    .nav__close,
    .nav__img {
      display: none;
    }
    .nav__list {
      flex-direction: row;
      column-gap: 4rem;
    }
    .category__container {
      grid-template-columns: repeat(2, 228px);
      column-gap: 4rem;
    }
    .footer__content {
      grid-template-columns: repeat(4, max-content);
    }
  }
  @media screen and (min-width: 1024px) {
    .shape__small,
    .shape__big {
      filter: blur(132px);
      opacity: 0.5;
    }
    .shape__small {
      width: 350px;
      height: 350px;
    }
    .shape__big {
      width: 450px;
      height: 450px;
    }
    .home__title-img-1,
    .home__title-img-2 {
      width: 60px;
    }
    .home__title-img-2 {
      bottom: 5.75rem;
    }
    .home__description {
      padding: 0 7.5rem;
    }
    .home__tree-1,
    .home__tree-2 {
      width: 300px;
      top: 14rem;
    }
    .home__img {
      width: 500px;
    }
    .category__container {
      grid-template-columns: repeat(3, 254px);
    }
    .category__card {
      padding: 6rem 2.5rem 2rem;
    }
    .category__img {
      width: 150px;
    }
    .category__star {
      right: 1rem;
    }
    .category .shape__small {
      top: 10rem;
      left: -12rem;
    }
    .about__img {
      order: -1;
      width: 500px;
    }
    .about__container {
      padding-top: 2rem;
      grid-template-columns: max-content 0.9fr;
      column-gap: 7rem;
      align-items: center;
    }
    .about .shape__big {
      bottom: -12rem;
    }
    .about__data,
    .party__data {
      text-align: initial;
    }
    .about__container .section__title,
    .party__container .section__title {
      text-align: initial;
      margin-bottom: 1.5rem;
    }
    .about__description,
    .party__description {
      margin-bottom: 2.5rem;
    }
    .items__container {
      grid-template-columns: repeat(3, 200px);
      gap: 6rem 3.5rem;
    }
    .items__card {
      padding: 6rem 1rem 1.5rem;
    }
    .items__img {
      width: 130px;
    }
    .items__name {
      font-size: var(--h3-font-size);
    }
    .items__button i {
      font-size: 1.5rem;
    }
    .items .shape__big {
      bottom: -12rem;
    }
    .party__container {
      padding-top: 5rem;
      grid-template-columns: 0.7fr max-content;
      column-gap: 8rem;
      align-items: center;
    }
    .party__img {
      width: 400px;
    }
    .party__star-1,
    .party__star-2 {
      width: 100px;
    }
    .party__star-1 {
      top: -5rem;
      left: -5rem;
    }
    .party__star-2 {
      right: -3rem;
      bottom: 3rem;
    }
  }
  @media screen and (min-width: 1072px) {
    .container {
      margin-inline: auto;
    }
  }
  @media screen and (min-width: 1248px) {
    .home__tree-1,
    .home__tree-2 {
      width: 450px;
    }
    .home__img {
      width: 600px;
      margin-top: 3rem;
    }
    .footer__tree-2 {
      left: 10%;
    }
  }

  /* For 2K resolution (2048 * 1152) */
  @media screen and (min-width: 2048px) {
    /* 	body{
		zoom: 1.6;
	} */
    .home__container {
      position: relative;
      max-width: 1400px;
      overflow: hidden;
    }
    .home__tree-1,
    .home__tree-2 {
      top: 5rem;
    }
    .main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-position: fixed;
      z-index: 999; /* Số này có thể được điều chỉnh tùy thuộc vào cấu trúc z-index của trang */
    }
  }
`;

export const WrapperMain = styled.main`
  overflow: hidden;
  background-color: hsl(22, 8%, 6%);
  margin-top: 0;
  & .container {
    max-width: 1024px;
    margin-inline: 1.5rem;
  }
  & .grid {
    display: grid;
    gap: 1.5rem;
  }
  ${wideScreenStyles}
`;

export const WrapperSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-family: "Butcherman", cursive;
  font-weight: initial;
  line-height: 130%;
  color: hsl(22, 72%, 50%);
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const WrapperHome = styled.section`
  position: relative;
  padding-top: 3.5rem;
`;

export const WrapperClassHome = styled.section`
  position: relative;
`;

export const WrapperHomeData = styled.div`
  text-align: center;
`;

export const WrapperHomeTitle = styled.h1`
  position: relative;
  font-size: 3.5rem;
  line-height: 140%;
  width: max-content;
  margin: 0 auto 0.5rem;
  & span {
    display: block;
    font-family: "Butcherman", cursive;
    font-weight: initial;
    color: hsl(22, 72%, 50%);
  }
  & img {
    max-width: 100%;
    height: auto;
  }
`;

export const WrapperHomeTitleImg1 = styled.img`
  width: 50px;
  position: absolute;
  left: -1.5rem;
  transform: rotate(-15deg);
  animation: animate-star-1 5s infinite ease-in-out;
  @keyframes animate-star-1 {
    0% {
      transform: scale(0.7) rotate(-15deg);
      opacity: 0.2;
    }
    50% {
      transform: scale(1) rotate(-15deg);
      opacity: 1;
    }
    100% {
      transform: scale(0.7) rotate(-15deg);
      opacity: 0.2;
    }
  }
`;

export const WrapperHomeTitleImg2 = styled.img`
  width: 50px;
  position: absolute;
  botttom: 2.75rem;
  right: -1.5rem;
  transform: rotate(15deg);
  animation: animate-star-2 5s infinite ease-in-out;
  @keyframes animate-star-2 {
    0% {
      transform: scale(1) rotate(15deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.7) rotate(15deg);
      opacity: 0.2;
    }
    100% {
      transform: scale(1) rotate(15deg);
      opacity: 1;
    }
  }
`;

export const WrapperShapeSmall = styled.div`
  position: absolute;
  background-color: hsl(22, 72%, 50%);
  filter: blur(96px);
  z-index: 1;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  top: -3rem;
  left: -3rem;
`;

export const WrapperShapeBig = styled.div`
  position: absolute;
  background-color: hsl(22, 72%, 50%);
  filter: blur(96px);
  z-index: 1;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  opacity: 0.8;
  bottom: 5rem;
  right: -10rem;
`;

export const WrapperHomDescription = styled.p`
  margin-bottom: 2.5rem;
`;

export const WrapperHomeImg = styled.img`
  width: 300px;
  justify-self: center;
  margin-top: 2rem;
`;

export const WrapperHomeTree1 = styled.img`
  width: 120px;
  position: absolute;
  top: 18rem;
  left: -2rem;
`;
export const WrapperHomeTree2 = styled.img`
  width: 120px;
  position: absolute;
  top: 18rem;
  right: -2rem;
`;

export const WrapperButton = styled.a`
  display: inline-block;
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 4rem;
  color: hsl(22, 72%, 50%);
  font-weight: 600;
  transition: background 0.3s, color 0.3s;
  & :hover {
    background-color: hsl(22, 72%, 50%);
    color: #fff;
  }
`;

export const WrapperCategory = styled.section`
  position: relative;
`;

export const WrapperCategoryContainer = styled.div`
  padding-top: 4rem;
  grid-template-columns: 228px;
  justify-content: center;
  row-gap: 6rem;
`;

export const WrapperCategoryCard = styled.div`
  background-color: hsl(22, 8%, 7%);
  border-radius: 2rem;
  padding: 4.5rem 2.25rem 2rem;
  box-shadow: 0 4px 16px hsla(22, 10%, 2%, 0.3);
  text-align: center;
  transition: background 0.3s;
  & :hover .category__img {
    transform: translatey(-0.5rem);
  }
`;

export const WrapperCategoryImage = styled.img`
  width: 120px;
  position: absolute;
  inset: 0;
  margin: 0 auto;
  top: -3.5rem;
  transition: transform 0.3s;
`;

export const WrapperCategoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: hsl(22, 72%, 50%);
  margin-bottom: 0.5rem;
`;

export const WrapperCategoryDescription = styled.p`
  font-size: 0.813rem;
`;

export const WrapperCategoryStar = styled.img`
  width: 40px;
  position: absolute;
  top: 3.5rem;
  right: 0.5rem;
  transform: rotate(15deg);
`;

export const WrapperAbout = styled.section`
  position: relative;
`;

export const WrapperAboutContainer = styled.div`
  row-gap: 3.5rem;
`;

export const WrapperItemCart = styled.article`
  position: relative;
  background-color: hsl(22, 8%, 7%);
  border-radius: 1.5rem;
  padding: 4rem 1.25rem 1.25rem;
  box-shadow: 0 4px 16px hsla(22, 10%, 2%, 0.3);
  text-align: center;

  & :hover .items__img {
    transform: translatey(-0.5rem);
  }
`;
export const WrapperItemImg = styled.img`
  width: 100px;
  position: absolute;
  inset: 0;
  top: -2rem;
  margin: 0 auto;
  transition: transform 0.3s;
`;

export const WrapperItemsName = styled.h3`
  font-size: 0.938rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const WrapperItemsPrice = styled.span`
  display: block;
  font-weight: 600;
  color: hsl(22, 72%, 50%);
  margin-bottom: 0.5rem;
`;

export const WrapperItemsButton = styled.button`
  display: inline-flex;
  background-color: hsl(22, 72%, 50%);
  color: #fff;
  padding: 0.25rem 1.5rem;
  border-radius: 4rem;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  outline: none;
  & :hover {
    background-color: hsl(22, 72%, 46%);
  }
`;

export const WrapperParky = styled.section`
  position: relative;
`;

export const WrapperParkyContainer = styled.div`
  row-gap: 5rem;
`;

export const WrapperParkyData = styled.div`
  text-align: center;
`;

export const WrapperParkyDescription = styled.p`
  margin-bottom: 2rem;
`;

export const WrapperParkyStar1 = styled.img`
  width: 50px;
  position: absolute;
  transform: rotate(15deg);
  top: -2rem;
  left: 1rem;
  animation: animate-star-1 5s infinite ease-in-out;
  @keyframes animate-star-1 {
    0% {
      transform: scale(0.7) rotate(-15deg);
      opacity: 0.2;
    }
    50% {
      transform: scale(1) rotate(-15deg);
      opacity: 1;
    }
    100% {
      transform: scale(0.7) rotate(-15deg);
      opacity: 0.2;
    }
  }
`;

export const WrapperParkyStar2 = styled.img`
  width: 50px;
  position: absolute;
  transform: rotate(15deg);
  right: -1.5rem;
  bottom: 1rem;
  animation: animate-star-2 5s infinite ease-in-out;
  @keyframes animate-star-2 {
    0% {
      transform: scale(1) rotate(15deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.7) rotate(15deg);
      opacity: 0.2;
    }
    100% {
      transform: scale(1) rotate(15deg);
      opacity: 1;
    }
  }
`;
