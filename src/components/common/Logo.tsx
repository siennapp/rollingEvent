import { styled } from "styled-components";
import { logoProps } from "../../types/ui.type";
import { useEffect, useState } from "react";
import { logoSize } from "../../styles/StyleVariable";

function Logo ({size,...item}:logoProps ){
    
    // 이미지 로드시 img tag 내 사이즈 속성을 지정해주기 위한 size props 재가공
    const [imgSize,setImgSize] = useState<number | string>(size)
    useEffect(()=>{
        if (typeof imgSize === 'number' )return;
        let NumberSize = Number(imgSize.substring(0, 2))

        if( imgSize === logoSize.small){
            setImgSize(NumberSize)
        }else{
            setImgSize( window.innerWidth*( NumberSize/100 ))
        }
        
    },[imgSize])
    return (
        
        <Thumbnail size={size}>
            <img src={item.logoUrl} width={imgSize} height={imgSize} alt={item.name}/>
        </Thumbnail>
        
        
    )
}
const Thumbnail = styled.div<{ size: string }>`
    overflow: hidden;
    width: ${props => props.size};
    height: ${props => props.size};

    img{
        width: 100% !important; 
        height: 100% !important;
        position: relative; 
        z-index: 0;
        mask-size: 100%;
        -webkit-mask-size: 100%;
        -webkit-mask-image: url('./mask.webp');
        mask-image: url('./mask.webp');
    }
`
export default Logo;