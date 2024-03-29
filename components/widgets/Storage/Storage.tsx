import { FormEvent, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import DropZone from '@/components/composite/DropZone/DropZone';
import { StorageSettings } from '@/components/layout/Window/settingsMap';
import { WidgetState } from '@/components/layout/types';
import styles from './Storage.module.scss';
import FileSelectionContext from '@/components/composite/DropZone/FileSelectionContext';

interface Props {
  state: WidgetState<StorageSettings>;
}

export default function Storage({ state: initialState }: Props): JSX.Element | null {
  const [fileData, dispatchFile] = useContext(FileSelectionContext);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const { data: session } = useSession();

  if (!session)
    return <div style={{ textAlign: 'center' }}>Login to use Storage</div>;

  const { settings } = initialState;
  console.log(settings);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    let files;

    if (e.target.files) {
      files = [...e.target.files];
    }

    if (files && files.length > 0) {
      const existingFiles = fileData.fileList.map((f: File) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatchFile({ type: 'add_file', files });
      setUploadStatus(null);
    }
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault();

    try {
      const keys = fileData.fileList.map((file) => file.name);
      const requestBody = { keys };
      const response = await fetch('/api/files/upload/getUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((res) => res.json());
      
      for (const url of response.urls) {
        const data = fileData.fileList.find((file) => file.name === url.key);

        try {
          const res = await fetch(url.url, {
            method: 'PUT',
            headers: {
              'Content-Length': new Blob([data!]).size.toString(),
            },
            body: data,
          });
          if (res.ok) {
            dispatchFile({ type: 'clear_list' });
            setUploadStatus('Upload successful.');
          } else {
            throw new Error('HTTP request failed.');
          }
        } catch (err) {
          setUploadStatus('Error ocurred while uploading.');
          console.error(err);
        }
      }
    } catch (err) {
      setUploadStatus('Error ocurred while processing files.');
      console.error(err);
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
          <form onSubmit={(e) => handleUpload(e)}>
            <label>
              Select files or drag and drop here
              <input
                className={styles.fileInput}
                type="file"
                multiple
                onChange={handleFileSelect}
              />
            </label>
            {uploadStatus}
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
                <button type="submit">Upload</button>
              </>
            )}
          </form>
        </DropZone>
      </div>
    </div>
  );
}
