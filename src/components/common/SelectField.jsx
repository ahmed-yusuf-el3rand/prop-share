import { Check, ChevronDown } from "lucide-react";
import { Fragment } from "react";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  Transition,
  ListboxButton,
} from "@headlessui/react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  name,
  icon: Icon = null,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>

      <Listbox value={value} name={name} onChange={onChange} >
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border bg-white py-2 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10">
            <Icon
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <span className="block truncate">
              {options.find((opt) => opt.value === value)?.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      focus ? "bg-cyan-100 text-cyan-900" : "text-gray-700"
                    } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`
                  }
                >
                  {({ selected }) => (
                    <>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                          <Check size={18} />
                        </span>
                      )}

                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectField;
