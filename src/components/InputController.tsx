import React from "react";
import { Controller, Control } from "react-hook-form";

interface InputControllerProps {
  name: string;
  control?: Control;
  children: JSX.Element;
}

const InputController: React.FC<InputControllerProps> = ({
  name,
  control,
  children,
}) => {
  return (
    <Controller
      render={({ field }) => children}
      name={name}
      control={control}
    />
  );
};

export default InputController;
