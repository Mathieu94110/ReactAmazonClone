import type { Config } from "jest";

const config: Config = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
