"use client";
import { addList, getCurrentUser } from "@/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateList = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const addNewList = async (e) => {
    e.preventDefault();
    const { data } = await getCurrentUser();

    const addedList = await addList(title, data.id);
    if (addedList.success == false) {
      return;
    }

    setTitle("");

    router.replace(`user/${data.id}/list/${addedList.data[0].id}/edit`);
  };

  return (
    <section className={"mx-auto max-w-7xl px-4 py-5 "}>
      <h2 className="my-10 h1 text-4xl text-center font-extrabold">
        Create List
      </h2>

      <br />
      <br />
      <br />
      <div className="flex h-500x justify-center items-center">
        <div className="text-center ">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 border-2 border-black scale-125">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  List Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  placeholder="title"
                  value={title}
                  onChange={titleHandler}
                ></input>
              </div>

              <div className="flex items-center justify-between">
                <a
                  className="relative inline-flex items-center justify-center p-4 px-20 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-4 border-green-500  shadow-md group"
                  onClick={addNewList}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/4000/svg"
                    >
                      <path
                        strokeWidth="2"
                        d="                                        M5 13l4 4L19 7
"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full  text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Create{" "}
                  </span>
                  <span className="relative invisible">Create</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateList;
