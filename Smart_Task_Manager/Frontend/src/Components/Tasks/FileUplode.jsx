import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUplode = ({ files, setfiles }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const validFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((err) => {
          if (err.code === "file-too-large") {
            alert(`${file.name} is larger than 25MB`);
          }
          if (err.code === "file-invalid-type") {
            alert(`${file.name} type is not supported`);
          }
        });
      });

      setfiles((prev) => [...prev, ...validFiles]);
    },
    [setfiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
  });
  console.log(files);

  const removeFiles = (name) => {
    setfiles(files.filter((file) => file.name !== name));
  };

  return (
    <>
      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex  border p-2 rounded"
          >
            <span className="text-sm text-black"><img src={file.preview}className="w-10 h-10" alt="" />{file.name}</span>
            <button
              onClick={() => {
                removeFiles(file.name);
              }}
              className="text-red-400"
            >X</button>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className={`border-dashed flex flex-col justify-center items-center ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} border-2 bg-[#F8FAFC] rounded-md h-60`}
      >
        <h1 className="text-5xl mb-4">📂</h1>
        <p className="font-bold text-[14px] text-[#64748B]">
          Drop files here or click to browe
        </p>
        <input {...getInputProps()} />
        <p className="text-[#94A3B8] text-[12px]">
          Supports PDF, DOC, XLS, PNG, JPG up to 25MB each
        </p>
        <button
          type="button"
          className="border mt-4 px-2 py-1 rounded-md bg-white text-[13px] font-bold"
        >
          Browse Files
        </button>
      </div>
    </>
  );
};

export default FileUplode;
