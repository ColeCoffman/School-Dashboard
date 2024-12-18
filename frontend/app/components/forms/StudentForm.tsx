"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

// Define the schema for form validation using Zod
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  bloodType: z.string().min(1, "Blood type is required"),
  address: z.string().min(1, "Address is required"),
  birthDate: z.date({ message: "Invalid birth date" }),
  sex: z.enum(["male", "female"], { message: "Invalid sex" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

export default function StudentForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  // Initialize the form with react-hook-form and zodResolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Add Student</h1>
      <span className="text-xs text-gray-500 font-medium">Authentication</span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Input fields for authentication details */}
        <InputField
          label="Username"
          name="username"
          register={register}
          defaultValue={data?.username}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          defaultValue={data?.email}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          register={register}
          defaultValue={data?.password}
          error={errors.password}
          type="password"
        />
      </div>
      <span className="text-xs text-gray-500 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Input fields for personal information */}
        <InputField
          label="First Name"
          name="firstName"
          register={register}
          defaultValue={data?.firstName}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          defaultValue={data?.lastName}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          register={register}
          defaultValue={data?.phone}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          register={register}
          defaultValue={data?.address}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          register={register}
          defaultValue={data?.bloodType}
          error={errors.bloodType}
        />
        <InputField
          label="Birth Date"
          name="birthDate"
          register={register}
          defaultValue={data?.birthDate}
          error={errors.birthDate}
          type="date"
        />
        {/* Dropdown for selecting sex */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs font-medium text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <span className="text-xs text-red-500 font-medium">
              {errors?.sex.message.toString()}
            </span>
          )}
        </div>
        {/* File input for uploading an image */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center items-centers">
          <label
            className="text-xs font-medium text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image
              src="/upload.png"
              alt="Upload Image"
              width={28}
              height={28}
            />
            <span>Upload Image</span>
          </label>
          <input type="file" {...register("img")} id="img" className="hidden" />
          {errors.img?.message && (
            <span className="text-xs text-red-500 font-medium">
              {errors?.img.message.toString()}
            </span>
          )}
        </div>
      </div>
      {/* Submit button */}
      <button className="bg-blue-400 text-white py-2 px-4 rounded-md border-none w-max self-center">
        {type === "create" ? "Add" : "Update"}
      </button>
    </form>
  );
}
