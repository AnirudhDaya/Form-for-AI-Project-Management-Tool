import { FileInput, FileInputProps, Pill } from '@mantine/core';

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

interface FileUploadProps {
    labelName: string;
  }
  
export default function FileUpload({labelName}: FileUploadProps) {
  return (
    <FileInput
      withAsterisk
      clearable 
      label={labelName}
      placeholder="Upload files"
      
      valueComponent={ValueComponent}
    />
  );
}
export  function FileUploadMulti({labelName}: FileUploadProps) {
  return (
    <FileInput
      withAsterisk
      clearable 
      label={labelName}
      placeholder="Upload files"
      multiple
      valueComponent={ValueComponent}
    />
  );
}