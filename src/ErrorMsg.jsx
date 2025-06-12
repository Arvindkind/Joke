export default function ErrorMsg({ ErrorMsg }) {
  if (!ErrorMsg) {
    return null;
  }

  return (
    <div className="error-message">
      {ErrorMsg}
    </div>
  );
}
