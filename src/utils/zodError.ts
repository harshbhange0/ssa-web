import { toast } from "react-toastify";
import { ZodError } from "zod";

export const betterZodError = (error: ZodError) => {
  if (error) {
    
    error.errors.forEach((v: any) => {
      toast.error(v.message);
    });
    return;
  }
};
