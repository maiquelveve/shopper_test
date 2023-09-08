type EnumColorLoading = "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

interface ILoadingText {
  text?: string;
  size?: number;
  color?: EnumColorLoading;
}

interface ILoadingSimple {
  size?: number;
  color?: EnumColorLoading;
}
