// components/mutliselect.tsx
import { MultiSelect } from '@mantine/core';
import { useState } from 'react';
interface MultiSelectorProps {
  data: string[];
}

export function MultiSelector({ data }: MultiSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <MultiSelect
      label="Team Members"
      withAsterisk
      placeholder="Pick value"
      data={data}
      searchable
      nothingFoundMessage="Nothing found..."
      hidePickedOptions
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      value={selected}
      onChange={setSelected}
    />
  );
}

