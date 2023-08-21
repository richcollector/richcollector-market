import { useState } from "react";
import * as S from "./MyProfile.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPassword } from "./Password.validation";
import { schmaInfo } from "./Info.validation";
import { useProfile } from "../../../commons/hooks/customs/useProfile";

export default function Myprofile() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schemaPassword),
    mode: "onChange",
  });

  const {
    register: infoRegister,
    handleSubmit: infoHandleSubmit,
    formState: infoFormState,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schmaInfo),
    mode: "onChange",
  });

  const { ref, ...rest } = infoRegister("image");

  const [menu, setMenu] = useState("1");

  const {
    fileRef,
    fileUrl,
    onChangeFile,
    onClickDeleteUrl,
    onClickSubmitInfo,
    onClickSubmitPassWord,
    onClickUpload,
  } = useProfile({ setValue, trigger });

  return (
    <>
      <S.BoardBox>
        <S.BoardMenu>
          <S.MenuTitleBox>
            <S.MenuTitle
              style={menu === "1" ? S.activeStyle : {}}
              onClick={() => {
                setMenu("1");
              }}
            >
              정보 변경
            </S.MenuTitle>
            <S.LineBox />
            <S.MenuTitle
              style={menu === "2" ? S.activeStyle : {}}
              onClick={() => {
                setMenu("2");
              }}
            >
              비밀번호 변경
            </S.MenuTitle>
          </S.MenuTitleBox>
        </S.BoardMenu>
        <S.Boardcontents>
          {menu === "1" && (
            <S.SignBox>
              <S.InputBox style={{ height: "600px" }}>
                <S.Label>이름</S.Label>
                <S.InputCommon
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  {...infoRegister("name")}
                />
                <S.ErrorCommon>
                  {infoFormState.errors.name?.message}
                </S.ErrorCommon>
                <S.Label>사진</S.Label>
                {fileUrl !== "" ? (
                  <S.ImgBox>
                    <S.UploadImage onClick={onClickUpload} src={`${fileUrl}`} />
                    <S.CloseBtn
                      src="/icon/close.svg"
                      onClick={onClickDeleteUrl}
                    />
                  </S.ImgBox>
                ) : (
                  <S.ImgBox>
                    <S.UploadButton onClick={onClickUpload}>
                      <>+</>
                      <>Upload</>
                    </S.UploadButton>
                  </S.ImgBox>
                )}
                <S.UploadFileHidden
                  type="file"
                  ref={(e) => {
                    ref(e);
                    fileRef.current = e;
                  }}
                  onChange={onChangeFile}
                />
                <S.ErrorCommon>
                  {infoFormState.errors.image?.message}
                </S.ErrorCommon>
              </S.InputBox>

              <S.LoginBox>
                <S.SignBtn
                  onClick={infoHandleSubmit(onClickSubmitInfo)}
                  style={{
                    backgroundColor: infoFormState.isValid ? "yellow" : "",
                  }}
                  disabled={!infoFormState.isValid}
                >
                  정보 변경하기
                </S.SignBtn>
              </S.LoginBox>
            </S.SignBox>
          )}
          {menu === "2" && (
            <S.SignBox>
              <S.InputBox>
                <S.Label>새 비밀번호</S.Label>
                <S.InputCommon
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  {...register("password")}
                />
                <S.ErrorCommon>
                  {formState.errors.password?.message}
                </S.ErrorCommon>
                <S.Label>새 비밀번호 확인</S.Label>
                <S.InputCommon
                  type="password"
                  placeholder="새 비밀번호를 다시 입력해주세요."
                  {...register("passwordConfirm")}
                />
                <S.ErrorCommon>
                  {formState.errors.passwordConfirm?.message}
                </S.ErrorCommon>
              </S.InputBox>

              <S.LoginBox>
                <S.SignBtn
                  onClick={handleSubmit(onClickSubmitPassWord)}
                  style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
                  disabled={!formState.isValid}
                >
                  비밀번호 변경하기
                </S.SignBtn>
              </S.LoginBox>
            </S.SignBox>
          )}
        </S.Boardcontents>
      </S.BoardBox>
    </>
  );
}
