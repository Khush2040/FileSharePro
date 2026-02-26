import api from "../api/axios";

const FileList = ({ files, refresh }) => {
  const handleDelete = async (id) => {
    if (!confirm("Delete this file?")) return;
    await api.delete(`/files/${id}`);
    refresh();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.originalName}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(file._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;