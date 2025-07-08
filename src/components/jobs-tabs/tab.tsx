"use client";

import { Tabs } from "@components/tab";
import { stationServiceAtom, updateStationServiceAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import RadioGroup from "../forms/radio-button";
import FormProvider from "../forms/hook-form/provider";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const YES_NO_OPTIONS = [
  {
    id: "2",
    name: "Talleres de Conversión",
  },
  {
    id: "3",
    name: "Concesionarias",
  },
];

const defaultValues = {
  item: "",
};

export function TabsMap() {
  const [select] = useAtom(stationServiceAtom);

  const tabs = [
    {
      title: "Estaciones de servicio",
      value: "es",
      color: '#FCFCFC',
    },
    {
      title: "Talleres de Conversión y Concesionarias",
      value: "al",
      color: '#FBFBFB',
    },
  ];

  const methods = useForm({
    defaultValues,
  });

  const { 
    handleSubmit, 
    watch, 
    setValue,
  } = methods;

  const onSubmit = handleSubmit(
    async (data) => {
      console.log(data);
    },
    (e) => console.log(e)
  );

  const watchItem = watch('item');
  const setActiveSubItem = useSetAtom(updateStationServiceAtom); 
 
  useEffect(() => {
    setActiveSubItem({subItem: parseInt(watchItem, 10)});
  }, [setActiveSubItem, watchItem]);
  
  useEffect(() => {
    setValue('item', '');
  }, [ select.id ]); 

  return (
    <div className="lg:flex  justify-center  ">
      <div className="container mx-auto">
        <Tabs tabs={tabs} />
        {select.id === 1 ? (
          <div className="flex justify-center items-center py-6 animate-fade animate-once animate-duration-700 animate-ease-linear">
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <RadioGroup
                name="item"
                required
                options={YES_NO_OPTIONS}
                radioGroupName="local"
                divider
              />
            </FormProvider>
          </div>
        ) : null}
      </div>
    </div>
  );
}
