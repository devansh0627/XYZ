import PropTypes from 'prop-types';

const TextInput = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
    inputBg
}) => {
    return (
        <>
            <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
                <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
                    {label}
                </label>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 text-black"
                    id={label}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    style={{ backgroundColor: inputBg }}
                />
            </div>
        </>
    )
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    labelClassName: PropTypes.string,
    inputBg: PropTypes.string
};

export default TextInput;
