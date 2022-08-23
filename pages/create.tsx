import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { trpc } from "utils/trpc";
import { QuestionInputType, questionValidator } from "validation/question";

const Create: NextPage = () => {
  const client = trpc.useContext();
  const router = useRouter();
  const { mutate, isLoading, data } = trpc.useMutation("questions.create", {
    onSuccess(data) {
      console.log("Success: ", data);
      client.invalidateQueries(["questions.getAll"]);
      router.push(`/poll/${data.id}`)
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuestionInputType>({
    resolver: zodResolver(questionValidator),
    defaultValues: {
      options: [
        { name: "" },
        { name: "" }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray<QuestionInputType>({
    name: "options",
    control
  })

  if (isLoading || data) {
    return <div className="flex flex-col p-10 items-start space-y-4">
      Loading...
    </div>
  }

  return <div className="flex flex-col p-10 items-start space-y-4">
    <Head>
      <title>Polly | Create</title>
    </Head>
    <div className="text-3xl md:text-4xl font-bold">
      Create a new poll
    </div>
    <form className="w-full space-y-3" onSubmit={handleSubmit((data) => mutate(data))}>
      <div>
        <div className="text-gray-500">Question</div>
        <input
          {...register("title")}
          type="text"
          placeholder="Enter the question"
          className="w-full p-2 border-2 rounded-md text-2xl" />
        {errors.title && <div className="text-red-600">
          {errors.title.message}
        </div>}
      </div>
      <div className="text-gray-500">Options</div>
      {
        fields.map((field, index) => {
          return <div key={field.id}>
            <div className="flex space-x-2">
              <input
                {...register(`options.${index}.name`, { required: true })}
                className="p-2 flex-1 border-2 rounded-md"
                placeholder={`Option ${index + 1}`} />
              <button
                className="p-2 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                onClick={(e) => {
                  remove(index)
                }}>
                Delete
              </button>
            </div>
            {errors.options?.[index]?.name?.message && <div className="text-red-600">
              {errors.options?.[index]?.name?.message}
            </div>}
          </div>
        })
      }
      <div className="flex flex-row items-center justify-between">
        <button
          className="p-2 bg-blue-200 hover:bg-blue-300 text-blue-600 rounded-md"
          onClick={(e) => {
            e.preventDefault()
            append({ name: "" })
          }}>
          Add new option
        </button>
        <button
          className="p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md" type="submit">
          Submit
        </button>
      </div>
      {errors.options?.message && <div className="text-red-600">
        {errors.options?.message}
      </div>}
    </form>
  </div>
};

export default Create;