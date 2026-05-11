import { useCallback, useEffect, useState } from "react";

import "./grid.css";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });

function GridCell({
  id,
  selected,
  onCellSelect,
}: {
  id: number;
  selected: boolean;
  onCellSelect: (id: number) => void;
}) {
  const onClick = useCallback(() => {
    onCellSelect(id);
  }, [onCellSelect, id]);

  return (
    <div
      onClick={onClick}
      className={`grid-cell ${selected ? "selected" : ""}`}
    >
      {id}
    </div>
  );
}

export const NByNGrid = function ({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}) {
  const [selectedIds, setSelectedIds] = useState(new Set<number>());

  const clearSelection = (id: number) => {
    setSelectedIds((ids) => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  };

  const clearSelections = async () => {
    const ids = [...selectedIds];
    for (const value of ids.reverse()) {
      clearSelection(value);
      await delay(1000);
    }
  };

  const onCellSelect = (selectedId: number) => {
    setSelectedIds((oldIds) => {
      const newIds = new Set(oldIds);
      newIds.add(selectedId);
      return newIds;
    });
  };

  useEffect(() => {
    if (selectedIds.size >= 5) {
      clearSelections();
    }
  }, [selectedIds.size]);

  return (
    <>
      <button onClick={clearSelections}>Clear Selections</button>
      <div className="grid">
        {Array(rows)
          .fill("")
          .map((_, ri) => (
            <div className="grid-row">
              {Array(cols)
                .fill("")
                .map((_, ci) => {
                  const id = ri * cols + ci;
                  const selected = selectedIds.has(id);
                  return (
                    <GridCell
                      onCellSelect={onCellSelect}
                      selected={selected}
                      id={id}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </>
  );
};
