"use client";
import { getItemByList, getListById } from "@/utils/data";
import { useState, useEffect } from "react";

const Page = ({ params: { id } }) => {
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const { data: titles } = await getItemByList(id);
      setItems(titles);
      const { data } = await getListById(id);
      setListName(data[0].title);
    };
    fetchItems();
  }, [id]);

  return (
    <section className={"mx-auto max-w-7xl px-4 py-5 "}>
      <h2 className="my-10 h1 text-4xl text-center font-extrabold">
        View List
      </h2>

      <br />
      <br />
      <br />

      <div className="w-full max-w-screen-xl mx-auto px-6">
        <div className="flex justify-center p-4 px-3 py-10">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md border-2 border-black rounded-lg px-3 py-2 mb-4">
              <div className="block text-gray-700 text-2xl font-semibold py-2 px-2">
                {listName}
              </div>
              <div className="flex items-center bg-gray-200 rounded-md">
                <div className="pl-2"></div>
              </div>
              <div className="py-3 text-sm divide-y-2">
                {items.map(({ title, order, status, id: itemId }) => {
                  return (
                    <div
                      key={itemId}
                      className="flex justify-start  text-gray-700  rounded-md px-2 py-2 my-2 "
                    >
                      {status === false ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="fill-red-500"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className=" flex justify-start w-6 h-6 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}{" "}
                      <div className="flex-grow text-base font-medium text-gray-500 px-2">
                        {title}
                      </div>
                      <div className="text-sm font-normal text-gray-500 tracking-wide ">
                        {" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
