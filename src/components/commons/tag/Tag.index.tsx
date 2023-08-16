import * as S from "./Tag.styles";
import { type IProps } from "./Tag.types";
import { type KeyboardEvent } from "react";

export default function Tags(props: IProps) {
  const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("??:", event.currentTarget.value);
      const newTags = [...props.tags];
      newTags[props.index] = event.currentTarget.value;

      props.setTags(newTags);
      const result = event.currentTarget.value;

      props.setValue("tags", result);
      void props.trigger("tags");

      if (props.index < 4) newTags[props.index + 1] = "";
    }
  };

  const onClickDelete = () => {
    const newTags = [...props.tags];
    props.setTags(newTags.filter((el) => el !== newTags[props.index]));
    if (props.tags.length === 1) props.setTags([""]);
  };
  return (
    <>
      {props.tag !== "" ? (
        <S.TagsBox>
          <S.Input defaultValue={props.tag} disabled={props.tag !== ""} />
          <S.CloseImg src="/icon/close.svg" onClick={onClickDelete} />
        </S.TagsBox>
      ) : (
        <S.TagsBox>
          <S.Input placeholder="태그 입력" onKeyPress={onKeyPressEnter} />
        </S.TagsBox>
      )}
    </>
  );
}
