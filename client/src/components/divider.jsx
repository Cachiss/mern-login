
export const Divider = ({ children }) => {
    return (
      <div className="flex items-center mt-5">
        <div className="border-b-2 w-full border-slate-600" />
        <span className="px-3">
          {children}
        </span>
        <div className="border-b-2 w-full border-slate-600" />
      </div>
    );
  };