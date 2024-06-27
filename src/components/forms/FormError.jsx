export default function FormError({ children, field }) {
  return (
    <div>
      <div className="relative">
        {children}
        {field.getMeta().isValidating && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            ...
          </div>
        )}
      </div>
      {field.state.meta.errors && (
        <div className="text-red-500 text-sm mt-1">
          {field.state.meta.errors}
        </div>
      )}
    </div>
  );
}
