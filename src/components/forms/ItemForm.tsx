import { styled } from "styled-components";

export interface ItemFormData {
  title: string;
  start?: string;
  end?: string;
  desc?: string;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export type ItemFormSubmit = (data: ItemFormData) => void;

export interface ItemFormProps {
  item?: ItemFormData;
  onSubmit: ItemFormSubmit;
  onCancel: () => void;
}

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

export default function ItemForm(props: ItemFormProps) {
  console.log(props.item);

  return (
    <form onSubmit={(e) => handleSubmit(e, props.onSubmit)}>
      <Field>
        <label>Title</label>
        <input type="text" name="title" defaultValue={props.item?.title} />
      </Field>
      <Field>
        <label>Start</label>
        <input type="date" name="start" defaultValue={props.item?.start} />
      </Field>
      <Field>
        <label>End</label>
        <input type="date" name="end" defaultValue={props.item?.end} />
      </Field>
      <Field>
        <label>Description</label>
        <input type="text" name="desc" defaultValue={props.item?.desc} />
      </Field>
      <button type="submit">OK</button>      
      <button type="button" onClick={props.onCancel}>Cancel</button>
    </form>
  );
}
