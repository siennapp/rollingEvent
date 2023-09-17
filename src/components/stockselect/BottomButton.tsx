import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import Logo from '../common/Logo';
import { dataProps } from '../../types/ui.type';
import { colors, logoSize } from '../../styles/StyleVariable';

function BottomButton ({datas, onClick}:{datas: dataProps[]; onClick: () => void}) {

    const DEFAULT_NUM = 3;
    const [isActive,setActive] = useState(false);
    const [updateList, setUpdateList] = useState<dataProps[]>([])
    
    useEffect(()=>{
        if( datas.length >= DEFAULT_NUM){
            setActive(true)
        } else{
            setActive(false)
        }
        const defaultThumbnail:dataProps = {
            name:'unknown',
            logoUrl:'state_unknown.webp',
        }
        // 북마크 리스트 업데이트 전 기본 이미지 아이템 배열  
        const DefaultArr:dataProps[] = Array(DEFAULT_NUM).fill(defaultThumbnail)
        
        function onUpdateList():dataProps[] {
            // 북마크 리스트 아이템 +1 일때 디폴트 이미지 아이템 -1
            let arr = DefaultArr.filter((item,index) => index > datas.length -1);
            return [...datas, ...arr]
        }
        
        setUpdateList(onUpdateList());
    },[datas])

    return (
        <Container>
            <Button type='button' onClick={onClick} className={isActive? 'active' : ''}>
                <Icons>
                    {updateList.filter((item,index)=> index < DEFAULT_NUM).map((item,index)=>(
                        <Icon key={index}>
                            <Logo 
                                name={item.name}
                                logoUrl={item.logoUrl}
                                size={logoSize.small} 
                            />
                        </Icon> 
                    ))}
                    {updateList.length > DEFAULT_NUM && 
                        <NumberItem>+ {updateList.length - DEFAULT_NUM}</NumberItem> 
                    }
                </Icons>
                <span>{isActive? '받을래요. 찜!' :'3개이상 선택하세요' }</span>
            </Button> 
        </Container>
    )
}

const Container = styled.div`
    width: 100%;  
    height: 100px; 
    padding: 0 16px; 
    display: flex;
    align-items: flex-start;
    position: fixed;
    left: 0; 
    bottom: -2px; 
    background: rgb(255,255,255);
    box-sizing: border-box;
    z-index: 5;
    &::before{
        content: '';
        width: 100%; 
        height: 35px;
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
        position: absolute; 
        left: 0;
        top: -34px;
    }
`
const Button = styled.button`
    flex: 1; 
    height: 60px;
    padding: 0.75rem 0; 
    border-radius: 2rem;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    background-color: ${colors.disabledparimary};
    color: ${colors.btnText};
    &.active{
        background-color: ${colors.primary};
    }
`
const Icons = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 0.5rem; 
    position: relative;
`
const Icon = styled.div`
    width: 34px; 
    height: 34px;
    position: relative;
    z-index: 2;
    &:nth-of-type(2){
        margin-right: -4px;
        z-index: 1;
    }
    &:nth-of-type(3){
        margin-right: -4px;
        z-index: 0;
    }
`
const NumberItem = styled(Icon)`
    position: absolute; 
    right: 0; top: 0; 
    background-color: ${colors.backdrop};
    display: flex; 
    justify-content: center;
    align-items: center;
    -webkit-mask-size: 100%; 
    -webkit-mask-image: url('./mask.webp');
    mask-size: 100%; 
    mask-image: url('./mask.webp');
    color: #ffffff;
    font-size: 12px; 
`
export default BottomButton;