import { Reducer, createContext, useReducer } from 'react';

interface Props {
  children: React.ReactNode
}

interface ReducerState {
  inDropZone: boolean;
  fileList: File[];
}

interface ReducerAction {
  type: 'set_inDropZone' | 'add_file' | 'remove_file' | 'clear_list';
  inDropZone?: boolean;
  files?: File[];
  file?: File;
}

type FileSelectionContextType = [
  ReducerState,
  React.Dispatch<ReducerAction>,
];

const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'set_inDropZone':
      return { ...state, inDropZone: action.inDropZone || false };
    case 'add_file':
      return {
        ...state,
        fileList: state.fileList.concat(action.files || []),
      };
    case 'remove_file':
      return { ...state, fileList: state.fileList.filter((file) => file.name !== action.file!.name) };
    case 'clear_list':
      return { ...state, fileList: [] };
    default:
      return state;
  }
};

const FileSelectionContext = createContext<FileSelectionContextType>({} as FileSelectionContextType);

function FileSelectionContextProvider(props: Props) {
  const [fileData, fileDispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <FileSelectionContext.Provider value={[fileData, fileDispatch]}>
      {props.children}
    </FileSelectionContext.Provider>
  );
}

export default FileSelectionContext;
export { FileSelectionContextProvider };
