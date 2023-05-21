"use client";
import {
  addItem,
  getItemByList,
  deleteItem,
  updateItem,
  getListById,
  updateOrder
} from "@/utils/data";
import { useState, useEffect } from "react";

const Page = ({ params: { id } }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
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

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const addNewItem = async (e) => {
    e.preventDefault();

    const list_id = id;
    const order = items.length + 1;
    const addedLink = await addItem(title, order, status, list_id);

    if (addedLink.success == false) {
      //handle error
      return;
    }
    const { data: titles } = await getItemByList(id);
    setItems(titles);
    setTitle("");

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const deleteOneItem = async (itemId) => {
    await deleteItem(itemId);

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const updateOneItem = async (itemId, status) => {
    await updateItem(itemId, status);

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const updateOneItemOrder = async (itemId, current, destination, lid) => {
    // await supabase.rpc('changeOrder', { itemId : itemId, current : current, destination:destination, list_id : list_id })
    await updateOrder(itemId, current, destination, lid);

   

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };
  return (
    <section className={"mx-auto max-w-7xl px-4 py-5 "}>
      <h2 className="my-10 h1 text-4xl text-center font-extrabold">
        Edit List
      </h2>

      <br />
      <br />
      <br />

      <div className="w-full max-w-screen-xl  mx-auto px-6">
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
                      <button
                        className="bg-slate-500 hover:bg-slate-600 text-white font-bold  rounded h-10 px-4 m-2"
                        onClick={() => updateOneItem(itemId, !status)}
                      >
                        Change Status
                      </button>
                      {order === 1 ? (
                      <><button
                                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold  rounded h-10 px-4 m-2"
                                  onClick={() => updateOneItemOrder(itemId, order, items.length, id)}
                              >
                                  Lower Priority                      </button><button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 px-4 m-2 rounded"
                                      onClick={() => deleteOneItem(itemId)}
                                  >
                                      delete
                                  </button></>
                      ):(  <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 px-4 m-2 rounded"
                        onClick={() => deleteOneItem(itemId)}
                      >
                        delete
                      </button>)}
                    </div>
                  );
                })}
              </div>
              <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="New Task"
                  placeholder="New Task"
                  value={title}
                  onChange={titleHandler}
                ></input>
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addNewItem}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
