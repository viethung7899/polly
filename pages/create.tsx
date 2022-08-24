import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "styles/button.module.css";
import { MAX_OPTIONS } from "utils/constants";
import { trpc } from "utils/trpc";
import { QuestionInputType, questionValidator } from "validation/question";

const Create: NextPage = () => {
  const client = trpc.useContext();
  const router = useRouter();
  const { mutate, isLoading, data } = trpc.useMutation("questions.create", {
    onSuccess(data) {
      client.invalidateQueries(["questions.getAll"]);
      router.push(`/poll/${data.id}`)
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isValid },

  } = useForm<QuestionInputType>({
    mode: "onChange",
    reValidateMode: "onChange",
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
    <Link href="/">
      <button className={`${styles.button} border-2 border-blue-600 text-blue-600 hover:enabled:bg-blue-200`}>Back</button>
    </Link>
    <div className="text-3xl md:text-4xl font-bold">
      Create a new poll
    </div>
    <form className="w-full space-y-3" onSubmit={handleSubmit((data) => mutate(data))}>
      <div>
        <div className="text-gray-500">Question</div>
        <input
          {...register("title")}
          type="text"
          placeholder="Enter the question..."
          className={`${styles.input} text-2xl`}
          autoComplete="off" />
        {errors.title && dirtyFields.title && <div className="text-red-600">
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
                autoComplete="off"
                className={`${styles.input}`}
                placeholder={`Option ${index + 1}`} />
              <button
                className={`${styles.button} bg-red-200 text-red-600 hover:enabled:bg-red-300`}
                onClick={() => remove(index)}
                disabled={fields.length <= 2}
              >
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
          className={`${styles.button} bg-blue-200 hover:bg-blue-300 text-blue-600`}
          onClick={(e) => {
            e.preventDefault()
            append({ name: "" })
          }}
          disabled={fields.length >= MAX_OPTIONS}
        >
          Add new option
        </button>
        <button
          className={`${styles.button} text-white bg-blue-600 hover:bg-blue-800`} type="submit"
          disabled={!isValid}
        >
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