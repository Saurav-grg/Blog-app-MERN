// import React from 'react';
// import ReactQuill, { Quill } from 'react-quill';

// const Size = Quill.import('attributors/style/size');
// Size.whitelist = ['12px', '15px', '18px', '22px', '28px'];
// Quill.register(Size, true);

// const CustomFontSize = ({ editor }) => {
//   const fontSizeOptions = [
//     { value: '12px', label: 'Small' },
//     { value: '15px', label: 'Medium' },
//     { value: '18px', label: 'Large' },
//     { value: '22px', label: 'X-Large' },
//     { value: '28px', label: 'Huge' },
//   ];

//   const handleChange = (value) => {
//     editor.format('size', value);
//   };

//   return (
//     <span className="ql-formats">
//       <select
//         id="ql-size"
//         className="ql-size"
//         onChange={(e) => handleChange(e.target.value)}
//       >
//         {fontSizeOptions.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </span>
//   );
// };

// export default CustomFontSize;
