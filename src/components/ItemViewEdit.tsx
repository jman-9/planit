import { useState } from "react";
import ItemForm, { ItemFormProps } from "./forms/ItemForm";
import { styled } from "styled-components";
import RoundedButton from "../ui/RoundedButton";
export type Mode = "view" | "edit";

interface ItemViewEditProps {
  mode: Mode;
  itemFormProps: ItemFormProps;
}

const ViewEditContainer = styled.div`
  min-width: max(40vw, 350px);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

const FieldLabel = styled.label`
  font-weight: bold;
`;

const FieldText = styled.p`
  font-weight: 100;
  white-space: pre-wrap;
`;

const TitleText = styled.p`
  font-weight: normal;
  white-space: pre-wrap;
`;


function InternalItemViewEdit({internalProps, onChange}: {internalProps: ItemViewEditProps, onChange: (mode: Mode) => void}) {
  const viewContent = (
    <ViewEditContainer>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <TitleText>{internalProps.itemFormProps.item?.title}</TitleText>
      </Field>
      <Field>
        <FieldLabel>Start</FieldLabel>
        <FieldText>{internalProps.itemFormProps.item?.start}</FieldText>
      </Field>
      <Field>
        <FieldLabel>End</FieldLabel>
        <FieldText>{internalProps.itemFormProps.item?.end}</FieldText>
      </Field>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldText>{internalProps.itemFormProps.item?.desc}</FieldText>
      </Field>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
        <RoundedButton size="small" onClick={() => onChange("edit")}><span style={{fontSize: '0.6em', marginRight: '0.5rem'}}>🖊️</span> Edit</RoundedButton>
        <RoundedButton size="small" onClick={() => internalProps.itemFormProps.onCancel()}>Close</RoundedButton>
      </div>
    </ViewEditContainer>
  );

  const editContent = (
    <ViewEditContainer>
      <ItemForm {...internalProps.itemFormProps} />
    </ViewEditContainer>
  );

  return internalProps.mode === "view" ? viewContent : editContent;
}


export default function ItemViewEdit(props: ItemViewEditProps) {
  const internalProps = {...props};
  const [internalMode, setInternalMode] = useState<Mode>(props.mode);

  const onChange = (mode: Mode) => {
    setInternalMode(mode);
    internalProps.mode = mode;
  }

  internalProps.mode = internalMode;

  return <InternalItemViewEdit internalProps={internalProps} onChange={onChange} />;
}
