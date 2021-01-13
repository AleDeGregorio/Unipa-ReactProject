import styled from "styled-components";
const StyledHero = styled.header`
  min-height: 60vh;
  /* background: url(${''}); */
  background: url(${props => (props.img ? props.img : '')});
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default StyledHero;
