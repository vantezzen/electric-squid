import { useEffect, useState } from "react";
import debugging from "debug";
import { EXTENDED_DEBUGGING } from "../config";
const debug = debugging("squid:useChunkProgressInfo");

// Source: https://stackoverflow.com/a/18650828/10590162
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export type ChunkLoadProgress = {
  loadedBytes: string;
  totalBytes: string;
  progress: number;
};

export function useChunkProgressInfo() {
  const [chunkLoadProgress, setChunkLoadProgress] = useState<ChunkLoadProgress>(
    {
      loadedBytes: "",
      totalBytes: "",
      progress: 0,
    }
  );

  useEffect(() => {
    const updateListener = (event: any) => {
      setChunkLoadProgress({
        loadedBytes: formatBytes(event.detail.loaded),
        totalBytes: formatBytes(event.detail.total),
        progress: (event.detail.loaded / event.detail.total) * 100,
      });
    };

    // @ts-ignore
    document.addEventListener("chunk-progress-webpack-plugin", updateListener);

    return () => {
      // @ts-ignore
      document.removeEventListener(
        "chunk-progress-webpack-plugin",
        updateListener
      );
    };
  });

  return chunkLoadProgress;
}
