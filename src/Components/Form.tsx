import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm, ProductsSchemaModel } from "../Schema/ProductSchemaForm";
import useAddProduct from "../Hooks/useAddProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Notification from "./Notification";
import { useNavigate } from "react-router";
import useEditProduct from "../Hooks/useEditProduct";
import { ProductsModel } from "../Model/ProductsModel";
import NotificationEdit from "./NotificationEidt";

type props = { editMode?: boolean; editProduct?: ProductsModel };

export default function FormComponent({ editMode, editProduct }: props) {
  const [notification, setNotification] = useState(false);
  const { mutate } = useAddProduct();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductsSchemaModel>({
    defaultValues: {
      name: "",
      description: "",
      qyt: 0,
      price: 0,
      available: false,
    },
    resolver: zodResolver(productForm),
  });

  //----edit
  const [notificationEdit, setNotificationEdit] = useState(false);
  const { mutate: mutateEdit } = useEditProduct();

  if (editMode) {
    if (editProduct) {
      setValue("name", editProduct.name);
      setValue("description", editProduct.description);
      setValue("qyt", editProduct.qyt);
      setValue("price", editProduct.price);
      setValue("available", editProduct.available);
    }
  }

  //----submit
  const onSubmit: SubmitHandler<ProductsSchemaModel> = (data) => {
    if (!editMode) {
      //----add
      mutate(data, {
        onSuccess: () => {
          reset();
          setNotification(true);
          qc.invalidateQueries({ queryKey: ["products"] });
          setTimeout(() => {
            navigate("/products");
            setNotification(false);
          }, 2000);
        },
      });
    } else {
      //----edit

      mutateEdit(
        { id: editProduct?.id?.toString()!, ProductEdited: data },
        {
          onSuccess: () => {
            reset();
            qc.invalidateQueries({ queryKey: ["products"] });
            setNotificationEdit(true);
            setTimeout(() => {
              setNotificationEdit(false);
              navigate(`/products/${editProduct?.id}`);
            }, 2000);
          },
        }
      );
    }
  };

  return (
    <>
      {notificationEdit && <NotificationEdit />}
      {notification && <Notification />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border rounded-2xl p-4 max-w-96 items-center justify-center "
      >
        <label className="flex flex-col items-start gap-2 relative">
          Name :
          <input
            type="text"
            className="border rounded-2xl bg-white/20 pl-4"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-8 right-0">
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Description :
          <textarea
            rows={4}
            className="border w-full rounded-2xl bg-white/20 pl-4"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-8 right-0">
              {errors.description.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Qyt :
          <input
            type="number"
            className="border rounded-2xl bg-white/20 pl-4"
            {...register("qyt")}
          />
          {errors.qyt && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-8 right-0">
              {errors.qyt.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Price :
          <input
            type="number"
            className="border rounded-2xl bg-white/20 pl-4"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-8 right-0">
              {errors.price.message}
            </span>
          )}
        </label>
        <label className="flex  justify-center items-center gap-3">
          Available :
          <input
            type="checkbox"
            className="border rounded-2xl bg-white/20"
            {...register("available")}
          />
        </label>
        <button
          className={`${
            editMode
              ? "bg-orange-500 hover:bg-orange-700"
              : "bg-green-500 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded cursor-pointer`}
        >
          {editMode ? "Edit Product" : "Add Product"}
        </button>
        {editMode && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        )}
      </form>
    </>
  );
}
