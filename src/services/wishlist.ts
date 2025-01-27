import { httpClient } from "@/lib/http-client";

export async function getWishlist() {
  const response = await httpClient.get<string[]>("/wishlist");
  return response.data;
}

export async function addToWishlist(code: string) {
  const response = await httpClient.post<string[]>("/wishlist", { code });
  return response.data;
}

export async function removeFromWishlist(productId: string) {
  const response = await httpClient.delete<string[]>(`/wishlist/${productId}`);
  return response.data;
}
