import { useNavigate } from "react-router";
import useDeleteProduct from "../Hooks/useDeleteProduct";
import NotificationDel from "./NotificationDel";
import { useState } from "react";

export default function ModalDelete({
  setDelModal,
  id,
}: {
  setDelModal: (bol: boolean) => void;
  id: number | undefined;
}) {
  const [notifyModal, setNotifyModal] = useState(false);

  const { mutate } = useDeleteProduct();
  const navigate = useNavigate();

  return (
    <>
      {notifyModal && <NotificationDel />}
      <div className="w-full min-h-96 flex flex-col gap-4 items-center justify-center bg-black/50">
        <h1>Do you want to delete?</h1>
        <div className="flex gap-4">
          <button
            className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-2xl cursor-pointer"
            onClick={() =>
              mutate(id!.toString(), {
                onSuccess: () => {
                  setNotifyModal(true);
                  setTimeout(() => {
                    setNotifyModal(false);
                    navigate("/products");
                    setDelModal(false);
                  }, 2000);
                },
              })
            }
          >
            yes
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-2xl cursor-pointer"
            onClick={() => setDelModal(false)}
          >
            no
          </button>
        </div>
      </div>
    </>
  );
}
