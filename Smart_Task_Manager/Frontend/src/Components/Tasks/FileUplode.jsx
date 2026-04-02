import React, { useCallback, useEffect } from "react";
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

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

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
      <div className="my-2  space-y-2  flex   ">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex flex-col relative  w-20 p-3
             mt-2 h-auto  overflow-hidden  rounded"
          >
            {file.type.startsWith("image/") ? (
              <img src={file.preview} className="h-14 w-14" alt="" />
            ) : file.type.startsWith("application/pdf") ? (
              <img
                src={"/public/pdf_4726010.png"}
                className="h-14 w-14"
                alt=""
              />
            ) : file.type.startsWith("application/msword") ||
              file.type.startsWith(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ) ? (
              <img
                src={"/public/doc_10301478.png"}
                className="h-14 w-14"
                alt=""
              />
            ) : file.type.startsWith("application/vnd.ms-excel") ||
              file.type.startsWith(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ) ? (
              <img
                src={"/public/excel-file_11384076.png"}
                className="h-14 w-14"
                alt=""
              />
            ) : (
              ""
            )}
            <span className="text-[10px]  overflow-hidden text-wrap">{file.name}</span>
            <button
              onClick={() => {
                removeFiles(file.name);
              }}
              className="text-red-600  absolute -top-1 -right-1 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            </button>
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
