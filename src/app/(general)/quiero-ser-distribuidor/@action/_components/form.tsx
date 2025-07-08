"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPost } from "../../actions";
import { generateErrorMessage } from "@/utils/error";
import { enqueueSnackbar } from "notistack";
import FormProvider from "@/components/forms/hook-form/provider";
import { Button, Text } from "@/components";
import Input from "@/components/forms/hook-form/components/input";
import RadioGroup from "@/components/forms/radio-button";
import { PropsItemSelect } from "@/components/select/type";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { getDepartments, getDistricts, getProvinces } from "@/app/actions";
import SelectWithLabel from "./select";
import { getCaptchaToken } from "@/utils/recaptcha";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const YES_NO_OPTIONS = [
  {
    id: "true",
    name: "Si",
  },
  {
    id: "false",
    name: "No",
  },
];

const defaultValues = {
  full_name: "",
  dni_or_ruc: "",
  phone_1: "",
  phone_2: "",
  email: "",
  address: "",
  department: { id: "", name: "" },
  province: { id: "", name: "" },
  district: { id: "", name: "" },
  code_ubigeo: "",
  has_store: "",
  sells_gas_cylinders: "",
  brands_sold: "",
  selling_time: "",
  monthly_sales: "",
  accepts_data_policy: "",
};

const RegisterSchema = z.object({
  full_name: z
    .string()
    .nonempty("Campo obligatorio")
    .max(255, "Campo no válido"),
  dni_or_ruc: z
    .string()
    .nonempty("Campo obligatorio")
    .max(255, "Campo no válido"),
  phone_1: z.string().nonempty("Campo obligatorio").max(15, "Campo no válido"),
  phone_2: z.string().nonempty("Campo obligatorio").max(15, "Campo no válido"),
  email: z
    .string()
    .nonempty("Campo obligatorio")
    .email("Campo no válido")
    .max(255, "Campo no válido"),
  address: z.string().nonempty("Campo obligatorio").max(255, "Campo no válido"),
  department: z
    .object({
      id: z.string().nonempty("Campo no válido"),
      name: z.string().nonempty("Campo no válido").max(255, "Campo no válido"),
    })
    .refine((value) => value.id && value.name, {
      message: "Campo no válido",
    }),
  province: z
    .object({
      id: z.string().nonempty("Campo obligatorio"),
      name: z
        .string()
        .nonempty("Campo obligatorio")
        .max(255, "Campo no válido"),
    })
    .refine((value) => value.id && value.name, {
      message: "Campo no válido",
    }),
  district: z
    .object({
      id: z.string().nonempty("Campo obligatorio"),
      name: z
        .string()
        .nonempty("Campo obligatorio")
        .max(255, "Campo no válido"),
    })
    .refine((value) => value.id && value.name, {
      message: "Campo no válido",
    }),
  code_ubigeo: z
    .string()
    .nonempty("Campo obligatorio")
    .min(6, "Campo no válido")
    .max(6, "Campo no válido"),
  has_store: z
    .string()
    .nonempty("Campo obligatorio")
    .max(15, "Campo no válido"),
  sells_gas_cylinders: z
    .string()
    .nonempty("Campo obligatorio")
    .max(15, "Campo no válido"),
  brands_sold: z
    .string()
    .nonempty("Campo obligatorio")
    .max(255, "Campo no válido"),
  selling_time: z
    .string()
    .nonempty("Campo obligatorio")
    .max(255, "Campo no válido"),
  monthly_sales: z
    .string()
    .nonempty("Campo obligatorio")
    .max(255, "Campo no válido"),
  accepts_data_policy: z.string().refine((val) => val === "true", {
    message: "Campo obligatorio",
  }),
});

export default function Form({
  title,
  description,
  setIsOpen,
  button_text = "Enviar",
}: {
  title?: string;
  description?: string;
  setIsOpen: (value: boolean) => void;
  button_text: string;
}) {
  const methods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setError,
    setValue,
  } = methods;

  const omit = <T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
  ): Omit<T, K> => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as K))
    ) as Omit<T, K>;
  };

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        if (data.code_ubigeo.length === 4) {
          setError("province", {
            type: "manual",
            message: "Campo distrito es obligatorio",
          });
          return;
        } else if (data.code_ubigeo.length === 2) {
          setError("province", {
            type: "manual",
            message: "Campo provincia es obligatorio",
          });
          return;
        } else if (data.code_ubigeo.length === 0) {
          setError("province", {
            type: "manual",
            message: "Campo departamento es obligatorio",
          });
          return;
        }

        const token = await getCaptchaToken();

        const params = omit(data, ["department", "province", "district"]);

        const jsonParams = Object.fromEntries(
          Object.entries(params).map(([key, value]) => {
            if (key === "monthly_sales") {
              return [key, parseFloat(value)];
            }
            if (value === "true" || value === "false") {
              return [key, value === "true"];
            }
            return [key, value];
          })
        );

        if (token) {
          jsonParams["q_recaptcha"] = token;
        }

        const response = await createPost(jsonParams);

        if (response?.errors) {
          generateErrorMessage(response.errors, methods);
        } else {
          reset(defaultValues);
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
            autoHideDuration: 3000,
          });
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Servicio no disponible", {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
          autoHideDuration: 3000,
        });
      }
    },
    (e) => console.log(e)
  );

  const watchDepartment = watch("department");
  const watchProvince = watch("province");
  const watchDistrict = watch("district");

  const [departments, setDepartments] = useState<PropsItemSelect[]>([]);
  const [provinces, setProvinces] = useState<PropsItemSelect[]>([]);
  const [districts, setDistricts] = useState<PropsItemSelect[]>([]);

  const min640 = useMediaQuery({ minWidth: 640 });
  const [scrollHeight, setScrollHeight] = useState("calc( 100vh - 28rem)");

  useEffect(() => {
    const initial = () => {
      setScrollHeight(min640 ? "calc( 100vh - 28rem)" : "calc( 100vh - 16rem)");
    };

    initial();
  }, [min640]);

  useEffect(() => {
    const onInitial = async () => {
      const dataDepartments = await getDepartments();
      if (dataDepartments?.data)
        setDepartments(
          dataDepartments?.data?.map(
            (item: { code_department: string; department: string }) => ({
              id: item.code_department,
              name: item.department,
            })
          )
        );
    };

    onInitial();
  }, []);

  useEffect(() => {
    const onInitial = async () => {
      const dataProvinces = await getProvinces(watchDepartment?.id);
      if (dataProvinces?.data)
        setProvinces(
          dataProvinces?.data?.map(
            (item: { code_province: string; province: string }) => ({
              id: item.code_province,
              name: item.province,
            })
          )
        );
    };

    if (watchDepartment?.id) {
      onInitial();
    } else {
      setValue("province", { id: "", name: "" });
      setValue("district", { id: "", name: "" });
      setProvinces([]);
      setDistricts([]);
    }
  }, [watchDepartment, setValue]);

  useEffect(() => {
    const onInitial = async () => {
      const dataDistricts = await getDistricts(
        watchDepartment?.id,
        watchProvince?.id
      );
      if (dataDistricts?.data)
        setDistricts(
          dataDistricts?.data?.map(
            (item: { code_district: string; district: string }) => ({
              id: item.code_district,
              name: item.district,
            })
          )
        );
    };

    if (watchDepartment?.id && watchProvince?.id) {
      onInitial();
    } else {
      setValue("district", { id: "", name: "" });
      setDistricts([]);
    }
  }, [watchProvince, watchDepartment?.id, setValue]);

  useEffect(() => {
    if (watchDepartment?.id && watchProvince?.id && watchDistrict?.id)
      setValue(
        "code_ubigeo",
        `${watchDepartment?.id}${watchProvince?.id}${watchDistrict?.id}`
      );
  }, [watchDistrict, setValue, watchDepartment?.id, watchProvince?.id]);

  return (
    <Scrollbars
      className="w-full"
      style={{
        height: scrollHeight,
        position: "relative",
      }}
      autoHideTimeout={1000}
      autoHideDuration={200}
      thumbMinSize={40}
      universal={true}
    >
      <div className="sm:hidden">
        <Text
          className="text-primary-blue md:text-[38px] text-xl text-center"
          type="h3"
          font="bold"
        >
          {title}
        </Text>
        <p className="text-secondary-blue font-clan-pro-regular md:text-lg text-md text-center my-6">
          {description}
        </p>
      </div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-8 mr-4">
          <div className="col-span-2">
            <Input
              name="full_name"
              staticLabel="1. Nombres y Apellidos"
              required
              placeholder="Escriba aqui..."
            />
          </div>
          <div className="col-span-2">
            <Input
              name="dni_or_ruc"
              staticLabel="2. DNI / RUC (Según corresponda)"
              required
              placeholder="Escriba aqui..."
              onlyNumbers={true}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input
              name="phone_1"
              staticLabel="3. Teléfono 1"
              required
              placeholder="Escriba aqui..."
              onlyNumbers={true}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input
              name="phone_2"
              staticLabel="4. Teléfono 2"
              required
              placeholder="Escriba aqui..."
              onlyNumbers={true}
            />
          </div>
          <div className="col-span-2">
            <Input
              name="email"
              staticLabel="5. Correo electrónico"
              required
              placeholder="Escriba aqui..."
              type="email"
            />
          </div>
          <div className="col-span-2">
            <Input
              name="address"
              staticLabel="6. Dirección"
              required
              placeholder="Escriba aqui..."
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <SelectWithLabel
              name="department"
              title={"Seleccionar"}
              data={departments}
              placeholder="Buscar departamento"
              staticLabel="7. Departamento"
              className="w-full"
              required
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <SelectWithLabel
              name="province"
              title={"Seleccionar"}
              data={provinces}
              placeholder="Buscar provincia"
              staticLabel="8. Provincia"
              className="w-full"
              required
            />
          </div>
          <div className="col-span-2">
            <SelectWithLabel
              name="district"
              title={"Seleccionar"}
              data={districts}
              placeholder="Buscar Distrito"
              staticLabel="9. Distrito"
              className="w-full"
              required
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <RadioGroup
              name="has_store"
              staticLabel="10. ¿Cuenta con un local?"
              required
              options={YES_NO_OPTIONS}
              radioGroupName="local"
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <RadioGroup
              name="sells_gas_cylinders"
              staticLabel="11. Actualmente ¿Vende balones de gas?"
              required
              options={YES_NO_OPTIONS}
              radioGroupName="balones"
            />
          </div>
          <div className="col-span-2">
            <Input
              name="brands_sold"
              staticLabel="12. ¿Qué marcas vende?"
              required
              placeholder="Escriba aqui..."
            />
          </div>
          <div className="col-span-2">
            <Input
              name="selling_time"
              staticLabel="13. ¿Cuánto tiempo lleva vendiendo balones de gas?"
              required
              placeholder="Escriba aqui..."
            />
          </div>
          <div className="col-span-2">
            <Input
              name="monthly_sales"
              staticLabel="14. ¿Cuantós balones de gas vende al mes?"
              required
              placeholder="Escriba aqui..."
              onlyNumbers={true}
            />
          </div>
          <div className="col-span-2">
            <RadioGroup
              name="accepts_data_policy"
              staticLabel={
                <Text
                  className="text-primary-blue md:text-[17px] text-sm mb-3 leading-normal flex"
                  font="bold"
                >
                  <span className="inline-block h-full">15.</span>
                  <div className="inline-block pl-1 lg:w-[62%]">
                    <span>
                      POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES PARA
                      CANDIDATOS A DISTRIBUIDORES Y DISTRIBUIDORES
                    </span>
                    <span className="text-primary-orange ml-1">*</span>
                  </div>
                </Text>
              }
              description={
                <p>
                  &quot;Acepto haber sido informado por medio de la Política de
                  Tratamiento de Datos Personales para Candidatos a
                  Distribuidores y Distribuidores, ubicada en{" "}
                  <Link
                    href="https://www.solgas.com.pe/pdf/politicas.pdf"
                    target="_blank"
                  >
                    https://www.solgas.com.pe/pdf/politicas
                  </Link>
                  , acerca del tratamiento de los datos proporcionados a través
                  del presente formulario.&quot;
                </p>
              }
              options={YES_NO_OPTIONS}
              radioGroupName="policy"
              withBg={true}
            />
          </div>
        </div>
        <Button
          type="submit"
          height="50px"
          bg={"primary"}
          border={"primary"}
          color={"white"}
          className="lg:text-base md:text-xs text-[10px] font-clan-pro-bold lg:w-[180px] w-[120px] md:h-[50px] h-[25px] mt-8 md:ml-8 ml-4"
          isLoading={isSubmitting}
        >
          {button_text}
        </Button>
      </FormProvider>
    </Scrollbars>
  );
}
