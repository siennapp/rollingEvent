import styled from 'styled-components';
import Logo from '../common/Logo';
import { dataProps } from '../../types/ui.type';
import { colors, logoSize } from '../../styles/StyleVariable';

function StockItem ({item, onClick}:{item: dataProps; onClick: () => void}) {
    return (
        <Item key={item.id} onClick={onClick}>
            <LogoBox className={item.isSelected?'selected':''}>
                <Logo 
                    name={item.name}
                    logoUrl={item.logoUrl}
                    size={logoSize.medium} 
                />
            </LogoBox>
            <b>{item.name}</b>
            <span>{item.symbol}</span>
        </Item>
    )
}

const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px; 
    
    b{
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5em;
    }
    span{
        font-size: 0.75rem;
        line-height: 1.5em;
        color: ${colors.subText};
    }
`
const LogoBox = styled.div`
    width: 26vw; 
    height: 26vw;
    position:relative;
    overflow: hidden;
    margin-bottom: 6px; 
    cursor: pointer;
    &::before{
        content:'';
        width: 100%;
        height:100%; 
        position:absolute; 
        left: 0; top: 0; 
        background-image: url('./Exclude.webp');
        background-size: cover; 
        z-index: 4
    }
    &.selected{
        &::after{
            content: '';
            width: 98%;
            height:98%;
            position:absolute; 
            left: 1%; top: 1%; 
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 4px;
            box-sizing: border-box;
            z-index: 3;
            padding-top: 1; 
            background: url('./bookmark.webp')no-repeat, rgba(6,11,17,0.7);
            background-size: 34%;
            background-position: center center;
        }
    }

`


export default StockItem;