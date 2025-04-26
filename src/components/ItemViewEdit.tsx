import { useState } from "react";
import ItemForm, { ItemFormProps } from "./forms/ItemForm";
import { styled } from "styled-components";

export type Mode = "view" | "edit";

interface ItemViewEditProps {
  mode: Mode;
  itemFormProps: ItemFormProps;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

const FieldLabel = styled.label`
  font-weight: bold;
`;


function InternalItemViewEdit({internalProps, onChange}: {internalProps: ItemViewEditProps, onChange: (mode: Mode) => void}) {
  const viewContent = (
    <div>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <p>{internalProps.itemFormProps.item?.title}</p>
      </Field>
      <Field>
        <FieldLabel>Start</FieldLabel>
        <p>{internalProps.itemFormProps.item?.start}</p>
      </Field>
      <Field>
        <FieldLabel>End</FieldLabel>
        <p>{internalProps.itemFormProps.item?.end}</p>
      </Field>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <p>{internalProps.itemFormProps.item?.desc}</p>
      </Field>
      <button onClick={() => onChange("edit")}>Edit</button>
    </div>
  );

  const editContent = (
    <div>
      <ItemForm {...internalProps.itemFormProps} />
    </div>
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
