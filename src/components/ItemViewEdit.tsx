import { useState } from "react";
import { styled } from "styled-components";
import RoundedButton from "../ui/RoundedButton";
export type Mode = "view" | "edit";


export interface ItemFormData {
  title: string;
  start?: string;
  end?: string;
  desc?: string;
}

export type ItemFormSubmit = (data: ItemFormData) => void;

export interface ItemFormProps {
  item?: ItemFormData;
  onSubmit: ItemFormSubmit;
  onCancel: () => void;
}

export interface ItemViewEditProps {
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


function handleSubmit(e: React.FormEvent<HTMLFormElement>, onSubmit:ItemFormSubmit) {
  e.preventDefault();
  console.log(e);

  const form = e.currentTarget;

  let title = (form.elements.namedItem("title") as HTMLInputElement)?.value;
  if(title) title = title.trim();

  if(!title) {
    alert("Title is required");
    return;
  }

  let start = (form.elements.namedItem("start") as HTMLInputElement)?.value;
  if(start) start = start.trim();

  let end = (form.elements.namedItem("end") as HTMLInputElement)?.value;
  if(end) end = end.trim();

  let desc = (form.elements.namedItem("desc") as HTMLInputElement)?.value;
  if(desc) desc = desc.trim();

  const data: ItemFormData = { title, start, end, desc };
  onSubmit(data);
}

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

  const editProps = internalProps.itemFormProps;
  const editContent = (
    <ViewEditContainer>
      <form onSubmit={(e) => handleSubmit(e, editProps.onSubmit)}>
        <Field>
          <label>Title</label>
          <textarea style={{padding: '0.5rem' }} name="title" defaultValue={editProps.item?.title} />
        </Field>
        <Field>
          <label>Start</label>
          <input style={{maxWidth: '8rem'}} type="date" name="start" defaultValue={editProps.item?.start} />
        </Field>
        <Field>
          <label>End</label>
          <input style={{maxWidth: '8rem'}} type="date" name="end" defaultValue={editProps.item?.end} />
        </Field>
        <Field>
          <label>Description</label>
          <textarea style={{padding: '0.5rem', height: '7rem'}} name="desc" defaultValue={editProps.item?.desc} />
        </Field>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
          <RoundedButton size="small" type="submit">OK</RoundedButton>
          <RoundedButton size="small" type="button" onClick={editProps.onCancel}>Cancel</RoundedButton>
        </div>
      </form>
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
