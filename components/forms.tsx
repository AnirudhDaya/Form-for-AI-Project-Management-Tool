"use client";
import { TextInput, Button, MultiSelect, FileInput, FileInputProps, Pill } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useState } from "react";


export function Form() {
const [teamCode, setTeamCode] = useState<string>('');
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

const handleSubmit = async (teamCode: string, projectTitle: string, abstractDoc: File | null, researchPaperDocs: File[]) => {
  if(!projectTitle) {
    notifications.show({
      title: 'Error',
      color: "red",
      message: 'Project title is required'
    })
    return
  }

  if(!teamCode) {
    notifications.show({
      title: 'Error',
      color: "red",
      message: 'Please enter team code'
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
  formData.append('teamMembers', teamCode);
  formData.append('abstract', abstractDoc);
  researchPaperDocs.forEach(paper => {
  formData.append('researchPapers', paper); 
  });
  console.log(researchPaperDocs);
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
        src="/mascot-logo.jpg"
        alt="Placeholder Logo"
        width={204}
        height={204}
        style={{ width: "274px", height: "204px", marginBottom: "4px" }}
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

    <TextInput
      minLength={5}
      withAsterisk
      label="Team Code"
      placeholder="Enter team code"
      value={teamCode}
      onChange={(event) => {
        setTeamCode(event.target.value);
      }}
    />

  <FileInput
    withAsterisk
    clearable 
    label="Abstract"
    placeholder="Upload files"
    accept="application/pdf" 
    onChange={setAbstractFile}
    value={abstractFile}
    valueComponent={ValueComponent}
  />

  <FileInput
    withAsterisk
    clearable
    accept="application/pdf" 
    label="Supporting Research Papers"
    placeholder="Upload files"
    multiple
    valueComponent={ValueComponent}
    value={researchPapers}
    onChange={setResearchPapers}
  />
    <Button type="submit" mt="md" onClick={() =>{
     
      handleSubmit(teamCode, projectTitle, abstractFile, researchPapers); 
    
    }}>
      Submit
    </Button>
  </div>
);
}
