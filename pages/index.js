import { Popover, Transition, Dialog } from "@headlessui/react";
import { useState, Fragment, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegSave, FaSearch } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { toast } from "react-toastify";

import api from "@/services/api";

import SlateEditor from "@/components/Slate";

export default function Home({ items }) {
  const [content, setContent] = useState(items[0]);

  return (
    <>
      <div className="bg-primary h-screen overflow-hidden flex">
        <Aside items={items} content={content} setContent={setContent} />
        <Content data={content} />
      </div>
    </>
  );
}

const Content = ({ data }) => {
  return (
    <section className="space-y-[30px] w-full p-[50px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-semibold text-white">{data.title}</h1>
        <div className="flex items-center gap-5">
          <button className="hover:bg-[#333333] bg-[#232323] transition-colors px-5 py-2 rounded-3 font-semibold text-white flex items-center gap-2">
            <FaRegSave />
            Save
          </button>
          <PopoverButton data={data} />
        </div>
      </div>

      <div className="text-white/40 text-sm font-semibold flex items-center gap-5 mb-[15px]">
        <div className="flex items-center gap-2">
          <RxCalendar className="text-lg" />
          <p>Date</p>
        </div>
        <p className="text-white">
          {new Date(data.created).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <SlateEditor data={data.description} />
    </section>
  );
};

const PopoverButton = (data) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const cancelButtonRef = useRef(null);
  const { id } = data.data;

  const handleDelete = async () => {
    try {
      await api.remove(`/notes/records/${id}`);
      toast.success("Successfully deleted");
      setOpenModalDelete(false);
    } catch (error) {
      toast.error("Erorr");
    }
  };

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${
                open
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              } hover:text-white w-[30px] h-[30px] border-2  hover:border-white transition-colors rounded-full flex items-center justify-center`}
            >
              <BsThreeDots />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel className="bg-seconday p-5 rounded-3 transform absolute right-0 z-10 mt-3 w-[200px] space-y-2.5">
                <button className="hover:bg-[#323232] bg-[#232323] transition-colors w-full flex items-center gap-2.5 p-2 rounded-3 text-white">
                  <HiOutlineArchiveBox />
                  <span className="font-semibold">Archive</span>
                </button>
                <button
                  onClick={() => setOpenModalDelete(true)}
                  className="hover:bg-[#323232] bg-[#232323] transition-colors w-full flex items-center gap-2.5 p-2 rounded-3 text-white hover:text-red-500"
                >
                  <HiOutlineTrash />
                  <span className="font-semibold">Delete</span>
                </button>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <Transition.Root show={openModalDelete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpenModalDelete(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary/50  transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#333333] px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                      <HiOutlineTrash
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-white/60">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed from our
                          servers forever. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:ml-10 sm:flex sm:pl-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm transition-colors"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenModalDelete(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const Aside = ({ items, content, setContent }) => {
  const handleButton = (item) => {
    setContent(items.filter((x) => x.id === item.id)[0]);
  };

  const AsideButton = ({ item }) => {
    return (
      <button
        onClick={() => handleButton(item)}
        className={`${
          item.id === content.id ? "bg-white/10" : "bg-white/[3%]"
        } transition-colors p-5 rounded-3 text-left hover:bg-white/10`}
      >
        <h3 className="font-semibold text-lg text-white truncate">
          {item.title}
        </h3>

        <div className="flex gap-2.5">
          <span className="text-white/40">
            {new Date(item.created).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <p className="truncate text-white/60">
            {item.description.match(/^(\S+\s){5}\S+/)}
          </p>
        </div>
      </button>
    );
  };

  return (
    <aside className="h-full w-[350px] bg-seconday py-[30px] px-5">
      <div className="flex items-center justify-between mb-[30px]">
        <h3 className="font-bold text-white text-2xl font-kaushan">Nowted</h3>
        <button>
          <FaSearch className="text-white/40 text-lg" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <button
          className="flex items-center justify-center text-white font-semibold py-2.5 w-full rounded-3 bg-white/[3%] hover:bg-white/10 transition-colors gap-2"
          onClick={() =>
            setContent({
              title: "New note",
              created: new Date().toISOString().replace("T", " "),
              description: "Write something nice!",
            })
          }
        >
          <HiPlus />
          <span>New Note</span>
        </button>
        {items.map((item) => (
          <AsideButton item={item} key={item.id} />
        ))}
      </div>
    </aside>
  );
};

export async function getServerSideProps() {
  const { items } = await api.get("/notes/records");
  return {
    props: {
      items,
    },
  };
}
