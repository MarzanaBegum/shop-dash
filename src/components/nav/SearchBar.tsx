"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: { searchTerm: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );
    console.log(url);
    router.push(url);
    reset();
  };
  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Explore E~shop"
        autoComplete="off"
        className="w-80 border border-gray-300 p-2 rounded-l-md focus:border-[0.5px] focus:outline-none focus:border-slate-500"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="text-white bg-slate-700 p-2 hover:opacity-80 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
