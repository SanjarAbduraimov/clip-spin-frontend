import { AvatarData, AvatarDataMapper } from "../types/Service";

export const avatarAdapter = (item: Partial<AvatarData>): AvatarDataMapper => ({
  _id: item._id ?? "",
  avatar_id: item.avatar_id ?? "",
  avatar_name: item.avatar_name ?? "",
  gender: item.gender ?? "",
  preview_image_url: item.preview_image_url ?? "",
  preview_video_url: item.preview_video_url ?? "",
});

export const avatarMapper = (data: AvatarData[]) => data?.map(avatarAdapter) || [];
