import { useEffect, useState } from "react";
import FormComponent from "../Components/Form";
import { useParams } from "react-router";
import useGetProduct from "../Hooks/useGetProduct";

export default function EditProductPage() {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setEditMode(true);
  }, []);


  const param = useParams();
  const {data} = useGetProduct(param.id as string);

  return (
    <div className="text-2xl my-8 flex flex-col items-center">
      <h1 className="text-3xl mb-2">Edit Product</h1>
      <FormComponent editMode={editMode} editProduct={data}/>
    </div>
  );
}
