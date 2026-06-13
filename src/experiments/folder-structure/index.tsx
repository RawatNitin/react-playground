import { useEffect, useState } from "react";
import "./folders.css";
import folderIcon from "../../assets/folder.png";
import fileIcon from "../../assets/file.png";

const toggleFolder = (targetId: number, directories: TDirectory[]) => {
  return directories.map((directory) => {
    if (directory.type === TDirectoryType.FILE) {
      return directory;
    }

    if (directory.id === targetId) {
      return {
        ...directory,
        isOpen: !directory.isOpen,
      };
    } else {
      return {
        ...directory,
        children: toggleFolder(targetId, directory.children),
      };
    }
  });
};

enum TDirectoryType {
  FOLDER,
  FILE,
}

type TFolder = {
  id: number;
  name: string;
  children: TDirectory[] | TFile[];
  type: TDirectoryType.FOLDER;
  isOpen: boolean;
};

type TFile = {
  id: number;
  name: string;
  type: TDirectoryType.FILE;
};

type TDirectory = TFolder | TFile;

const defaultDirectories: TDirectory[] = [
  {
    id: 1,
    name: "root",
    type: TDirectoryType.FOLDER,
    isOpen: true,
    children: [
      {
        id: 2,
        name: "components",
        type: TDirectoryType.FOLDER,
        isOpen: true,
        children: [
          { id: 3, name: "first-comonent", type: TDirectoryType.FILE },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "hooks",
    type: TDirectoryType.FOLDER,
    isOpen: true,
    children: [
      { id: 5, name: "first-hook", type: TDirectoryType.FILE },
      { id: 6, name: "second-hook", type: TDirectoryType.FILE },
      { id: 7, name: "third-hook", type: TDirectoryType.FILE },
      { id: 8, name: "fourth-hook", type: TDirectoryType.FILE },
    ],
  },
];

export const FoldersContainer = () => {
  const [directories, setDirectories] =
    useState<TDirectory[]>(defaultDirectories);

  const onExpand = (targetId: number) => {
    setDirectories((prev) => toggleFolder(targetId, prev));
  };

  return <Folders directories={directories} onExpand={onExpand} />;
};

const Folders = ({
  directories,
  onAdd,
  onExpand,
}: {
  directories: TDirectory[];
  onAdd: (parentId: number) => void;
  onExpand: (id: number) => void;
}) => {
  return directories?.map((directory) => {
    const { id, name, type, children, isOpen } = directory;
    return (
      <div key={id} className="directory-node">
        <div className="directory">
          <img
            className="icon"
            src={type === TDirectoryType.FOLDER ? folderIcon : fileIcon}
            alt={type === TDirectoryType.FOLDER ? "Folder" : "File"}
          />
          {name}
          {type === TDirectoryType.FOLDER ? (
            <button onClick={onAdd}>+</button>
          ) : null}
          {type === TDirectoryType.FOLDER ? (
            <button onClick={() => onExpand(id)}>
              {!isOpen ? ">" : "\\/"}
            </button>
          ) : null}
        </div>
        {type === TDirectoryType.FOLDER && isOpen ? (
          <div className="directory-children">
            <Folders directories={children} onAdd={onAdd} onExpand={onExpand} />
          </div>
        ) : null}
      </div>
    );
  });
};
