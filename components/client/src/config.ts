export const VERSIONS = ["1.16", "1.13", "1.8"];
export const EXTENDED_DEBUGGING = false;
export const EXTENDED_DEBUGGING_PACKETS = [
  "unload_chunk",
  "position_look",
  "position",
  "update_light",
  "update_time",
  "experience",
  "update_health",
  "settings",
  "map_chunk",
  "entity_destroy",
  "chat",
  "player_info",
  "look",
  "keep_alive",
  "abilities",
  "update_view_position",
  "playerlist_header",
  "difficulty",
  "spawn_position",
  "close_window",
  "arm_animation",
];
export const shouldDebugPacket = (packetName: string) => {
  return EXTENDED_DEBUGGING || !EXTENDED_DEBUGGING_PACKETS.includes(packetName);
};
