"use client";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Divider, Iconify, Text } from "@/components";
type SliderProps = React.ComponentProps<typeof Slider>;
import tailwindConfig from "@root/tailwind.config";
import FormProvider from "@/components/forms/hook-form/provider";
import { useForm } from "react-hook-form";
import RHFSlider from "../forms/hook-form/components/slider";
import { formatSoles } from "@/utils/format";
const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];

export function SliderCustom({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn(className)}
      {...props}
    />
  );
}
const defaultValues = {
  km_x_l: 13,
  km_x_year: 15000,
  gasoline: 10,
  glp: 4,
};
export default function Simulator() {
  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const value = watch();

  const total_gl = (1 / value.km_x_l) * value.km_x_year;
  const consumption_total_gl =  total_gl*0.116/0.095 
  const cost_year_gs = value.gasoline * total_gl
  const cost_year_glp = value.glp * consumption_total_gl
  const annual_savings = (cost_year_gs - cost_year_glp).toFixed(2);

  return (
    <FormProvider methods={methods}>
      <div className="flex justify-center">
        <div className="lg:grid lg:grid-cols-12 gap-12 w-full max-w-[1166px]">
          <div className="lg:col-span-6 col-span-12 flex justify-center lg:pb-0 pb-8">
            <div>
              <div className="max-w-[482px] w-full text-center">
                <Text  font='new' className="text-primary-blue lg:text-[24px] text-lg mb-6">
                ¿Cuántos kilómetros recorre su vehículo por galón de combustible?
                </Text> 
              </div>
              <div className="flex justify-center">
                <div className="max-w-[331px] w-full">
                  <RHFSlider
                    name="km_x_l"
                    className="max-w-[331px] w-full"
                    min={5}
                    step={1}
                    max={100}
                  />
                  <Text
                    className="text-primary-blue lg:text-[24px] text-lg mt-4"
                    font="bold"
                  >
                    {value.km_x_l} KM
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 flex justify-center lg:pb-0 pb-8">
            <div>
              <div className="max-w-[276px] w-full text-center">
                <Text className="text-primary-blue lg:text-[24px] text-lg mb-6">
                  ¿Cuántos kilómetros viajas por año?
                </Text>
              </div>
              <div className="flex justify-center">
                <div className="max-w-[331px] w-full">
                  <RHFSlider
                    name="km_x_year"
                    className="max-w-[331px] w-full"
                    min={10000}
                    max={50000}
                    step={500}
                  />
                  <Text
                    className="text-primary-blue lg:text-[24px] text-lg mt-4"
                    font="bold"
                  >
                    {value.km_x_year} KM
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:pb-0 pb-8">
            <div className="flex justify-center">
              <Divider className="w-full border-select border-opacity-40 max-w-[1166px]" />
            </div>
            <Text
              className="text-[30px] text-primary-blue pt-8 lg:text-left text-center"
              font="medium"
            >
              Costo
            </Text>
          </div>
          <div className="lg:col-span-6 col-span-12 flex justify-center">
            <div className="max-w-[331px] w-full lg:pb-0 pb-8">
              <div className="max-w-[482px] w-full text-center">
                <Text
                  className="text-primary-blue lg:text-[24px] text-lg mb-6 flex items-center gap-x-2"
                  font="medium"
                >
                  <Iconify icon="tabler:point-filled" color={primaryBlue} />{" "}
                  Gasolina
                </Text>
              </div>
              <div className="flex justify-center">
                <div className="max-w-[331px] w-full">
                  <RHFSlider
                    name="gasoline"
                    className="max-w-[331px] w-full"
                    min={5}
                    max={50}
                    step={1}
                  />
                  <div className="flex justify-between max-w-[331px] w-full">
                    <Text
                      className="text-primary-blue lg:text-[24px] text-lg mt-4"
                      font="bold"
                    >
                      { value.gasoline } soles/GAL
                    </Text>
                    <Text
                      className="text-primary-blue text-[14px] mt-4"
                      font="bold"
                    >
                      Costo anual <br /> {formatSoles.format(Number(cost_year_gs.toFixed(2)))}  
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 flex justify-center lg:pb-0 pb-8">
            <div className="max-w-[331px] w-full">
              <div className="max-w-[482px] w-full text-center">
                <Text
                  className="text-primary-blue lg:text-[24px] text-lg mb-6 flex items-center gap-x-2"
                  font="medium"
                >
                  <Iconify icon="tabler:point-filled" color={primaryBlue} /> GLP
                </Text>
              </div>
              <div className="flex justify-center">
                <div className="max-w-[331px] w-full">
                  <RHFSlider
                    name="glp"
                    className="max-w-[331px] w-full"
                    min={1}
                    max={50}
                    step={1}
                  />
                  <div className="flex justify-between max-w-[331px] w-full">
                    <Text
                      className="text-primary-blue lg:text-[24px] text-lg mt-4"
                      font="bold"
                    >
                      {value.glp} soles/GAL
                    </Text>
                    <Text
                      className="text-primary-blue text-[14px] mt-4"
                      font="bold"
                    >
                      Costo anual <br /> {formatSoles.format(Number(cost_year_glp.toFixed(2)))}  
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:py-0 py-6">
            <div className="flex justify-center">
              <Divider className="w-full border-select border-opacity-40 max-w-[1166px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full pt-12">
        <div className="max-w-[561px] w-full bg-white lg:min-h-[185px] p-6 rounded-[27px]">
          <Text
            className="lg:text-[24px] text-lg text-primary-blue text-left"
            font="bold"
          >
            Ahorro anual
          </Text>
          <Text className="lg:text-[54px] text-4xl  pt-8 text-primary-blue text-center">
            {formatSoles.format(Number(annual_savings))}
          </Text>
        </div>
      </div>
    </FormProvider>
  );
}
