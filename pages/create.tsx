import { NextPage } from "next";
import { useRef } from "react";
import { trpc } from "utils/trpc";

const Create: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess(data) {
      console.log("Success: ", data);
      client.invalidateQueries(["questions.getAll"]);
      if (inputRef.current)
        inputRef.current.value = ""
    },
  })

  return <div className="flex flex-col p-10 items-start space-y-4">
    <div className="text-3xl md:text-4xl font-bold">
      Create a new poll
    </div>
    <form className="w-full flex space-x-3" onSubmit={(event) => {
      event.preventDefault()
      if (inputRef.current)
        mutate({ title: inputRef.current.value, options: [] })
    }}>
      <input ref={inputRef} placeholder="Enter the question" className="p-2 border-2 rounded-md w-full" />
      <button className="bg-blue-600 text-white p-2 rounded-md" type="submit">Submit</button>
    </form>
  </div>
};

export default Create;