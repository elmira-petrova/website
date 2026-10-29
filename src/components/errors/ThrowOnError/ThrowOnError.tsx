type ThrowOnErrorProps = { error: unknown | undefined };

export const ThrowOnError = (props: ThrowOnErrorProps) => {
  if (props.error) {
    throw props.error;
  }

  return null;
};
