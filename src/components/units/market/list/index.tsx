import styled from "@emotion/styled";
import { HeartFilled } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BoardCommentListUIItem from "../../comment/list/BoardCommentList";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px 2500px 1fr 200px;

  width: 1320px;
  height: 100%;

  margin-bottom: 50px;
  border-bottom: 1px solid #bdbdbd;

  @media screen and (max-width: ${Phone - 1}px) {
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  border-bottom: 1px solid #bdbdbd;
`;

const InfoIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  margin-left: 20px;
`;

const EtcIconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;
  width: 100px;
`;

const IconImg = styled.img``;

const UserName = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const WriteDate = styled.span`
  font-size: 18px;
`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: row;

  padding: 20px 0;
`;

const ProductNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  width: 100%;
  height: 200px;

  margin: 30px 0;
`;

const ProductNameDetail = styled.span`
  font-size: 30px;
  color: #bdbdbd;
`;

const ProductName = styled.span`
  font-size: 45px;
  font-weight: 600;
  color: #4f4f4f;
`;

const ProductPrice = styled.span`
  font-size: 60px;
  font-weight: 800;
`;

const HeartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

const HeartIcon = styled(HeartFilled)`
  font-size: 40px;
  color: red;
`;

const HeartVal = styled.span`
  font-size: 40px;
`;

const ProductCarousellBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 1320px;
  height: 1800px;

  margin: 30px 0;
`;

const Carousell = styled.div`
  width: 100%;
  height: 100%;
`;

const SliderItem = styled.img`
  width: 1320px;
  height: 1320px;
  object-fit: cover;
  margin: auto;
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 400px;
`;

const ImageBox = styled.img`
  width: 250px;
  height: 250px;
`;

const ProductContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-bottom: 1px solid #bdbdbd;
`;

const Contents = styled.span`
  font-size: 40px;
`;

const HashBox = styled.div`
  margin: 30px 0;
`;

const Hash = styled.span`
  margin-right: 20px;
  font-size: 30px;
  color: #bdbdbd;
`;

const LocationBox = styled.div`
  display: flex;

  width: 100%;
  height: 1000px;

  margin-top: 50px;
  border: 1px solid blue;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ListBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  background-color: #bdbdbd;
  font-size: 30px;
`;

const PurchaseBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  color: white;
  background-color: #2f4e7c;

  font-size: 30px;
`;

export default function MarketDetail(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Wrapper>
        <InfoBox>
          <InfoIconBox>
            <IconImg src="/icon/User.svg" />
          </InfoIconBox>
          <InfoNameBox>
            <UserName>판매자</UserName>
            <WriteDate>Date: 2023.08.01</WriteDate>
          </InfoNameBox>
          <EtcIconBox>
            <IconImg src="/icon/link.svg" />
            <IconImg src="/icon/location.svg" />
          </EtcIconBox>
        </InfoBox>
        <ProductBox>
          <ProductInfoBox>
            <ProductNameBox>
              <ProductNameDetail>2019 LTE 32GB</ProductNameDetail>
              <ProductName> 삼성전자 갤럭시탭A 10.1</ProductName>
              <ProductPrice>240,120원</ProductPrice>
            </ProductNameBox>
            <HeartBox>
              <HeartIcon />
              <HeartVal>20</HeartVal>
            </HeartBox>
          </ProductInfoBox>
          <ProductCarousellBox>
            <Carousell>
              <Slider {...settings}>
                <div>
                  <SliderItem src="/shoes.jpg" />
                </div>
                <div>
                  <SliderItem src="/taewan.jpg" />
                </div>
              </Slider>
            </Carousell>
            <ProductImages>
              <ImageBox></ImageBox>
              <ImageBox></ImageBox>
              <ImageBox></ImageBox>
              <ImageBox></ImageBox>
            </ProductImages>
          </ProductCarousellBox>
          <ProductContentBox>
            <Contents>
              액정에 잔기스랑 주변부 스크레치있습니다만 예민하신분아니면 전혀
              신경쓰이지않을정도입니다 박스 보관중입니다 메모용과
              넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을
              못느꼈네요 잘 안써서 싸게넘깁니다 택배거래안합니다
            </Contents>
            <HashBox>
              <Hash>#삼성전자</Hash>
              <Hash>#삼성전자</Hash>
              <Hash>#삼성전자</Hash>
            </HashBox>
          </ProductContentBox>
        </ProductBox>
        <LocationBox></LocationBox>
        <BtnBox>
          <ListBtn>목록으로</ListBtn>
          <PurchaseBtn>구매하기</PurchaseBtn>
        </BtnBox>
      </Wrapper>
      <BoardCommentListUIItem />
    </>
  );
}
