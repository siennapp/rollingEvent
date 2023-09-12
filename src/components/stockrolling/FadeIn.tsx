import styled, { keyframes } from 'styled-components';
import Logo from '../common/Logo';
import { useLayoutEffect, useRef, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { dataProps } from '../../types/ui.type';
import { logoSize } from '../../styles/StyleVariable';

function FadeIn({target,timeline}:{target:dataProps;timeline:any}){
    
    const container = useRef<HTMLDivElement>(null);
    const logoBox = useRef<HTMLSpanElement>(null);
    const [confetti, setConfetti ]= useState(false);

    //confetti 옵션
    const config = {
        angle: 90,
        spread: 120,
        startVelocity: 30,
        elementCount: 80,
        dragFriction: 0.12,
        duration: 2000,
        stagger: 3,
        width: '10px',
        height: '10px',
        perspective: '800px',
        colors: ['#FFC700', '#FF0000', '#2E3191', '#41BBC7']
      };
    
    useLayoutEffect(()=>{
        timeline &&
        timeline.to(logoBox.current, {
            opacity: 0,
            scale:1,
            duration: 0.5,
            onComplete: () => {
                container.current?.classList.add('fadeIn')
                setConfetti(true)
            }
        })
        .to(logoBox.current, {
            opacity: 1,
            scale:1.6,
            duration: .6,
            ease:'back.out(2)',
        })
        .to(logoBox.current, {
            opacity: 1,
            scale:1.5,
            duration: .2,
            onComplete: () => {
                timeline.kill();
            }
        })
    },[timeline])
    return(
        <Container ref={container}>
            <LogoContainer ref={logoBox}>
                <Logo 
                    name={target.name}
                    logoUrl={target.logoUrl}
                    size={logoSize.large} 
                />
            </LogoContainer>
            <Confetti 
                active={ confetti }
                config={ config }
            />
        </Container>
    )
}

const BlurFade = keyframes`
    0%{
        background: rgba(255,255,255,0);
        backdrop-filter: blur(5px);
    }
    100%{
        background: rgba(255,255,255,1);
        backdrop-filter: blur(0);
    }
`
const Container = styled.div`
     position:absolute;
    left:0; top: 0; right:0; bottom: 0;
    padding-top: 286px;
    z-index: 1;
    background: transparent;
    position:fixed;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    &.fadeIn{
        animation: ${BlurFade} 1000ms cubic-bezier(0.32, 0, 0.67, 0);
        animation-fill-mode: forwards;
        > div{
            transform: translate(-50px,-50px);
        }
    }
`
const LogoContainer = styled.span`
    opacity: 0;
`

export default FadeIn;