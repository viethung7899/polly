import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import buttonStyles from "styles/button.module.css";
import containerStyles from "styles/container.module.css";
import { MAX_OPTIONS, presetDurations } from "utils/constants";
import { trpc } from "utils/trpc";
import { QuestionInputType, questionValidator } from "validation/question";
import {FaPlus, FaTrash} from "react-icons/fa";

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
  });

  const borderError = (error?: boolean) => {
    if (error)
      return "border-red-600"
    return "border-white"
  };

  if (isLoading || data) {
    return <div className="flex flex-col p-10 items-start space-y-4">
      Loading...
    </div>
  }

  return <div className={`${containerStyles.container}`}>
    <Head>
      <title>Polly | New Poll</title>
    </Head>
    <div className="text-3xl md:text-4xl font-bold">
      New poll
    </div>
    <form className="w-full space-y-3" onSubmit={handleSubmit((data => mutate(data)))}>
      {/* Question title */}
      <div className="text-2xl mb-2">Question</div>
      <input
        {...register("title")}
        type="text"
        placeholder="Enter the question..."
        className={`${buttonStyles.input} text-2xl ${borderError(!!errors.title)}`}
        autoComplete="off" />
      {errors.title && dirtyFields.title && <div className="text-red-600">
        {errors.title.message}
      </div>}
      <hr />
      {/* Options */}
      <div className="flex items-center justify-between">
        <div className="text-2xl">Options</div>
        <button
          className={`${buttonStyles.button} border-2 border-green-600 text-green-600 hover:enabled:bg-green-600 hover:enabled:bg-opacity-20 flex items-center space-x-2`}
          onClick={(e) => {
            e.preventDefault()
            append({ name: "" })
          }}
          disabled={fields.length >= MAX_OPTIONS}
        >
          <FaPlus /><span>Add</span>
        </button>
      </div>
      {
        fields.map((field, index) => {
          const errorMessage = errors.options?.[index]?.name?.message;
          return <div key={field.id}>
            <div className="flex space-x-2">
              <input
                {...register(`options.${index}.name`, { required: true })}
                autoComplete="off"
                className={`${buttonStyles.input} ${borderError(!!errorMessage)}`}
                placeholder={`Option ${index + 1}`} />
              <button
                className={`${buttonStyles.button} border-2 border-red-600 text-red-600 hover:enabled:bg-red-600 hover:enabled:bg-opacity-20`}
                onClick={() => remove(index)}
                disabled={fields.length <= 2}
              >
                <FaTrash />
              </button>
            </div>
            {errorMessage && <div className="text-red-600">
              {errorMessage}
            </div>}
          </div>
        })
      }
      <hr />
      {/* Expired time */}
      <div className="flex flex-col sm:flex-row w-full sm:items-center sm:space-x-4 sm:justify-between">
        <div className="text-2xl mb-2 sm:mb-0">Duration</div>
        <select className={`${buttonStyles.input}`} {...register("duration", {
          valueAsNumber: true
        })}>
          {presetDurations.map((duration, index) => <option key={index} value={duration.value}>{duration.label}</option>)}
        </select>
      </div>
      <hr />
      <div className="flex gap-x-2 justify-end">
        <Link href="/">
          <button className={`${buttonStyles.button} border-2 border-red-600 text-red-600 hover:enabled:bg-red-600 hover:enabled:bg-opacity-20`}>Cancel</button>
        </Link>
        <button
          className={`${buttonStyles.button} border-2 border-blue-600 text-blue-600 hover:enabled:bg-blue-600 hover:enabled:bg-opacity-20`}
          type="submit"
          disabled={!isValid}
        >
          Create
        </button>
      </div>
    </form>
  </div>
};

export default Create;