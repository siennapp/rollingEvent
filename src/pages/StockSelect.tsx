import { useState } from 'react';
import HeadingTop from '../components/common/HeadingTop';
import styled from 'styled-components';
import data from './../server/db.json';
import { dataProps } from '../types/ui.type';
import { colors } from '../styles/StyleVariable';
import StockItem from '../components/stockselect/StockItem';
import BottomButton from '../components/stockselect/BottomButton';
import StockRolling from './StockRolling';
import { IoCloseOutline} from "react-icons/io5";

function StockSelect(){

  const DEFAULT_NUM = 3;
  const [datas,setDatas] = useState<dataProps[]>(data);
  const [bookmarkDatas, setBookmarkDatas] = useState<dataProps[]>([]);
  const [isRollingEvent, setRollingEvent ] = useState(false);

    function selectToggle (item:dataProps){
        // 북마크 스타일 표시를 위한 리스트 업데이트  
        const newData = datas.map((val) => {
            if( val.id === item.id){
                return {...item, isSelected:!val.isSelected}
            }else{
                return val;
            }
        })
        setDatas(newData);

        // 롤링이벤트를 위한 북마크 아이템 리스트 업데이트  
        if( item.isSelected ){
            setBookmarkDatas(bookmarkDatas.filter((i) => item.id !== i.id ))
        }else{
            setBookmarkDatas([...bookmarkDatas,item])
        }
    }
    function onEventRollingEvent(){
      
      if( bookmarkDatas.length < DEFAULT_NUM) return;
      setRollingEvent(true)
    }

    return(
        <View>
            <BackDrop>
                <span>모바일 디바이스를 고려한 이벤트 구현이기때문에 <br/>
                    480px해상도 이하에서 확인 가능합니다.<br/>
                </span>
            </BackDrop>
            <CloseTop>
              <CloseButton type='button' onClick={()=>setRollingEvent(false)}>
                <span>이벤트 닫기</span>
                <IoCloseOutline size={32} color={colors.mainText}/>
              </CloseButton>
            </CloseTop>
            {!isRollingEvent?
              (
                <SelectContainer>
                  <HeadingTop 
                      h1={`받고 싶은 주식\n 찜하세요!`}
                      sub={'고른 주식 중 하나를 최대 500만원어치 드릴게요.'}
                  />
                  <List>
                      {datas.map((item, index)=>(
                          <StockItem item={item} key={index} onClick={()=>selectToggle(item)}/>
                      ))}
                  </List>
                  <BottomButton datas={bookmarkDatas} onClick={onEventRollingEvent}/>
                </SelectContainer>
              )
              :(<StockRolling datas={bookmarkDatas}/>)
              
            }
        </View>
    )
}

const View = styled.div`
    padding: 0 1rem;
`
const CloseTop = styled.div`
    width: 100%;
    height: 3rem;
    padding: 0 .5rem;
    position: absolute; 
    top: 0; 
    left: 0; 
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const CloseButton = styled.button`
    position: relative;
    span{
        display: inline-block;
        width: 1px; 
        height: 1px; 
        overflow: hidden;
        opacity: 0;
    }
`
const SelectContainer = styled.div`
    position: relative;
    z-index: 1;
`
const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 2.5px;
    padding-top: 60px;
    margin-bottom: 44px;
`

const BottomText = styled.div`
    margin-bottom: 135px; 
    font-size: 1rem;
    font-weight: 500;
    white-space: pre-wrap;
    text-align: center;
    span::before {
      content:'';
      width: 10px; 
      height: 12px; 
      background-image: url('./bookmark.webp'); 
      background-size: cover;
      position: relative; 
      margin-right: 10px; 
      display: inline-block; 
    }
`

const BackDrop = styled.div`
    width: 100vw; 
    height: 100vh; 
    background: black;
    z-index: 1000;
    position: fixed;
    left: 0; top: 0; 
    color: #efefef; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.6em;
    @media only screen and (max-width: 480px) {
        display: none;
    }

`
export default StockSelect;