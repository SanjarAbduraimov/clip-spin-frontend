import { VoiceData, VoiceDataMapper } from "../types/Service";

export const voiceAdapter = (item: Partial<VoiceData>): VoiceDataMapper => ({
  _id: item._id ?? "",
  voice_id: item.voice_id ?? "",
  name: item.name ?? "",
  gender: item.gender ?? "",
  preview_audio: item.preview_audio ?? "",
});

export const voiceMapper = (data: VoiceData[]) => data?.map(voiceAdapter) || [];
