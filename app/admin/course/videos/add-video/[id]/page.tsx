"use client";

import React from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import {
  useAddVideoMutation,
  useCreateModuleMutation,
} from "@/app/redux/api/call/courseApi";
import { useParams } from "next/navigation";

const { TextArea } = Input;

export default function AddVideoPage() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [addVideo, { isLoading }] = useAddVideoMutation();
  const onFinish = async (values: any) => {
    const body = {
      name: values.name,
      orderBy: values.orderBy,
      description: values.description,
      videoLink: values.videoLink,
    };

    try {
      const result: any = await addVideo({ id, body });
      if (result?.data?.success) {
        message.success("New video added");
        form.resetFields();
        return;
      } else {
        return message.error(result?.error?.data?.message);
      }
    } catch (e) {
      message.error("Failed to add video");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Video</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* name */}
          <Form.Item
            label="Video Name"
            name="name"
            rules={[{ required: true, message: "Please enter video name" }]}
          >
            <Input placeholder="Orientation" />
          </Form.Item>

          {/* orderBy */}
          <Form.Item
            label="Order"
            name="orderBy"
            rules={[{ required: true, message: "Please enter order number" }]}
          >
            <InputNumber className="w-full" min={1} placeholder={"1"} />
          </Form.Item>

          {/* description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter module description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="This is an normal module description"
            />
          </Form.Item>
          {/* Link */}
          <Form.Item
            label="Video Link"
            name="videoLink"
            rules={[{ required: true, message: "Please enter video link" }]}
          >
            <Input placeholder="Add youtube video link" />
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
              Add Video
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
