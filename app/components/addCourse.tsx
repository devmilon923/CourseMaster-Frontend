"use client";
import React, { useState } from "react";
import { Input, Button, Upload, Form, InputNumber, message } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddCourseMutation } from "../redux/api/call/courseApi";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

export default function CreateCoursePage() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      // allow only images
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files");
        return Upload.LIST_IGNORE;
      }
      // prevent auto-upload, keep file in state only
      return false;
    },
    maxCount: 1, // only one file
    accept: "image/*", // open dialog for images only
    fileList,
    onChange(info) {
      setFileList(info.fileList.slice(-1)); // extra safety, keep last only
    },
  };
  const route = useRouter();
  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("instructor", values.instructor);
    formData.append("description", values.description);
    formData.append("category", values.category);

    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }
    try {
      const add: any = await addCourse(formData);
      //  add.error.data.message
      if (add?.data?.success) {
        message.success("New course added");
        return route.push("/admin");
      } else {
        return message.error(add?.error?.data?.message);
      }
    } catch (error) {
      message.error("Unknown error");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Create New Course
        </h1>

        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: "Please enter course name" }]}
          >
            <Input placeholder="Build your house with civil" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber className="w-full" min={0} placeholder="300" />
          </Form.Item>

          <Form.Item
            label="Instructor"
            name="instructor"
            rules={[
              { required: true, message: "Please enter instructor name" },
            ]}
          >
            <Input placeholder="Jamal Mia" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Nothing to say" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Web Development" />
          </Form.Item>

          <Form.Item label="Course Thumbnail" required>
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload image</Button>
            </Upload>
            <p className="mt-1 text-xs text-gray-500">
              Only one image file will be uploaded for the{" "}
              <strong>image</strong> field.
            </p>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
              className="mt-2 bg-black! hover:bg-slate-950!"
              block
            >
              Create Course
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
