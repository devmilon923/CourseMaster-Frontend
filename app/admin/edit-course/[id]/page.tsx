"use client";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Upload,
  Form,
  InputNumber,
  message,
  Select,
} from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useParams, useRouter } from "next/navigation";
import {
  useCourseAdminDetailsQuery,
  useEditCourseMutation,
} from "@/app/redux/api/call/courseApi";

const { TextArea } = Input;
const { Option } = Select;

export default function EditCoursePage() {
  const { id } = useParams();
  const [form] = Form.useForm(); // 1) create form instance
  const [fileList, setFileList] = useState<any[]>([]);
  const { data, isLoading: getCourseLoading } = useCourseAdminDetailsQuery({
    id,
  });
  const [editCourse, { isLoading }] = useEditCourseMutation();
  const route = useRouter();
  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  // 2) when data is loaded, set form values
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        name: data.data.name,
        price: data.data.price,
        instructor: data.data.instructor,
        description: data.data.description,
        category: data.data.category,
      });

      // optional: show existing image name in Upload list
      if (data.data.image) {
        setFileList([
          {
            uid: "-1",
            name: data.data.image,
            status: "done",
            url: imageBase + data.data.image, // or full URL if you have base path
          },
        ]);
      }
    }
  }, [data, form]);

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    maxCount: 1,
    accept: "image/*",
    fileList,
    onChange(info) {
      setFileList(info.fileList.slice(-1));
    },
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("instructor", values.instructor);
    formData.append("description", values.description);
    formData.append("category", values.category);

    // image is optional on edit
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const res: any = await editCourse({ id, body: formData });
      if (res?.data?.success) {
        message.success("Course updated");
        route.push("/admin");
      } else {
        message.error(res?.error?.data?.message || "Failed to update");
      }
    } catch {
      message.error("Unknown error");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Course
        </h1>

        {/* optionally show loading state */}
        {getCourseLoading ? (
          <p>Loading course...</p>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
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
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select category">
                <Option value="Web Development">Web Development</Option>
                <Option value="Graphic Design & Illustration">
                  Graphic Design & Illustration
                </Option>
                <Option value="Marketing & Sales">Marketing & Sales</Option>
                <Option value="Communication Skills">
                  Communication Skills
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="Course Thumbnail">
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload image</Button>
              </Upload>
              <p className="mt-1 text-xs text-gray-500">
                Upload a new image to replace the existing thumbnail.
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
                Update Course
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
