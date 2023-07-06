import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import FileSelectionContext from '@/components/composite/DropZone/FileSelectionContext';
import { WidgetState } from '@/components/layout/types';
import { StorageSettings } from '@/components/layout/Window/settingsMap';
import styles from './Storage.module.scss';
import DropZone from '@/components/composite/DropZone/DropZone';

interface Props {
  state: WidgetState<StorageSettings>;
}

function Storage({ state: initialState }: Props): JSX.Element | null {
  const [fileData, dispatchFile] = useContext(FileSelectionContext);
  const { data: session } = useSession();

  if (!session)
    return <div style={{ textAlign: 'center' }}>Login to use Storage</div>;
  const { settings } = initialState;

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    let files;
    if (e.target.files) {
      files = [...e.target.files];
    }
    if (files && files.length > 0) {
      const existingFiles = fileData.fileList.map((f: File) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));
      dispatchFile({ type: 'add_file', files });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.files}>
        Your files:
        <ul className={styles.fileList}>
          <li className={styles.listItem}>Test Item</li>
        </ul>
      </div>
      <div className={styles.upload}>
        <DropZone>
          <label>
            Select files or drag and drop here
            <input
              className={styles.fileInput}
              type="file"
              multiple
              onChange={handleFileSelect}
            />
          </label>
          {fileData.fileList.length > 0 && (
            <>
              <ul className={styles.fileList}>
                Selected files:
                {fileData.fileList.map((file) => (
                  <div key={file.name}>
                    <li className={styles.listItem}>{file.name}</li>
                    <button
                      type="button"
                      onClick={() =>
                        dispatchFile({ type: 'remove_file', file })
                      }
                      key={file.name}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => dispatchFile({ type: 'clear_list' })}
              >
                Clear selection
              </button>
            </>
          )}
        </DropZone>
      </div>
    </div>
  );
}

export default Storage;
