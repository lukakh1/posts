import { defineField, defineType } from "sanity";

export const camera = defineType({
  name: "camera",
  title: "Camera Product",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title.default",
      },
    }),
    defineField({
      name: "title",
      type: "experimentString",
    }),
    defineField({
      name: "price",
      type: "number",
    }),
    defineField({
      name: "image",
      type: "experimentImage",
    }),
    defineField({
      name: "description",
      type: "experimentString",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "object",
      fields: [
        { name: "megapixels", title: "Megapixels", type: "string" },
        { name: "sensor", title: "Sensor Type", type: "string" },
        { name: "iso", title: "ISO Range", type: "string" },
        { name: "videoResolution", title: "Video Resolution", type: "string" },
        { name: "battery", title: "Battery Life", type: "string" },
        { name: "weight", title: "Weight", type: "string" },
        { name: "connectivity", title: "Connectivity", type: "string" },
      ],
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "inStock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "DSLR", value: "dslr" },
          { title: "Mirrorless", value: "mirrorless" },
          { title: "Point & Shoot", value: "pointshoot" },
          { title: "Action Camera", value: "action" },
          { title: "Instant Camera", value: "instant" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title.default",
      subtitle: "category",
      media: "image.default",
    },
  },
});
