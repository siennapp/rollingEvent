import { styled } from 'styled-components';
import { colors } from '../styles/StyleVariable'; 
import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { dataProps } from '../types/ui.type';
import HeadingTop from '../components/common/HeadingTop';
import Slider from '../components/stockrolling/Slider';
import FadeIn from '../components/stockrolling/FadeIn';

function StockRolling({datas}: any ){
    //롤링 이벤트 타켓 아이템 랜덤으로 선정해서 전달
    const target:dataProps = datas[Math.floor(Math.random() * datas.length)];

    const [items,setItems] = useState<dataProps[]>([]);
    const [tl, setTl] = useState<GSAPTimeline | null>(null);
    
    useLayoutEffect(() => {
        setItems(datas);
    
        const tl: GSAPTimeline = gsap.timeline();
        setTl(tl);

    },[datas])
  
    return(
         <Container>
            <Section>
                <HeadingTop h2={`두근💛 두근💛 \n어떤 주식을 받게 될까요?`} shadow={true}/>
            
                <Slider datas={items} timeline={tl} target={target} />
                <FadeIn timeline={tl} target={target} />
            </Section>
         </Container>
        
    )
}
const Container = styled.div`
    position:fixed;
    width: 100vw;
    height: 100vh;
    left:0;
    top:0; 
    z-index : 9;
`
const Section = styled.main`
    width: 100%;
    height: 100vh;
    background-color: ${colors.primary};
    position: relative;
`

export default StockRolling;