import { DragEvent, useContext } from 'react';
import FileSelectionContext from './FileSelectionContext';

interface Props {
  children: React.ReactNode
}

function DropZone({ children }: Props): JSX.Element {
  const [fileData, fileDispatch] = useContext(FileSelectionContext);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileDispatch({ type: 'set_inDropZone', inDropZone: true });
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileDispatch({ type: 'set_inDropZone', inDropZone: false });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    fileDispatch({ type: 'set_inDropZone', inDropZone: true });
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      const existingFiles = fileData.fileList.map((f: File) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));
      fileDispatch({ type: 'add_file_to_list', files });
      fileDispatch({ type: 'set_inDropZone', inDropZone: false });
    }
  };

  return (
    <div
      style={{ height: '100%' }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

export default DropZone;
