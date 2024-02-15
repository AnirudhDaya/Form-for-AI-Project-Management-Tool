"use client";
import { TextInput, Button, MultiSelect, FileInput, FileInputProps, Pill } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useState } from "react";


export function Form() {
const [selected, setSelected] = useState<string[]>([]);
const [projectTitle, setProjectTitle] = useState<string>('');
const [abstractFile, setAbstractFile] = useState<File | null>(null);
const [researchPapers, setResearchPapers] = useState<File[]>([]);

const students = [
  "Anirudh Dayanandan",
  "Martin James Purathur",
  "Fahad Puzhakkaraillath Noushad",
  "Svelte",
];

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

const handleSubmit = async (teamMembers: string[], projectTitle: string, abstractDoc: File, researchPaperDocs: File[]) => {
  if(!projectTitle) {
    notifications.show({
      title: 'Error',
      color: "red",
      message: 'Project title is required'
    })
    return
  }

  if(teamMembers.length === 0) {
    notifications.show({
      title: 'Error',
      color: "red",
      message: 'Please select at least one team member'
    })
    return
  }

  if(!abstractDoc) {
    notifications.show({
      title: 'Error',
      color: "red",
      message: 'Abstract file is required'
    });
    return;
  }

  if(researchPaperDocs.length == 0) {
    notifications.show({ 
      title: 'Error',
      color: "red",
      message: 'At least one research paper is required'
    });
    return; 
  }

  const formData = new FormData();
  formData.append('title', projectTitle);
  formData.append('teamMembers', teamMembers.join(','));
  formData.append('abstract', abstractDoc);
  researchPaperDocs.forEach(paper => {
  formData.append('researchPapers', paper); 
  });
  const submit = await fetch("/api/submit", {
    method: "POST",
    body: formData,
  });

  if (submit.status === 200) {
    console.log("Form submitted successfully:", submit.text);

    // Show success notification
    try {
      notifications.show({
        title: "Success",
        message: "Form submitted successfully!",
        color: "teal",
      });
    } catch (error) {
      console.error("Error showing success notification:", error);
    }
  } else {
    console.error("Error submitting form:", submit.statusText);

    // Show error notification
    try {
      notifications.show({
        title: "Error",
        message: "An error occurred while submitting the form.",
        color: "red",
      });
    } catch (error) {
      console.error("Error showing error notification:", error);
    }
  }
};

return (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gridGap: "16px",
      width: "500px",
      margin: "0 auto",
    }}
    
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/putin.webp"
        alt="Placeholder Logo"
        width={204}
        height={204}
        style={{ width: "204px", height: "204px", marginBottom: "4px" }}
      />
    </div>
    <TextInput
      minLength={5}
      withAsterisk
      label="Project Title"
      placeholder="Enter project title"
      value={projectTitle}
      onChange={(event) => {
        setProjectTitle(event.target.value);
      }}
    />

    <MultiSelect
    required
    
    label="Team Members"
    withAsterisk
    placeholder="Pick value"
    data={students}
    searchable
    nothingFoundMessage="Nothing found..."
    hidePickedOptions
    comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    value={selected}
    onChange={setSelected}
    />

  <FileInput
    withAsterisk
    clearable 
    label="Abstract"
    placeholder="Upload files"
    onChange={setAbstractFile}
    value={abstractFile}
    valueComponent={ValueComponent}
  />

  <FileInput
    withAsterisk
    clearable 
    label="Supporting Research Papers"
    placeholder="Upload files"
    multiple
    valueComponent={ValueComponent}
    value={researchPapers}
    onChange={setResearchPapers}
  />
    <Button type="submit" mt="md" onClick={() =>{
     if(abstractFile) {
      handleSubmit(selected, projectTitle, abstractFile, researchPapers); 
    }
    else{
      notifications.show({
        title: 'Error',
        color: "red",
        message: 'Abstract file is required'
      })
    }
    }}>
      Submit
    </Button>
  </div>
);
}
