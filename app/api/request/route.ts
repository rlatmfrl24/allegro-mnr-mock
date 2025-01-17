import { createClient } from "@/util/supabase/server";
import { DamageRequestImageProps, DamageRequestProps } from "@/util/typeDefs";
import { NextRequest } from "next/server";

function base64toFile(base64: string, filename: string) {
  const arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  const fileExtension = mime.split("/")[1];

  return new File([u8arr], filename + "." + fileExtension, { type: mime });
}

export async function GET(request: NextRequest) {
  console.log(request.body);

  const supabase = await createClient();
  const { data, error } = await supabase.from("damage_requests").select();

  if (error) {
    return new Response("Failed to fetch data", { status: 500 });
  } else {
    return new Response(JSON.stringify(data), { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as DamageRequestProps;
  const client = await createClient();

  const image_array: string[] = [];

  await Promise.all(
    // Upload images to storage
    body.images.map(async (image: DamageRequestImageProps, index) => {
      const file = base64toFile(
        image.encodedImage,
        `${body.containerNumber}_${index}`
      );

      const { data, error } = await client.storage
        .from("damage")
        .upload(`public/${file.name}`, file);

      if (error) {
        console.error(error);
      } else {
        image_array.push(data.fullPath);
      }
    })
  );

  const { data, error } = await client
    .from("damage_requests")
    .insert([
      {
        container_number: body.containerNumber,
        vendor_shop: body.vendorShop,
        state: "pending",
        created_at: body.createdAt,
        longitude: body.location.longitude,
        latitude: body.location.latitude,
        estimated_period: null,
        images: image_array,
      },
    ])
    .select();

  if (error) {
    return new Response("Failed to save request", { status: 500 });
  } else {
    return new Response(JSON.stringify(data), { status: 200 });
  }
}
