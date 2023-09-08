import "./alert.css";

import Swal from "sweetalert2";
import { IAlertsDefault, IConfigAlertType } from "../../interfaces/alerts";

export const defaultAlert = ({ messages, type, position = "center", timer = 5000 }: IAlertsDefault) => {

  let configType: IConfigAlertType;

  switch (type) {
  case "error":
    configType = { backgroundColor: "#D32F2F", iconColor: "#9F0D0B", fontColor: "#fff", icon: "error" };
    break;
  case "info":
    configType = { backgroundColor: "#0288D1", iconColor: "#0059B2", fontColor: "#fff", icon: "info" };
    break;
  case "warning":
    configType = { backgroundColor: "#ED6C02", iconColor: "#663C00", fontColor: "#fff", icon: "warning" };
    break;
  case "question":
    configType = { backgroundColor: "#ffeb3b", iconColor: "#fbc02d", fontColor: "#9e9e9e", icon: "question" };
    break;
  default:
    configType = { backgroundColor: "#307F34", iconColor: "#1b5e20", fontColor: "#fff", icon: "success" };
    break;
  }

  const Toast = Swal.mixin({
    position,
    timer,
    toast: true,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    background: configType.backgroundColor,
    customClass: {
      title: "title",
      container: "background"
    }
  });

  let title = "";
  messages.map(msg => {
    title = `${title} ${msg.trim()} </br>`;
  });

  if(!messages.length) {
    title = "Opss! Tente mais tarde!";
  }

  Toast.fire({
    title,
    icon: configType.icon,
    iconColor: configType.iconColor,
    color: configType.fontColor,
    width: "auto",
  });
};
