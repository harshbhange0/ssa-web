export interface BootStrapInputProps {
   error:boolean
  label: string;
  value: string | number;
  setValue:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  type: string;
}
