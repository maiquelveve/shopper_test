import { SweetAlertPosition, SweetAlertIcon } from "sweetalert2";

interface IConfigAlertType {
  backgroundColor: string;
  iconColor: string;
  fontColor: string;
  icon: SweetAlertIcon;
}

interface IAlertsDefault {
  messages: string[];
  timer?: number;
  type: SweetAlertIcon;
  position?: SweetAlertPosition;
}
