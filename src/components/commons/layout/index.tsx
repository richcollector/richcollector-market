import LayoutFooter from "./footer/Footer.container";
import LayoutHeader from "./header/Header.index";
import LayoutNavigation from "./navigation/Navigation.container";
import LayoutBannerUI from "./ad";
import FlotiongItem from "../../units/main/flotingItem";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface ILayoutProps {
  children: JSX.Element;
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BlankBox = styled.div`
  position: relative;
`;

const HIDDEN = ["/login", "/signup"];

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  console.log("router asPath::", router.asPath);
  console.log("includes", HIDDEN.includes(router.asPath));

  const isHidden = HIDDEN.includes(router.asPath);
  return (
    <>
      {!isHidden && <LayoutHeader />}
      {!isHidden && <LayoutNavigation />}
      {!isHidden && <LayoutBannerUI />}
      <Wrapper>
        <Component>{props.children}</Component>
        {!isHidden && (
          <BlankBox>
            <FlotiongItem />
          </BlankBox>
        )}
      </Wrapper>
      {!isHidden && <LayoutFooter />}
    </>
  );
}
