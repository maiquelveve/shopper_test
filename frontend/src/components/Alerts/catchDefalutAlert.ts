import { defaultAlert } from ".";

export const catchDefalutAlert = () => {
  defaultAlert({ messages: ["Ocorreu um erro, tente mais tarde!"], type: "error", position: "top-start" });
};
