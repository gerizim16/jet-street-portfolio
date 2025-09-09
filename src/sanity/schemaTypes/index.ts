import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    defineType({
      fields: [
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
          name: "titleColor",
          options: { colorList: ["#fff", "#000"], disableAlpha: true },
          type: "color",
        }),
        defineField({
          name: "image",
          type: "image",
        }),
      ],
      name: "home",
      type: "document",
    }),
    defineType({
      fields: [
        defineField({
          name: "images",
          of: [
            {
              name: "image",
              type: "image",
            },
          ],
          options: {
            layout: "grid",
          },
          type: "array",
        }),
      ],
      name: "portfolio",
      type: "document",
    }),
    defineType({
      fields: [
        defineField({
          name: "images",
          of: [
            {
              name: "image",
              type: "image",
            },
          ],
          options: {
            layout: "grid",
          },
          type: "array",
        }),
      ],
      name: "portrait-portfolio",
      type: "document",
    }),
    defineType({
      fields: [
        defineField({
          name: "content",
          of: [{ type: "block" }],
          title: "content",
          type: "array",
        }),
        defineField({
          name: "image",
          type: "image",
        }),
      ],
      name: "about",
      type: "document",
    }),
  ],
};
