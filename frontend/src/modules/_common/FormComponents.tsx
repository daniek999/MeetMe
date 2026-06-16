// src/modules/_common/FormComponents.tsx
export function FormInput({
  label,
  caption,
  constraint,
  type,
  name,
  value,
  onChange,
  maxLength,
  rows = 3,
  itemArray,
  placeholder,
}: {
  label: string;
  caption: string;
  constraint: string;
  type: "text" | "url" | "textarea" | "color" | "select" | "email" | "password";
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  maxLength?: number;
  rows?: number;
  itemArray?: string[];
  placeholder?: string;
}) {
  const isTextArea = type === "textarea";

  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex flex-column">
        <label htmlFor={name} className="form-label small mb-0">
          {label}
        </label>
        <div className="d-flex flex-row justify-content-between">
          <small className="fg-partial">{caption}</small>
          <small className="fg-partial">{constraint}</small>
        </div>
      </div>

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === "color" ? (
        <input
          id={name}
          type={type}
          name={name}
          className="ipt form-control-plaintext p-0"
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          value={value}
          onChange={onChange}
        >
          {itemArray!.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export function FormButton({
  type,
  loading,
  label,
  labelLoading,
}: {
  type: "submit" | "reset" | "button";
  loading: boolean;
  label: string;
  labelLoading: string;
}) {
  return (
    <button
      type={type}
      className="sw sw-primary px-3 py-1 w-100"
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm me-2" />
      ) : null}
      {loading ? labelLoading : label}
    </button>
  );
}

export function FormPreview({
  label,
  caption,
  form,
}: {
  label: string;
  caption: string;
  form: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
}) {
  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex flex-column">
        <label className="form-label small mb-0">{label}</label>
        <div className="d-flex flex-row justify-content-between">
          <small className="fg-partial">{caption}</small>
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center gap-2 p-5 bdr-surface"
        style={{
          backgroundColor: form.backgroundColor,
          color: form.primaryColor,
          fontFamily: form.fontFamily,
        }}
      >
        <h4 className="mb-0">Texto Primario sobre Fondo Primario</h4>
        <p className="mb-0 p-3 bg-surface py-1">
          Texto Secundario con Fondo Secundario
        </p>
      </div>
    </div>
  );
}
