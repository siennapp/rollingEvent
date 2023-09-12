import { useLayoutEffect, useRef, useState } from 'react';
import { colors, logoSize } from '../../styles/StyleVariable';
import styled from 'styled-components';
import Logo from '../common/Logo';
import { dataProps } from '../../types/ui.type';



function Slider({datas, timeline, target}:{datas:dataProps[]; timeline: any; target: dataProps }) {

    const WIDTH = window.innerWidth; //뷰포트 가로 사이즈
    const ITEM_WIDTH:number = WIDTH*(39/100); // 아이템 가로 길이 
    const MINIMUM_LENGTH:number = 15; //슬라이드 아이템 최소 갯수 
    const TARGET_INDEX:number = MINIMUM_LENGTH - 2; //슬라이드에서 타겟아이템 인덱스(항상 마지막에서 두번째) 
    const MINIMUM_ITEM:number = 3; //최소 아이템
    const LOOP:number = MINIMUM_LENGTH/MINIMUM_ITEM; 
    const BOUNCE_WIDTH:number = WIDTH*(5/100); 

    const [slideDatas, setSlideDatas] = useState<dataProps[]>([]);
    const list = useRef<HTMLUListElement>(null);
    
    useLayoutEffect(()=>{

        setSlideDatas(initSlideArray(target));

        function initSlideArray(target:dataProps):dataProps[]{

            let arr:dataProps[] = [];
            for( let i = 0; i <= LOOP; i++){
                arr = [ ...datas,...arr,...datas]
            }
            // 전체 리스트 배열 중 타켓 아이템의 처음 인덱스 
            const InitalIndex = arr.findIndex(item => item.name === target.name);
            // 전체 리스트 배열 중 타켓 아이템의 가장 마지막 인덱스 
            const LastTargetIndex = InitalIndex + datas.length*(LOOP);
            
            // 전체 리스트 배열중 [타켓 14번째 전 아이템부터 타켓 다음아이템 ]총 15개 배열을 잘라서 리턴
            return arr.slice(LastTargetIndex-TARGET_INDEX ,LastTargetIndex+2); 
        }
        
        timeline &&
        timeline.to(list.current, {
          x: getAnimationPoint(TARGET_INDEX),
          duration: 2.3,
          delay: 0.2,
          ease:(x:number):number=>{
            //easeInOutQuart
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
          }
        })
        .to(list.current, {
            x:getAnimationPoint(TARGET_INDEX) + ITEM_WIDTH/2 - BOUNCE_WIDTH,
            duration:0.18,
            ease:(x:number):number=>{
                //easeOutCubic
                return 1 - Math.pow(1 - x, 3)
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[timeline,target,datas])

    function getAnimationPoint (target:number) :number{
        return - (target*ITEM_WIDTH - WIDTH/2 + ITEM_WIDTH/2)
    }
   

    return(
        <SliderWrap>
            <List ref={list}>
                {slideDatas.map((item,index)=>(
                    <Item key={index}>
                        <Logo
                            name={item.name}
                            logoUrl={item.logoUrl}
                            size={logoSize.large} 
                        />
                    </Item>
                ))}
            </List>
        </SliderWrap>
    )
}
const SliderWrap = styled.div`
    position:absolute;
    left:0; top: 0; right:0; bottom: 0;
    padding-top: 286px;
    z-index: 1;
`
const List = styled.ul`
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
`
const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2.5vw;
    
    b{
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5em;
        color: ${colors.mainText};
    }
    span{
        font-size: 0.75rem;
        line-height: 1.5em;
        color: ${colors.subText};
    }
`
export default Slider;