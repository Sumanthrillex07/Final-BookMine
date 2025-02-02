import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";
const userOrderHistory = () => {
  const [order, setOrder] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-order-hist",
        { headers }
      );
      setOrder(res.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!order && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {order && order.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No order history
            </h1>
          </div>
        </div>
      )}
      {order && order.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Order History
          </h1>
          <div className="mt-4 bg-zinc-700 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Book Id</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {order.map((items, i) => (
            <div className="bg-zinc-500 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-600 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-400"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className=""> {items.book.bookId}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-yellow-500">
                  {items.status === "Ordered" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Book Issued" ? (
                    <div className="text-green-500">{items.status}</div>
                  ) : items.status === "Book Returned" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">LIB Card</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default userOrderHistory;
