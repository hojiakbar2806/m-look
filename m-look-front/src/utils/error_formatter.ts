export const pydanticErrorFormatter = ({ error }) => {
  error.response?.data?.detail?.forEach(
    (err: { loc: string[]; msg: string }) => {
      const field = err.loc[1];
      const message = err.msg.split(":")[0];
      const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
      return `${formattedField}: ${message}`;
    }
  );
};
