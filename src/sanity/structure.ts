import type { StructureResolver } from "sanity/structure";

const singletonTypes = ["home", "portfolio", "about"];

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !singletonTypes.includes(item.getId()!),
      ),
      ...S.documentTypeListItems()
        .filter(
          (item) => item.getId() && singletonTypes.includes(item.getId()!),
        )
        .map((item) =>
          item.child(
            S.editor()
              .title(item.getTitle() ?? item.getId()!)
              .id(item.getId()!)
              .schemaType(item.getId()!)
              .documentId(item.getId()!),
          ),
        ),
    ]);
