import { styled } from 'styled-components';
import { colors } from '../../styles/StyleVariable';
import { headingProps } from '../../types/ui.type';

function HeadingTop({h1,h2,sub,shadow}:headingProps){
    return (
        <TopContainer className={shadow?'shadow':''}>
            {h1&& <Heading1>{h1}</Heading1> }
            {h2&& <Heading2>{h2}</Heading2> }
            {sub&& <Sub>{sub}</Sub>}
        </TopContainer>
    )
}
const TopContainer = styled.div`
    width: 100%; 
    height: 180px; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative; 
    background-color: ${colors.background};
    padding-top: 48px;
    &.shadow{
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
        position: relative;
        left: 0; top:0;
        &::after{
            content: '';
            width: 46px;
            height: 44px; 
            position: absolute; 
            top:100%; 
            left:50%;
            background:url('./triangle.svg')no-repeat;
            background-position: 0 -4px;
            transform: translate(-50%, -1px);
        }
    }
`
const Heading1 = styled.h1`
    white-space: pre-wrap;
    margin-bottom:.5rem;
    text-align: center;
`
const Heading2 = styled.h2`
    white-space: pre-wrap;
    margin-bottom:.5rem;
    text-align: center;
`
const Sub = styled.span`
    color: ${colors.subText};
    font-size: 1rem; 
    line-height:1.5em;
`
export default HeadingTop;