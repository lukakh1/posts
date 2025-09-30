import { defineQuery } from "next-sanity";

export const CAMERA_PRODUCT_QUERY = defineQuery(`
  *[_type == "camera" && slug.current == $slug][0]{
    "title": coalesce(
      title.variants[experimentId == $titleExperiment && variantId == $titleVariant][0].value,
      title.default
    ),
    "image": coalesce(
      image.variants[experimentId == $imageExperiment && variantId == $imageVariant][0].value,
      image.default
    ),
    slug,
    "description": coalesce(
      description.variants[experimentId == $descriptionExperiment && variantId == $descriptionVariant][0].value,
      description.default
    ),
    specs,
    features,
    inStock,
    category,
    price

  }
`);
