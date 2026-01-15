import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // 분리한 파일 import

export function useAuth() {
  return useContext(AuthContext);
}
