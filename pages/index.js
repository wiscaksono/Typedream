import Head from "next/head";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { RxCalendar } from "react-icons/rx";
import { toast } from "react-toastify";

import SlateEditor from "@/components/Slate";

export default function Home() {
  const initialValue = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: "bold", bold: true },
        {
          text: ", or add a semantically rendered block quote in the middle of the page, like this:",
        },
      ],
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }],
    },
    {
      type: "paragraph",
      align: "center",
      children: [{ text: "Try it out for yourself!" }],
    },
  ];

  return (
    <>
      <Head>
        <title>Typedream | Take Home Project</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Take Home Project" />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, Next.Js, React.Js, SlateJs"
        />
        <meta name="author" content="Wisnu Wicaksono" />
      </Head>
      <div className="bg-primary h-screen overflow-hidden flex">
        <Content data={initialValue} />
      </div>
    </>
  );
}

const Content = ({ data }) => {
  const handleSave = async () => {
    try {
      toast.success("Successfully saved");
    } catch (err) {
      toast.error("Error");
      console.log(err);
    }
  };

  return (
    <section className="space-y-[30px] w-full p-[50px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-semibold text-white">Typedream</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={handleSave}
            className="hover:bg-[#333333] bg-[#232323] transition-colors px-5 py-2 rounded-3 font-semibold text-white flex items-center gap-2"
          >
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
        <p className="text-white">23/01/2023</p>
      </div>
      <SlateEditor data={data} />
    </section>
  );
};

const PopoverButton = () => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleDelete = async () => {
    try {
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
